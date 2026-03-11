"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DeliveryPersonStatus } from "@prisma/client";

export async function updateDeliveryPersonStatus(id: string, status: string) {
  try {
    await prisma.deliveryPerson.update({
      where: { id },
      data: {
        status: status as DeliveryPersonStatus,
      },
    });

    revalidatePath("/rangooo/pedidos-entregadores");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar status do entregador:", error);
    return { error: "Não foi possível atualizar o status." };
  }
}
