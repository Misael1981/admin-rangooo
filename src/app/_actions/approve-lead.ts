"use server";

import db from "@/lib/prisma";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function approveLead(leadId: string) {
  try {
    const lead = await db.leadApplication.findUnique({ where: { id: leadId } });
    if (!lead) return { error: "Lead não encontrado" };

    const token = Buffer.from(randomUUID()).toString("base64url");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    await db.$transaction([
      db.leadApplication.update({
        where: { id: leadId },
        data: { status: "APPROVED", approvedAt: new Date() },
      }),
      db.enrollmentInvite.create({
        data: {
          leadId,
          email: lead.email,
          token,
          expiresAt,
        },
      }),
    ]);

    revalidatePath("/rangooo/pedidos-cadastro");

    const inviteLink = `https://sistema-rangooo.vercel.app/onboarding?token=${token}`;
    return { success: true, inviteLink };
  } catch (error) {
    console.error("Erro ao aprovar o lead:", error);
    return { error: "Erro ao aprovar o lead." };
  }
}
