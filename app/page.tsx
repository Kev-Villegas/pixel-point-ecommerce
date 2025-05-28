import BannerWrapper from "./_components/BannerWrapper";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <>
      <main>
        <BannerWrapper />
        <div className="px-5 md:px-10">
          <ProductList href="1" title="Mas vendidos 1" />
          <ProductList href="2" title="Mas vendidos 2" />
          <ProductList href="3" title="Mas vendidos 3" />
        </div>
      </main>
      <Footer />
    </>
  );
}
