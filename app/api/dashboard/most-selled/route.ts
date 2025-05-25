import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const topProducts = await db.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: {
        _sum: { quantity: "desc" },
      },
      take: 5,
    });

    const productIds = topProducts.map((p) => p.productId);
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    const productData = topProducts.map(({ productId, _sum }) => {
      const product = products.find((p) => p.id === productId);
      return {
        name: product?.name ?? "Desconocido",
        sales: _sum.quantity ?? 0,
      };
    });

    return NextResponse.json(productData);
  } catch (error) {
    console.error("Error en /api/dashboard/most-selled:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos más vendidos" },
      { status: 500 },
    );
  }
}
