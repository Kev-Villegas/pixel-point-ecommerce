import { PrismaAdapter } from "@auth/prisma-adapter";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
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
  jwt: {
    async encode({ secret, token }) {
      if (!token) {
        throw new Error("No token to encode");
      }
      return jwt.sign(token, secret as string);
    },
    async decode({ secret, token }) {
      if (!token) {
        throw new Error("No token to decode");
      }
      const decodedToken = jwt.verify(token, secret as string);
      if (typeof decodedToken === "string") {
        return JSON.parse(decodedToken);
      } else {
        return decodedToken;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      // Verificación de tipo para user.role
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      // Asignación segura con operador opcional
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  ...authConfig,
});
