import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.email || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const params = await props.params;

    if (!params.id) {
      return NextResponse.json(
        { error: "ID de orden requerido" },
        { status: 400 },
      );
    }

    const orderId = parseInt(params.id, 10);

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

    await db.orderItem.deleteMany({
      where: { orderId },
    });

    await db.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json(
      { message: "Orden eliminada correctamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al eliminar la orden" },
      { status: 500 },
    );
  }
}
