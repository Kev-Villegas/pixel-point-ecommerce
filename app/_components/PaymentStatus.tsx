"use client";

import { initMercadoPago, StatusScreen } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";
import { fbq } from "@/app/_utils/pixel";
import PaymentConfirmationModal from "@/app/_components/PaymentConfirmationModal";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

interface PaymentStatusProps {
  paymentId?: string;
  isApproved?: boolean;
  inModal?: boolean;
}

export default function PaymentStatus({
  paymentId: propPaymentId,
  isApproved: propIsApproved,
  inModal = false,
}: PaymentStatusProps = {}) {
  const searchParams = useSearchParams();
  const { cartProducts, clearCart } = useCartStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFiredRef = useRef(false);

  const paymentId = propPaymentId || (searchParams.get("id") as string);
  const isApproved =
    propIsApproved !== undefined ? propIsApproved : searchParams.has("ok");

  // Obtenemos el orderId de la URL (asegurate de que tu backend redirija con ?orderId=...)
  const orderId = searchParams.get("orderId");

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
    // Solo disparamos si está aprobado, no se disparó antes, Y TENEMOS ORDER ID
    if (isApproved && !hasFiredRef.current && orderId) {
      hasFiredRef.current = true;

      setIsModalOpen(true);

      // ---------------------------------------------------------
      // 🔥 ACÁ ESTÁ LA CLAVE DE LA DEDUPLICACIÓN
      // ---------------------------------------------------------
      fbq(
        "track",
        "Purchase",
        {
          value: totalAmount,
          currency: "ARS",
          contents: cartProducts.map((p) => ({
            id: p.id,
            quantity: p.quantity,
            item_price: p.price,
          })),
          content_ids: cartProducts.map((p) => p.id), // Recomendado agregar esto
          content_type: "product",
        },
        // 👇 ESTE TERCER ARGUMENTO ES EL QUE VINCULA CON EL SERVIDOR
        { eventID: orderId.toString() },
      );
      // ---------------------------------------------------------

      clearCart();
    }
  }, [isApproved, totalAmount, cartProducts, clearCart, orderId]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onError = (err: any) => console.log(err);

  const statusContent = (
    <>
      <PaymentConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderId={orderId ? parseInt(orderId) : null}
      />
      <StatusScreen
        initialization={initialization}
        customization={customization}
        onError={onError}
      />
    </>
  );

  if (inModal) {
    return statusContent;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-lg bg-white">
        <CardContent className="p-0 text-center">{statusContent}</CardContent>
      </Card>
    </div>
  );
}
