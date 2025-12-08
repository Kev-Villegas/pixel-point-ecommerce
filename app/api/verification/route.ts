import { db } from "@/app/_lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";
import crypto from "crypto"; // Importación estándar

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // URL de tu Webhook de Make (Obtenla al activar el escenario)
  const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

  if (!MAKE_WEBHOOK_URL) {
    throw new Error("Falta la variable de entorno MAKE_WEBHOOK_URL");
  }

  // Lógica de Token y Base de Datos (Se mantiene igual)
  const code = crypto.randomBytes(32).toString("hex");
  const codeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

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

    await db.user.update({
      where: { email: normalizedEmail },
      data: {
        verificationCode: code,
        codeExpiresAt,
      },
    });

    // Construimos el link (pero NO el HTML, eso lo hace Make)
    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/auth/verify?token=${code}`;

    // --- CAMBIO PRINCIPAL: Llamada al Webhook de Make ---
    // Solo enviamos los datos puros. Make se encarga del diseño (HTML) y envío.

    await axios.post(MAKE_WEBHOOK_URL, {
      email: normalizedEmail,
      verificationLink: verificationLink,
    });

    console.log("Datos enviados al Webhook de Make para:", email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en el proceso de verificación:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 },
    );
  }
}
