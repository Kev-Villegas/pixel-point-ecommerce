import { StaticImageData } from "next/image";

export interface ProductBase {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string | StaticImageData;
}

export interface CartProduct extends ProductBase {
  quantity: number;
}
