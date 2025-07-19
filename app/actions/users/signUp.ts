"use server";
import bcrypt from "bcryptjs";
import { db } from "@/app/_lib/prisma";
import { userRegisterSchema } from "@/app/_schemas/validationSchemas";

export const signUp = async (
  email: string,
  password: string,
  name: string,
  lastname: string,
) => {
  try {
    email = email.trim().toLowerCase();

    const result = userRegisterSchema.safeParse({
      email,
      password,
      confirmPassword: password,
      name,
      lastname,
    });

    if (!result.success) {
      return { error: "Datos inválidos" };
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return { error: "El usuario ya existe" };

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name: `${name} ${lastname}`,
        email,
        passwordHash,
        verificationCode: null,
        codeExpiresAt: null,
        emailVerified: null,
      },
    });

    await db.shipmentData.create({
      data: {
        userId: newUser.id,
        phoneNumber: "",
        streetName: "",
        streetNumber: "",
        province: "",
        city: "",
        postalCode: "",
        apartment: "",
        floor: "",
      },
    });

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return {
      success:
        "Usuario creado exitosamente. Revisá tu correo para validar la cuenta.",
    };
  } catch (error) {
    console.error("Error en signUp:", error);
    return { error: "Ocurrió un error al registrar el usuario." };
  }
};
