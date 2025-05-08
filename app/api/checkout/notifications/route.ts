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
    console.log("Webhook recibido:", body);

    if (body.type === "payment") {
      const paymentId = body.data.id;
      const data = await payment.get({ id: paymentId });
      console.log("Datos de pago:", data);

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

        console.log(`Orden ${orderId} marcada como pagada.`);
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
