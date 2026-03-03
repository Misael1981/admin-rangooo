"use server";

import { db } from "@/lib/prisma";
import { BusinessHoursFormData } from "@/schemas/establishments-schemas";
import { revalidatePath } from "next/cache";

export async function updateBusinessHours(
  slug: string,
  businessHoursData: BusinessHoursFormData,
  restaurantId: string,
) {
  try {
    await db.$transaction([
      db.businessHours.deleteMany({
        where: { restaurantId },
      }),

      db.businessHours.createMany({
        data: businessHoursData.businessHours.map((bh) => ({
          restaurantId,
          dayOfWeek: bh.dayOfWeek,
          timeSlots: bh.timeSlots,
          isClosed: bh.isClosed,
          displayOrder: bh.dayOfWeek,
        })),
      }),
    ]);

    revalidatePath(`/${slug}/horarios-funcionamento`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar horários:", error);
    return {
      success: false,
      error: "Falha ao salvar os horários de funcionamento.",
    };
  }
}
