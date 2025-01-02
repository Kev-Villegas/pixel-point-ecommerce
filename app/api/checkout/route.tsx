import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("body:", body);

  // const { name, email, city, postalCode, streetAddress, cartProducts } = body;

  // console.log(cartProducts);
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const payment = new Payment(client);
  payment.create({ body: body });
  // .then((res) => console.log(res))
  // .catch((e) => console.log(e));

  return NextResponse.json({ payment });
  // return NextResponse.json(cartProducts, { status: 201 });
}
