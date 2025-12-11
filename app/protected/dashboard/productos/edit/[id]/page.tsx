import ProductForm from "@/app/_components/admin/ProductForm";
import { flattenProperties } from "@/app/_utils/productHelpers";
import Link from "next/link";
import axios from "axios";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data = null;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${id}`,
    );
    data = response.data;
    data = response.data;
    if (data.properties) {
      data.properties = flattenProperties(data.properties);
    }
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-950">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/protected/dashboard"
            className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span className="mr-2">←</span>
            Volver al Dashboard
          </Link>
          <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
            <p className="text-red-600 dark:text-red-400">
              Error al cargar el producto. Por favor, intenta de nuevo.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            Editar {data?.name}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Actualiza los detalles del producto
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-900">
          {data && <ProductForm {...data} />}
        </div>
      </div>
    </div>
  );
}
