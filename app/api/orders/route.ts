import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Ejemplo: Obtener el usuario autenticado (según tu implementación)
  // const user = await getUserFromRequest(request);

  // Si deseas filtrar por el usuario, por ejemplo:
  // where: { email: user.email }
  const orders = await db.order.findMany({
    // where: { email: user.email },
    include: {
      items: {
        include: {
          images: true,
          properties: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const { payer, cart } = await request.json();

  try {
    const newOrder = await db.order.create({
      data: {
        username: payer.name + " " + payer.surname,
        email: payer.email,
        city: payer.city,
        postalCode: payer.postalCode,
        streetAddress: payer.street_name,
        province: payer.province,
        phonenumber: payer.area_code + payer.number,
        paid: false,
        items: {
          create: cart.map((item: any) => ({
            product: {
              connect: {
                id: item.id,
              },
            },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 },
    );
  }
}
