"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateAddressParams {
  restaurantId: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;
}

export async function updateRestaurantAddress({
  restaurantId,
  ...addressData
}: UpdateAddressParams) {
  try {
    await db.restaurant.update({
      where: { id: restaurantId },
      data: addressData,
    });

    revalidatePath("/perfil");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    return { success: false, error: "Falha ao salvar o endereço." };
  }
}
