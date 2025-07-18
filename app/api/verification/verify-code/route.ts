import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    if (
      !user.verificationCode ||
      !user.codeExpiresAt ||
      user.verificationCode !== code ||
      user.codeExpiresAt < new Date()
    ) {
      return NextResponse.json(
        { error: "Código inválido o expirado" },
        { status: 401 },
      );
    }

    await db.user.update({
      where: { email: normalizedEmail },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        codeExpiresAt: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error verificando el código" },
      { status: 500 },
    );
  }
}
