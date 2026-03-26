import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const urlPath = req.nextUrl.pathname;

    const urlSlug = urlPath.split("/")[1];

    if (token?.role === "ADMIN") {
      return NextResponse.next();
    }

    if (urlPath.startsWith("/rangooo") && token?.role !== "ADMIN") {
      const redirectUrl = token?.slug ? `/${token.slug}` : "/";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    if (token?.role === "RESTAURANT_OWNER") {
      if (token.slug === urlSlug) {
        return NextResponse.next();
      }

      if (urlSlug !== token.slug) {
        return NextResponse.redirect(new URL(`/${token.slug}`, req.url));
      }
    }

    if (token?.role === "RESTAURANT_OWNER" && !token.slug) {
      return NextResponse.redirect(new URL("/sem-acesso", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isPublic =
          req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/";
        return isPublic ? true : !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|images|public|$).*)",
  ],
};
