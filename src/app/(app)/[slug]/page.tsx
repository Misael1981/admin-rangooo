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
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Bem-vindo ao painel: <span className="text-blue-500">{slug}</span>
      </h1>
      <p className="text-muted-foreground">
        Usuário logado: {session.user?.email}
      </p>
    </div>
  );
}
