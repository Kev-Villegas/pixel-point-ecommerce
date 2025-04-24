"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useLikes } from "@/app/_hooks/useLikes";

type LikeButtonProps = {
  productId: number;
};

export default function LikeButton({ productId }: LikeButtonProps) {
  const { likedProductIds, mutate } = useLikes();
  const isLiked = likedProductIds.includes(productId);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isLiked) {
        await axios.delete(`/api/likes/${productId}`);
        toast.success("Producto removido de favoritos");
      } else {
        await axios.post("/api/likes", { productId });
        toast.success("Producto añadido a favoritos");
      }
      await mutate();
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
      toast.error("Hubo un error al actualizar favoritos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="rounded-full p-2 transition hover:bg-zinc-200"
      aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart
        className={`h-5 w-5 transition ${
          isLiked ? "fill-red-500 text-red-500" : "fill-white text-zinc-500"
        }`}
      />
    </button>
  );
}
