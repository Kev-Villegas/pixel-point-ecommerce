import ProductForm from "@/app/_components/admin/ProductForm";
import axios from "axios";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/products/${id}`,
  );

  delete data.properties.id;
  delete data.properties.productId;

  return (
    <div className="m-8">
      <h1>Editar {data.name}</h1>
      {data && <ProductForm {...data} />}
    </div>
  );
}
