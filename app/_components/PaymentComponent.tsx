import { useCartStore } from "@/store/useCartStore";
import useDeviceStore from "@/store/useDeviceIdStore";
import { Brand, initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Card } from "./ui/card";

interface PaymentComponentProps {
  onPaymentStart?: () => void;
  onPaymentComplete?: (data: {
    id: string;
    status: string;
    orderId?: string;
  }) => void;
}

export default function PaymentComponent({
  onPaymentStart,
  onPaymentComplete,
}: PaymentComponentProps = {}) {
  const router = useRouter();
  const { cartProducts } = useCartStore();
  const deviceId = useDeviceStore((state) => state.deviceId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);
    }
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
      hideFormTitle: true,
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
    const headers = { "X-meli-session-id": deviceId };

    if (
      selectedPaymentMethod === "wallet_purchase" ||
      selectedPaymentMethod === "onboarding_credits"
    ) {
      // MercadoPago redirige automaticamente a init_point
      return;
    }

    onPaymentStart?.();
    const payload = {
      cart: cartProducts,
      total: totalAmount,
    };

    const order = await axios.post("/api/orders", payload);
    const orderId = order.data.id.toString();

    try {
      const preferenceResponse = await axios.put(`/api/checkout/preferences`, {
        id: preferenceId,
        cart: cartProducts,
        external_reference: orderId,
        payer: {
          email: formData.payer?.email,
        },
        metadata: {
          user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          timezone:
            typeof Intl !== "undefined"
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : "unknown",
          orderId,
        },
      });

      const completePreference = preferenceResponse.data.response;

      const paymentPayload = {
        ...formData,
        three_d_secure_mode: "optional",
        external_reference: completePreference.external_reference,
        statement_descriptor: completePreference.statement_descriptor,
        notification_url: completePreference.notification_url,
        metadata: {
          ...formData.metadata,
          ...completePreference.metadata,
        },
        additional_info: {
          items: (completePreference.items || []).map((item: any) => ({
            id: item.id,
            unit_price: item.unit_price,
            quantity: item.quantity,
            title: item.title,
            picture_url: item.picture_url,
            category_id: item.category_id,
            description: item.description,
          })),
          payer: completePreference.payer
            ? {
                first_name: completePreference.payer.first_name,
                last_name: completePreference.payer.last_name,
                phone: completePreference.payer.phone,
                address: completePreference.payer.address,
              }
            : undefined,
        },
      };

      const response = await axios.post("/api/checkout", paymentPayload, {
        headers,
      });

      if (onPaymentComplete) {
        onPaymentComplete({
          id: response.data.id,
          status: response.data.status,
          orderId: orderId,
        });
      } else {
        if (response.data?.status === "approved") {
          router.replace(
            `/checkout/payment/status?id=${response.data.id}&orderId=${orderId}&ok`,
          );
        } else {
          router.replace(
            `/checkout/payment/status?id=${response.data.id}&orderId=${orderId}`,
          );
        }
      }
    } catch (err) {
      console.error(err);
      if (onPaymentComplete) {
        onPaymentComplete({
          id: "",
          status: "error",
          orderId: undefined,
        });
      }
    }
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    console.log("Payment Brick is ready");
  };

  useEffect(() => {
    if (!deviceId || !preferenceId) return;
    try {
      fetch("/api/checkout/preferences/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferenceId, deviceId }),
      }).catch((e) => console.warn("Failed to send device id", e));
    } catch (e) {
      console.warn("Failed to send device id", e);
    }
  }, [deviceId, preferenceId]);

  return (
    <Card className="min-h-[515px] shadow-md">
      <Brand />
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </Card>
  );
}
