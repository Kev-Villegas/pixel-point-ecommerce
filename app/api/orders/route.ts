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
  const { payer, cart, total } = await request.json();

  try {
    // Obtener la sesión del servidor
    const session = await auth();

    // Priorizar datos de sesión si existe, sino usar datos del payer o valores por defecto
    const username = session?.user?.name || payer?.name || "Guest";
    const surname = payer?.surname ? ` ${payer.surname}` : "";
    const email =
      session?.user?.email || payer?.email || `guest_${Date.now()}@guest.local`;

    // Los datos de dirección siempre vienen del payer (formulario de checkout)
    const city = payer?.city || "";
    const postalCode = payer?.postalCode || "";
    const streetAddress = payer?.street_name || "";
    const province = payer?.province || "";
    const phonenumber = (payer?.area_code || "") + (payer?.number || "");

    const newOrder = await db.order.create({
      data: {
        username: username + surname,
        email,
        city,
        totalPrice: total,
        postalCode,
        streetAddress,
        province,
        phonenumber,
        paid: false,
        items: {
          create: (cart || []).map((item: any) => ({
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
