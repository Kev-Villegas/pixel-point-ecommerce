import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. Autenticamos al usuario
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    // Si no hay usuario, devolvemos un array vacío (200 OK)
    return NextResponse.json([], { status: 200 });
  }

  // 2. Buscamos todos los likes de ese usuario e incluimos el producto
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

  // 3. Formateamos los productos para enviar la misma forma que en /api/products
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
    likedByUser: true, // Siempre true aquí
  }));

  return NextResponse.json(favorites);
}
