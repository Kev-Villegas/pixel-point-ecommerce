"use client";
import { useCartStore } from "@/store/useCartStore";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartInfo() {
  const { cartProducts } = useCartStore();
  const router = useRouter();

  const totalProducts = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/checkout/preferences", {
        cart: cartProducts,
      });
      router.push(`/cart?preference=${data.response.id}`);
    } catch (error) {
      console.error("Error creating preferences:", error);
    }
  }

  return (
    <Link
      href="/cart"
      className="relative"
      aria-label="Ver carrito de compras"
      onClick={handleClick}
    >
      <ShoppingCart className="h-6 w-6" />
      {totalProducts > 0 && (
        <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalProducts}
        </span>
      )}
    </Link>
  );
}
