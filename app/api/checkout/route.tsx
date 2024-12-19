import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN as string,
});
const payment = new Payment(client);

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body:", body);

  const { name, email, city, postalCode, streetAddress, cartProducts } = body;

  console.log(cartProducts);

  const payment = new Payment(client);
  payment.create({ body: body }).then(console.log).catch(console.log);

  return NextResponse.json(cartProducts, { status: 201 });
}

export async function GET() {}
