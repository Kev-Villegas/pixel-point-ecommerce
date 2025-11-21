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
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    emailVerified?: Date | null;
  }
}

// export declare type PrismaConfig = {

//   // Whether features with an unstable API are enabled.
//   experimental: {
//     externalTables: boolean;
//   },

//   // The path to the schema file, or path to a folder that shall be recursively searched for *.prisma files.
//   schema?: string;

//   // Configuration for Prisma migrations.
//   migrations?: {
//     path: string;
//     seed: string;
//     initShadowDb: string;
//   };

//   // Configuration for the database view entities.
//   views?: {
//     path: string;
//   };

//   // Configuration for the `typedSql` preview feature.
//   typedSql?: {
//     path: string;
//   };

//   // Database connection configuration
//   datasource?: {
//     url: string;
//     shadowDatabaseUrl?: string;
//   }

// };
