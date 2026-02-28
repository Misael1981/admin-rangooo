import { OrderItemDTO } from "@/dtos/order.dto";
import { formatCurrency } from "@/helpers/format-currency";
import { AreaType } from "@prisma/client";

type OrderReceiptProps = {
  order: {
    id: string;
    createdAt: string;
    customerName: string;
    orderNumber: number;
    items: OrderItemDTO[];
    totalAmount: number;
    paymentMethod: string | null;
    method: "DELIVERY" | "PICKUP" | "DINE_IN";
    address?: {
      street: string;
      number: string;
      city: string;
      neighborhood?: string;
      complement?: string;
      reference?: string;
      areaType?: AreaType;
    };
  };
};

const OrderReceipt = ({ order }: OrderReceiptProps) => {
  const formattedDate = new Date(order.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="print-only w-[58mm] p-1 text-[9px] font-sans leading-normal text-black">
      {/* Cabeçalho */}
      <div className="text-center font-bold text-[11px] uppercase tracking-wider border-b pt-4 pb-1 my-1">
        SISTEMA RANGOOO
      </div>

      {/* Info do pedido */}
      <div className="mb-1.5 space-y-0.5 pt-1">
        <div className="flex justify-between">
          <span>PEDIDO:</span>
          <span className="font-bold">#{order.orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>DATA:</span>
          <span>{formattedDate}</span>
        </div>
        <div className="flex">
          <span className="mr-1">CLIENTE:</span>
          <span className="flex-1 text-right truncate">
            {order.customerName}
          </span>
        </div>
      </div>

      {/* Items - tabela alinhada */}
      <div className="border-t border-b  py-0.5 my-1">
        <div className="font-bold text-[8px] uppercase flex justify-between mb-0.5">
          <span>Item</span>
          <span className="flex gap-2">
            <span className="w-8 text-right">Qtd</span>
            <span className="w-12 text-right">Preço</span>
          </span>
        </div>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 border-b border-dashed border-gray-100 py-1 text-[9px] leading-tight"
          >
            {/* Lado Esquerdo: Quantidade e Nome/Categoria */}
            <div className="flex flex-1 items-center gap-1 overflow-hidden">
              <div className="flex flex-col">
                <span className="text-[7px] text-gray-500 uppercase leading-none">
                  {item.category}
                </span>
                <span className="wrap-break-word font-medium">{item.name}</span>
              </div>
              <span className="font-bold min-w-4">{item.quantity}x</span>
            </div>

            {/* Lado Direito: Preço Unitário ou Total */}
            <div className="flex flex-col items-end min-w-12">
              <span className="whitespace-nowrap">
                {formatCurrency(item.price * item.quantity)}
              </span>
              {item.quantity > 1 && (
                <span className="text-[7px] text-gray-400">
                  ({formatCurrency(item.price)} un)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-[11px] mt-1 border-b border-black pb-1">
        <span>TOTAL</span>
        <span>{formatCurrency(order.totalAmount)}</span>
      </div>

      <div className="pt-2">
        <span>FORMA DE PAGAMENTO:</span>
        <span className="font-bold">{order.paymentMethod}</span>
      </div>

      {/* Endereço de entrega */}
      {order.method === "DELIVERY" && order.address && (
        <div className="mt-1.5 text-[8px]">
          <span className="font-bold uppercase">Entrega:</span>
          <span className="p-2 font-bold uppercase">
            {order.address.areaType}
          </span>
          <p className="mt-0.5">
            {order.address.street}, {order.address.number},{" "}
            {order.address.neighborhood}
          </p>
          {order.address.complement && (
            <p className="mt-0.5">{order.address.complement}</p>
          )}
          {order.address.reference && (
            <p className="mt-0.5">{order.address.reference}</p>
          )}
        </div>
      )}

      {/* Rodapé */}
      <div className="text-center mt-2  border-t pt-1 text-[8px] font-bold tracking-widest">
        *** OBRIGADO! ***
      </div>
    </div>
  );
};

export default OrderReceipt;
