import { db } from "@/app/_lib/prisma";
import { generateCode } from "@/app/_utils/generateCode";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  const normalizedEmail = email.trim().toLowerCase();

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;

  if (!BREVO_API_KEY || !FROM_EMAIL) {
    throw new Error(
      "Faltan las variables de entorno BREVO_API_KEY o FROM_EMAIL",
    );
  }

  const code = generateCode(6);
  const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

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

    if (user.codeExpiresAt && user.codeExpiresAt > new Date()) {
      return NextResponse.json(
        { error: "Ya tenés un código vigente. Revisá tu correo." },
        { status: 429 },
      );
    }

    await db.user.update({
      where: { email: normalizedEmail },
      data: {
        verificationCode: code,
        codeExpiresAt,
      },
    });

    const htmlContent = `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: auto; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0; background-color: #ffffff;">
    <h2 style="color: #333333;">Verificá tu cuenta en <span style="color: #4F46E5;">Pixel Point</span></h2>
    <p>Gracias por registrarte 🙌</p>
    <p>Tu código de verificación es:</p>
    <div style="margin: 20px 0;">
      <h1 style="color: #4F46E5; font-size: 36px; letter-spacing: 6px; text-align: center;">${code}</h1>
    </div>
    <p>Este código vence en <strong>10 minutos</strong>.</p>
    <p style="color: #666666; font-size: 14px;">Si no fuiste vos, podés ignorar este mensaje.</p>
  </div>
`;

    const payload = {
      sender: {
        name: "Pixel Point",
        email: FROM_EMAIL,
      },
      to: [
        {
          email,
        },
      ],
      replyTo: {
        email: FROM_EMAIL,
        name: "Soporte Pixel Point",
      },
      subject: "Confirmá tu correo - Pixel Point",
      htmlContent,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    console.log(
      "Código enviado a:",
      email,
      "ID:",
      response.data.messageId || response.data,
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error enviando el correo" },
      { status: 500 },
    );
  }
}
