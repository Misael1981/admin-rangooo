"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAdditionalInput {
  name: string;
  price: number;
  menuCategoryId: string;
  slug: string;
}

export async function createAdditional({
  name,
  price,
  menuCategoryId,
  slug,
}: CreateAdditionalInput) {
  try {
    await db.additionalIngredient.create({
      data: {
        name,
        price,
        menuCategoryId,
      },
    });

    revalidatePath(`/${slug}/cardapio`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar adicional:", error);
    return { success: false, error: "Falha ao criar o ingrediente adicional." };
  }
}

export async function updateAdditional({
  id,
  name,
  price,
  slug,
}: {
  id: string;
  name: string;
  price: number;
  slug: string;
}) {
  try {
    await db.additionalIngredient.update({
      where: { id },
      data: { name, price },
    });

    revalidatePath(`/${slug}/cardapio`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao editar adicional:", error);
    return { success: false, error: "Falha ao atualizar o item." };
  }
}

export async function deleteAdditional(id: string, slug: string) {
  try {
    await db.additionalIngredient.delete({
      where: { id },
    });

    revalidatePath(`/${slug}/cardapio`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir adicional:", error);
    return { success: false, error: "Falha ao remover o item." };
  }
}
