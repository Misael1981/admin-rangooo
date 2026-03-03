"use server";

import { db } from "@/lib/prisma";
import { ConsumptionMethod, PaymentMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateMethodsParams {
  restaurantId: string;
  slug: string;
  consumptionMethods: ConsumptionMethod[];
  paymentMethods: PaymentMethod[];
}

export async function updateRestaurantMethods({
  restaurantId,
  slug,
  consumptionMethods,
  paymentMethods,
}: UpdateMethodsParams) {
  try {
    await db.$transaction([
      db.restaurantConsumptionMethod.deleteMany({ where: { restaurantId } }),
      db.restaurantConsumptionMethod.createMany({
        data: consumptionMethods.map((method, idx) => ({
          restaurantId,
          method,
          isActive: true,
          displayOrder: idx,
        })),
      }),

      db.restaurantPaymentMethod.deleteMany({ where: { restaurantId } }),
      db.restaurantPaymentMethod.createMany({
        data: paymentMethods.map((method, idx) => ({
          restaurantId,
          method,
          isActive: true,
          displayOrder: idx,
        })),
      }),
    ]);

    revalidatePath(`/${slug}/plano-metodos`);

    return { success: true };
  } catch (error) {
    console.error("Erro na Server Action de Métodos:", error);
    return {
      success: false,
      error: "Falha ao atualizar métodos de pagamento e consumo.",
    };
  }
}
