"use client";
import { ProductBase } from "@/types/types";
import ProductCard from "@/app/_components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { SkeletonCard } from "@/app/_components/SkeletonCard";

const sortMap: Record<string, "createdAt" | "mostSold" | "mostLiked"> = {
  novedades: "createdAt",
  masvendidos: "mostSold",
  masgustados: "mostLiked",
};

const categoryNameMap: Record<string, string> = {
  novedades: "Novedades",
  masvendidos: "Más vendidos",
  masgustados: "Más gustados",
};

export default function ProductCategoryPage() {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const category = (params.category as string)?.toLowerCase();
  const mappedCategory = categoryNameMap[category] || category;

  const sort = sortMap[category];

  useEffect(() => {
    if (!sort) return;

    axios
      .get<ProductBase[]>(`/api/products?sort=${sort || ""}`)
      .then((res) => setProducts(res.data))
      .finally(() => setIsLoading(false));
  }, [sort]);

  if (isLoading) {
    return (
      <section className="px-6">
        <h1 className="mb-8 mt-4 text-center text-3xl font-semibold">
          {mappedCategory}
        </h1>
        <div className="flex flex-row flex-wrap gap-4">
          {Array.from({ length: products?.length || 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!sort) {
    return <div className="p-10">Categoría no encontrada</div>;
  }

  return (
    <section className="p-6">
      <h1 className="mb-8 mt-4 text-center text-3xl font-semibold">
        {mappedCategory}
      </h1>
      <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onUnfavorite={() => {}} />
        ))}
      </div>
    </section>
  );
}
