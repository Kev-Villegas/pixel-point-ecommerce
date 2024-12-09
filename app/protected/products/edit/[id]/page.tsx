import ProductForm from "@/app/_components/admin/ProductForm";
import axios from "axios";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let { data } = await axios.get(`http://localhost:3000/api/products/${id}`);

  return (
    <div>
      <h1>Edit Product</h1>
      {data && <ProductForm {...data} />}
    </div>
  );
}
