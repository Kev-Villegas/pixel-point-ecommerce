import { db } from "@/app/_lib/prisma";
import { Image, Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type ProductWithImages = Product & {
  images: Image[];
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();

  try {
    const products: ProductWithImages[] = await db.product.findMany({
      where: query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                brand: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      include: {
        images: true,
      },
      orderBy: {
        stock: "desc",
      },
    });

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
