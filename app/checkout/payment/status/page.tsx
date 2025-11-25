"use client";
import PaymentConfirmationModal from "@/app/_components/PaymentConfirmationModal";
import PaymentStatus from "@/app/_components/PaymentStatus";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// export default function StatusPage() {
//   return (
//     <Suspense fallback={<div>Cargando estado del pago...</div>}>
//       <PaymentStatus />
//     </Suspense>
//   );
// }

export default function StatusPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isApproved = searchParams.has("ok");
    if (isApproved) {
      setIsModalOpen(true);
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
          {/* Agregar una key estable para evitar re-renders */}
          <PaymentStatus key="payment-status" />
        </CardContent>
      </Card>
    </div>
  );
}
