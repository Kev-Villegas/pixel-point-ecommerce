"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { ProductBase } from "@/types/types";
import { useLikes } from "@/app/_hooks/useLikes";
import { useCartStore } from "@/store/useCartStore";
import { BadgeCheck, ShoppingBag, Heart } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";

interface ProductCardProps extends Omit<ProductBase, "images"> {
  images: { url: string }[];
}

type ImageType = { url: string };

export default function ProductCard({
  id,
  images,
  name,
  price,
  brand,
}: ProductCardProps) {
  const { addProduct } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const { likedProductIds, mutate } = useLikes();
  const [likeLoading, setLikeLoading] = useState(false);

  const isLiked = likedProductIds.includes(id);

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    addProduct({ id, name, price, brand, images });
    toast.success(`Producto ${name} agregado al carrito`);
    setTimeout(() => setIsAdding(false), 800);
  };

  const toggleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      if (isLiked) {
        await axios.delete(`/api/likes/${id}`);
        toast.success("Like eliminado");
      } else {
        await axios.post("/api/likes", { productId: id });
        toast.success("Producto añadido a favoritos");
      }
      await mutate();
    } catch (error) {
      console.error("Error cambiando like:", error);
      toast.error("Error al actualizar favoritos");
    } finally {
      setLikeLoading(false);
    }
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
            <div className="flex gap-1">
              <button
                onClick={toggleLike}
                disabled={likeLoading}
                className="rounded-full p-2 transition-transform duration-200 ease-in-out hover:scale-110"
                aria-label={isLiked ? "Eliminar favorito" : "Añadir favorito"}
              >
                <Heart
                  className={`h-5 w-5 transition ${
                    isLiked
                      ? "fill-red-500 text-red-500"
                      : "fill-white text-zinc-500"
                  }`}
                />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`rounded-full p-2 text-primary transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-primary hover:text-primary-foreground ${
                  isAdding ? "cursor-not-allowed opacity-50" : ""
                }`}
                aria-label="Añadir al carrito"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
