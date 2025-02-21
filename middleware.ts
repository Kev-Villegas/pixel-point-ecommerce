import NextAuth from "next-auth";
import { authOptions } from "./app/_lib/authOptions";

export const { auth: middleware } = NextAuth(authOptions);

// const protectedRoutes = ["/protected/dashboard"];

// export default async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);

//   if (isProtectedRoute && !token) {
//     console.warn(
//       "Acceso no autorizado a ruta protegida:",
//       req.nextUrl.pathname,
//     );
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }

//   if (token && req.nextUrl.pathname === "/") {
//     return NextResponse.redirect(new URL("/protected/dashboard", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/protected/:path*"],
// };
