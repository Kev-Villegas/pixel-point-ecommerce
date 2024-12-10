import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Image = {
  url: string;
};

export async function GET() {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formattedProperties = body.properties.reduce((acc, prop) => {
    const key = prop.name.toLowerCase();
    acc[key] = prop.values;
    return acc;
  }, {});

  const product = await db.product.create({
    data: {
      name: body.title,
      description: body.description,
      brand: body.productBrand,
      price: body.price,
      properties: { create: { ...formattedProperties } },
      images: {
        create: body.images.map((image: Image) => ({
          url: image.url,
        })),
      },
    },
  });

  return NextResponse.json(product, { status: 201 });
}
