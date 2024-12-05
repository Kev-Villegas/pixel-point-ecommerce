"use client";

import Link from "next/link";
import ps5 from "@/public/ps5.png";
import s21 from "@/public/s21.png";
import macbook from "@/public/macbook.webp";
import { StaticImageData } from "next/image";
import iPhone from "@/public/iphone-example.png";
import notebookMsi from "@/public/notebookMsi.png";
import xboxseriesx from "@/public/xboxxseries.png";
import { useInView } from "react-intersection-observer";
import ProductCard from "@/app/_components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
  brand: string;
}

interface ProductListProps {
  title: string;
  href: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone",
    brand: "Apple",
    price: 799.99,
    image: iPhone,
  },
  {
    id: 2,
    name: "Macbook Pro",
    brand: "Apple",
    price: 1299.99,
    image: macbook,
  },
  {
    id: 3,
    name: "Playstation 5",
    brand: "Sony",
    price: 499.99,
    image: ps5,
  },
  {
    id: 4,
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    price: 699.99,
    image: s21,
  },
  {
    id: 5,
    name: "MSI Notebook",
    brand: "MSI",
    price: 999.99,
    image: notebookMsi,
  },
  {
    id: 6,
    name: "Xbox Series X",
    brand: "Microsoft",
    price: 499.99,
    image: xboxseriesx,
  },
];

export default function ProductList({ title, href }: ProductListProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px",
  });
  return (
    <div className="mx-auto px-4 py-8" ref={ref}>
      {inView && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Link
              href={href}
              className="font-semibold text-blue-800 hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageSrc={product.image}
                name={product.name}
                price={product.price}
                brand={product.brand}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
