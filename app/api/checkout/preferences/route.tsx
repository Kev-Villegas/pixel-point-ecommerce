import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);

  const body = {
    items: [
      {
        id: "1",
        unit_price: 50,
        quantity: 1,
        title: "Pedras",
      },
    ],
    metadata: {
      text: "joder",
    },
    payer: {
      name: "Test",
      surname: "User",
      email: "your_test_email@example.com",
      phone: {
        area_code: "11",
        number: "4444-4444",
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
          zip_code: "06000000",
          street_number: 123,
          street_name: "Street",
          floor: "12",
          apartment: "120A",
        },
      },
      statement_descriptor: "Pixel Point",
    },
  };

  const response = await preference.create({ body });

  // console.log(response);
  // if (typeof Storage !== "undefined") {
  //   // LocalStorage disponible
  //   console.log('wwwwwwwwwwwwwwwwwwAAAAAAAAAA');
  //   console.log('wwwwwwwwwwwwwwwwwwAAAAAAAAAA');
  // }
  return NextResponse.json({ response });
}
