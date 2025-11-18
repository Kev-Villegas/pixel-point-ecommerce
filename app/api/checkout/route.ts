import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { getClientContext } from "@/app/_lib/getClientContext";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const deviceId = request.headers.get("x-meli-session-id") || undefined;
  const { ip, userAgent } = getClientContext(request);

  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });

  const payment = new Payment(client);

  try {
    const enrichedBody = {
      ...body,
      metadata: {
        ...(body.metadata || {}),
        device_id: deviceId,
        ip_address: ip,
        user_agent: userAgent,
        created_from: "guest-checkout",
        created_at: new Date().toISOString(),
      },
    };

    const response = await payment.create({ body: enrichedBody });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 },
    );
  }
}
