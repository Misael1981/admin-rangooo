import { db } from "@/lib/prisma";

export async function getLeads() {
  return await db.leadApplication.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      restaurantName: true,
      city: true,
      state: true,
      notes: true,
      status: true,
      approvedAt: true,
      approvedBy: true,
      createdAt: true,
    },
    take: 30,
  });
}
