import { db } from "@/lib/prisma";

// Transformamos em uma função para chamar dentro do componente
export async function getLeads() {
  return await db.leadApplication.findMany({
    orderBy: { createdAt: "desc" },
    // O select está ótimo, você pegou tudo o que é importante!
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
    take: 30, // Boa prática para não travar o banco se tiver 1 milhão de leads
  });
}
