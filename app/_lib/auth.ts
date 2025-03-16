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
  // jwt: {
  //   async encode({ secret, token }) {
  //     if (!secret) throw new Error("Secret no proporcionado");
  //     if (!token) throw new Error("No token to encode");

  //     // Eliminar propiedades de expiración existentes
  //     const { exp, iat, ...cleanToken } = typeof token === "object" ? token : {};

  //     const payload = {
  //       ...cleanToken,
  //       iat: Math.floor(Date.now() / 1000)
  //     };

  //     return jwt.sign(payload, secret as string, {
  //       algorithm: "HS256",
  //       expiresIn: "1h" // Ahora esto será la única fuente de 'exp'
  //     });
  //   },
  //   async decode({ secret, token }) {
  //     if (!secret) throw new Error("Secret no proporcionado");
  //     if (!token || typeof token !== "string") {
  //       throw new Error("Token inválido o no proporcionado");
  //     }

  //     try {
  //       const decoded = jwt.verify(token, secret as string, { algorithms: ["HS256"] });

  //       if (typeof decoded === "string") {
  //         try {
  //           return JSON.parse(decoded);
  //         } catch {
  //           return { data: decoded };
  //         }
  //       }
  //       return decoded;
  //     } catch (error) {
  //       console.error("Error decodificando token:", error);
  //       throw new Error("Token inválido o expirado");
  //     }
  //   },
  // },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 30 * 24 * 60 * 60,
  //   updateAge: 24 * 60 * 60,
  // },
  // callbacks: {
  //   jwt({ token, user }) {
  //     // Verificación de tipo para user.role
  //     if (user?.role) {
  //       token.role = user.role;
  //     }
  //     return token;
  //   },
  //   session({ session, token }) {
  //     // Asignación segura con operador opcional
  //     if (token.role) {
  //       session.user.role = token.role;
  //     }
  //     return session;
  //   },
  // },
  ...authConfig,
});
