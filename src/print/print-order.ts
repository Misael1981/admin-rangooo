import { OrderDTO } from "@/dtos/order.dto";
import { generateReceiptHTML } from "./generate-receipt-html";

export const printOrder = (order: OrderDTO) => {
  const printWindow = window.open("", "_blank");

  if (!printWindow) return;

  const html = generateReceiptHTML(order);

  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
};
