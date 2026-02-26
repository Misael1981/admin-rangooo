import { OrderDTO } from "@/dtos/order.dto";
import { OrderStatus } from "@prisma/client";
import { CheckCircle, ChefHat, Clock, LucideIcon, XCircle } from "lucide-react";

interface StatusConfig {
  variant: "default" | "secondary" | "destructive" | "outline";
  icon: LucideIcon;
  label: string;
  color: string;
}

export const STATUS_CONFIGS: Record<OrderStatus, StatusConfig> = {
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

export interface CardOrderProps {
  order: OrderDTO;
}
