"use server";

import { db } from "@/lib/prisma"; // Ajuste o caminho do seu prisma client
import { revalidatePath } from "next/cache";

interface UpsertProductPayload {
  id?: string;
  restaurantId?: string;
  name: string;
  price: number;
  description?: string | null;
  imageUrl: string;
  ingredients: string[];
  menuCategoryId: string;
  slug: string;
}

export const upsertProduct = async (data: UpsertProductPayload) => {
  try {
    let finalRestaurantId = data.restaurantId;

    // 2. Se for criação e não veio o ID, buscamos pelo slug
    if (!data.id && !finalRestaurantId) {
      const restaurant = await db.restaurant.findUnique({
        where: { slug: data.slug },
        select: { id: true },
      });

      if (!restaurant) throw new Error("Restaurante não encontrado");

      finalRestaurantId = restaurant.id; // Aqui ele vira uma STRING garantida
    }

    if (data.id) {
      // MODO EDIÇÃO
      await db.product.update({
        where: { id: data.id },
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: data.imageUrl,
          ingredients: data.ingredients,
        },
      });
    } else {
      // MODO CRIAÇÃO
      await db.product.create({
        data: {
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: data.imageUrl,
          ingredients: data.ingredients,
          menuCategoryId: data.menuCategoryId,
          restaurantId: finalRestaurantId as string,
        },
      });
    }

    revalidatePath(`/${data.slug}/cardapio`);
    return { success: true };
  } catch (error) {
    console.error("Erro na Action upsertProduct:", error);
    return { success: false, error: "Erro ao salvar o produto." };
  }
};

export const deleteProduct = async (id: string, slug: string) => {
  try {
    await db.product.delete({
      where: {
        id: id,
        restaurant: {
          slug: slug,
        },
      },
    });

    revalidatePath(`/${slug}/cardapio`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return { success: false, error: "Falha ao deletar o produto." };
  }
};
