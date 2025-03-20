import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const body = await request.json();

  const formattedProperties = body.properties.reduce((acc: any, prop: any) => {
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
        delete: {},
        create: { ...formattedProperties },
      },
      images: {
        deleteMany: {},
        create: body.images.map((image: { url: string }) => ({
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

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");

  // if (!id) {
  //   return NextResponse.json({ success: false, message: "ID not found" });
  // }

  const product = await db.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await db.product.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({}, { status: 200 });
}
