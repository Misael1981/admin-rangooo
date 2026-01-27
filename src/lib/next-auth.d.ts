import { DefaultSession } from "next-auth";

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
