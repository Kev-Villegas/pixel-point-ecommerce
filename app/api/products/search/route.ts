import { db } from "@/app/_lib/prisma";
import { Product, Image } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type ProductWithImages = Product & {
  images: Image[];
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  console.log("Received query:", query);

  try {
    const products: ProductWithImages[] = await db.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        images: true,
      },
    });

    console.log("Products found:", products);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in search.ts:", error);

    return NextResponse.json(
      {
        error: "Error al buscar productos",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
