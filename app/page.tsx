import BannerWrapper from "./_components/BannerWrapper";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <>
      <main>
        <BannerWrapper />
        <div className="px-5 md:px-10">
          <ProductList href="1" title="Novedades" />
          <ProductList href="2" title="Los más vendidos" />
          <ProductList href="3" title="Los más likeados" />
        </div>
      </main>
      <Footer />
    </>
  );
}
