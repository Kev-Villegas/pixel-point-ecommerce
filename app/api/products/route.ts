import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Image = {
  url: string;
};

export async function GET(req: NextRequest) {
  const session = await auth();
  const userEmail = session?.user?.email;

  try {
    const products = await db.product.findMany({
      include: {
        images: true,
        _count: { select: { likes: true } },
        likes: userEmail
          ? { where: { user: { email: userEmail } }, select: { id: true } }
          : false,
      },
    });

    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      brand: p.brand,
      stock: p.stock,
      price: p.price,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      images: p.images,
      likeCount: p._count.likes,
      likedByUser: Array.isArray(p.likes) && p.likes.length > 0,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error obteniendo productos con likes:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await request.json();
  const formattedProperties = body.properties.reduce((acc: any, prop: any) => {
    const key = prop.name.toLowerCase();
    acc[key] = prop.values;
    return acc;
  }, {});

  try {
    const product = await db.product.create({
      data: {
        name: body.title,
        description: body.description,
        brand: body.productBrand,
        price: body.price,
        stock: body.stock,
        properties: { create: { ...formattedProperties } },
        images: {
          create: body.images.map((image: Image) => ({
            url: image.url,
          })),
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e: any) {
    const match = e.message.match(/Argument `.+` is missing\./);
    const errorMessage = match ? match[0] : e.message;

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
