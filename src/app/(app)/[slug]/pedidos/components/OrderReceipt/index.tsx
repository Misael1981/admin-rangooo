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
    <div
      style={{
        width: "58mm",
        padding: "4px",
        fontSize: "9px",
        fontFamily: "sans-serif",
        lineHeight: "1.4",
        color: "#000",
      }}
    >
      {/* Cabeçalho */}
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid #000",
          paddingTop: "16px",
          paddingBottom: "4px",
          margin: "4px 0",
        }}
      >
        SISTEMA RANGOOO
      </div>

      {/* Info do pedido */}
      <div style={{ marginBottom: "6px", paddingTop: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>PEDIDO:</span>
          <span style={{ fontWeight: "bold" }}>#{order.orderNumber}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>DATA:</span>
          <span>{formattedDate}</span>
        </div>

        <div style={{ display: "flex" }}>
          <span style={{ marginRight: "4px" }}>CLIENTE:</span>
          <span
            style={{
              flex: 1,
              textAlign: "right",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {order.customerName}
          </span>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          padding: "2px 0",
          margin: "4px 0",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "8px",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "2px",
          }}
        >
          <span>Item</span>
          <span style={{ display: "flex", gap: "8px" }}>
            <span style={{ width: "32px", textAlign: "right" }}>Qtd</span>
            <span style={{ width: "48px", textAlign: "right" }}>Preço</span>
          </span>
        </div>

        {order.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              borderBottom: "1px dashed #ccc",
              padding: "4px 0",
              fontSize: "9px",
              lineHeight: "1.2",
            }}
          >
            {/* Esquerda */}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                gap: "4px",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "7px",
                    color: "#666",
                    textTransform: "uppercase",
                    lineHeight: "1",
                  }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    wordBreak: "break-word",
                  }}
                >
                  {item.name}
                </span>
              </div>

              <span style={{ fontWeight: "bold", minWidth: "16px" }}>
                {item.quantity}x
              </span>
            </div>

            {/* Direita */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: "48px",
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>
                {formatCurrency(item.price * item.quantity)}
              </span>

              {item.quantity > 1 && (
                <span style={{ fontSize: "7px", color: "#999" }}>
                  ({formatCurrency(item.price)} un)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "11px",
          marginTop: "4px",
          borderBottom: "1px solid #000",
          paddingBottom: "4px",
        }}
      >
        <span>TOTAL</span>
        <span>{formatCurrency(order.totalAmount)}</span>
      </div>

      <div style={{ paddingTop: "8px" }}>
        <span>FORMA DE PAGAMENTO:</span>
        <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
          {order.paymentMethod}
        </span>
      </div>

      {/* Entrega */}
      {order.method === "DELIVERY" && order.address && (
        <div style={{ marginTop: "6px", fontSize: "8px" }}>
          <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Entrega:
          </span>

          <span
            style={{
              padding: "4px",
              fontWeight: "bold",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            {order.address.areaType}
          </span>

          <p style={{ marginTop: "2px" }}>
            {order.address.street}, {order.address.number},{" "}
            {order.address.neighborhood}
          </p>

          {order.address.complement && (
            <p style={{ marginTop: "2px" }}>{order.address.complement}</p>
          )}

          {order.address.reference && (
            <p style={{ marginTop: "2px" }}>{order.address.reference}</p>
          )}
        </div>
      )}

      {/* Rodapé */}
      <div
        style={{
          textAlign: "center",
          marginTop: "8px",
          borderTop: "1px solid #000",
          paddingTop: "4px",
          fontSize: "8px",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        *** Sistema Rangooo! ***
      </div>
    </div>
  );
};

export default OrderReceipt;
