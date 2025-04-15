import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const payment = new Payment(client);
  payment
    .create({ body: body })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));

  return NextResponse.json("ok", { status: 201 });
}
