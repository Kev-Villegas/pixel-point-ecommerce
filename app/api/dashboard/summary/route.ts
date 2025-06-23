import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }
  try {
    const brandDistribution = await db.product.groupBy({
      by: ["brand"],
      _count: { _all: true },
    });

    const topProducts = await db.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: {
        _sum: { quantity: "desc" },
      },
      take: 5,
    });

    const productsData = await db.product.findMany({
      where: {
        id: {
          in: topProducts.map((t) => t.productId),
        },
      },
    });

    const formattedTop = topProducts.map((item) => {
      const product = productsData.find((p) => p.id === item.productId);
      return {
        name: product?.name ?? "Desconocido",
        sales: item._sum.quantity ?? 0,
        revenue: (product?.price ?? 0) * (item._sum.quantity ?? 0),
      };
    });

    return NextResponse.json({
      brandData: brandDistribution.map((b, i) => ({
        brand: b.brand,
        sales: b._count._all,
        fill: `hsl(var(--chart-${(i % 5) + 1}))`,
      })),
      topProducts: formattedTop,
    });
  } catch (error) {
    console.error("[DASHBOARD_SUMMARY_ERROR]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
