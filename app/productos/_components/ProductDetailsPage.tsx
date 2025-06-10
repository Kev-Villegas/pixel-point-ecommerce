"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/app/_components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Separator } from "@/app/_components/ui/separator";
import {
  Product as PrismaProduct,
  Image as PrismaImage,
  Properties as PrismaProperties,
} from "@prisma/client";
import {
  BadgeCheck,
  Battery,
  Cpu,
  MemoryStick,
  Palette,
  ShoppingCart,
} from "lucide-react";
import RelatedProductsCarousel from "./RelatedProductsCarousel";
import ProductDescription from "./ProductDescription";

interface Product extends PrismaProduct {
  images: PrismaImage[];
  properties: PrismaProperties;
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addProduct } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images[0]?.url || null);
      } catch (error) {
        console.error(error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Contenedor principal: imagen + detalles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Imagen principal y miniaturas */}
          <div className="flex flex-col">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-100">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="mt-4 flex flex-wrap justify-start gap-2">
              {[...Array(4)].map((_, idx) => (
                <Skeleton key={idx} className="h-20 w-20 rounded bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="space-y-2">
            <Skeleton className="h-10 w-3/5 bg-gray-200" /> {/* Nombre */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 bg-gray-200" /> {/* Marca */}
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
            </div>
            <Skeleton className="h-20 w-full bg-gray-200" /> {/* Descripción */}
            <Skeleton className="h-10 w-1/4 bg-gray-200" /> {/* Precio */}
            <Skeleton className="h-6 w-1/6 bg-gray-200" /> {/* Stock */}
            <div className="mt-4 flex gap-3">
              <Skeleton className="h-12 w-1/2 rounded-md bg-gray-200" />{" "}
              {/* Comprar ahora */}
              <Skeleton className="h-12 w-1/2 rounded-md bg-gray-200" />{" "}
              {/* Añadir al carrito */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const {
    name,
    description,
    price,
    images,
    properties,
    stock,
    brand,
    createdAt,
    updatedAt,
  } = product;

  const addProductToCart = () => {
    if (isAdding || stock < 1) return;

    setIsAdding(true);
    addProduct({
      id: Number(id),
      name,
      price,
      brand,
      images: product.images.map((image) => ({
        id: image.id,
        url: image.url,
        productId: image.productId ?? 0,
      })),
      stock,
      description,
      createdAt,
      updatedAt,
    });
  };

  const handleAddToCart = () => {
    addProductToCart();
    toast.success(`Se agregó ${name} al carrito`);
  };

  const handleBuyNow = () => {
    addProductToCart();
    router.push("/cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedImage || "/placeholder.png"}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex flex-wrap justify-start gap-2">
            {images.map((image: PrismaImage, index: number) => (
              <Image
                key={index}
                src={image.url}
                alt={`Imagen ${index + 1} de ${name}`}
                width={80}
                height={80}
                className={`cursor-pointer rounded border object-cover transition-all duration-100 hover:scale-105 hover:shadow ${
                  selectedImage === image.url
                    ? "border-primary"
                    : "border-gray-300"
                } hover:border-primary`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="flex items-center gap-[3px] text-sm text-gray-500">
            {brand}
            <BadgeCheck className="mt-[1px] h-4 w-4 font-bold text-blue-700" />
          </p>
          <ProductDescription description={description} />
          <div className="text-3xl font-bold text-primary">
            $ {price.toLocaleString("es-AR")}
          </div>
          <p
            className={`text-lg font-medium ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? "En stock" : "Agotado"}
          </p>
          <div className="mt-4 flex gap-3">
            {stock > 0 && (
              <Button
                variant="default"
                className="flex-1 items-center gap-2 px-6 py-3 text-lg"
                onClick={handleBuyNow}
              >
                Comprar ahora
              </Button>
            )}
            <Button
              variant={stock > 0 ? "secondary" : "default"}
              className={`flex-1 items-center gap-2 px-6 py-3 text-lg ${
                isAdding || stock < 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleAddToCart}
              disabled={isAdding || stock < 1}
            >
              {stock > 0 ? (
                <>
                  <ShoppingCart className="h-5 w-5" /> Añadir al carrito
                </>
              ) : (
                "Notificarme"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-2 pt-4">
        <Separator className="my-5" />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Especificaciones Técnicas
        </h2>
        <Card className="mt-4 px-4 py-4">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {properties.battery && (
              <li className="flex items-center space-x-2 text-gray-600">
                <Battery className="text-green-500" />
                <span className="font-medium capitalize">Batería:</span>
                <span>{properties.battery}</span>
              </li>
            )}
            {properties.processor && (
              <li className="flex items-center space-x-2 text-gray-600">
                <Cpu className="text-gray-800" />
                <span className="font-medium capitalize">Procesador:</span>
                <span>{properties.processor}</span>
              </li>
            )}

            {properties.color && (
              <li className="flex items-center space-x-2 text-gray-600">
                <Palette className="text-gray-800" />
                <span className="font-medium capitalize">Color:</span>
                <span>{properties.color}</span>
              </li>
            )}
            {properties.ram && (
              <li className="flex items-center space-x-2 text-gray-600">
                <MemoryStick className="text-primary" />
                <span className="font-medium capitalize">RAM:</span>
                <span>{properties.ram}</span>
              </li>
            )}
          </ul>
        </Card>
      </div>

      <div className="">
        <RelatedProductsCarousel brand={brand} currentProductId={Number(id)} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
