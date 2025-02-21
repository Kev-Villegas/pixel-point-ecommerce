import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");
  const excludeId = searchParams.get("excludeId");

  if (!brand) {
    return NextResponse.json({ error: "Brand is required" }, { status: 400 });
  }

  try {
    const products = await db.product.findMany({
      where: {
        brand: {
          equals: brand,
          mode: "insensitive",
        },
        id: excludeId ? { not: parseInt(excludeId, 10) } : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching related products:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch related products",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
