import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { db } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      slug?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    establishmentSlug: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    slug?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    // src/lib/auth.ts

    async signIn({ user, account }) {
      // 1. Se for Google, a gente confia no e-mail
      if (account?.provider === "google") {
        return true;
      }

      // 2. Se você quiser restringir apenas a quem já está no banco:
      const userExists = await db.user.findUnique({
        where: { email: user.email! },
      });

      if (!userExists) {
        return "/auth/error?error=UserNotFound";
      }

      return true;
    },
    async jwt({ token, user }) {
      // No login inicial, o 'user' está disponível
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email! },
        });

        if (dbUser) {
          token.role = dbUser.role;
          const restaurant = await db.restaurant.findFirst({
            where: { ownerId: dbUser.id },
            select: { slug: true },
          });
          token.slug = restaurant?.slug;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as string;
        session.user.slug = token.slug as string;
      }
      return session;
    },
    // Removi o redirect manual pra deixar o NextAuth lidar com o baseUrl padrão
  },
  pages: {
    signIn: "/",
    error: "/auth/error", // Garanta que essa página exista para você ver o erro real
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // CERTIFIQUE-SE QUE ISSO ESTÁ NA VERCEL
};
