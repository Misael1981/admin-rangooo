import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const urlPath = req.nextUrl.pathname;

    // Captura o primeiro segmento da URL (ex: "meu-restaurante")
    const urlSlug = urlPath.split("/")[1];

    // 1. REGRA DO ADMIN
    if (token?.role === "ADMIN") {
      return NextResponse.next();
    }

    // 2. BLOQUEIO DE ROTA ADMIN PARA NÃO-ADMINS
    // Impede que um dono de restaurante acesse /rangooo
    if (urlPath.startsWith("/rangooo") && token?.role !== "ADMIN") {
      const redirectUrl = token?.slug ? `/${token.slug}` : "/";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // 3. REGRA DO RESTAURANT_OWNER (Multi-tenant)
    if (token?.role === "RESTAURANT_OWNER") {
      // Se ele está tentando acessar o slug dele ou sub-páginas dele, OK
      if (token.slug === urlSlug) {
        return NextResponse.next();
      }

      // Se ele tentar acessar "/" ou o slug de outro, joga ele pro dele
      if (urlSlug !== token.slug) {
        return NextResponse.redirect(new URL(`/${token.slug}`, req.url));
      }
    }

    // 4. FALLBACK: Se cair aqui, manda pro login
    return NextResponse.next();
  },
  {
    callbacks: {
      // Só executa a função acima se houver um token (usuário logado)
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  /*
   * Matcher atualizado para ignorar:
   * - api (rotas de backend)
   * - _next/static e _next/image (arquivos do framework)
   * - favicon.ico e imagens públicas (public)
   * - login (sua página de entrada)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|images|public).*)",
  ],
};
