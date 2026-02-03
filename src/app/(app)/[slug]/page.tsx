import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import StatusOpenSwitch from "@/components/StatusOpenSwitch";
import CardForHeader from "./components/CardForHeader";
import DailySalesSummary from "./components/DailySalesSummary";
import { endOfDay, startOfDay } from "date-fns";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Establishment({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  console.log(session?.user);

  if (!session?.user) {
    redirect("/");
  }

  const today = new Date();

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      isOpen: true,
      slug: true,
      orders: {
        where: {
          status: { not: "CANCELED" },
          createdAt: {
            gte: startOfDay(today),
            lte: endOfDay(today),
          },
        },
        select: {
          id: true,
          status: true,
          totalAmount: true,
          consumptionMethod: true,
          createdAt: true,
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="px-8 space-y-8 pb-8">
      {/* Header */}
      <BreadcrumbComponent currentPage="" slug={slug} />
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardForHeader userName={session.user.name} />

        <div className="flex items-start md:items-center justify-center">
          <StatusOpenSwitch
            initialIsOpen={restaurant.isOpen}
            restaurantId={restaurant.id}
            restaurantSlug={slug}
          />
        </div>
      </header>

      {/* Seção Resumo do dia */}
      <DailySalesSummary todayOrders={restaurant.orders} />
    </div>
  );
}
