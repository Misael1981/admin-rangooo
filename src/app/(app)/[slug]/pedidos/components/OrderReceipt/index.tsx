import { OrderItemPrintDTO } from "@/dtos/order.dto";
import { formatCurrency } from "@/helpers/format-currency";

type OrderReceiptProps = {
  order: {
    id: string;
    createdAt: string;
    customerName: string;
    items: OrderItemPrintDTO[];
    totalAmount: number;
    method: string;
    address?: {
      street: string;
      number: string;
    };
  };
};

const OrderReceipt = ({ order }: OrderReceiptProps) => (
  <div className="print-only w-[58mm] p-2 text-[10px] font-mono leading-tight text-black">
    <div className="text-center font-bold text-lg border-b pb-1 mb-1">
      RANGOOO
    </div>
    <div className="mb-2">
      <p>PEDIDO: #{order.id.slice(-4)}</p>
      <p>DATA: {new Date(order.createdAt).toLocaleString("pt-BR")}</p>
      <p>CLIENTE: {order.customerName}</p>
    </div>

    <div className="border-b border-t py-1">
      {order.items.map((item) => (
        <div key={item.id} className="flex justify-between">
          {/* <span>
            {item.quantity}x {item.product.name}
          </span> */}
          <span>{formatCurrency(item.price)}</span>
        </div>
      ))}
    </div>

    <div className="mt-2 text-right font-bold text-sm">
      TOTAL: {formatCurrency(order.totalAmount)}
    </div>

    {order.method === "DELIVERY" && (
      <div className="mt-2 border-t pt-1">
        <p className="font-bold">ENTREGA:</p>
        <p>
          {order.address?.street}, {order.address?.number}
        </p>
      </div>
    )}
    <div className="text-center mt-4 border-t pt-2">*** OBRIGADO! ***</div>
  </div>
);

export default OrderReceipt;
