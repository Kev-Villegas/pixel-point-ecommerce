import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(params: { user: User }) {
      if (process.env.ADMIN_EMAIL === params.user?.email) {
        return true;
      } else {
        return false;
      }
    },
  },
};
