"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleEstablishmentStatus(
  id: string,
  isOpen: boolean,
  slug: string,
) {
  try {
    await db.restaurant.update({
      where: { id },
      data: { isOpen },
    });

    revalidatePath(`/${slug}`);

    return { success: true };
  } catch (error) {
    console.error("Falha ao atualizar status:", error);
    return { success: false, error: "Falha ao atualizar status" };
  }
}
