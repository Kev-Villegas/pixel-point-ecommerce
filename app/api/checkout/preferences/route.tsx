import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { payer, cart } = await request.json();

  const body = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      picture_url: item.images[0].url,
      category_id: item.brand,
    })),
    // [
    //   {
    //     id: "1",
    //     unit_price: 50,
    //     quantity: 1,
    //     title: "Pedras",
    //   },
    // ],
    metadata: {
      text: "joder",
    },
    payer: {
      name: payer.fullName,
      surname: "User",
      email: payer.email,
      phone: {
        area_code: "11",
        number: payer.phoneNumber,
      },
      // identification: {
      //   type: 'DNI',
      //   number: '19119119100',
      // },
      address: {
        zip_code: "06233200",
        street_name: "Street",
        street_number: "123",
      },
      shipments: {
        mode: "me2",
        local_pickup: false,
        default_shipping_method: null,
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
          street_number: 123,
          street_name: payer.streetAddress,
          floor: "12",
          apartment: "120A",
        },
      },
      statement_descriptor: "Pixel Point",
    },
  };

  const response = await preference.create({ body });

  return NextResponse.json({ response });
}
