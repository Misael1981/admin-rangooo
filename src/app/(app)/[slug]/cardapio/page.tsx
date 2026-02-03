import { getRestaurantMenuBySlug } from "@/data/get-restaurant-menu";
import HeaderCardapio from "./components/HearderCardapio";
import ManageMenu from "./components/ManageMenu";
import { MenuCategoryDTO } from "@/dtos/menu.dto";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";

export default async function CardapioPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const categories = await getRestaurantMenuBySlug(slug);

  if (!categories || categories.length === 0) {
    return <div>O cardápio ainda está sendo montado ou não existe.</div>;
  }

  const menuData: MenuCategoryDTO[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    displayOrder: cat.displayOrder,
    productsCount: cat._count.products,

    products: cat.products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: Number(p.price),
      imageUrl: p.imageUrl,
      ingredients: p.ingredients,
    })),

    additionalIngredients: cat.additionalIngredients.map((i) => ({
      id: i.id,
      name: i.name,
      price: Number(i.price),
    })),
  }));

  return (
    <div className="space-y-6 px-8 pb-8">
      {/* Breadcrumb */}
      <BreadcrumbComponent currentPage="Cardápio" slug={slug} />
      <HeaderCardapio />

      <ManageMenu menuData={menuData} slug={slug} />
    </div>
  );
}
