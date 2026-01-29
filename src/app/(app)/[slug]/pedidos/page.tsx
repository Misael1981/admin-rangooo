import { getOrdersData } from "@/data/get-orders-data";
import HeaderOrdersPage from "./components/HeaderOrdersPage";
import { notFound } from "next/navigation";
import ConsumptionAndPaymentMethodsForm from "./components/ConsumptionAndPaymentMethodsForm";
import {
  PAYMENT_METHODS,
  type PaymentMethodValue,
} from "@/helpers/methods-restaurant-options";
import { PaymentMethod } from "@prisma/client";

interface OrdersPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const allowedPaymentMethods = new Set<PaymentMethod>(
  PAYMENT_METHODS.map((m) => m.value),
);

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { slug } = await params;

  const data = await getOrdersData(slug);

  if (!data || !data.restaurant) {
    return notFound();
  }

  const { restaurant, orders } = data;

  return (
    <div className="space-y-6 p-8">
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
    </div>
  );
}
