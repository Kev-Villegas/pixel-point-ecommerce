import { MetadataRoute } from "next";
import { getProducts } from "./actions/products/getProducts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productsEntries: MetadataRoute.Sitemap = products.map(
    ({ id }: any) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/productos/${id}`,
    }),
  );
  const brands = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Realme",
    "Honor",
    "Oneplus",
    "Oppo",
  ];
  const brandsEntries: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/brands/${brand}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}/productos`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/faq`,
      lastModified: new Date(),
    },
    ...productsEntries,
    ...brandsEntries,
  ];
}
