"use client";

import ProductCard from "@/app/_components/ProductCard";
import { ProductBase } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ProductListProps {
  title: string;
  href: string;
}

export default function ProductList({ title, href }: ProductListProps) {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    // https://pixel-point-ecommerce.vercel.app/api/products
    axios.get("/api/products").then((response) => setProducts(response.data));
  }, []);

  return (
    <div className="mx-auto px-4 py-8" ref={ref}>
      {inView && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Link
              href={href}
              className="font-semibold text-blue-800 hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                images={product.images}
                stock={product.stock}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
