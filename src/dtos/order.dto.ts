// src/dtos/order.dto.ts
import { ConsumptionMethod, OrderStatus } from "@prisma/client";

export type OrderAddress = {
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood?: string;
};

export type OrderItemDTO = {
  name: string;
  quantity: number;
};

export type OrderDTO = {
  id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: OrderStatus;
  method: ConsumptionMethod;
  createdAt: string;
  address: OrderAddress | null;
  items: OrderItemDTO[];
};
