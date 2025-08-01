"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/app/_components/ui/button";
import ProductDescription from "./ProductDescription";
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
  Battery,
  Cpu,
  MemoryStick,
  Palette,
  ShoppingCart,
  BadgeCheck,
  HardDrive,
  MonitorSmartphone,
  Microchip,
  Wifi,
  Map,
  Volume2,
  ActivitySquare,
  ListChecks,
  Zap,
  Camera,
  Monitor,
  Smartphone,
  Tv,
  Server,
  CreditCard,
  Signal,
  Ruler,
} from "lucide-react";
import ProductList from "@/app/_components/ProductList";

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
              <Skeleton className="h-12 w-1/2 rounded-md bg-gray-200" />{" "}
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
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleAddToCart = () => {
    addProductToCart();
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
          {stock > 0 && (
            <div className="text-3xl font-bold text-primary">
              $ {price.toLocaleString("es-AR")}
            </div>
          )}
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
          <ul className="grid grid-cols-1 gap-4 text-gray-600 md:grid-cols-2">
            {properties.battery && (
              <li className="flex space-x-2">
                <Battery className="text-green-500" />
                <span className="font-medium">Batería:</span>
                <span>{properties.battery}</span>
              </li>
            )}
            {properties.processor && (
              <li className="flex space-x-2">
                <Cpu />
                <span className="font-medium">Procesador:</span>
                <span>{properties.processor}</span>
              </li>
            )}
            {properties.graphics && (
              <li className="flex space-x-2">
                <MonitorSmartphone />
                <span className="font-medium">Gráficos:</span>
                <span>{properties.graphics}</span>
              </li>
            )}
            {properties.ram && (
              <li className="flex space-x-2">
                <MemoryStick className="text-primary" />
                <span className="font-medium">RAM:</span>
                <span>{properties.ram}</span>
              </li>
            )}
            {properties.capacity && (
              <li className="flex space-x-2">
                <HardDrive />
                <span className="font-medium">Capacidad:</span>
                <span>{properties.capacity}</span>
              </li>
            )}
            {properties.model && (
              <li className="flex space-x-2">
                <BadgeCheck />
                <span className="font-medium">Modelo:</span>
                <span>{properties.model}</span>
              </li>
            )}
            {properties.color && (
              <li className="flex space-x-2">
                <Palette />
                <span className="font-medium">Color:</span>
                <span>{properties.color}</span>
              </li>
            )}
            {properties.chipset && (
              <li className="flex space-x-2">
                <Microchip />
                <span className="font-medium">Chipset:</span>
                <span>{properties.chipset}</span>
              </li>
            )}
            {properties.connectivity && (
              <li className="flex space-x-2">
                <Wifi />
                <span className="font-medium">Conectividad:</span>
                <span>{properties.connectivity}</span>
              </li>
            )}
            {properties.navigation && (
              <li className="flex space-x-2">
                <Map />
                <span className="font-medium">Navegación:</span>
                <span>{properties.navigation}</span>
              </li>
            )}
            {properties.audio && (
              <li className="flex space-x-2">
                <Volume2 />
                <span className="font-medium">Audio:</span>
                <span>{properties.audio}</span>
              </li>
            )}
            {properties.sensors && (
              <li className="flex space-x-2">
                <ActivitySquare />
                <span className="font-medium">Sensores:</span>
                <span>{properties.sensors}</span>
              </li>
            )}
            {properties.features && (
              <li className="flex space-x-2">
                <ListChecks />
                <span className="font-medium">Características:</span>
                <span>{properties.features}</span>
              </li>
            )}
            {properties.weight && (
              <li className="flex space-x-2">
                <span className="font-medium">Peso:</span>
                <span>{properties.weight}</span>
              </li>
            )}
            {properties.dimensions && (
              <li className="flex space-x-2">
                <Ruler />
                <span className="font-medium">Dimensiones:</span>
                <span>{properties.dimensions}</span>
              </li>
            )}
            {properties.fastcharging !== null && (
              <li className="flex space-x-2">
                <Zap />
                <span className="font-medium">Carga Rápida:</span>
                <span>{properties.fastcharging ? "Sí" : "No"}</span>
              </li>
            )}
            {properties.frontcamera && (
              <li className="flex space-x-2">
                <Camera />
                <span className="font-medium">Cámara Frontal:</span>
                <span>{properties.frontcamera}</span>
              </li>
            )}
            {properties.rearcamera && (
              <li className="flex space-x-2">
                <Camera />
                <span className="font-medium">Cámara Trasera:</span>
                <span>{properties.rearcamera}</span>
              </li>
            )}
            {properties.screenresolution && (
              <li className="flex space-x-2">
                <Monitor />
                <span className="font-medium">Resolución:</span>
                <span>{properties.screenresolution}</span>
              </li>
            )}
            {properties.screensize && (
              <li className="flex space-x-2">
                <Smartphone />
                <span className="font-medium">Tamaño de Pantalla:</span>
                <span>{properties.screensize}</span>
              </li>
            )}
            {properties.screentype && (
              <li className="flex space-x-2">
                <Tv />
                <span className="font-medium">Tipo de Pantalla:</span>
                <span>{properties.screentype}</span>
              </li>
            )}
            {properties.operatingsystem && (
              <li className="flex space-x-2">
                <Server />
                <span className="font-medium">Sistema Operativo:</span>
                <span>{properties.operatingsystem}</span>
              </li>
            )}
            {properties.simcard && (
              <li className="flex space-x-2">
                <CreditCard />
                <span className="font-medium">SIM:</span>
                <span>{properties.simcard}</span>
              </li>
            )}
            {(properties.network2g ||
              properties.network3g ||
              properties.network4g ||
              properties.network5g) && (
              <li className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Signal />
                  <span className="font-medium">Redes:</span>
                </div>
                <div className="pl-6 text-sm">
                  {properties.network2g && (
                    <div>2G: {properties.network2g}</div>
                  )}
                  {properties.network3g && (
                    <div>3G: {properties.network3g}</div>
                  )}
                  {properties.network4g && (
                    <div>4G: {properties.network4g}</div>
                  )}
                  {properties.network5g && (
                    <div>5G: {properties.network5g}</div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </Card>
      </div>

      <ProductList
        title={`Más productos de ${product.brand}`}
        brand={product.brand}
        excludeId={product.id}
      />
    </div>
  );
};

export default ProductDetailsPage;
