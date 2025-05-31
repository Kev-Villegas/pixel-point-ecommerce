import { useCartStore } from "@/store/useCartStore";
import useDeviceStore from "@/store/useDeviceIdStore";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  const { cartProducts, clearCart } = useCartStore();
  const [payload, setPayload] = useState<PayloadType | null>(null);
  const deviceId = useDeviceStore((state) => state.deviceId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);
    }

    const data = localStorage.getItem("preference");
    if (data) {
      const parsedData = JSON.parse(data);
      setPayload(parsedData);
    }
    localStorage.removeItem("preference");
  }, []);

  const totalAmount = useMemo(() => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }, [cartProducts]);

  const searchParams = useSearchParams();
  const preferenceId = searchParams.get("preference") as string;

  const initialization = {
    amount: totalAmount,
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
      three_d_secure_mode: "optional",
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

    const headers = { "X-meli-session-id": deviceId };

    return new Promise((resolve, reject) => {
      axios
        .post("/api/checkout", formToSend, { headers })
        .then((response) => {
          console.log("Response from server:", response.data);

          if (response.data.status === "approved") {
            clearCart();
          }

          // localStorage.setItem("paymentStatusData", JSON.stringify(response.data));
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
