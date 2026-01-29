"use server";

import { db } from "@/lib/prisma";
import { ConsumptionMethod, PaymentMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateMethodsParams {
  restaurantId: string;
  consumptionMethods: ConsumptionMethod[];
  paymentMethods: PaymentMethod[];
  deliveryFee?: number;
}

export async function updateRestaurantMethods({
  restaurantId,
  consumptionMethods,
  paymentMethods,
  deliveryFee,
}: UpdateMethodsParams) {
  try {
    const resolvedDeliveryFee = consumptionMethods.includes("DELIVERY")
      ? (deliveryFee ?? 0)
      : 0;

    await db.$transaction([
      db.restaurant.update({
        where: { id: restaurantId },
        data: { deliveryFee: resolvedDeliveryFee },
      }),
      db.restaurantConsumptionMethod.deleteMany({ where: { restaurantId } }),
      db.restaurantConsumptionMethod.createMany({
        data: consumptionMethods.map((method, idx) => ({
          restaurantId,
          method,
          isActive: true,
          displayOrder: idx,
        })),
        skipDuplicates: true,
      }),
      db.restaurantPaymentMethod.deleteMany({ where: { restaurantId } }),
      db.restaurantPaymentMethod.createMany({
        data: paymentMethods.map((method, idx) => ({
          restaurantId,
          method,
          isActive: true,
          displayOrder: idx,
        })),
        skipDuplicates: true,
      }),
    ]);

    revalidatePath(`/(admin)/[slug]/orders`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action:", error);
    return {
      success: false,
      error: "Falha ao atualizar configurações no banco.",
    };
  }
}
