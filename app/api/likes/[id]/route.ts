import { db } from "@/app/_lib/prisma";
import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: Params) {
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

  try {
    await db.like.delete({
      where: {
        userId_productId: {
          userId: user.id,
          productId: Number(params.id),
        },
      },
    });

    return NextResponse.json({ message: "Like eliminado" }, { status: 200 });
  } catch (error) {
    console.error("Error eliminando like:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el like" },
      { status: 400 },
    );
  }
}
