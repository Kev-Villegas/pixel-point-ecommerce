import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "./prisma";

export default {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
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
    jwt({ token, user }: { token: any; user?: any }) {
      // if (user?.role) token.role = user.role;
      if (user) {
        token.role = user.role;
        token.emailVerified = user.emailVerified ?? null;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      if (token.role) session.user.role = token.role;
      if (token.emailVerified !== undefined) {
        session.user.emailVerified = token.emailVerified;
      }
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: "USER",
        };
      },
    }),
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
} satisfies NextAuthConfig;
