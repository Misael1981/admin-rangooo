import { db } from "@/lib/prisma";

export async function getOnlineDeliveryPersons() {
  const deliveryPersons = await db.deliveryPerson.findMany({
    where: {
      isOnline: true,
      status: "ACTIVE",
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });

  return deliveryPersons.map((dp) => ({
    id: dp.id,
    name: dp.user.name,
    phone: dp.user.phone,
  }));
}
