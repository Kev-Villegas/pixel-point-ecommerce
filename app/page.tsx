import BannerWrapper from "./_components/BannerWrapper";

import ProductList from "./_components/ProductList";
import { getProducts } from "./actions/products/getProducts";

export default async function Home() {
  const [newProducts, mostSoldProducts, mostLikedProducts] = await Promise.all([
    getProducts("createdAt"),
    getProducts("mostSold"),
    getProducts("mostLiked"),
  ]);

  return (
    <>
      <BannerWrapper />
      <div className="px-5 md:px-10">
        <ProductList
          href="/productos/categoria/novedades"
          title="Novedades"
          initialProducts={newProducts}
        />
        <ProductList
          href="/productos/categoria/masvendidos"
          title="Los más vendidos"
          initialProducts={mostSoldProducts}
        />
        <ProductList
          href="/productos/categoria/masgustados"
          title="Los más gustados"
          initialProducts={mostLikedProducts}
        />
      </div>
    </>
  );
}
