import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Body for Mercado Pago!!!!!!!!!!!!");
  console.log(body);

  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });

  const payment = new Payment(client);

  try {
    const response = await payment.create({ body });
    console.log("Response from Mercado Pago!!!!!!!!!!!!");
    console.log(response);
    console.log(response.status_detail);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al procesar el pago" },
      { status: 500 },
    );
  }
}
