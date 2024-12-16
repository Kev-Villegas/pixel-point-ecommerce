import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

// const mercadopago = require("mercadopago");
// mercadopago.configure({
//   access_token: process.env.ACCESS_TOKEN,
// });

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN as string,
});
const payment = new Payment(client);

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body:", body);
  const { name, email, city, postalCode, streetAddress, cartProducts } = body;

  console.log(cartProducts);
  return NextResponse.json(cartProducts, { status: 201 });
}

export async function GET() {}
