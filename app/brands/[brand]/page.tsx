import { db } from "@/app/_lib/prisma";
import ProductByBrandList from "@/app/brands/_components/ProductByBrandList";
// import { Product } from "@prisma/client";

// interface BrandPageProps {
//   params: { brand: string };
// }

export default async function BrandPage(props: {
  params: Promise<{ brand: string }>;
}) {
  const params = await props.params;
  const { brand } = params;

  const products = await db.product.findMany({
    where: {
      brand: {
        equals: brand,
        mode: "insensitive",
      },
    },
    include: {
      images: true,
    },
  });

  function capitalizeFirstLetter(brand: string) {
    return brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  }

  const productsFormatted = products.map((product) => ({
    ...product,
    images: product.images.map((image) => ({
      ...image,
      productId: image.productId ?? 0,
    })),
  }));

  return (
    <div className="container my-8 px-5 md:px-10">
      <h1 className="mb-4 text-3xl font-bold">
        {capitalizeFirstLetter(brand)}
      </h1>
      <ProductByBrandList products={productsFormatted} />
    </div>
  );
}
