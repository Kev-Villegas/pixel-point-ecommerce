export interface ProductBase {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: images[];
}

interface images {
  id: number;
  url: string;
  productId: number;
}

export interface CartProduct extends ProductBase {
  quantity: number;
}
