import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import BannerCarousel from "./_components/BannerCarousel";

export default function Home() {
  return (
    <>
      <main>
        <div className="rounded-2xl px-5 pt-4 md:px-10">
          <BannerCarousel />
        </div>
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
