"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Battery, Cpu, MemoryStick, Palette } from "lucide-react";
import {
  Product as PrismaProduct,
  Image as PrismaImage,
  Properties as PrismaProperties,
} from "@prisma/client";

interface Product extends PrismaProduct {
  images: PrismaImage[];
  properties: PrismaProperties;
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    return <p>Cargando...</p>;
  }

  if (!product) {
    return null;
  }

  const { name, description, price, images, properties, stock, brand } =
    product;

  const handleAddToCart = () => {
    if (stock) {
      toast.success("Producto agregado al carrito");
    } else {
      toast.error("Este producto está agotado");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-2">
            {images.map((image: PrismaImage, index: number) => (
              <Image
                key={index}
                src={image.url}
                alt={`Imagen ${index + 1} de ${name}`}
                width={80}
                height={80}
                className={`cursor-pointer rounded border object-cover ${
                  selectedImage === image.url
                    ? "border-primary"
                    : "border-gray-300"
                } hover:border-primary`}
                onClick={() => setSelectedImage(image.url)}
              />
            ))}
          </div>

          <div className="flex-1">
            <div className="relative h-[500px] w-[500px] overflow-hidden rounded-lg bg-gray-100 shadow-md">
              <Image
                src={selectedImage || "/placeholder.png"}
                alt={name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-sm text-gray-500">Marca: {brand}</p>
          <p className="text-lg text-gray-600">{description}</p>
          <div className="text-2xl font-semibold text-primary">
            ${price.toFixed(2)}
          </div>
          <p className={`text-lg ${stock ? "text-green-600" : "text-red-600"}`}>
            {stock ? "En stock" : "Agotado"}
          </p>
          <Button
            variant="default"
            className="mt-4 px-6 py-3 text-lg"
            onClick={handleAddToCart}
          >
            {stock ? "Añadir al carrito" : "Notificarme"}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Especificaciones técnicas
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;
