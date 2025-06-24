import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user?.email || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID de orden requerido" },
        { status: 400 },
      );
    }

    const orderId = parseInt(id, 10);

    if (isNaN(orderId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const existingOrder = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    // Borramos primero los OrderItems asociados
    await db.orderItem.deleteMany({
      where: { orderId },
    });

    // Luego borramos la orden
    await db.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json(
      { message: "Orden eliminada correctamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[DELETE /api/dashboard/orders/[id]] Error:", error);
    return NextResponse.json(
      { error: "Error al eliminar la orden" },
      { status: 500 },
    );
  }
}
