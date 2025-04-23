"use client";
import PaymentStatus from "@/app/_components/PaymentStatus";
import { Suspense } from "react";

export default function StatusPage() {
  return (
    <Suspense fallback={<div>Cargando estado del pago...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}
