"use server";

import { db } from "@/lib/prisma";
import { RestaurantCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";

const RestaurantCategoryOptions = [
  "RESTAURANT",
  "PIZZARIA",
  "HAMBURGUERIA",
  "SORVETERIA",
  "ACAI",
  "SAUDAVEL",
  "DOCES",
] as const;

type RestaurantCategoryType = (typeof RestaurantCategoryOptions)[number];

interface UpdateProfileParams {
  id: string;
  name: string;
  category: RestaurantCategoryType; // O enum do Prisma
  slug: string;
}

export async function updateRestaurantProfile({
  id,
  ...data
}: UpdateProfileParams) {
  try {
    await db.restaurant.update({
      where: { id },
      data,
    });

    revalidatePath(`/(admin)/[slug]/perfil`, "page");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erro ao atualizar perfil." };
  }
}
