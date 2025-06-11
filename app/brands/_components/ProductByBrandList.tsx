"use client";

import { useMemo } from "react";
import ProductCard from "@/app/_components/ProductCard";
import { useFilterStore } from "@/store/useFilterStore";
import FilterProductsBy from "@/app/brands/_components/FilterProductsBy";
import { Image } from "@/types/types";
import { Product } from "@prisma/client";

type ProductWithImages = Product & {
  images: Image[];
};
interface ProductByBrandListProps {
  products: ProductWithImages[];
}

export default function ProductByBrandList({
  products,
}: ProductByBrandListProps) {
  const { selectedOption, selectedFilter } = useFilterStore();

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

  return (
    <div>
      <FilterProductsBy onChange={() => {}} />
      <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          filteredProducts.map((product) => (
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
            />
          ))
        )}
      </div>
    </div>
  );
}
