// src/dtos/order.dto.ts
import { AreaType, OrderStatus } from "@prisma/client";

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
  id?: string;
  name: string;
  price: number;
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
    category: string;
  };
};

export type OrderDTO = {
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
