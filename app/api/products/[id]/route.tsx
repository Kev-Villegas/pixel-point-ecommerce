import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Image = {
  url: string;
};

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const product = await db.product.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      images: true,
      properties: true,
    },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const body = await request.json();

  const formattedProperties = body.properties.reduce((acc, prop) => {
    const key = prop.name.toLowerCase();
    acc[key] = prop.values;
    return acc;
  }, {});

  const updatedProduct = await db.product.update({
    where: { id: parseInt(params.id) },
    data: {
      name: body.title,
      description: body.description,
      brand: body.productBrand,
      price: body.price,
      properties: {
        update: { ...formattedProperties },
      },
      images: {
        update: body.images.map((image: Image) => ({
          url: image.url,
        })),
      },
    },
  });

  if (!updatedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(updatedProduct);
}

export async function POST(request: NextRequest) {}
