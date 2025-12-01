import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        // Add runtime type checks for email and password
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const userPassword = user.passwordHash;

        const isValid = bcrypt.compareSync(password, userPassword);
        if (!isValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      console.log("Datos del perfil:", profile);

      if (account?.provider === "google" && profile?.sub) {
        try {
          if (!profile.email) {
            throw new Error("El email del perfil es nulo o indefinido.");
          }

          const existingUser = await db.user.findUnique({
            where: { email: profile.email },
          });

          if (!existingUser) {
            const newUser = await db.user.create({
              data: {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
                role: "USER",
                emailVerified: new Date(),
                createdAt: new Date(),
              },
            });

            await db.shipmentData.create({
              data: {
                userId: newUser.id,
                phoneNumber: "",
                streetName: "",
                streetNumber: "",
                province: "",
                city: "",
                postalCode: "",
                apartment: "",
                floor: "",
              },
            });

            console.log("Usuario registrado:", newUser);
          } else {
            if (!existingUser.emailVerified) {
              await db.user.update({
                where: { id: existingUser.id },
                data: { emailVerified: new Date() },
              });
            }

            console.log("Usuario ya existe:", existingUser);
          }
        } catch (error) {
          console.error("Error al registrar al usuario:", error);
          return false;
        }
      }

      return true;
    },
  },
});
