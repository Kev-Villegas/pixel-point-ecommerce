"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { PackageSearch, SearchX } from "lucide-react";
import ProductCard from "@/app/_components/ProductCard";
import { SkeletonCard } from "@/app/_components/SkeletonCard";
import FilterProductsBy from "@/app/brands/_components/FilterProductsBy";
import { useFilterStore } from "@/store/useFilterStore";
import { ProductBase } from "@/types/types";

function ProductsSkeleton() {
  return (
    <section className="container mx-auto min-h-[80vh] px-5 py-8 md:px-10">
      <div className="mb-8 mt-4 text-center">
        <div className="mx-auto h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto mt-2 h-4 w-40 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const [products, setProducts] = useState<ProductBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedOption, selectedFilter } = useFilterStore();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const url = query
      ? `/api/products/search?q=${encodeURIComponent(query)}`
      : "/api/products";

    axios
      .get<ProductBase[]>(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("Ocurrió un error al buscar los productos.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  const filteredProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (selectedFilter === "price") {
        return selectedOption === "asc" ? a.price - b.price : b.price - a.price;
      } else {
        return selectedOption === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });
  }, [products, selectedFilter, selectedOption]);

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return (
      <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8 text-center">
        <p className="text-lg text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-primary px-5 py-2 text-white transition-colors hover:bg-primary/90"
        >
          Reintentar
        </button>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          {query ? (
            <SearchX className="h-10 w-10 text-muted-foreground" />
          ) : (
            <PackageSearch className="h-10 w-10 text-muted-foreground" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {query
            ? `No encontramos productos para "${query}"`
            : "No hay productos disponibles"}
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {query
            ? "Revisá la ortografía o probá con términos más generales como iPhone, Samsung o Xiaomi."
            : "Actualmente no hay productos en el catálogo."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {query && (
            <Link
              href="/productos"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Ver todo el catálogo
            </Link>
          )}
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <section className="container mx-auto min-h-[80vh] px-5 py-8 md:px-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {query ? `Resultados para "${query}"` : "Todos los productos"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "producto encontrado"
            : "productos encontrados"}
        </p>
      </div>

      <FilterProductsBy onChange={() => {}} />

      <div className="grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            brand={product.brand}
            images={product.images}
            stock={product.stock}
            description={product.description}
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}
            onUnfavorite={() => {}}
          />
        ))}
      </div>
    </section>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
