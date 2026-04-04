import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import StatusOpenSwitch from "@/components/StatusOpenSwitch";
import CardForHeader from "./components/CardForHeader";
import DailySalesSummary from "./components/DailySalesSummary";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import NotificationMobile from "@/components/NotificationMobile";
import { Card } from "@/components/ui/card";
interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Establishment({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  function getBrasiliaDate() {
    const now = new Date();
    const spDateString = now.toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    });
    return new Date(spDateString);
  }

  const now = getBrasiliaDate();
  const cutoffHour = 6;

  const startOfShift = new Date(now);
  if (now.getHours() < cutoffHour) {
    startOfShift.setDate(startOfShift.getDate() - 1);
  }

  startOfShift.setHours(cutoffHour, 0, 0, 0);

  const endOfShift = new Date(startOfShift);
  endOfShift.setDate(endOfShift.getDate() + 1);

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
            gte: startOfShift,
            lt: endOfShift,
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
      <div className="flex items-center justify-between">
        <BreadcrumbComponent currentPage="" slug={slug} />
        <NotificationMobile />
      </div>
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

      {!restaurant.isOpen ? (
        <Card className="w-full flex flex-col items-center justify-center gap-4 border-yellow-300 bg-yellow-50 p-8 text-center shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">⚠️</span>

            <h2 className="text-xl font-semibold text-yellow-800">
              Estabelecimento fechado
            </h2>

            <p className="text-sm text-yellow-700 max-w-md">
              Seu estabelecimento está fechado no momento. Abra para começar a
              receber pedidos.
            </p>
          </div>

          <div className="mt-4">
            <span className="text-xs text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
              Nenhum pedido será recebido enquanto estiver fechado
            </span>
          </div>
        </Card>
      ) : (
        <DailySalesSummary todayOrders={restaurant.orders} />
      )}
    </div>
  );
}
