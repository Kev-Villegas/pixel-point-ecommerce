import { getClientContext } from "@/app/_lib/getClientContext";
import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { cart, orderId, payer, shipments, metadata } = await request.json();

  const { ip, userAgent } = getClientContext(request);

  const body: any = {
    items: cart.map((item: any) => ({
      id: item.id,
      unit_price: item.price,
      quantity: item.quantity,
      title: item.name,
      description: item.description,
      picture_url: item.images[0].url,
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
      ip_address: ip,
      user_agent: userAgent,
      ...(metadata || {}), // Merge additional metadata if provided
    },
  };

  // Agregar información del payer si está disponible
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

  // Agregar información de shipments si está disponible
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
