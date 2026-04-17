"use client";

import { AreaType, OrderStatus } from "@prisma/client";
import { OrderItemDTO } from "@/dtos/order.dto";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import { getPusherClient } from "@/lib/pusher";
import { useRouter } from "next/navigation";
const CardOrder = dynamic(() => import("../CardOrder"), {
  ssr: false,
});

type OrderType = {
  id: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: string | null;
  orderNumber: number;
  totalAmount: number;
  status: OrderStatus;
  method: "DELIVERY" | "PICKUP" | "DINE_IN";
  createdAt: string;
  items: OrderItemDTO[];
  address?:
    | {
        street: string;
        number: string;
        city: string;
        neighborhood?: string;
        complement?: string;
        reference?: string;
        areaType?: AreaType;
      }
    | undefined;
};

type OrdersListWrapperProps = {
  normalizedOrders: OrderType[];
  slug: string;
  restaurantId: string;
};

const OrdersListWrapper = ({
  normalizedOrders,
  slug,
  restaurantId,
}: OrdersListWrapperProps) => {
  const [showDelivered, setShowDelivered] = useState(false);
  const [orders, setOrders] = useState(normalizedOrders);
  const router = useRouter();

  useEffect(() => {
    setOrders(normalizedOrders);
  }, [normalizedOrders]);

  const activeOrders = orders.filter((order) => order.status !== "DELIVERED");

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED",
  );

  useEffect(() => {
    const pusher = getPusherClient();
    console.log(
      "📡 Conectando ao Pusher, canal:",
      `restaurant-${restaurantId}`,
    );
    const channel = pusher.subscribe(`restaurant-${restaurantId}`);

    channel.bind("order:created", () => {
      router.refresh();
    });

    return () => {
      pusher.unsubscribe(`restaurant-${restaurantId}`);
    };
  }, [restaurantId, router]);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {orders.length === 0 ? (
        <div className="w-full max-w-md flex flex-col items-center justify-center gap-3 border border-gray-200 bg-gray-50 p-6 rounded-xl text-center shadow-sm">
          <span className="text-3xl">📭</span>

          <h3 className="text-lg font-semibold text-gray-800">
            Nenhum pedido por enquanto
          </h3>

          <p className="text-sm text-gray-600">
            Assim que novos pedidos chegarem, eles aparecerão aqui.
          </p>
        </div>
      ) : (
        activeOrders.map((order) => (
          <CardOrder key={order.id} order={order} slug={slug} />
        ))
      )}

      {deliveredOrders.length > 0 && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="h-1 bg-gray-200 flex-1" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDelivered(!showDelivered)}
              className="rounded-full border-gray-300 text-gray-600 hover:bg-gray-100 transition-all gap-2"
            >
              {showDelivered ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ocultar pedidos entregues ({deliveredOrders.length})
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Mostrar pedidos entregues ({deliveredOrders.length})
                </>
              )}
            </Button>
            <div className="h-1 bg-gray-200 flex-1" />
          </div>

          {/* SEÇÃO DE PEDIDOS CONCLUÍDOS (RENDERIZAÇÃO CONDICIONAL) */}
          {showDelivered && (
            <section className="flex flex-col items-center justify-center gap-4 w-full opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-green-600 font-medium text-sm mb-2">
                <CheckCircle2 className="h-4 w-4" />
                Histórico de entregas do turno
              </div>
              {deliveredOrders.map((order) => (
                <CardOrder key={order.id} order={order} slug={slug} />
              ))}
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default OrdersListWrapper;
