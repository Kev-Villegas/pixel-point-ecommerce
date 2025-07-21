"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductBase } from "@/types/types";
import ProductCard from "@/app/_components/ProductCard";
import { SkeletonCard } from "./SkeletonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface ProductCarouselProps {
  title: string;
  href?: string;
  sort?: "createdAt" | "mostSold" | "mostLiked";
  brand?: string;
  excludeId?: number;
}

export default function ProductList({
  title,
  href,
  sort,
  brand,
  excludeId,
}: ProductCarouselProps) {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  // Actualiza si se puede hacer scroll a la izquierda/derecha
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/api/products";

        if (sort) {
          url += `?sort=${sort}`;
        } else if (brand) {
          url += `/related?brand=${encodeURIComponent(brand)}&excludeId=${excludeId}`;
        }

        const { data } = await axios.get<ProductBase[]>(url);
        setProducts(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sort, brand, excludeId]);

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    updateScrollButtons();
    ref.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      ref.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [products, isLoading]);

  if (!isLoading && products.length === 0) return null;

  return (
    <div className="relative mx-auto min-h-[420px] px-4 py-8" ref={viewRef}>
      {inView && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            {href && (
              <Link
                href={href}
                className="font-semibold text-blue-800 hover:underline"
              >
                Ver todos
              </Link>
            )}
          </div>

          <div className="relative">
            <button
              aria-label="Slide anterior"
              onClick={() => scroll("left")}
              className={`absolute left-0 top-1/2 z-20 ${
                canScrollLeft ? "sm:flex" : "hidden"
              } -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-lg backdrop-blur-md transition hover:bg-white`}
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
                : products.map((product) => (
                    <div
                      key={product.id}
                      className="my-5 h-[300px] min-w-[200px] max-w-[220px]"
                    >
                      <ProductCard {...product} onUnfavorite={() => {}} />
                    </div>
                  ))}
            </div>

            <button
              aria-label="Slide siguiente"
              onClick={() => scroll("right")}
              className={`absolute right-0 top-1/2 z-20 ${
                canScrollRight ? "sm:flex" : "hidden"
              } -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-lg backdrop-blur-md transition hover:bg-white`}
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
