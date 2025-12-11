import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { formatPropertiesForPrisma } from "@/app/_utils/productHelpers";
import axios from "axios";
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
  const session = await auth();

  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const params = await props.params;
  const body = await request.json();

  // Convert array to object first
  const rawProperties = body.properties.reduce((acc: any, prop: any) => {
    acc[prop.name] = prop.values;
    return acc;
  }, {});

  const formattedProperties = formatPropertiesForPrisma(rawProperties);

  const updatedProduct = await db.product.update({
    where: { id: parseInt(params.id) },
    data: {
      name: body.title,
      description: body.description,
      brand: body.productBrand,
      price: body.price,
      stock: body.stock,
      properties: {
        delete: {},
        create: formattedProperties,
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
  const session = await auth();

  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const params = await props.params;

  const product = await db.product.findUnique({
    where: { id: parseInt(params.id) },
    include: { images: true },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  for (const image of product.images) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/images`, {
        params: { url: image.url },
      });
    } catch (error) {
      console.error(
        `Error deleting image from Cloudinary: ${image.url}`,
        error,
      );
    }
  }

  await db.product.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({}, { status: 200 });
}
