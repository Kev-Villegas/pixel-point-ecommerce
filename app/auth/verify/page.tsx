"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { verifyToken } from "@/app/actions/users/verifyToken";
import { Button } from "@/app/_components/ui/button";
import { Loader2 } from "lucide-react";

const VerifyContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token no encontrado");
      return;
    }

    verifyToken(token)
      .then((res) => {
        if (res.error) {
          setStatus("error");
          setMessage(res.error);
        } else {
          setStatus("success");
          setMessage(res.success || "Cuenta verificada!");
          setTimeout(() => {
            router.push("/auth/signin");
          }, 3000);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Ocurrió un error inesperado");
      });
  }, [token, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 text-center shadow-sm">
        {status === "verifying" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-medium">Verificando tu cuenta...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-700">
              ¡Verificación Exitosa!
            </h2>
            <p className="text-gray-600">
              Tu cuenta ha sido confirmada. Redirigiendo al login...
            </p>
            <Button onClick={() => router.push("/auth/signin")}>
              Ir al Login ahora
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-700">
              Error de Verificación
            </h2>
            <p className="text-gray-600">{message}</p>
            <Button
              variant="outline"
              onClick={() => router.push("/auth/signin")}
            >
              Volver al inicio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
