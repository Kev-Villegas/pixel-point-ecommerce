import { Button } from "@/app/_components/ui/button";
import { Card, CardTitle } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { Input } from "@/app/_components/ui/input";
import axios from "axios";
import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { fbq } from "@/app/_utils/pixel";
import { useSession } from "next-auth/react";
import { useUserInfoStore } from "@/store/useUserInfoStore";

interface CartOrderSummaryProps {
  cartProducts: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  getTotalOrderPrice: () => number;
}

export function CartOrderSummary({
  cartProducts,
  getTotalOrderPrice,
}: CartOrderSummaryProps) {
  const subtotal = getTotalOrderPrice();
  const total = subtotal;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const {
    phoneNumber,
    streetName,
    streetNumber,
    province,
    city,
    postalCode,
    apartment,
    floor,
    observations,
  } = useUserInfoStore();

  async function handlePayment(): Promise<void> {
    try {
      setLoading(true);
      fbq("track", "InitiateCheckout", {
        value: cartProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        currency: "ARS",
        contents: cartProducts.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      // Preparar el payload base
      const payload: any = {
        cart: cartProducts,
      };

      // Si hay sesión activa, agregar datos de payer y shipments
      if (session?.user) {
        payload.payer = {
          email: session.user.email || "",
          phone: {
            number: phoneNumber || "",
          },
          address: {
            zip_code: postalCode || "",
            street_name: streetName || "",
            street_number: streetNumber ? parseInt(streetNumber) : null,
          },
        };

        payload.shipments = {
          receiver_address: {
            zip_code: postalCode || "",
            street_name: streetName || "",
            street_number: streetNumber ? parseInt(streetNumber) : null,
            floor: floor || "",
            apartment: apartment || "",
            city_name: city || "",
            state_name: province || "",
          },
        };

        // Agregar observaciones a metadata si existen
        if (observations) {
          payload.metadata = {
            observations: observations,
          };
        }
      }

      const response = await axios.post("/api/checkout/preferences", payload);

      router.push(`/cart?preference=${response.data.response.id}`);
    } catch (error) {
      console.error("Error creating preference:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.4 }}
      className="h-min"
    >
      <Card className="p-6 shadow-sm">
        <CardTitle className="mb-6 text-xl font-semibold">
          Resumen de Compra
        </CardTitle>

        {/* Voucher Section */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Cupón de descuento"
              disabled
              className="rounded-full border-gray-300 bg-gray-50 px-4"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full border-gray-300 px-6 hover:bg-gray-50"
          >
            Aplicar
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toLocaleString("es-AR")}
            </span>
          </div>
          {/* <div className="flex justify-between text-gray-600">
            <span>Descuento (10%)</span>
            <span className="font-medium text-gray-900">
              -${discount.toLocaleString("es-AR")}
            </span>
          </div> */}
          <div className="flex justify-between text-gray-600">
            <span>Envío</span>
            <span className="font-medium text-gray-900">
              ${(0).toLocaleString("es-AR")}
            </span>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
        </div>

        {/* <div className="mt-6 flex gap-2 text-xs text-gray-500">
          <div className="mt-0.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p>
            Garantía limitada de 90 días contra defectos de fabricación{" "}
            <a href="#" className="underline">
              Detalles
            </a>
          </p>
        </div> */}

        <Button
          className="mt-6 w-full rounded-full bg-black py-6 text-base font-medium text-white hover:bg-gray-800"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Finalizar Compra"}
        </Button>
      </Card>
    </m.div>
  );
}
