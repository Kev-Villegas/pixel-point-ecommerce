"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/verification/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Cuenta verificada con éxito");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error(data.error || "Código inválido");
      }
    } catch (err) {
      toast.error("Algo salió mal");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await fetch("/api/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Código Enviado");
      } else {
        // toast.error("Error enviando código");
      }
    } catch (err) {
      toast.error("Error enviando código");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="relative w-full max-w-md shadow-xl">
        {/* Botón cerrar */}
        <button
          onClick={() => router.push("/")}
          className="absolute right-3 top-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <CardHeader>
          <CardTitle className="text-xl">Verificá tu cuenta</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Ingresá el código que te enviamos a <strong>{email}</strong>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Código de verificación"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verificando..." : "Verificar"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={handleResendCode}
              className="text-sm text-muted-foreground"
            >
              ¿No recibiste el código? Reenviar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
