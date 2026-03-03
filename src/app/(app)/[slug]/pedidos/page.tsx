import { getOrdersData } from "@/data/get-orders-data";
import HeaderOrdersPage from "./components/HeaderOrdersPage";
import { notFound } from "next/navigation";
import { AreaType, ConsumptionMethod } from "@prisma/client";
import FilterConsumptionMethods from "./components/FilterConsumptionMethods";
import CardOrder from "./components/CardOrder";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import { OrderAddress } from "@/dtos/order.dto";
import NotificationMobile from "@/components/NotificationMobile";

function parseAddress(address: unknown): OrderAddress | undefined {
  if (!address || typeof address !== "object" || Array.isArray(address)) {
    return undefined;
  }

  const a = address as Record<string, unknown>;

  if (typeof a.street === "string" && typeof a.number === "string") {
    return {
      street: a.street,
      number: a.number,
      city: typeof a.city === "string" ? a.city : "",
      neighborhood:
        typeof a.neighborhood === "string" ? a.neighborhood : undefined,
      complement: typeof a.complement === "string" ? a.complement : undefined,
      reference: typeof a.reference === "string" ? a.reference : undefined,
      areaType:
        typeof a.areaType === "string" ? (a.areaType as AreaType) : undefined,
    };
  }

  return undefined;
}
interface OrdersPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ consumptionMethod?: string }>;
}

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
    orderNumber: Number(order.orderNumber),
    status: order.status,
    method: order.method,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt,
    address: parseAddress(order.address),
    items: order.items,
  }));

  return (
    <div className="space-y-6 px-8 pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <BreadcrumbComponent currentPage="Pedidos" slug={slug} />
        <NotificationMobile />
      </div>
      <HeaderOrdersPage totalOrders={orders.length} />

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
