"use client";

import axios from "axios";
import Link from "next/link";
import { ProductBase } from "@/types/types";
import { useEffect, useState } from "react";
import ProductCard from "@/app/_components/ProductCard";
import { useInView } from "react-intersection-observer";
import { SkeletonCard } from "./SkeletonCard";

interface ProductListProps {
  title: string;
  href: string;
}

export default function ProductList({ title, href }: ProductListProps) {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    // https://pixel-point-ecommerce.vercel.app/api/products
    axios
      .get<ProductBase[]>("/api/products")
      .then((res) => setProducts(res.data))
      .finally(() => setIsLoading(false));
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
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onUnfavorite={() => {
                      /* here we will handle unfavorite */
                    }}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  );
}
