"use server";

import bcrypt from "bcryptjs";
import { db } from "@/app/_lib/prisma";
import { userRegisterSchema } from "@/app/_schemas/validationSchemas";

export const signUp = async (email: string, password: string) => {
  try {
    email = email.trim().toLowerCase();

    const result = userRegisterSchema.safeParse({
      email,
      password,
      confirmPassword: password,
    });

    if (!result.success) {
      return { error: "Datos inválidos." };
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "El usuario ya existe." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    return { success: "Usuario creado exitosamente." };
  } catch (error) {
    console.error("Error en signUp:", error);
    return { error: "Ocurrió un error al registrar el usuario." };
  }
};
