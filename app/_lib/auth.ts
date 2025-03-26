import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
