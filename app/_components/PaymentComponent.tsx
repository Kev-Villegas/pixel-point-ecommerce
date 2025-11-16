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

    await axios
      .put(`/api/checkout/preferences`, {
        payer: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.payer.email,
        },
        id: preferenceId,
        cart: cartProducts,
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .post("/api/checkout", formData, { headers })
            .then((response) => {
              if (response.data.status === "approved") {
                clearCart();
              }

              router.push(`/checkout/payment/status?id=${response.data.id}`);
            })
            .catch((error) => console.log(error));
        });
      });
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    console.log("Payment Brick is ready");
  };

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
