import ProductList from "@/app/_components/admin/ProductList";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="m-5">
      <Link className="btn-primary ml-5" href="/protected/products/new">
        Agregar Productos
      </Link>
      <ProductList />
    </div>
  );
}
