"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/_components/ProductCard";
import FilterProductsBy from "@/app/brands/_components/FilterProductsBy";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  images: { url: string }[];
}

interface ProductByBrandListProps {
  products: Product[];
}

export default function ProductByBrandList({
  products,
}: ProductByBrandListProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleFilterChange = (order: "asc" | "desc") => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    setFilteredProducts(products); // Para reiniciar el filtro si cambian los productos
  }, [products]);

  return (
    <div>
      <FilterProductsBy onChange={handleFilterChange} />
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
            />
          ))
        )}
      </div>
    </div>
  );
}
