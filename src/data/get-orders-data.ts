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
      orderNumber: true,
      consumptionMethod: true,
      createdAt: true,
      deliveryAddress: true,
      paymentMethod: true,
      items: {
        select: {
          id: true,
          quantity: true,
          priceAtOrder: true,
          customName: true, // Garanta que o nome customizado venha aqui
          // ADICIONE ESTES:
          extras: true,
          removedIngredients: true,
          additionalIngredients: true,
          // CAMPOS DO SABOR 2 (que você já colocou e estão certos):
          isDouble: true,
          flavor2Id: true,
          flavor2Name: true,
          flavor2Removed: true,
          flavor2additionalIngredients: true,
          product: {
            select: {
              name: true,
              menuCategory: { select: { name: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const safeRestaurant = {
    ...restaurant,
    deliveryFee: Number(restaurant.deliveryFee),
  };

  // No final do get-orders-data.ts
  const viewOrders = orders.map((o) => ({
    id: o.id,
    customerName: o.user?.name ?? "Cliente Final",
    customerPhone: o.user?.phone ?? "",
    totalAmount: Number(o.totalAmount),
    orderNumber: o.orderNumber,
    status: o.status,
    method: o.consumptionMethod,
    paymentMethod: o.paymentMethod,
    createdAt: o.createdAt.toISOString(),
    address: o.deliveryAddress,
    items: o.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
      priceAtOrder: Number(i.priceAtOrder),
      name: i.customName || i.product.name,
      extras: i.extras,
      removedIngredients: i.removedIngredients,
      additionalIngredients: i.additionalIngredients,
      category: i.product.menuCategory?.name ?? "Geral",
      // SABOR 2
      isDouble: i.isDouble,
      flavor2Name: i.flavor2Name,
      flavor2Removed: i.flavor2Removed,
      flavor2additionalIngredients: i.flavor2additionalIngredients,
    })),
  }));

  return { restaurant: safeRestaurant, orders: viewOrders };

  return {
    restaurant: safeRestaurant,
    orders: viewOrders,
  };
}
