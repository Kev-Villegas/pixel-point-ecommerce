import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET_PRODUCTS_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
