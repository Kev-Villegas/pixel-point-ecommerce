import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { cart } = await request.json();

  const body = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      description: item.description,
      picture_url: item.images[0].url,
      category_id: item.brand,
    })),
    notification_url:
      "https://www.pixel-point.com.ar/api/checkout/notifications",
    statement_descriptor: "Pixel Point",
    back_urls: {
      failure: "https://www.pixel-point.com.ar",
      pending: "https://www.pixel-point.com.ar",
      success: "https://www.pixel-point.com.ar",
    },
    auto_return: "approved",
    // external_reference: orderId,
    // metadata: { orderId: orderId, test: "ok" },
    // payer: {
    //   first_name: payer.name,
    //   last_name: payer.surname,
    //   email: payer.email,
    //   phone: {
    //     area_code: payer.area_code,
    //     number: payer.number,
    //   },
    //   address: {
    //     zip_code: payer.postalCode,
    //     street_name: payer.street_name,
    //     street_number: payer.street_number,
    //   },
    // },
    // shipments: {
    //   local_pickup: false,
    //   free_methods: [
    //     {
    //       id: 1,
    //     },
    //   ],
    //   // cost: 10,
    //   free_shipping: false,
    //   dimensions: "10x10x20,500",
    //   receiver_address: {
    //     zip_code: payer.postalCode,
    //     street_number: payer.street_number,
    //     street_name: payer.street_name,
    //     floor: payer.floor,
    //     apartment: payer.apartment,
    //   },
    // },
    // notification_url:
    //   "https://www.pixel-point.com.ar/api/checkout/notifications",
    // statement_descriptor: "Pixel Point",
    // back_urls: {
    //   failure: "https://www.pixel-point.com.ar",
    //   pending: "https://www.pixel-point.com.ar",
    //   success: "https://www.pixel-point.com.ar",
    // },
    // auto_return: "approved",
  };

  const response = await preference.create({ body });
  return NextResponse.json({ response });
}

export async function PUT(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { id, cart, payer } = await request.json();

  const updatePreferenceRequest = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      description: item.description,
      picture_url: item.images[0].url,
      category_id: item.brand,
    })),
    payer: {
      email: payer.email,
    },
  };

  const response = await preference.update({ id, updatePreferenceRequest });
  return NextResponse.json({ response });
}
