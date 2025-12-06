import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { db } from "@/app/_lib/prisma";

export async function POST(req: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const payment = new Payment(client);

  try {
    const body = await req.json();

    if (body.type === "payment") {
      const paymentId = body.data.id;
      const data: any = await payment.get({ id: paymentId });

      const orderId =
        data.metadata?.order_id ||
        data.metadata?.orderId ||
        data.additional_info?.items?.[0]?.external_reference;
      const paid = data.status === "approved";

      const payerEmail = data.payer?.email;
      const deviceId =
        data.metadata?.device_id ||
        data.additional_info?.device?.id ||
        data.additional_info?.items?.[0]?.device_id;

      console.log(
        `Webhook payment ${paymentId} status=${data.status} orderId=${orderId} payer=${payerEmail} device=${deviceId}`,
      );

      if (!orderId) {
        console.warn("No se encontró order_id en metadata del pago", paymentId);
      }

      if (orderId && paid) {
        await db.order.update({
          where: { id: Number(orderId) },
          data: {
            paid: true,
            status: "ENVIO_PENDIENTE",
            paymentId: String(paymentId),
          },
        });

        const orderItems = await db.orderItem.findMany({
          where: { orderId: Number(orderId) },
          select: { productId: true, quantity: true },
        });

        await Promise.all(
          orderItems.map((item: any) =>
            db.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            }),
          ),
        );

        console.log(
          `Orden ${orderId} marcada como pagada y stock actualizado.`,
        );
      } else if (orderId && data.status === "pending") {
        // Mark as pending payment (no stock change)
        await db.order.update({
          where: { id: Number(orderId) },
          data: { status: "PAGO_PENDIENTE" },
        });
        console.log(`Orden ${orderId} marcada como PAGO_PENDIENTE (pending).`);
      } else if (orderId && data.status === "rejected") {
        // Optional: mark as unpaid / notify
        await db.order.update({
          where: { id: Number(orderId) },
          data: { paid: false, status: "PAGO_PENDIENTE" },
        });
        console.log(`Orden ${orderId} con pago rechazado.`);
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
