import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import MetricCard from "../MetricCard";
import {
  DollarSign,
  Motorbike,
  ShoppingBag,
  User,
  UtensilsCrossed,
} from "lucide-react";
import DailySummaryCard from "../DailySummaryCard";
import { Button } from "@/components/ui/button";
import { Decimal } from "@prisma/client/runtime/library";
import { formatCurrency } from "@/helpers/format-currency";

// 1. Defina como é UM pedido (conforme o seu select do Prisma)
interface Order {
  id: string;
  status: string;
  totalAmount: Decimal; // ou Decimal, dependendo do seu schema
  consumptionMethod: "DELIVERY" | "PICKUP" | "DINE_IN" | string;
  createdAt: Date;
}

// 2. Defina que as Props do componente recebem uma lista (Array) de Orders
interface DailySalesSummaryProps {
  todayOrders: Order[];
}

const DailySalesSummary = ({ todayOrders }: DailySalesSummaryProps) => {
  // Aqui entra aquela lógica de cálculo que conversamos:
  const deliveryOrders = todayOrders.filter(
    (o) => o.consumptionMethod === "DELIVERY",
  );
  const pickupOrders = todayOrders.filter(
    (o) => o.consumptionMethod === "PICKUP",
  );
  const dineInOrders = todayOrders.filter(
    (o) => o.consumptionMethod === "DINE_IN",
  );

  // const deliveryTotal = deliveryOrders.reduce(
  //   (acc, o) => acc + Number(o.totalAmount),
  //   0,
  // );
  // const pickupTotal = pickupOrders.reduce(
  //   (acc, o) => acc + Number(o.totalAmount),
  //   0,
  // );
  // const dineInTotal = dineInOrders.reduce(
  //   (acc, o) => acc + Number(o.totalAmount),
  //   0,
  // );

  const total = todayOrders.reduce((acc, o) => acc + Number(o.totalAmount), 0);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Resumo do Dia</h2>
        <p className="text-sm text-gray-600">
          {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <MetricCard
          title="Faturamento Total"
          value={formatCurrency(Number(total))}
          description="em relação a ontem"
          icon={DollarSign}
        />

        <MetricCard
          title="Pedidos"
          value={todayOrders.length}
          description="total de pedidos"
          icon={ShoppingBag}
        />

        {deliveryOrders.length > 0 && (
          <MetricCard
            title="Delivery"
            value={deliveryOrders.length}
            description="pedidos para entrega"
            icon={Motorbike}
          />
        )}

        {pickupOrders.length > 0 && (
          <MetricCard
            title="Retirar"
            value={pickupOrders.length}
            description="pedidos para retirada"
            icon={User}
          />
        )}

        {dineInOrders.length > 0 && (
          <MetricCard
            title="Mesa"
            value={dineInOrders.length}
            description="pedidos para consumo no local"
            icon={UtensilsCrossed}
          />
        )}
      </div>

      <DailySummaryCard
        delivery={{ count: 25, value: 2500 }}
        pickup={{ count: 17, value: 1700 }}
      />

      <div className="flex justify-end">
        <Button className="text-lg cursor-pointer p-4">Salvar</Button>
      </div>
    </section>
  );
};

export default DailySalesSummary;
