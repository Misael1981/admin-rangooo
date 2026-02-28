import { db } from "@/lib/prisma";

export type EstablishmentBasicInfo = {
  id: string;
  name: string;
  slug: string;
};

export async function getEstablishmentBySlug(
  slug: string,
): Promise<EstablishmentBasicInfo | null> {
  try {
    const establishment = await db.restaurant.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!establishment) return null;

    return establishment;
  } catch (err) {
    console.error("Erro ao buscar dados do estabelecimento:", err);
    return null;
  }
}
