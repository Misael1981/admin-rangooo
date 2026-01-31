import { getRestaurantMenuBySlug } from "@/data/get-restaurant-menu";
import HeaderCardapio from "./components/HearderCardapio";
import ManageMenu from "./components/ManageMenu";

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

  // Aqui você faz a serialização uma única vez se necessário
  const menuData = categories.map((cat) => ({
    ...cat,
    products: cat.products.map((p) => ({ ...p, price: Number(p.price) })),
    additionalIngredients: cat.additionalIngredients.map((i) => ({
      ...i,
      price: Number(i.price),
    })),
  }));

  console.log("menuData:", menuData);

  return (
    <div className="space-y-6 px-8 pb-8">
      <HeaderCardapio />

      <ManageMenu />
    </div>
  );
}
