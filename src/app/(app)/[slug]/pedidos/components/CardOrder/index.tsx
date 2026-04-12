"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRef } from "react";
import { OrderStatus } from "@prisma/client";
import {
  CardOrderProps,
  METHOD_CONFIGS,
  STATUS_CONFIGS,
} from "@/constants/maps-options";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import OrderReceipt from "../OrderReceipt";
import { updateOrderStatus } from "@/app/_actions/update-order-status";

const CardOrder = ({ order, slug }: CardOrderProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=400,height=600");

    if (!printWindow) return;

    const content = contentRef.current?.innerHTML;

    printWindow.document.write(`
    <html>
      <head>
        <style>
          @page { size: 58mm auto; margin: 0; }

          body { 
            margin: 0; 
            padding: 4px;
            font-family: monospace; 
            font-size: 12px; 
            width: 58mm;
          }

          table { width: 100%; border-collapse: collapse; }
          td, th { padding: 2px 0; }

          hr { border: 1px dashed black; margin: 6px 0; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);

    printWindow.document.close();

    // 🔥 ESPERA RENDERIZAR
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();

      // dá um tempinho antes de fechar
      setTimeout(() => {
        printWindow.close();
      }, 500);
    };
  };

  const methodConfig = METHOD_CONFIGS[order.method!];
  const MethodIcon = methodConfig.icon;
  const statusConfig = STATUS_CONFIGS[order.status];
  const StatusIcon = statusConfig.icon;

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const result = await updateOrderStatus(
        order.id,
        newStatus as OrderStatus,
        slug!,
      );

      if (!result.success) {
        toast.error("Erro ao atualizar status");
        return;
      }

      toast.success("Status atualizado!");
    } catch {
      toast.error("Erro inesperado.");
    }
  };

  return (
    <>
      <Card className="w-full gap-0 max-w-3xl border-2 transition-all hover:border-primary/20 p-0">
        <CardHeader className="p-6 border-b gap-0">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center justify-between lg:w-fit w-full gap-2">
              <div className="flex flex-col gap-2 items-center">
                <span className="text-xs font-semibold">Nº do Pedido</span>
                <Badge>{order.orderNumber}</Badge>
              </div>
              <div className="space-x-2">
                <Badge
                  variant="outline"
                  className={`${methodConfig.color} border-current`}
                >
                  <MethodIcon className="mr-1 h-4 w-4" />
                  {methodConfig.label}
                </Badge>
                <Badge
                  variant={statusConfig.variant}
                  className={statusConfig.color}
                >
                  <StatusIcon className="mr-1 h-4 w-4" />
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
            <div className="w-full lg:w-fit flex justify-center sm:justify-end">
              <Select
                onValueChange={handleStatusUpdate}
                defaultValue={order.status}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(STATUS_CONFIGS).map((status) => (
                    <SelectItem key={status} value={status}>
                      {STATUS_CONFIGS[status as OrderStatus].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {" "}
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-2 border-b border-dashed pb-2 last:border-0 last:pb-0"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {item.category || "Geral"}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{item.quantity}x</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm text-muted-foreground font-medium">
              Total do Pedido
            </span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(Number(order.totalAmount))}
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t p-6 gap-0">
          <div className="w-full flex flex-wrap gap-6 items-end justify-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {order.customerName || "Cliente"}
                {order.customerPhone && ` - ${order.customerPhone}`}
              </p>
              {order.method === "DELIVERY" && order.address && (
                <p className="text-xs text-muted-foreground">
                  {order.address.street}, {order.address.number},{" "}
                  {order.address.neighborhood}
                </p>
              )}
            </div>
            <Button className="w-full sm:w-fit" onClick={() => handlePrint()}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir Pedido
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
      >
        <div ref={contentRef}>
          <OrderReceipt
            order={{
              ...order,
              paymentMethod: order.paymentMethod ?? "NÃO INFORMADO",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CardOrder;
