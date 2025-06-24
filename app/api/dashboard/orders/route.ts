import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const whereClause: any = {};

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return NextResponse.json(
          { error: "Fechas inválidas" },
          { status: 400 },
        );
      }

      whereClause.createdAt = {
        gte: fromDate,
        lt: toDate,
      };
    }

    const orders = await db.order.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          take: 1,
          include: {
            product: true,
          },
        },
      },
    });

    const data = orders.map((order) => {
      const item = order.items[0];

      return {
        rawId: order.id,
        id: `ORD-${order.id.toString().padStart(3, "0")}`,
        cliente: order.username,
        producto: item?.product.name ?? "Producto eliminado",
        precio: item?.product.price ?? 0,
        estado: order.status,
        fecha: order.createdAt.toISOString().split("T")[0],
        email: order.email,
        telefono: order.phonenumber,
        direccion: `${order.streetAddress}, ${order.city}`,
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET /api/dashboard/orders] Error:", error);
    return NextResponse.json(
      { error: "Error al obtener órdenes recientes" },
      { status: 500 },
    );
  }
}
