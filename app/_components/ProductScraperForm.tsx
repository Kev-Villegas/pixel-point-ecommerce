"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

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

interface ProductScraperFormProps {
  onDataScraped: (data: ScrapedData) => void;
}

export function ProductScraperForm({ onDataScraped }: ProductScraperFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Por favor ingresa una URL");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/scraper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al procesar la solicitud");
        return;
      }

      const transformedData: ScrapedData = {
        ...data.data,
        images: (data.data.images || [])
          .map((img: any, index: number) => {
            if (typeof img === "string") {
              return { id: index + 1, url: img };
            }

            if (typeof img === "object" && img !== null) {
              return {
                id: img.id ?? index + 1,
                url: img.url ?? "",
              };
            }

            return null;
          })
          .filter(Boolean) as ItemType[],
      };

      onDataScraped(transformedData);

      setSuccess(true);
      setUrl("");

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Error de conexión. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Importar Producto desde URL
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Ingresa un link de producto de tu proveedor y el sistema extraerá
          automáticamente toda la información para cargarla en el formulario de
          abajo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://ejemplo.com/producto/..."
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            disabled={loading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={loading}
            className="whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importando...
              </>
            ) : (
              "Importar Producto"
            )}
          </Button>
        </div>

        {error && (
          <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        {success && (
          <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div className="text-sm text-green-800">
              <p className="font-semibold">✓ Datos importados correctamente</p>
              <p className="mt-1">
                El formulario se ha rellenado con la información del producto.
                Revisa y edita los datos si es necesario antes de guardar.
              </p>
            </div>
          </div>
        )}
      </form>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        <p className="mb-2 font-semibold">ℹ️ Información importante:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Los datos se cargarán automáticamente en el formulario de abajo
          </li>
          <li>Podrás revisar y editar toda la información antes de guardar</li>
          <li>
            Se extraerán nombre, descripción, marca, precio, stock y
            especificaciones
          </li>
          <li>Las imágenes se procesarán automáticamente</li>
        </ul>
      </div>
    </div>
  );
}
