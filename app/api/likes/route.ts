import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

// Ruta GET: Obtiene los productos "likeados" por el usuario
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ likedProductIds: [] }, { status: 200 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      likes: {
        select: { productId: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 },
    );
  }

  const likedProductIds = user.likes.map((like) => like.productId);

  return NextResponse.json({ likedProductIds });
}

// Ruta POST: Crea un "like" para un producto
export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 },
    );
  }
  const body = await req.json();
  const { FavoriteProduct } = body;

  try {
    const like = await db.like.create({
      data: {
        userId: user.id,
        productId: FavoriteProduct,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    console.error("Error creando like:", error);
    return NextResponse.json(
      { error: "Ya existe el like o error" },
      { status: 400 },
    );
  }
}
