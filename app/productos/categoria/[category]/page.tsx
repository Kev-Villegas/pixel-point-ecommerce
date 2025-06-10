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

  if (!sort) {
    return <div className="p-10">Categoría no encontrada</div>;
  }

  return (
    <div className="p-5 md:p-10">
      <h1 className="mb-6 text-3xl font-bold capitalize">{mappedCategory}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onUnfavorite={() => {}}
              />
            ))}
      </div>
    </div>
  );
}
