"use client";

import ProductCard from "@/app/_components/ProductCard";
import { useFavorites } from "@/app/_hooks/useFavorites";
import { SkeletonCard } from "@/app/_components/SkeletonCard";

export default function FavoritesPage() {
  const { favorites, isLoading, error, mutate } = useFavorites();

  if (isLoading) {
    return (
      <section className="px-6">
        <h1 className="mb-8 mt-4 text-center text-3xl font-semibold">
          Mis Favoritos
        </h1>
        <div className="flex flex-row flex-wrap gap-4">
          {Array.from({ length: favorites?.length || 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error cargando favoritos.</p>
        <button
          onClick={() => mutate()}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold">Mis Favoritos</h1>
        <p>No tienes productos en favoritos aún.</p>
      </div>
    );
  }

  return (
    <section className="px-6">
      <h1 className="mb-8 mt-4 text-center text-3xl font-semibold">
        Mis Favoritos
      </h1>
      <div className="flex flex-row flex-wrap gap-4">
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onUnfavorite={() => {
              mutate((prev) => prev?.filter((p) => p.id !== product.id), false);
            }}
          />
        ))}
      </div>
    </section>
  );
}
