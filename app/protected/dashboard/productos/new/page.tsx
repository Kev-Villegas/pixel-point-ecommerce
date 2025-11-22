"use client";
import ProductForm from "@/app/_components/admin/ProductForm";
import { ProductScraperForm } from "@/app/_components/ProductScraperForm";
import Link from "next/link";
import { useState } from "react";

interface ItemType {
  id: number;
  url: string;
}

interface ScrapedData {
  name: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  images: ItemType[];
  properties: Record<string, string>;
}

export default function NewProductPage() {
  const [data, setData] = useState<ScrapedData | null>(null);

  const handleDataScraped = (data: ScrapedData) => {
    setData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/protected/dashboard"
            className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span className="mr-2">←</span>
            Volver al Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agregar Nuevo Producto
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Completa los detalles para crear un nuevo producto en tu tienda
          </p>
        </div>
        <ProductScraperForm onDataScraped={handleDataScraped} />

        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
          <ProductForm {...data} />
        </div>
      </div>
    </div>
  );
}
