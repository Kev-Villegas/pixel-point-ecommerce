import crypto from "crypto";

// 1. Definimos las formas de los datos (Interfaces)
interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  ip?: string;
  userAgent?: string;
  [key: string]: any; // Permite propiedades extra si las necesitas
}

interface EventData {
  value?: number;
  currency?: string;
  contentIds?: string[];
  [key: string]: any;
}

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_CONVERSION_API_TOKEN;

// 2. Función Helper para hashear (Tipada)
// Recibe string o undefined, devuelve string o null
const hashData = (input: string | undefined): string | null => {
  if (!input) return null;
  const cleanString = input.trim().toLowerCase();
  return crypto.createHash("sha256").update(cleanString).digest("hex");
};

// 3. Función Principal (Tipada)
export async function sendServerEvent(
  eventName: string,
  eventData: EventData,
  userData: UserData,
  eventId: string,
) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn("Faltan credenciales de Meta (Pixel ID o Token) en .env");
    return;
  }

  const currentTimestamp = Math.floor(new Date().getTime() / 1000);

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: currentTimestamp,
        action_source: "website",
        event_id: eventId,
        event_source_url: "https://pixel-point.com.ar", // Tu dominio real
        user_data: {
          em: userData.email ? [hashData(userData.email)] : [],
          ph: userData.phone ? [hashData(userData.phone)] : [],
          fn: userData.firstName ? [hashData(userData.firstName)] : [],
          ln: userData.lastName ? [hashData(userData.lastName)] : [],
          client_ip_address: userData.ip || null,
          client_user_agent: userData.userAgent || null,
        },
        custom_data: {
          currency: eventData.currency || "ARS",
          value: eventData.value,
          content_ids: eventData.contentIds || [],
          content_type: "product",
        },
      },
    ],
    // Descomentar para probar en Events Manager > Test Events
    // test_event_code: "TESTxxxxx",
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error respuesta Meta:", errorData);
      return null;
    }

    const data = await response.json();
    console.log("Evento enviado a Meta CAPI exitosamente");
    return data;
  } catch (error) {
    console.error("Error de red enviando a Meta CAPI:", error);
    return null;
  }
}
