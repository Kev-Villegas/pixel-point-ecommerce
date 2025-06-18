import { db } from "../prisma";

export async function getRecentOrders(limit = 8) {
  const orders = await db.order.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        take: 1, // solo mostramos el primer producto en la tabla
        include: {
          product: true,
        },
      },
    },
  });

  return orders.map((order) => {
    const item = order.items[0];

    return {
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
}
