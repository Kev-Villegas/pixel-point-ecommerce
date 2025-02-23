import { db } from "@/app/_lib/prisma";
import ProductByBrandList from "@/app/brands/_components/ProductByBrandList";
import { Product } from "@prisma/client";

interface BrandPageProps {
  params: { brand: string };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = params;

  const products: Product[] = await db.product.findMany({
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

  return (
    <>
      {/* <Header /> */}
      <div className="container mx-auto my-8">
        <h1 className="mb-4 text-3xl font-bold">
          Productos de: {capitalizeFirstLetter(brand)}
        </h1>

        <ProductByBrandList products={products} />
      </div>
    </>
  );
}
