"use client";

import { CheckCircle, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";

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
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-50 mx-4 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="space-y-6 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-balance text-3xl font-bold text-foreground">
              ¡Pago Recibido!
            </h1>
            <p className="text-lg text-muted-foreground">
              Tu pago ha sido procesado exitosamente
            </p>
          </div>

          {/* Email Notice */}
          <div className="space-y-3 rounded-lg bg-muted/50 p-6">
            <div className="flex justify-center">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <p className="leading-relaxed text-foreground">
              En los próximos minutos recibirás un{" "}
              <span className="font-semibold">correo electrónico</span> donde
              podrás ingresar tu domicilio de envío y completar tu compra.
            </p>
            <p className="text-sm text-muted-foreground">
              Por favor, revisa tu bandeja de entrada y spam.
            </p>
          </div>

          {/* Action Button */}
          <div className="space-y-4">
            <Button className="w-full" size="lg" onClick={onClose}>
              Entendido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
