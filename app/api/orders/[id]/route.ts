import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const urlParts = request.nextUrl.pathname.split("/");
    const orderId = parseInt(urlParts[urlParts.length - 1], 10);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "ID de orden inválido" },
        { status: 400 },
      );
    }

    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
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
    });

    if (!order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    if (order.email !== session.user.email) {
      return NextResponse.json(
        { error: "No autorizado para ver este pedido" },
        { status: 403 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error obteniendo la orden:", error);
    return NextResponse.json(
      { error: "Error al obtener la orden" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const body = await request.json();
  const newStatus = body.status as string;

  if (
    newStatus !== "PAGO_PENDIENTE" &&
    newStatus !== "ENVIO_PENDIENTE" &&
    newStatus !== "ENVIADO" &&
    newStatus !== "ENTREGADO"
  ) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  try {
    await db.order.update({
      where: { id: parseInt(params.id) },
      data: { status: newStatus },
    });

    return NextResponse.json(
      { message: "Estado actualizado correctamente" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el estado" },
      { status: 500 },
    );
  }
}
