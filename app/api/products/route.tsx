import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Image = {
  url: string;
};

export async function GET(request: NextRequest) {
  const products = await db.product.findMany();

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  // const { title, description, price, images, category, properties } = req.body
  const body = await request.json();
  const product = await db.product.create({
    data: {
      name: body.title,
      description: body.description,
      brand: body.productBrand,
      price: body.price,
      images: {
        create: body.images.map((image: Image) => ({
          url: image.url,
        })),
      },
    },
  });

  return NextResponse.json(product, { status: 201 });
}
