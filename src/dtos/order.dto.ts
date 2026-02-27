// src/dtos/order.dto.ts
import { AreaType, ConsumptionMethod, OrderStatus } from "@prisma/client";

export type OrderAddress = {
  street: string;
  number: string;
  neighborhood?: string;
  complement?: string;
  reference?: string;
  city: string;
  areaType?: AreaType;
};

export type OrderItemDTO = {
  name: string;
  quantity: number;
  category: string;
};

export type OrderItemPrintDTO = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
};

export type OrderDTO = {
  id: string;
  customerName: string;
  customerPhone: string;
  orderNumber: number;
  totalAmount: number;
  status: OrderStatus;
  method: ConsumptionMethod;
  createdAt: string;
  address: OrderAddress | null;
  items: OrderItemDTO[];
};
