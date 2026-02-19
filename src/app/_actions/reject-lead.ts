"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function rejectLead(leadId: string) {
  try {
    await db.leadApplication.update({
      where: { id: leadId },
      data: {
        status: "REJECTED",
        rejectedAt: new Date(),
      },
    });

    revalidatePath("/rangooo/pedidos-cadastro");

    return { success: true };
  } catch (error) {
    console.error("Erro ao rejeitar o lead:", error);
    return { error: "Erro ao rejeitar o lead." };
  }
}
