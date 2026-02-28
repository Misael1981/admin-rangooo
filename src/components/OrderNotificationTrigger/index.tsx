"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  restaurantId: string;
}

const OrderNotificationTrigger = ({ restaurantId }: Props) => {
  const [lastCount, setLastCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkOrders = async () => {
      try {
        const res = await fetch(
          `/api/orders/check-new?restaurantId=${restaurantId}`,
        );
        const { count } = await res.json();

        if (lastCount === null) {
          setLastCount(count);
          return;
        }

        if (count > lastCount) {
          const audio = new Audio("/notification.wav");
          audio
            .play()
            .catch((e) =>
              console.log("Erro ao tocar som (bloqueio do browser):", e),
            );

          router.refresh();

          toast.success("NOVO PEDIDO CHEGOU!");
        }

        setLastCount(count);
      } catch (error) {
        console.error("Erro ao checar novos pedidos:", error);
      }
    };

    const interval = setInterval(checkOrders, 10000);
    return () => clearInterval(interval);
  }, [lastCount, restaurantId, router]);

  return null;
};

export default OrderNotificationTrigger;
