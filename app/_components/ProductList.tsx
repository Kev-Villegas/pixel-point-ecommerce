"use client";

import axios from "axios";
import Link from "next/link";
import { ProductBase } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/app/_components/ProductCard";
import { useInView } from "react-intersection-observer";
import { SkeletonCard } from "./SkeletonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductListProps {
  title: string;
  href: string;
  sort?: "createdAt" | "mostSold" | "mostLiked";
}

export default function ProductList({ title, href, sort }: ProductListProps) {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref: viewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    axios
      .get<ProductBase[]>(`/api/products?sort=${sort || ""}`)
      .then((res) => setProducts(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="relative mx-auto px-4 py-8" ref={viewRef}>
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

          <div className="relative">
            <button
              className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-lg backdrop-blur-md transition hover:bg-white sm:flex"
              onClick={() => scroll("left")}
            >
              <ChevronLeft />
            </button>

            <div
              ref={scrollRef}
              className="scrollbar-hide hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-2 pb-5"
            >
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[300px] min-w-[200px] max-w-[220px]"
                    >
                      <SkeletonCard />
                    </div>
                  ))
                : products.map((product, index) => (
                    <div
                      key={product.id}
                      className="h-[300px] min-w-[200px] max-w-[220px]"
                    >
                      <ProductCard {...product} onUnfavorite={() => {}} />
                    </div>
                  ))}
            </div>

            <button
              className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-lg backdrop-blur-md transition hover:bg-white sm:flex"
              onClick={() => scroll("right")}
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
