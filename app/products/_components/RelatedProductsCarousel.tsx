"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Product as PrismaProduct } from "@prisma/client";

interface Product extends PrismaProduct {
  images: { url: string }[];
}

interface RelatedProductsCarouselProps {
  brand: string;
  currentProductId: number;
}

const RelatedProductsCarousel = ({
  brand,
  currentProductId,
}: RelatedProductsCarouselProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [hasRelated, setHasRelated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products/related?brand=${encodeURIComponent(
            brand,
          )}&excludeId=${currentProductId}`,
        );
        if (!res.ok) throw new Error("No se pudieron cargar los productos.");
        const data: Product[] = await res.json();

        setProducts(data);
        setHasRelated(data.length > 0);
      } catch (error) {
        console.error(error);
        setHasRelated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand, currentProductId]);
  if (!loading && !hasRelated) {
    return null;
  }
  if (loading && hasRelated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3 bg-gray-100" />

        <div className="flex space-x-4 overflow-x-auto px-1 py-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="min-w-[200px] max-w-[200px] space-y-2 rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <Skeleton className="h-[200px] w-full rounded-lg bg-gray-100" />

              <Skeleton className="h-5 w-3/4 bg-gray-100" />

              <Skeleton className="h-5 w-1/4 bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!loading && hasRelated) {
    return (
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Más productos de {brand}
        </h2>
        <motion.div
          className="flex space-x-4 overflow-x-auto px-1 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="min-w-[200px] max-w-[200px] rounded-lg border border-gray-300 p-4 shadow-md hover:cursor-pointer"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <Image
                src={product.images[0]?.url || "/placeholder.png"}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-700">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-primary">
                $ {product.price.toLocaleString("es-AR")}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
  return null;
};

export default RelatedProductsCarousel;
