import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const year = new Date().getFullYear();
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year + 1}-01-01`);

    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("es-AR", { month: "short" }),
      orders: 0,
      revenue: 0,
    }));

    for (const order of orders) {
      const monthIndex = order.createdAt.getMonth();
      const totalRevenue = order.items.reduce(
        (sum, item) => sum + (item.product?.price || 0),
        0,
      );

      monthlyData[monthIndex].orders += 1;
      monthlyData[monthIndex].revenue += totalRevenue;
    }

    return NextResponse.json(monthlyData, { status: 200 });
  } catch (error) {
    console.error("[GET /api/dashboard/monthly-trends] Error:", error);
    return NextResponse.json(
      { error: "Error al obtener las tendencias mensuales" },
      { status: 500 },
    );
  }
}
