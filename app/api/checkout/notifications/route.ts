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
      // const data = await mercadopago.payment.findById(paymentId);
      const data = await payment.get({ id: paymentId });
      console.log("Datos de pago:", data);
    }
    //   if (!data.body) {
    //     return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 });
    //   }

    //   const orderId = data.body.metadata.orderId; // Asegurar que `orderId` es correcto
    //   const paid = data.body.status === 'approved';

    //   if (orderId && paid) {
    //     await db.order.update({
    //       where: { id: Number(orderId) }, // Si es `Int`, asegurarse de convertirlo
    //       data: { paid: true },
    //     });

    //     console.log(`Orden ${orderId} actualizada como pagada.`);
    //   }
    // }

    return NextResponse.json({}, { status: 204 });
  } catch (error: any) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
