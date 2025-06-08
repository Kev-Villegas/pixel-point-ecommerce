import { DefaultSession } from "next-auth";

declare global {
  interface Window {
    MP_DEVICE_SESSION_ID?: string;
  }
}

export interface Image {
  id: number;
  url: string;
  productId: number;
}

export interface ProductBase {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  images: Image[];
  // likeCount: number;
  // likedByUser: boolean;
  createdAt: Date;
  updatedAt: Date;
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
