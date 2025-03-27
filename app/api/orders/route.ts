import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: {
        email: session.user.email,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                properties: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error obteniendo los pedidos:", error);
    return NextResponse.json(
      { error: "Error al obtener los pedidos" },
      { status: 500 },
    );
  }
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
    console.error("Error creando el pedido:", error);
    return NextResponse.json(
      { error: "Error creando el pedido" },
      { status: 500 },
    );
  }
}
