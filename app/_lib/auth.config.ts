import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
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
  ],
} satisfies NextAuthConfig;
