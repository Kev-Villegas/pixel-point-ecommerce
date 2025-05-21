import ProductList from "@/app/_components/admin/ProductList";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="m-5">
      <Link className="btn-primary" href="/protected/products/new">
        Add Products
      </Link>
      <ProductList />
    </div>
  );
}
