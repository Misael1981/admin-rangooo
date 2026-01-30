"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ChefHat,
  Clock,
  Package,
  Truck,
  UtensilsCrossed,
  XCircle,
  LucideIcon,
} from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ConsumptionMethod, OrderStatus } from "@prisma/client";
import { OrderDTO } from "@/dtos/order.dto";

// 1. Tipagem das Configurações
interface MethodConfig {
  icon: LucideIcon;
  label: string;
  color: string;
}

const METHOD_CONFIGS: Record<ConsumptionMethod, MethodConfig> = {
  DELIVERY: { icon: Truck, label: "Entrega", color: "text-blue-600" },
  PICKUP: { icon: Package, label: "Retirada", color: "text-green-600" },
  DINE_IN: { icon: UtensilsCrossed, label: "Mesa", color: "text-purple-600" },
};

interface StatusConfig {
  variant: "default" | "secondary" | "destructive" | "outline";
  icon: LucideIcon;
  label: string;
  color: string;
}

const STATUS_CONFIGS: Record<OrderStatus, StatusConfig> = {
  PENDING: {
    variant: "secondary",
    icon: Clock,
    label: "Pendente",
    color: "text-amber-600 bg-amber-50",
  },
  CONFIRMED: {
    variant: "default",
    icon: CheckCircle,
    label: "Confirmado",
    color: "text-blue-600 bg-blue-50",
  },
  PREPARING: {
    variant: "default",
    icon: ChefHat,
    label: "Em Preparo",
    color: "text-purple-600 bg-purple-50",
  },
  READY_FOR_PICKUP: {
    variant: "default",
    icon: Package,
    label: "Pronto p/ Retirada",
    color: "text-green-600 bg-green-50",
  },
  OUT_FOR_DELIVERY: {
    variant: "default",
    icon: Truck,
    label: "A Caminho",
    color: "text-orange-600 bg-orange-50",
  },
  DELIVERED: {
    variant: "default",
    icon: CheckCircle,
    label: "Entregue",
    color: "text-green-600 bg-green-50",
  },
  CANCELED: {
    variant: "destructive",
    icon: XCircle,
    label: "Cancelado",
    color: "text-red-600 bg-red-50",
  },
};

interface CardOrderProps {
  order: OrderDTO;
}

const CardOrder = ({ order }: CardOrderProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const methodConfig = METHOD_CONFIGS[order.method];
  const MethodIcon = methodConfig.icon;
  const statusConfig = STATUS_CONFIGS[order.status];
  const StatusIcon = statusConfig.icon;

  const itemsText = order.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(" · ");

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/orders`, {
        method: "PATCH",
        body: JSON.stringify({ id: order.id, status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();
      toast.success("Status atualizado!");
      router.refresh();
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

  if (!isMounted) return null; // Evita erro de hidratação com datas

  return (
    <Card className="w-full max-w-3xl border-2 transition-all hover:border-primary/20">
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${methodConfig.color} border-current`}
            >
              <MethodIcon className="mr-1 h-4 w-4" />
              {methodConfig.label}
            </Badge>
            <Badge
              variant={statusConfig.variant}
              className={statusConfig.color}
            >
              <StatusIcon className="mr-1 h-4 w-4" />
              {statusConfig.label}
            </Badge>
          </div>

          <Select
            onValueChange={handleStatusUpdate}
            defaultValue={order.status}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(STATUS_CONFIGS).map((status) => (
                <SelectItem key={status} value={status}>
                  {STATUS_CONFIGS[status as OrderStatus].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {itemsText}
          </p>
          <span className="text-sm font-bold text-green-600">
            {formatCurrency(Number(order.totalAmount))}
          </span>
        </div>

        <Separator />

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {order.customerName || "Cliente"}
            </p>
            {order.method === "DELIVERY" && order.address && (
              <p className="text-xs text-muted-foreground">
                {order.address.street}, {order.address.number}
              </p>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground uppercase">
            {new Intl.DateTimeFormat("pt-BR", { timeStyle: "short" }).format(
              new Date(order.createdAt),
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardOrder;
