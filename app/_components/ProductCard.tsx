"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useLikes } from "@/app/_hooks/useLikes";
import { useCartStore } from "@/store/useCartStore";
import { ProductBase, CartProduct } from "@/types/types";
import { BadgeCheck, ShoppingBag, Heart } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";

interface ProductCardProps extends ProductBase {
  onUnfavorite?: () => void;
}

export default function ProductCard({
  onUnfavorite,
  ...productProps
}: ProductCardProps) {
  const { id, name, brand, price, images, stock } = productProps;
  const { addProduct } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const { likedProductIds, mutate } = useLikes();
  const [likeLoading, setLikeLoading] = useState(false);

  const isLiked = likedProductIds.includes(id);

  const handleAddToCart = () => {
    if (isAdding || stock < 1) return;
    setIsAdding(true);
    const itemToAdd: CartProduct = {
      ...productProps,
      quantity: 1,
    };

    addProduct(itemToAdd);
    setTimeout(() => setIsAdding(false), 800);
  };

  const toggleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    const prevLikedIds = [...likedProductIds];
    const newLikedIds = isLiked
      ? likedProductIds.filter((productId) => productId !== id)
      : [...likedProductIds, id];
    mutate(newLikedIds, false);

    try {
      if (isLiked) {
        await axios.delete(`/api/likes/${id}`);
        onUnfavorite?.();
      } else {
        await axios.post("/api/likes", { FavoriteProduct: id });
      }
      mutate();
    } catch (error) {
      mutate(prevLikedIds, false);
    } finally {
      setLikeLoading(false);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Card
      ref={ref}
      className="product-card w-full max-w-[220px] overflow-hidden transition-transform duration-300 hover:shadow-lg hover:shadow-gray-400"
      tabIndex={0}
      style={stock > 0 ? {} : { opacity: 0.5 }}
    >
      {inView && (
        <>
          <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
            <Link href={`/productos/${id}`}>
              <Image
                src={images[0]?.url ?? "/placeholder.png"}
                alt={name}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
                priority
                className="transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Link>
          </div>
          <CardContent className="flex h-[130px] flex-col justify-between p-2">
            <div className="flex flex-col space-y-1">
              <Link href={`/productos/${id}`}>
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
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-emerald-600">
                {stock > 0 && `$${price.toLocaleString("es-AR")}`}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleLike}
                  disabled={likeLoading}
                  title={
                    isLiked ? "Eliminar de favoritos" : "Agregar a favoritos"
                  }
                  aria-label={
                    isLiked ? "Eliminar de favoritos" : "Agregar a favoritos"
                  }
                  aria-pressed={isLiked}
                  className="rounded-full p-2 transition-transform duration-200 ease-in-out hover:scale-110"
                >
                  <Heart
                    className={`h-5 w-5 transform transition-all duration-300 ease-in-out ${
                      isLiked
                        ? "scale-110 fill-red-500 text-red-500"
                        : "scale-100 fill-white text-zinc-500"
                    }`}
                  />
                </button>
                {stock > 0 ? (
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
                ) : (
                  <span className="whitespace-nowrap rounded-full border border-red-500 px-2 py-1 text-xs font-semibold text-red-500">
                    Sin stock
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
