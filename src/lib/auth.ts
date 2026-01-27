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
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userExists = await db.user.findUnique({
        where: { email: user.email! },
      });

      if (userExists) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        const restaurant = await db.restaurant.findFirst({
          where: { ownerId: user.id },
          select: { slug: true },
        });
        console.log("Busca de Restaurante no Login:", restaurant); // Adicione esse log
        token.slug = restaurant?.slug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.slug = token.slug as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
};
