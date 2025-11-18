import { useCartStore } from "@/store/useCartStore";
import useDeviceStore from "@/store/useDeviceIdStore";
import { Brand, initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Card } from "./ui/card";

export default function PaymentComponent() {
  const router = useRouter();
  const { cartProducts, clearCart } = useCartStore();
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

  // TODO mejorar el submit
  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    console.log(formData);
    console.log(selectedPaymentMethod);

    const headers = { "X-meli-session-id": deviceId };

    try {
      await axios.put(`/api/checkout/preferences`, {
        id: preferenceId,
        cart: cartProducts,
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
        },
      });

      const response = await axios.post("/api/checkout", formData, { headers });
      if (response.data?.status === "approved") {
        clearCart();
      }
      router.push(`/checkout/payment/status?id=${response.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    console.log("Payment Brick is ready");
  };

  // Send deviceId to server once available and preferenceId is present (fire-and-forget)
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
    <Card className="min-h-[500px] p-2 shadow-md">
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
