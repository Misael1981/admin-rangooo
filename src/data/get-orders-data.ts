import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";

export async function getOrdersData(slug: string, method?: ConsumptionMethod) {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      consumptionMethods: true,
      paymentMethods: true,
      deliveryFee: true,
    },
  });

  if (!restaurant) return null;

  const now = new Date();
  const cutoffHour = 6;
  const startOfShift = new Date(now);

  if (now.getHours() < cutoffHour) {
    startOfShift.setDate(startOfShift.getDate() - 1);
  }
  startOfShift.setHours(cutoffHour, 0, 0, 0);

  const endOfShift = new Date(startOfShift);
  endOfShift.setDate(endOfShift.getDate() + 1);

  const orders = await db.order.findMany({
    where: {
      restaurantId: restaurant.id,
      consumptionMethod: method,
      createdAt: {
        gte: startOfShift,
        lt: endOfShift,
      },
    },
    select: {
      id: true,
      user: { select: { name: true, phone: true } },
      totalAmount: true,
      status: true,
      consumptionMethod: true,
      createdAt: true,
      deliveryAddress: true,
      items: {
        select: {
          quantity: true,
          product: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Formatação para o Front-end (Sanitização)
  const safeRestaurant = {
    ...restaurant,
    deliveryFee: Number(restaurant.deliveryFee),
  };

  const viewOrders = orders.map((o) => ({
    id: o.id,
    customerName: o.user?.name ?? "Cliente Final",
    customerPhone: o.user?.phone ?? "",
    totalAmount: Number(o.totalAmount),
    status: o.status,
    method: o.consumptionMethod,
    createdAt: o.createdAt.toISOString(),
    address: o.deliveryAddress,
    items: o.items.map((i) => ({
      name: i.product.name,
      quantity: i.quantity,
    })),
  }));

  return {
    restaurant: safeRestaurant,
    orders: viewOrders,
  };
}
