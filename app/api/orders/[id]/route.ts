// /app/api/orders/[id]/route.ts

import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const orderId = parseInt(params.id, 10);
  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  // Ejemplo: Obtener el usuario autenticado (esto dependerá de tu estrategia de auth)
  // const user = await getUserFromRequest(request);

  // Buscar la orden e incluir relaciones (items, imágenes y propiedades)
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          images: true,
          properties: true,
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Ejemplo de validación de autorización:
  // if (order.email !== user.email) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  return NextResponse.json(order);
}

// Puedes agregar el manejo de POST u otros métodos si es necesario.
export async function POST(request: NextRequest) {
  // Lógica para crear o actualizar una orden si fuera necesario
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
