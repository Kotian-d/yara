import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { verifyToken } from "./app/services/jwthelpers";

const { auth } = NextAuth(authConfig);

const ProtectedRoute = ["/user/dashboard", "/admin/dashboard"];
const ProtectedApiRoute = ["/api/v1/app/user"];
const PublicRoute = ["/auth/signIn", "/auth/signup", "/"];

export default async function middleware(request) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  const isProtectedRoute = ProtectedRoute.includes(path);
  const isProtectedApiRoute = ProtectedApiRoute.some((apiPath) =>
    path.startsWith(apiPath)
  );
  const isPublicRoute = PublicRoute.includes(path);
  const usersPath = new RegExp("^/user", "i");
  const adminPath = new RegExp("^/admin", "i");

  if (isProtectedApiRoute) {
    if (!request.headers.get("authorization")) {
      return NextResponse.json(
        { status: "error", message: "Authorization header is missing" },
        { status: 401 }
      );
    }

    const isAuthorized = await verifyToken(
      request.headers.get("authorization")?.split(" ")[1]
    );

    if (!isAuthorized) {
      return NextResponse.json(
        { status: "error", message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("isAuthorized", isAuthorized.userId);
    const modifiedRequest = new Request(request, { headers: requestHeaders });

    // Continue with the modified request
    return NextResponse.next({ request: modifiedRequest });
  }

  if (adminPath.test(path) && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (usersPath.test(path) && session?.user.role !== "USER") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

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
  mather: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/api/:path*",
  ],
};
