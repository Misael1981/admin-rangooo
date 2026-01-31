"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface GalleryWithDescriptionEstablishmentProps {
  description: string;
  avatarImageUrl: string;
  coverImageUrl: string;
  restaurantId: string;
}

export async function updateGalleryDescription({
  restaurantId,
  description,
  avatarImageUrl,
  coverImageUrl,
}: GalleryWithDescriptionEstablishmentProps) {
  try {
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        description,
        avatarImageUrl,
        coverImageUrl,
      },
    });

    revalidatePath("/perfil");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar identidade visual:", error);
    return { success: false, error: "Falha ao salvar a identidade visual." };
  }
}
