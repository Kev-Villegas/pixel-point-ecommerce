import ProductList from "@/app/_components/admin/ProductList";
import Link from "next/link";
import { ProductScraperForm } from "./_components/ProductScraperForm";

export default function ProductsPage() {
  return (
    <div className="m-5 space-y-6">
      <div className="flex flex-wrap gap-4">
        <Link className="btn-primary ml-5" href="/protected/products/new">
          Agregar Productos Manualmente
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <ProductScraperForm />
      </div>

      <ProductList />
    </div>
  );
}
