import ProductDetailsPage from "../_components/ProductDetailsPage";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const producto = await fetch(
    `https://pixel-point.com.ar/api/products/${id}`,
    {
      cache: "no-store",
    },
  ).then((res) => res.json());

  const primeraImagen = producto.images?.[0]?.url;

  const imagenUrl = primeraImagen?.startsWith("http")
    ? primeraImagen
    : `https://pixel-point.com.ar${primeraImagen}`;

  return {
    title: `${producto.name} - Pixel Point`,
    description: producto.description,
    openGraph: {
      title: `${producto.name} - Pixel Point`,
      description: producto.description,
      url: `https://pixel-point.com.ar/productos/${id}`,
      type: "website",
      images: primeraImagen
        ? [
            {
              url: imagenUrl,
              width: 800,
              height: 600,
              alt: producto.name,
            },
          ]
        : [],
    },
  };
}

const ProductPage = () => {
  return (
    <div>
      {/* <Header /> */}
      <ProductDetailsPage />
    </div>
  );
};

export default ProductPage;
