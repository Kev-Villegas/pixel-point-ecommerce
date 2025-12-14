"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/app/_components/ui/button";
import ProductDescription from "./ProductDescription";
import { useParams, useRouter } from "next/navigation";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
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
  Tag,
  Mic,
  Shield,
  Video,
  Clock,
} from "lucide-react";
import ProductList from "@/app/_components/ProductList";
import { fbq } from "@/app/_utils/pixel";

// Helper functions for dynamic specs
const getIconByKey = (key: string) => {
  const k = key.toLowerCase();
  if (k.includes("battery") || k.includes("batería")) return Battery;
  if (k.includes("processor") || k.includes("procesador") || k.includes("cpu"))
    return Cpu;
  if (k.includes("graphics") || k.includes("gpu") || k.includes("gráficos"))
    return MonitorSmartphone;
  if (k.includes("ram") || k.includes("memoria")) return MemoryStick;
  if (
    k.includes("capacity") ||
    k.includes("storage") ||
    k.includes("almacenamiento")
  )
    return HardDrive;
  if (k.includes("screen") || k.includes("display") || k.includes("pantalla"))
    return Smartphone;
  if (k.includes("color")) return Palette;
  if (k.includes("weight") || k.includes("peso")) return Ruler; // Approximate
  if (
    k.includes("connectivity") ||
    k.includes("conectividad") ||
    k.includes("wifi")
  )
    return Wifi;
  if (k.includes("network") || k.includes("red")) return Signal;
  if (k.includes("camera") || k.includes("cámara")) return Camera;
  if (k.includes("dimension")) return Ruler;
  if (k.includes("micrófono") || k.includes("microphone")) return Mic;
  if (
    k.includes("driver") ||
    k.includes("audio") ||
    k.includes("sound") ||
    k.includes("impédancia") ||
    k.includes("frecuencia")
  )
    return Volume2;
  if (k.includes("autonomía") || k.includes("autonomy") || k.includes("tiempo"))
    return Clock;
  if (k.includes("distancia") || k.includes("distance") || k.includes("rango"))
    return Map;
  if (k.includes("video") || k.includes("resolución")) return Video;
  if (
    k.includes("resistencia") ||
    k.includes("resistance") ||
    k.includes("protection")
  )
    return Shield;
  if (k.includes("compatibilidad") || k.includes("compatible"))
    return ListChecks;
  if (k.includes("navegación") || k.includes("gps")) return Map;
  if (
    k.includes("carga") ||
    k.includes("charging") ||
    k.includes("batería") ||
    k.includes("voltaje") ||
    k.includes("voltage")
  )
    return Zap;
  if (k.includes("velocidad") || k.includes("speed")) return ActivitySquare;
  if (k.includes("sensor")) return ActivitySquare;
  if (k.includes("ruido") || k.includes("noise") || k.includes("cancela"))
    return Volume2;
  if (k.includes("sim") || k.includes("chip")) return Microchip;

  return Tag;
};

const getLabelByKey = (key: string) => {
  const map: Record<string, string> = {
    battery: "Batería",
    processor: "Procesador",
    graphics: "Gráficos",
    ram: "RAM",
    capacity: "Capacidad",
    model: "Modelo",
    color: "Color",
    screen: "Pantalla",
    weight: "Peso",
    dimensions: "Dimensiones",
    connectivity: "Conectividad",
    camera: "Cámara",
    front_camera: "Cámara Frontal",
    rear_camera: "Cámara Trasera",
    os: "Sistema Operativo",
    dpi: "DPI",
  };
  return map[key.toLowerCase()] || key;
};

interface Product extends PrismaProduct {
  images: PrismaImage[];
  properties: PrismaProperties & { specs?: Record<string, string> };
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

        fbq("track", "ViewContent", {
          content_ids: [data.id],
          content_type: "product",
          value: data.price,
          currency: "ARS",
        });
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
    fbq("track", "AddToCart", {
      content_ids: [Number(id)],
      value: price,
      currency: "ARS",
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
    <div className="m-2 mx-auto max-w-7xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <LazyMotion features={domAnimation}>
              <AnimatePresence mode="wait">
                <m.div
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
                </m.div>
              </AnimatePresence>
            </LazyMotion>
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
            {/* Unified Specs Rendering */}
            {(() => {
              // Combine standard columns and specs into one object for display
              // We can't import flattenProperties directly if it's not available,
              // but assuming we can import it or reproduce the logic.
              // Let's rely on the previous logic style but merged.

              const { id, productId, specs, ...standardProps } = properties;
              const specsObj = (specs as Record<string, string>) || {};

              // Filter nulls from standard props
              const cleanStandardProps = Object.entries(standardProps).reduce(
                (acc, [key, value]) => {
                  if (value && key !== "id" && key !== "productId") {
                    acc[key] = String(value);
                  }
                  return acc;
                },
                {} as Record<string, string>,
              );

              const allProps = { ...cleanStandardProps, ...specsObj };

              return Object.entries(allProps).map(([key, value]) => {
                const Icon = getIconByKey(key);
                const label = getLabelByKey(key);
                return (
                  <li key={key} className="flex space-x-2">
                    <Icon className="text-primary" />
                    <span className="font-medium capitalize">{label}:</span>
                    <span>{value}</span>
                  </li>
                );
              });
            })()}
          </ul>
        </Card>
      </div>

      <div className="mb-2 pt-4">
        <Separator className="my-5" />
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
