import { sendServerEvent } from "@/app/_lib/fb-conversion-api";
import { getClientContext } from "@/app/_lib/getClientContext";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);

  // 1. Recibimos 'metaData' (camelCase) que viene del Front con el eventId
  const { cart, orderId, payer, shipments, metadata, metaData } =
    await request.json();

  // 2. Usamos TU función existente para sacar la data técnica del request
  const { ip, userAgent: serverUserAgent } = getClientContext(request);

  // ---------------------------------------------------------------------------
  // 🚀 IMPLEMENTACIÓN META CAPI (InitiateCheckout)
  // ---------------------------------------------------------------------------
  try {
    const totalValue = cart.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    // Fire & Forget: No usamos await para no demorar la creación de la preferencia
    sendServerEvent(
      "InitiateCheckout",
      {
        value: totalValue,
        currency: "ARS",
        contentIds: cart.map((item: any) => item.id),
      },
      {
        email: payer?.email,
        phone: payer?.phone?.number,
        // Usamos la IP limpia que sacó tu función
        ip: ip,
        // Priorizamos el UserAgent del navegador (metaData) si existe, sino el del server
        userAgent: metaData?.userAgent || serverUserAgent,
      },
      metaData?.eventId, // <--- EL ID CLAVE PARA DEDUPLICAR
    );
  } catch (error) {
    console.error("⚠️ Error silencioso Meta CAPI:", error);
  }
  // ---------------------------------------------------------------------------

  const body: any = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      description: item.description,
      picture_url: item.images?.[0]?.url,
      category_id: item.brand,
    })),
    notification_url:
      "https://www.pixel-point.com.ar/api/checkout/notifications",
    statement_descriptor: "Pixel Point",
    back_urls: {
      failure: "https://www.pixel-point.com.ar",
      pending: "https://www.pixel-point.com.ar",
      success: "https://www.pixel-point.com.ar",
    },
    auto_return: "approved",
    external_reference: orderId,
    metadata: {
      orderId: orderId,
      created_from: payer ? "user-checkout" : "guest-checkout",
      ip_address: ip, // Guardamos la IP en MP por las dudas
      user_agent: serverUserAgent, // Guardamos el UA en MP
      ...(metadata || {}),
    },
  };

  // ... (El resto de tu lógica para payer y shipments queda igual) ...
  if (payer) {
    body.payer = {
      email: payer.email,
      phone: {
        area_code: payer.phone?.area_code || "",
        number: payer.phone?.number || "",
      },
      address: {
        zip_code: payer.address?.zip_code || "",
        street_name: payer.address?.street_name || "",
        street_number: payer.address?.street_number || null,
      },
    };
  }

  if (shipments) {
    body.shipments = {
      receiver_address: {
        zip_code: shipments.receiver_address?.zip_code || "",
        street_name: shipments.receiver_address?.street_name || "",
        street_number: shipments.receiver_address?.street_number || null,
        floor: shipments.receiver_address?.floor || "",
        apartment: shipments.receiver_address?.apartment || "",
        city_name: shipments.receiver_address?.city_name || null,
        state_name: shipments.receiver_address?.state_name || null,
      },
    };
  }

  const response = await preference.create({ body });
  return NextResponse.json({ response });
}

export async function PUT(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { id, cart, payer, metadata, external_reference } =
    await request.json();

  const updatePreferenceRequest: any = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      description: item.description,
      picture_url: item.images[0].url,
      category_id: item.brand,
    })),
  };

  if (external_reference) {
    updatePreferenceRequest.external_reference = external_reference;
  }

  if (payer) {
    updatePreferenceRequest.payer = {
      email: payer.email,
    };
  }

  if (metadata) {
    updatePreferenceRequest.metadata = metadata;
  }

  // Update the preference
  await preference.update({ id, updatePreferenceRequest });

  // Fetch the complete updated preference
  const completePreference = await preference.get({ preferenceId: id } as any);

  return NextResponse.json({ response: completePreference });
}
