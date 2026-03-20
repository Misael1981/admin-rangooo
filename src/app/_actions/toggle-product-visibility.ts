"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleProductVisibility(
  productId: string,
  isVisible: boolean,
  slug: string,
) {
  try {
    await db.product.update({
      where: { id: productId },
      data: { isVisible },
      select: { id: true },
    });

    revalidatePath(`/${slug}/cardapio`);
    return { success: true };
  } catch (error) {
    console.error("ERRO_TOGGLE_VISIBILIDADE:", error);
    return { success: false };
  }
}
