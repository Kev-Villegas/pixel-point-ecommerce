// "use client";

import PaymentComponent from "@/app/_components/PaymentComponent";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    // <Suspense fallback={<div>Cargando metodos de pago...</div>}>
    <PaymentComponent />
    // </Suspense>
  );
}
