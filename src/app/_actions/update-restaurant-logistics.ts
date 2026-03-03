"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AreaType, PlanType } from "@prisma/client";

export async function updateRestaurantLogistics(
  restaurantId: string,
  data: {
    plan: PlanType;
    deliveryFees: {
      areaType: AreaType;
      fee: number;
    }[];
  },
) {
  try {
    await db.$transaction(
      data.deliveryFees.map((fee) =>
        db.deliveryArea.upsert({
          where: {
            restaurantId_areaType: {
              restaurantId: restaurantId,
              areaType: fee.areaType,
            },
          },
          update: { fee: fee.fee },
          create: {
            restaurantId: restaurantId,
            areaType: fee.areaType,
            fee: fee.fee,
          },
        }),
      ),
    );

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Erro no Update de Logística:", error);
    return { success: false, error: "Falha ao salvar configurações." };
  }
}
