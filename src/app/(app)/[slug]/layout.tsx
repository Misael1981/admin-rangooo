import OrderNotificationTrigger from "@/components/OrderNotificationTrigger";
import { getEstablishmentBySlug } from "@/data/get-establishment-by-slug";

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const restaurant = await getEstablishmentBySlug(slug);

  if (!restaurant) {
    return <div>Restaurante não encontrado.</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      <OrderNotificationTrigger restaurantId={restaurant.id} />

      <div>{children}</div>
    </div>
  );
}
