import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  console.log("Received query:", query); // Debugging: Ver el parámetro de búsqueda

  try {
    const products = await db.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    console.log("Products found:", products); // Depurar la respuesta de la base de datos

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in search.ts:", error);
    return NextResponse.json(
      { error: "Error al buscar productos" },
      { status: 500 },
    );
  }
}
