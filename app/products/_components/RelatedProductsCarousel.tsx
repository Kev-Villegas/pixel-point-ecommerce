"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand, currentProductId]);

  if (loading) {
    return <p>Cargando productos relacionados...</p>;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Más productos de {brand}
      </h2>
      <motion.div
        className="flex space-x-4 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="min-w-[200px] max-w-[200px] rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
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
              ${product.price.toFixed(2)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RelatedProductsCarousel;
