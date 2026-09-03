import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import { db } from "@/app/_lib/prisma";
import { sendServerEvent } from "@/app/_lib/fb-conversion-api";

/**
 * Valida la firma HMAC-SHA256 que Mercado Pago manda en el header `x-signature`.
 *
 * El header viene con la forma `ts=<timestamp>,v1=<hash>` y el hash se calcula
 * sobre el manifest `id:<data.id>;request-id:<x-request-id>;ts:<ts>;`, usando
 * la clave secreta del webhook configurada en el panel de MP.
 */
function isValidSignature(req: NextRequest, dataId: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;

  if (!secret) {
    console.error(
      "Falta MP_WEBHOOK_SECRET: se rechazan todas las notificaciones.",
    );
    return false;
  }

  const xSignature = req.headers.get("x-signature");
  const xRequestId = req.headers.get("x-request-id");

  if (!xSignature) return false;

  let ts = "";
  let v1 = "";

  for (const part of xSignature.split(",")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;

    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();

    if (key === "ts") ts = value;
    else if (key === "v1") v1 = value;
  }

  if (!ts || !v1) return false;

  // MP arma el manifest con el id en minusculas y omite las claves ausentes
  let manifest = `id:${dataId.toLowerCase()};`;
  if (xRequestId) manifest += `request-id:${xRequestId};`;
  manifest += `ts:${ts};`;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(v1, "hex");

  // timingSafeEqual explota si difieren los largos, asi que lo chequeamos antes
  if (expectedBuffer.length !== receivedBuffer.length) return false;

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(req: NextRequest) {
  // El id firmado viaja en el query string, no en el body
  const signedDataId =
    req.nextUrl.searchParams.get("data.id") ??
    req.nextUrl.searchParams.get("id");

  if (!signedDataId || !isValidSignature(req, signedDataId)) {
    console.warn(
      `Notificacion rechazada por firma invalida (data.id=${signedDataId})`,
    );
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const payment = new Payment(client);

  try {
    const body = await req.json();

    if (body.type === "payment") {
      // Usamos el id firmado, no el del body: el body no esta cubierto por la firma
      const paymentId = signedDataId;
      const data: any = await payment.get({ id: paymentId });

      // Recuperamos datos básicos
      const orderId =
        data.metadata?.order_id ||
        data.metadata?.orderId ||
        data.external_reference;

      const paid = data.status === "approved";

      const payerEmail = data.payer?.email;
      const deviceId =
        data.metadata?.device_id ||
        data.additional_info?.device?.id ||
        data.additional_info?.items?.[0]?.device_id;

      console.log(
        `Webhook payment ${paymentId} status=${data.status} orderId=${orderId} payer=${payerEmail} device=${deviceId}`,
      );

      if (!orderId) {
        console.warn("No se encontró order_id en metadata del pago", paymentId);
      }

      if (orderId && paid) {
        // 1. Actualización de Base de Datos
        // MP reintenta y manda varias notificaciones por el mismo pago, asi que
        // condicionamos el update a `paid: false`. Al ser un unico UPDATE
        // atomico, solo la primera notificación entra: las demás cuentan 0 y
        // cortan acá, evitando descontar stock dos veces.
        const { count } = await db.order.updateMany({
          where: { id: Number(orderId), paid: false },
          data: {
            paid: true,
            status: "ENVIO_PENDIENTE",
            paymentId: String(paymentId),
          },
        });

        if (count === 0) {
          console.log(
            `Orden ${orderId} ya estaba procesada, se ignora la notificación repetida.`,
          );
          return new NextResponse(null, { status: 204 });
        }

        const orderItems = await db.orderItem.findMany({
          where: { orderId: Number(orderId) },
          select: { productId: true, quantity: true },
        });

        await Promise.all(
          orderItems.map((item: any) =>
            db.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            }),
          ),
        );

        console.log(
          `Orden ${orderId} marcada como pagada y stock actualizado.`,
        );

        // ---------------------------------------------------------------------
        // 🚀 2. INTEGRACIÓN META CAPI (PURCHASE)
        // ---------------------------------------------------------------------
        try {
          // Usamos los items de la DB para informar a Facebok qué productos se vendieron
          const contentIds = orderItems.map((item: any) =>
            String(item.productId),
          );

          // Recuerda: En el paso anterior guardamos la IP y UA en la metadata de MP
          const userIp = data.metadata?.ip_address;
          const userAgent = data.metadata?.user_agent;

          await sendServerEvent(
            "Purchase",
            {
              value: data.transaction_amount, // Monto real pagado
              currency: "ARS",
              contentIds: contentIds,
            },
            {
              email: payerEmail,
              firstName: data.payer?.first_name,
              lastName: data.payer?.last_name,
              phone: data.payer?.phone?.number,
              // Estos dos son vitales y vienen de la metadata que inyectamos antes
              ip: userIp,
              userAgent: userAgent,
            },
            String(orderId), // 🔑 DEDUPLICACIÓN: Mismo ID que usas en el Frontend
          );
          console.log(
            `✅ Evento Purchase enviado a Meta para Orden #${orderId}`,
          );
        } catch (metaError) {
          // Usamos try/catch anidado para que si falla Facebook, NO afecte a tu lógica de DB
          console.error(
            "⚠️ Error enviando evento a Meta (No crítico):",
            metaError,
          );
        }
        // ---------------------------------------------------------------------
      } else if (orderId && data.status === "pending") {
        // El filtro `paid: false` evita que una notificación que llega fuera de
        // orden revierta una orden que ya se cobró.
        await db.order.updateMany({
          where: { id: Number(orderId), paid: false },
          data: { status: "PAGO_PENDIENTE" },
        });
        console.log(`Orden ${orderId} marcada como PAGO_PENDIENTE (pending).`);
      } else if (orderId && data.status === "rejected") {
        await db.order.updateMany({
          where: { id: Number(orderId), paid: false },
          data: { paid: false, status: "PAGO_PENDIENTE" },
        });
        console.log(`Orden ${orderId} con pago rechazado.`);
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
