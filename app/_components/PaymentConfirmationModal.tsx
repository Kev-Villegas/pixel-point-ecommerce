"use client";

import { CheckCircle, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { ShippingAddressForm } from "./ShippingAddressForm";

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function PaymentConfirmationModal({
  isOpen,
  onClose,
}: PaymentConfirmationModalProps) {
  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative z-50 mx-4 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-balance text-2xl font-bold text-foreground">
              Solo nos falta tu domicilio
            </h1>
            <p className="text-sm text-muted-foreground">
              Recuerda que los datos que ingreses aquí son los datos que
              ingresaremos a Correo Argentino para hacer tu envío.
            </p>
          </div>

          <ShippingAddressForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
