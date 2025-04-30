import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { payer, cart, orderId } = await request.json();

  const body = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      picture_url: item.images[0].url,
      category_id: item.brand,
    })),
    metadata: { orderId: orderId, test: "ok" },
    payer: {
      name: payer.name,
      surname: payer.surname,
      email: payer.email,
      phone: {
        area_code: payer.area_code,
        number: payer.number,
      },
      address: {
        zip_code: payer.postalCode,
        street_name: payer.street_name,
        street_number: payer.street_number,
      },
    },
    shipments: {
      local_pickup: false,
      free_methods: [
        {
          id: 1,
        },
      ],
      cost: 10,
      free_shipping: false,
      dimensions: "10x10x20,500",
      receiver_address: {
        zip_code: payer.postalCode,
        street_number: payer.street_number,
        street_name: payer.street_name,
        floor: payer.floor,
        apartment: payer.apartment,
      },
    },
    notification_url:
      "https://pixel-point-ecommerce.vercel.app/api/checkout/notifications",
    statement_descriptor: "Pixel Point",
    back_urls: {
      failure: "https://pixel-point-ecommerce.vercel.app",
      pending: "https://pixel-point-ecommerce.vercel.app",
      success: "https://pixel-point-ecommerce.vercel.app",
    },
    auto_return: "approved",
  };

  const response = await preference.create({ body });

  return NextResponse.json({ response });
}
