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
      const data = await payment.get({ id: paymentId });

      const orderId = data.metadata?.order_id;
      const paid = data.status === "approved";

      if (orderId && paid) {
        await db.order.update({
          where: {
            id: Number(orderId),
            status: "PAGO_PENDIENTE",
          },
          data: {
            paid: true,
            status: "ENVIO_PENDIENTE",
          },
        });

        const orderItems = await db.orderItem.findMany({
          where: { orderId: Number(orderId) },
          select: {
            productId: true,
            quantity: true,
          },
        });

        await Promise.all(
          orderItems.map((item) =>
            db.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            }),
          ),
        );

        console.log(
          `Orden ${orderId} marcada como pagada y stock actualizado.`,
        );
      } else {
        throw new Error("No se encontró el order_id en metadata");
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
