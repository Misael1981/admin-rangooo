import { getOrdersData } from "@/data/get-orders-data";
import HeaderOrdersPage from "./components/HeaderOrdersPage";
import { notFound } from "next/navigation";
import ConsumptionAndPaymentMethodsForm from "./components/ConsumptionAndPaymentMethodsForm";
import {
  PAYMENT_METHODS,
  type PaymentMethodValue,
} from "@/helpers/methods-restaurant-options";
import { ConsumptionMethod, PaymentMethod } from "@prisma/client";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import CardOrder from "./components/CardOrder";
import { Prisma } from "@prisma/client";

type OrderAddress = {
  street: string;
  number: string;
  city: string;
  state: string;
  neighborhood?: string;
};

function parseAddress(address: Prisma.JsonValue | null): OrderAddress | null {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return null;
  }

  const a = address as Record<string, unknown>;

  if (
    typeof a.street === "string" &&
    typeof a.number === "string" &&
    typeof a.city === "string" &&
    typeof a.state === "string"
  ) {
    return {
      street: a.street,
      number: a.number,
      city: a.city,
      state: a.state,
      neighborhood:
        typeof a.neighborhood === "string" ? a.neighborhood : undefined,
    };
  }

  return null;
}

interface OrdersPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ consumptionMethod?: string }>;
}

const allowedPaymentMethods = new Set<PaymentMethod>(
  PAYMENT_METHODS.map((m) => m.value),
);

export default async function OrdersPage({
  params,
  searchParams,
}: OrdersPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const methodFilter = Object.values(ConsumptionMethod).includes(
    sParams.consumptionMethod as ConsumptionMethod,
  )
    ? (sParams.consumptionMethod as ConsumptionMethod)
    : undefined;

  const data = await getOrdersData(slug, methodFilter);
  if (!data || !data.restaurant) {
    return notFound();
  }

  const { restaurant, orders } = data;

  const normalizedOrders = orders.map((order) => ({
    id: order.id,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    totalAmount: Number(order.totalAmount),
    status: order.status,
    method: order.method,
    createdAt: order.createdAt,
    address: parseAddress(order.address),
    items: order.items,
  }));

  return (
    <div className="space-y-6 px-8 pb-8">
      <HeaderOrdersPage totalOrders={orders.length} />

      <ConsumptionAndPaymentMethodsForm
        initialConsumptionMethods={restaurant.consumptionMethods.map(
          (m) => m.method,
        )}
        initialPaymentMethods={restaurant.paymentMethods
          .map((m) => m.method)
          .filter((method): method is PaymentMethodValue =>
            allowedPaymentMethods.has(method),
          )}
        restaurantId={restaurant.id}
        deliveryFee={restaurant.deliveryFee}
      />

      <FilterConsumptionMethods
        consumptionMethods={restaurant.consumptionMethods}
      />

      <section className="flex flex-col items-center justify-center gap-4">
        {normalizedOrders.map((order) => (
          <CardOrder key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
}
