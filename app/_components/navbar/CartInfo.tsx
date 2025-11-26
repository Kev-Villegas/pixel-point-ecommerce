"use client";
import { fbq } from "@/app/_utils/pixel";
import { useCartStore } from "@/store/useCartStore";
import axios from "axios";
import { ShoppingCart, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function CartInfo() {
  const { cartProducts } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const totalProducts = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    if (pathname === "/cart") {
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
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

      const { data } = await axios.post("/api/checkout/preferences", {
        cart: cartProducts,
      });

      // redirigimos con el preferenceId
      router.push(`/cart?preference=${data.response.id}`);
    } catch (error) {
      console.error("Error creating preferences:", error);
      // opcional: mostrar toast de error
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center"
      aria-label="Ver carrito de compras"
      onClick={handleClick}
    >
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      ) : (
        <ShoppingCart className="h-6 w-6" />
      )}

      {totalProducts > 0 && !loading && (
        <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalProducts}
        </span>
      )}
    </Link>
  );
}
