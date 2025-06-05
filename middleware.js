import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const ProtectedRoute = ["/user/dashboard", "/admin/dashboard"];
const PublicRoute = ["/auth/signIn", "/auth/signup", "/"];

export default async function middleware(request) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  const isProtectedRoute = ProtectedRoute.includes(path);
  const isPublicRoute = PublicRoute.includes(path);

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL("/auth/signIn", request.url));
  }

  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(
      new URL(`/${session?.user?.role.toLowerCase()}/dashboard`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  mather:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
