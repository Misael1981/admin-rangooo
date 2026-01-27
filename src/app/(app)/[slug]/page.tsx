import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import StatusOpenSwitch from "@/components/StatusOpenSwitch";
import CardForHeader from "./components/CardForHeader";
interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Establishment({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) {
    return notFound();
  }

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div className="px-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardForHeader
          restaurantName={restaurant.name}
          userName={session.user.name}
        />

        <div className="flex items-start md:items-center justify-center">
          <StatusOpenSwitch
            initialIsOpen={restaurant.isOpen}
            restaurantId={restaurant.id}
            restaurantSlug={slug}
          />
        </div>
      </header>
    </div>
  );
}
