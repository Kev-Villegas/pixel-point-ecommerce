import { useCartStore } from "@/store/useCartStore";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

type PayloadType = {
  statement_descriptor: string;
  notification_url: string;
  metadata: {
    [key: string]: any;
  };
  payer: {
    name: string;
    surname: string;
    phone: {
      area_code: string;
      number: string;
    };
    address: {
      postalCode: string;
      street_name: string;
      street_number: number;
    };
  };
  shipments: {
    receiver_address: {
      postalCode: string;
      street_name: string;
      street_number: number;
      floor?: string;
      apartment?: string;
    };
  };
};

export default function PaymentComponent() {
  const router = useRouter();
  const { cartProducts } = useCartStore();
  const [payload, setPayload] = useState<PayloadType | null>(null);
  const deviceIdRef = useRef<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("preference");
    if (data) {
      const parsedData = JSON.parse(data);
      setPayload(parsedData);
    }
    localStorage.removeItem("preference");

    // ------------------------------------------------------------
    // <script src="https://www.mercadopago.com/v2/security.js" view="checkout"></script>
    const script = document.createElement("script");
    script.src = "https://www.mercadopago.com/v2/security.js";
    script.setAttribute("view", "checkout");
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      const checkDeviceId = () => {
        const id = (window as any).MP_DEVICE_SESSION_ID;
        if (id) {
          console.log("✅ Device ID listo:", id);
          // setDeviceId(id);
          deviceIdRef.current = id;
          console.log("Usando deviceId:", deviceIdRef.current);
        } else {
          console.log("⏳ Esperando Device ID...");
          setTimeout(checkDeviceId, 100);
        }
      };
      checkDeviceId();
    };

    // Limpieza por si salís de la página
    return () => {
      document.body.removeChild(script);
    };
    // ------------------------------------------------------------
  }, []);

  const getTotalOrderPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  const searchParams = useSearchParams();
  const preferenceId = searchParams.get("preference") as string;

  const initialization = {
    amount: getTotalOrderPrice(),
    preferenceId: preferenceId,
  };

  const customization: IPaymentBrickCustomization = {
    visual: {
      style: {
        theme: "default",
      },
    },
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      prepaidCard: "all",
      mercadoPago: "all",
    } as any,
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    if (!payload) {
      console.error("No hay payload, no se puede continuar con el pago.");
      return;
    }

    const formToSend = {
      ...formData,
      // three_d_secure_mode: 'optional',
      statement_descriptor: payload.statement_descriptor,
      notification_url: payload.notification_url,
      metadata: payload.metadata,
      additional_info: {
        items: cartProducts.map((item: any) => ({
          id: item.id,
          unit_price: item.price,
          quantity: item.quantity,
          title: item.name,
          picture_url: item.images[0].url,
          category_id: item.brand,
        })),
        payer: {
          first_name: payload.payer.name,
          last_name: payload.payer.surname,
          phone: {
            area_code: payload.payer.phone.area_code,
            number: payload.payer.phone.number,
          },
          address: {
            zip_code: payload.payer.address.postalCode,
            street_name: payload.payer.address.street_name,
            street_number: payload.payer.address.street_number,
          },
        },
        shipments: {
          receiver_address: {
            zip_code: payload.shipments.receiver_address.postalCode,
            street_number: payload.shipments.receiver_address.street_number,
            street_name: payload.shipments.receiver_address.street_name,
            floor: payload.shipments.receiver_address.floor,
            apartment: payload.shipments.receiver_address.apartment,
          },
        },
      },
    };

    const headers = {
      "X-meli-session-id": deviceIdRef.current, // Incluimos el device ID
    };

    return new Promise((resolve, reject) => {
      axios
        .post("/api/checkout", formToSend, { headers })
        .then((response) => {
          console.log("Response from server:", response.data);
          router.push(`/checkout/payment/status?id=${response.data.id}`);
        })
        .catch((error) => console.log(error));
    });
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    console.log("Payment Brick is ready");
  };

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
}
