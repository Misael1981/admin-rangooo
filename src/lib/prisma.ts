import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const isProd = process.env.NODE_ENV === "production";

export const prisma =
  globalThis.cachedPrisma ??
  new PrismaClient({
    log: isProd ? ["error"] : ["warn", "error"],
  });

if (!isProd) {
  globalThis.cachedPrisma = prisma;
}

export const db = prisma;
export default prisma;
