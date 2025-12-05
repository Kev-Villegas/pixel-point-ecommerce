"use client";

import { Card } from "./ui/card";
import { Loader2 } from "lucide-react";
import PaymentComponent from "./PaymentComponent";
import PaymentStatus from "./PaymentStatus";

interface PaymentModalProps {
  paymentState: "idle" | "processing" | "completed";
  paymentData: { id: string; status: string; orderId?: string } | null;
  onPaymentStart: () => void;
  onPaymentComplete: (data: {
    id: string;
    status: string;
    orderId?: string;
  }) => void;
}

export default function PaymentModal({
  paymentState,
  paymentData,
  onPaymentStart,
  onPaymentComplete,
}: PaymentModalProps) {
  if (paymentState === "completed" && paymentData) {
    return (
      <PaymentStatus
        paymentId={paymentData.id}
        isApproved={paymentData.status === "approved"}
        inModal={true}
      />
    );
  }

  return (
    <Card className="max-h-[calc(90vh-2rem)] overflow-y-auto overflow-x-hidden rounded-lg shadow-md">
      {paymentState === "idle" && (
        <PaymentComponent
          onPaymentStart={onPaymentStart}
          onPaymentComplete={onPaymentComplete}
        />
      )}
      {paymentState === "processing" && (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-center text-gray-600">
            Procesando tu pago, por favor espera...
          </p>
        </div>
      )}
    </Card>
  );
}
