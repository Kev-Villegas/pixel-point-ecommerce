import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getProducts } from "@/app/actions/products/getProducts";

interface Properties {
  id: number;
  color?: string;
  size?: string;
  material?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  properties?: Properties;
}

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="w-full overflow-x-auto">
      <table className="mt-2 w-full min-w-[600px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-center">Stock</th>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id} className="border-t">
              <td className="px-4 py-2 text-center">{product.stock}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="flex items-center gap-2 px-4 py-2">
                <Link
                  className="btn-default flex items-center gap-1"
                  href={"/protected/products/edit/" + product.id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Editar
                </Link>
                <DeleteButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
