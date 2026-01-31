import { db } from "@/lib/prisma";

export const getRestaurantMenuBySlug = async (slug: string) => {
  return await db.menuCategory.findMany({
    where: {
      restaurant: { slug },
    },
    include: {
      _count: {
        select: { products: true },
      },
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          description: true,
          ingredients: true,
        },
        orderBy: { name: "asc" },
      },
      additionalIngredients: true,
    },
    orderBy: { displayOrder: "asc" },
  });
};
