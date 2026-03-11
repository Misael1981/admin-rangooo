export const dynamic = "force-dynamic";

import { Motorbike } from "lucide-react";
import HeaderPages from "../components/HeaderPages";
import { db } from "@/lib/prisma";
import DeliveryDriverCard from "./components/DeliveryDriverCard";

export default async function DeliveryDriversPage() {
  const deliveryDrivers = await db.deliveryPerson.findMany({
    include: {
      user: {
        select: {
          name: true,
          phone: true,
          email: true,
          addresses: {
            where: { isDefault: true },
            take: 1,
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-4 lg:px-8 pb-8">
      <HeaderPages
        title="Pedidos de Cadastro"
        description="Cadastre um novo pedido"
        icon={<Motorbike className="h-6 w-6" />}
      />

      <section className="mt-8 flex justify-center items-center flex-wrap gap-4">
        {deliveryDrivers.map((item) => (
          <DeliveryDriverCard key={item.id} deliveryDriver={item} />
        ))}
      </section>
    </div>
  );
}
