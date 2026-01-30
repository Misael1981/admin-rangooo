"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ContactType } from "@prisma/client";

interface ContactInput {
  type: ContactType;
  number: string;
  isPrimary: boolean;
}

interface UpdateContactsParams {
  restaurantId: string;
  contacts: ContactInput[];
}

export async function updateRestaurantContacts({
  restaurantId,
  contacts,
}: UpdateContactsParams) {
  try {
    const cleanedContacts = contacts.map((c) => ({
      ...c,
      number: c.number.replace(/\D/g, ""),
    }));

    await db.$transaction([
      db.contactNumber.deleteMany({
        where: { restaurantId },
      }),
      db.restaurant.update({
        where: { id: restaurantId },
        data: {
          contacts: {
            create: cleanedContacts,
          },
        },
      }),
    ]);

    revalidatePath("/perfil");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar contatos:", error);
    return { success: false, error: "Falha ao salvar contatos no banco." };
  }
}
