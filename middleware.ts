import { NextRequest, NextResponse } from "next/server";
import authConfig from "./app/_lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  if (!session?.user) return NextResponse.next();

  const email = session.user.email;
  const isVerified = session.user.emailVerified;

  if (["/orders", "/favorites"].includes(pathname) && !isVerified) {
    const verifyUrl = new URL(`/verify?email=${email}`, req.nextUrl.origin);
    return NextResponse.redirect(verifyUrl);
  }

  if (pathname.startsWith("/protected") && session.user.role !== "ADMIN") {
    console.warn("Acceso no autorizado a ruta protegida:", pathname);
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/orders", "/favorites", "/protected/:path*"],
};
