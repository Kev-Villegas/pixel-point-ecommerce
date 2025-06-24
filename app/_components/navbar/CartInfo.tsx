"use client";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartInfo() {
  const { cartProducts } = useCartStore();

  const totalProducts = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <Link href="/cart" className="relative" aria-label="Ver carrito de compras">
      <ShoppingCart className="h-6 w-6" />
      {totalProducts > 0 && (
        <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalProducts}
        </span>
      )}
    </Link>
  );
}
