import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json(
        { error: "Faltan parámetros 'from' o 'to'" },
        { status: 400 },
      );
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return NextResponse.json({ error: "Fechas inválidas" }, { status: 400 });
    }

    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lt: toDate,
        },
        paid: true,
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
    console.error("Error obteniendo órdenes con filtro:", error);
    return NextResponse.json(
      { error: "Error al obtener las órdenes" },
      { status: 500 },
    );
  }
}
