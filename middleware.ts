import { NextRequest, NextResponse } from "next/server";
import authConfig from "./app/_lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  console.log(session);
  if (session?.user?.role !== "ADMIN") {
    console.warn(
      "Acceso no autorizado a ruta protegida:",
      req.nextUrl.pathname,
    );
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = { matcher: ["/protected/:path*"] };
