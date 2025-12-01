"use client";

import ProductCard from "@/app/_components/ProductCard";
import { useFavorites } from "@/app/_hooks/useFavorites";
import { SkeletonCard } from "@/app/_components/SkeletonCard";

export default function FavoritesPage() {
  const { favorites, isLoading, error, mutate } = useFavorites();

  if (isLoading) {
    return (
      <main className="container mx-auto min-h-[80vh] px-4 py-8">
        <h1 className="mb-8 mt-4 text-center text-3xl font-semibold">
          Mis Favoritos
        </h1>
        <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
        <p className="text-red-500">Error cargando favoritos.</p>
        <button
          onClick={() => mutate()}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground"
        >
          Reintentar
        </button>
      </main>
    );
  }

  if (favorites.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-8">
        <h1 className="mb-2 text-2xl font-semibold">Mis Favoritos</h1>
        <p className="text-muted-foreground">
          No tienes productos en favoritos aún.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-[80vh] px-4 py-8">
      <h1 className="mb-8 mt-4 text-center text-3xl font-semibold">
        Mis Favoritos
      </h1>
      <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
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
    </main>
  );
}
