import { db } from "@/lib/prisma";

export async function getAllEstablishments() {
  return await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: { name: "asc" },
  });
}
