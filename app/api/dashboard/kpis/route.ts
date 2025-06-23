import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const products = await db.product.findMany({
    select: {
      price: true,
      stock: true,
    },
  });

  const total = products.length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const inventoryValue = products.reduce(
    (acc, p) => acc + p.price * p.stock,
    0,
  );
  const avgPrice =
    products.length > 0
      ? products.reduce((acc, p) => acc + p.price, 0) / products.length
      : 0;

  return NextResponse.json({
    total,
    inStock,
    lowStock,
    inventoryValue,
    avgPrice,
  });
}
