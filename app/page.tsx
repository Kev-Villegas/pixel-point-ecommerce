import BannerWrapper from "./_components/BannerWrapper";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <>
      <main>
        <BannerWrapper />
        <div className="px-5 md:px-10">
          <ProductList
            href="/productos/categoria/novedades"
            title="Novedades"
            sort="createdAt"
          />
          <ProductList
            href="/productos/categoria/masvendidos"
            title="Los más vendidos"
            sort="mostSold"
          />
          <ProductList
            href="/productos/categoria/masgustados"
            title="Los más gustados"
            sort="mostLiked"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
