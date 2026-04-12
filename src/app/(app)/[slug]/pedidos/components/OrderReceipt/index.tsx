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
  const formattedDate = new Date(order.createdAt).toLocaleString("pt-BR");

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "0 8px",
        fontFamily: "monospace",
        fontSize: "12px",
        color: "#000",
      }}
    >
      {/* Cabeçalho */}
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        SISTEMA RANGOOO
      </div>

      <hr />

      {/* Info */}
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>PEDIDO:</td>
            <td style={{ textAlign: "right" }}>#{order.orderNumber}</td>
          </tr>
          <tr>
            <td>DATA:</td>
            <td style={{ textAlign: "right" }}>{formattedDate}</td>
          </tr>
          <tr>
            <td>CLIENTE:</td>
            <td style={{ textAlign: "right" }}>{order.customerName}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* Itens */}
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Item</th>
            <th style={{ textAlign: "right" }}>Qtd</th>
            <th style={{ textAlign: "right" }}>Preço</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>
                <span style={{ fontSize: "10px" }}>{item.category}</span>
                <br />
                {item.name}
              </td>

              <td style={{ textAlign: "right" }}>{item.quantity}</td>

              <td style={{ textAlign: "right" }}>
                {formatCurrency(item.price * item.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Total */}
      <table style={{ width: "100%", fontWeight: "bold" }}>
        <tbody>
          <tr>
            <td>TOTAL</td>
            <td style={{ textAlign: "right" }}>
              {formatCurrency(order.totalAmount)}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Pagamento */}
      <div>
        PAGAMENTO: <b>{order.paymentMethod}</b>
      </div>

      <br />

      {/* Endereço */}
      {order.method === "DELIVERY" && order.address && (
        <div>
          <b>ENTREGA:</b> {order.address.areaType}
          <br />
          {order.address.street}, {order.address.number}
          <br />
          {order.address.neighborhood}
          <br />
          {order.address.complement && (
            <>
              {order.address.complement}
              <br />
            </>
          )}
          {order.address.reference && (
            <>
              {order.address.reference}
              <br />
            </>
          )}
        </div>
      )}

      <hr />

      {/* Rodapé */}
      <div style={{ textAlign: "center" }}>*** Sistema Rangooo ***</div>
    </div>
  );
};

export default OrderReceipt;
