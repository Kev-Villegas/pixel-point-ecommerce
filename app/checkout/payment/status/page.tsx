"use client";
import PaymentConfirmationModal from "@/app/_components/PaymentConfirmationModal";
import PaymentStatus from "@/app/_components/PaymentStatus";
import { Card, CardContent } from "@/app/_components/ui/card";
import { fbq } from "@/app/_utils/pixel";
import { useCartStore } from "@/store/useCartStore";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function StatusPage() {
  const { cartProducts, clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFiredRef = useRef(false);
  const totalAmount = useMemo(() => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }, [cartProducts]);

  useEffect(() => {
    const isApproved = searchParams.has("ok");

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
  }, [searchParams]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <PaymentConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Card className="min-h-96 w-full max-w-lg bg-white">
        <CardContent className="p-0 text-center">
          <PaymentStatus key="payment-status" />
        </CardContent>
      </Card>
    </div>
  );
}
