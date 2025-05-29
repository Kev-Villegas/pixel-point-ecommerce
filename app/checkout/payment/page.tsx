"use client";
import dynamic from "next/dynamic";

const PaymentComponent = dynamic(
  () => import("@/app/_components/PaymentComponent"),
  {
    ssr: false,
    loading: () => <div>Cargando métodos de pago...</div>,
  },
);

export default function PaymentPage() {
  return <PaymentComponent />;
}
