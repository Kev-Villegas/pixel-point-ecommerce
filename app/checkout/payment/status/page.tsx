"use client";

import { Suspense } from "react";
import PaymentStatus from "@/app/_components/PaymentStatus";

export default function StatusPage() {
  return (
    <Suspense fallback={<div>Cargando estado del pago...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}
