import BannerWrapper from "./_components/BannerWrapper";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <>
      <main>
        <BannerWrapper />
        <div className="px-5 md:px-10">
          <ProductList href="1" title="Novedades" sort="createdAt" />
          <ProductList href="2" title="Los más vendidos" sort="mostSold" />
          <ProductList href="3" title="Los más gustados" sort="mostLiked" />
        </div>
      </main>
      <Footer />
    </>
  );
}
