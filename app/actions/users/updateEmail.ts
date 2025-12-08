"use server";

import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { z } from "zod";

const updateEmailSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Email inválido")
    .refine((email) => !email.endsWith(".con"), {
      message: "El correo electrónico no parece válido (verifica '.con').",
    }),
});

export const updateEmail = async (newEmail: string) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return { error: "No autorizado" };
    }

    const result = updateEmailSchema.safeParse({ email: newEmail });

    if (!result.success) {
      return { error: result.error.issues[0].message };
    }

    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return { error: "Usuario no encontrado" };
    }

    if (currentUser.emailVerified) {
      return {
        error: "No puedes cambiar tu correo electrónico una vez verificado.",
      };
    }

    // Check if new email is already taken
    const existingUser = await db.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      return { error: "Este correo electrónico ya está en uso." };
    }

    await db.user.update({
      where: { id: currentUser.id },
      data: {
        email: newEmail,
        // Reset verification status if needed, though relying on 'emailVerified' being null is enough.
        // If the user was somehow verified (which we block above), we would reset it.
        // Since we blocked verified users, we are updating an unverified user.
        // We should ensure it STAYS unverified or re-trigger verification logic if implemented.
        emailVerified: null,
      },
    });

    // Optionally trigger verification email here if the system expects it immediately
    // For now, consistent with SignUp, we might want to call the verification API
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail }),
    });

    return {
      success:
        "Correo electrónico actualizado. Por favor verifica tu nuevo correo.",
    };
  } catch (error) {
    console.error("Error updating email:", error);
    return { error: "Error interno del servidor al actualizar el correo." };
  }
};
