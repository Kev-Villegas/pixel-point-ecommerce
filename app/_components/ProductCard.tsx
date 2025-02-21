"use client";
import { Card, CardContent } from "@/app/_components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { ProductBase } from "@/types/types";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps extends ProductBase {}

export default function ProductCard({
  id,
  images,
  name,
  price,
  brand,
}: ProductCardProps) {
  const { addProduct } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    addProduct({ id, name, price, brand, images });
    toast.success(`Producto ${name} agregado al carrito`);

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <Card
      className="w-full max-w-[225px] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:shadow-gray-400"
      tabIndex={0}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Link href={`/products/${id}`}>
          <Image
            src={images[0].url}
            alt={name}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </Link>
      </div>
      <CardContent className="p-2">
        <div className="flex flex-col space-y-1">
          <Link href={`/products/${id}`}>
            <h3 className="cursor-pointer truncate text-base font-medium leading-tight hover:text-primary">
              {name}
            </h3>
          </Link>
          {brand && (
            <p className="flex items-center gap-[3px] truncate pt-1 text-sm text-muted-foreground">
              {brand}
              <BadgeCheck className="h-4 w-4 font-semibold text-blue-700" />
            </p>
          )}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold text-emerald-600">
              ${price.toFixed(2)}
            </span>
            <button
              className={`rounded-full p-2 text-primary transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-primary hover:text-primary-foreground ${
                isAdding ? "cursor-not-allowed opacity-50" : ""
              }`}
              aria-label="Añadir al carrito"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
