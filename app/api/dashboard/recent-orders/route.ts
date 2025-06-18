import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const limit = 8;
    const orders = await db.order.findMany({
      take: limit,
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
        rawId: order.id, // <-- ID numérico sin formato
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
    console.error("[GET /api/dashboard/recent-orders] Error:", error);
    return NextResponse.json(
      { error: "Error al obtener órdenes recientes" },
      { status: 500 },
    );
  }
}
