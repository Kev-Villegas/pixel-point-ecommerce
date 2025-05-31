"use client";

import { useMemo } from "react";
import ProductCard from "@/app/_components/ProductCard";
import { useFilterStore } from "@/store/useFilterStore";
import FilterProductsBy from "@/app/brands/_components/FilterProductsBy";
import { Image } from "@/types/types";
import { Product } from "@prisma/client";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   brand: string;
//   images: { id: number; productId: number; url: string }[];
// }

// interface ProductByBrandListProps {
//   products: Product[];
// }

// interface ProductCardProps extends ProductBase {}

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
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
