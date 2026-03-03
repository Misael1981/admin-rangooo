import { db } from "@/lib/prisma";

export async function getOpeningHoursBySlug(slug: string) {
  const establishment = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      businessHours: {
        orderBy: {
          dayOfWeek: "asc",
        },
        select: {
          id: true,
          dayOfWeek: true,
          timeSlots: true,
          isClosed: true,
        },
      },
    },
  });

  return establishment;
}
