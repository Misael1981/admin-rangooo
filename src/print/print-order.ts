import { OrderDTO } from "@/dtos/order.dto";
import { generateReceiptHTML } from "./generate-receipt-html";

export const printOrder = (order: OrderDTO) => {
  const printWindow = window.open(
    "",
    "_blank",
    "width=220,height=600,scrollbars=no,resizable=no",
  );

  if (!printWindow) {
    alert(
      "Erro: Não foi possível abrir a janela de impressão. Verifique se popups estão bloqueados.",
    );
    return;
  }

  const html = generateReceiptHTML(order);

  printWindow.document.write(html);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 100);
};
