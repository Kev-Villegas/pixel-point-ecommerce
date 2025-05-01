import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json([], { status: 200 });
  }

  const likes = await db.like.findMany({
    where: { user: { email } },
    include: {
      product: {
        include: {
          images: true,
          _count: { select: { likes: true } },
        },
      },
    },
  });

  const favorites = likes.map(({ product }) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    stock: product.stock,
    price: product.price,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    images: product.images,
    likeCount: product._count.likes,
    likedByUser: true,
  }));

  return NextResponse.json(favorites);
}
