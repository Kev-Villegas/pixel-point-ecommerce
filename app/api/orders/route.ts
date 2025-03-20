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
  const body = await request.json();

  try {
    const newOrder = await db.order.create({
      data: {
        username: body.username,
        email: body.email,
        city: body.city,
        postalCode: body.postalCode,
        streetAddress: body.streetAddress,
        province: body.province,
        phonenumber: body.phonenumber,
        paid: body.paid,
        // here we include other data from the request body
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
