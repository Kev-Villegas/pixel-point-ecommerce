"use server";

import { db } from "@/app/_lib/prisma";

export const verifyToken = async (token: string) => {
  if (!token) return { error: "Token inválido" };

  try {
    const user = await db.user.findFirst({
      where: { verificationCode: token },
    });

    if (!user) {
      return { error: "Token inválido o expirado" };
    }

    if (!user.codeExpiresAt || user.codeExpiresAt < new Date()) {
      return { error: "El enlace ha expirado. Solicitá uno nuevo." };
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        codeExpiresAt: null,
      },
    });

    return { success: "Cuenta verificada exitosamente" };
  } catch (error) {
    console.error("Error verifying token:", error);
    return { error: "Error al verificar la cuenta" };
  }
};
