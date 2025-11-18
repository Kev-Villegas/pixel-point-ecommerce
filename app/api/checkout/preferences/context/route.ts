import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import { getClientContext } from "@/app/_lib/getClientContext";

export async function POST(req: NextRequest) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN as string,
  });
  const preference = new Preference(client);
  const { preferenceId, deviceId } = await req.json();

  if (!preferenceId)
    return NextResponse.json(
      { ok: false, error: "missing preferenceId" },
      { status: 400 },
    );

  const { ip, userAgent } = getClientContext(req);

  const updatePreferenceRequest = {
    metadata: {
      device_id: deviceId || undefined,
      ip_address: ip,
      user_agent: userAgent,
      context_updated_at: new Date().toISOString(),
    },
  } as any;

  try {
    await preference.update({ id: preferenceId, updatePreferenceRequest });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error updating preference context:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    );
  }
}
