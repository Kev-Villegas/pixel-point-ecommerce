"use client";

import { initMercadoPago, StatusScreen } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";
import { fbq } from "@/app/_utils/pixel";
import PaymentConfirmationModal from "@/app/_components/PaymentConfirmationModal";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const { cartProducts, clearCart } = useCartStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFiredRef = useRef(false);

  const paymentId = searchParams.get("id") as string;
  const isApproved = searchParams.has("ok");

  const initialization = { paymentId };

  const customization = {
    backUrls: {
      error: `${process.env.NEXT_PUBLIC_URL}`,
      return: process.env.NEXT_PUBLIC_URL,
    },
    visual: { showExternalReference: true },
  };

  const totalAmount = useMemo(() => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }, [cartProducts]);

  useEffect(() => {
    if (isApproved && !hasFiredRef.current) {
      hasFiredRef.current = true;

      setIsModalOpen(true);

      fbq("track", "Purchase", {
        value: totalAmount,
        currency: "ARS",
        contents: cartProducts.map((p) => ({
          id: p.id,
          quantity: p.quantity,
          item_price: p.price,
        })),
        content_type: "product",
      });

      clearCart();
    }
  }, [isApproved, totalAmount, cartProducts, clearCart]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onError = (err: any) => console.log(err);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <PaymentConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Card className="min-h-96 w-full max-w-lg bg-white">
        <CardContent className="p-0 text-center">
          <StatusScreen
            initialization={initialization}
            customization={customization}
            onError={onError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
