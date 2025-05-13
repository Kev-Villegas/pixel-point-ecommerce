import Banner from "./_components/Banner";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";

export default function Home() {
  const banners = [
    {
      imageUrl:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      altText: "Oferta 1",
      // link: "/oferta1",
      // title: "¡Gran oferta de Verano!",
      // description: "Disfruta hasta 50% de descuento en productos seleccionados.",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      altText: "Oferta 2",
      // link: "/oferta2",
      // title: "¡Ofertas Exclusivas!",
      // description: "Compra ahora y ahorra más en productos de verano.",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      altText: "Oferta 3",
      // link: "/oferta3",
      // title: "¡Precios Bajos!",
      // description: "Hasta un 70% de descuento en productos seleccionados.",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      altText: "Oferta 4",
      // title: "¡Compra más y ahorra más!",
      // link: "/oferta4",
      // description: "Descuentos especiales por tiempo limitado.",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/6023354/pexels-photo-6023354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      altText: "Oferta 5",
      // link: "/oferta5",
      // title: "¡La oferta que esperabas!",
      // description: "Hasta 40% de descuento en productos seleccionados.",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/1646704/pexels-photo-1646704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      altText: "Oferta 6",
      // link: "/oferta6",
      // title: "¡Promoción Exclusiva!",
      // description: "Compra ahora y recibe envío gratis en todos los productos.",
    },
  ];

  return (
    <>
      <main>
        {/* <Header /> */}
        <div className="rounded-2xl px-5 pt-4 md:px-10">
          <Banner banners={banners} />
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
