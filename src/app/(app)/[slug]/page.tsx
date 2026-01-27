import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

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
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrativo - {restaurant.name}
          </h1>
          <p className="text-gray-600">Olá, {session.user.name}</p>
          <p className="text-gray-600">Gerencie seus pedidos e usuários</p>
        </div>
      </div>
    </div>
  );
}
