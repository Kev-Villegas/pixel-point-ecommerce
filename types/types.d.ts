import { DefaultSession } from "next-auth";

export interface ProductBase {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: image[];
}

interface image {
  id: number;
  url: string;
  productId: number;
}

export interface CartProduct extends ProductBase {
  quantity: number;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
