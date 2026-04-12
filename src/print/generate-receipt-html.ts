import { OrderDTO, OrderItemDTO } from "@/dtos/order.dto";

export const generateReceiptHTML = (order: OrderDTO) => {
  const formattedDate = new Date(order.createdAt).toLocaleString("pt-BR");

  // Função auxiliar para moeda dentro do template string
  const toBRL = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return `
  <html>
    <head>
      <style>
        @page { size: 58mm auto; margin: 0; }
        body {
          font-family: monospace;
          font-size: 12px;
          padding: 6px;
          margin: 0;
          width: 58mm;
          color: #000;
        }
        h1 {
          text-align: center;
          font-size: 14px;
          margin: 0 0 4px;
          text-transform: uppercase;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td, th {
          padding: 2px 0;
          vertical-align: top;
        }
        th {
          text-align: left;
        }
        .right {
          text-align: right;
        }
        hr {
          border: none;
          border-top: 1px dashed #000;
          margin: 6px 0;
        }
        .center {
          text-align: center;
        }
        .bold {
          font-weight: bold;
        }
        .item-category {
          font-size: 10px;
          display: block;
        }
      </style>
    </head>
    <body>
      <h1>SISTEMA RANGOOO</h1>
      
      <hr />

      <table>
        <tr>
          <td>PEDIDO:</td>
          <td class="right">#${order.orderNumber}</td>
        </tr>
        <tr>
          <td>DATA:</td>
          <td class="right">${formattedDate}</td>
        </tr>
        <tr>
          <td>CLIENTE:</td>
          <td class="right">${order.customerName}</td>
        </tr>
      </table>

      <hr />

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th class="right">Qtd</th>
            <th class="right">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item: OrderItemDTO) => `
            <tr>
              <td>
                <span class="item-category">${item.category || ""}</span>
                ${item.name}
              </td>
              <td class="right">${item.quantity}</td>
              <td class="right">${toBRL(item.price * item.quantity)}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <hr />

      <table>
        <tr class="bold">
          <td>TOTAL</td>
          <td class="right">${toBRL(order.totalAmount)}</td>
        </tr>
      </table>

      <br />

      <div>
        PAGAMENTO: <b>${order.paymentMethod || "NÃO INFORMADO"}</b>
      </div>

      ${
        order.method === "DELIVERY" && order.address
          ? `
          <br />
          <div>
            <b>ENTREGA:</b> ${order.address.areaType || ""}<br />
            ${order.address.street}, ${order.address.number}<br />
            ${order.address.neighborhood || ""}<br />
            ${order.address.complement ? `${order.address.complement}<br />` : ""}
            ${order.address.reference ? `${order.address.reference}<br />` : ""}
          </div>
          `
          : ""
      }

      <hr />
      <div class="center">*** Sistema Rangooo ***</div>
    </body>
  </html>
  `;
};
