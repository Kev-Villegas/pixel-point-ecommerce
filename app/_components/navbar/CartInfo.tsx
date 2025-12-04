"use client";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function CartInfo() {
  const { cartProducts } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();

  const totalProducts = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();

    if (pathname === "/cart") {
      return;
    }

    router.push(`/cart`);
  }

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center"
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
