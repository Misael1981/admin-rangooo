"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import {
  Calendar1Icon,
  MapPin,
  NotepadText,
  Phone,
  ScrollText,
} from "lucide-react";
import { DeliveryPersonDTO } from "@/dtos/delivery-person.dto";
import { CheckCircle, Clock, XCircle, Ban } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDeliveryPersonStatus } from "@/app/_actions/update-delivery-person-status";
import { toast } from "sonner";

export const deliveryPersonStatusConfig = {
  PENDING: { variant: "secondary", icon: Clock, label: "Pendente" },
  ACTIVE: { variant: "default", icon: CheckCircle, label: "Ativo" },
  SUSPENDED: { variant: "secondary", icon: Ban, label: "Suspenso" },
  REJECTED: { variant: "destructive", icon: XCircle, label: "Rejeitado" },
} as const;

type DeliveryDriverProps = {
  deliveryDriver: DeliveryPersonDTO;
};

const DeliveryDriverCard = ({ deliveryDriver }: DeliveryDriverProps) => {
  const handleStatusChange = async (
    status: keyof typeof deliveryPersonStatusConfig,
  ) => {
    const id = deliveryDriver.id;
    const result = await updateDeliveryPersonStatus(id, status);

    if (result.success) {
      toast.success("Status do entregador alterado");
      return;
    }

    toast.error("Erro ao alterar o status do entregador");
  };

  return (
    <Card className="w-full max-w-md shadow-md border-l-4 data-[status=APPROVED]:border-l-green-500 data-[status=REJECTED]:border-l-red-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            {deliveryDriver.user.name}
          </CardTitle>
          <StatusBadge
            status={deliveryDriver.status}
            config={deliveryPersonStatusConfig}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-1">
          <li className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {formatPhoneNumber(deliveryDriver.user.phone!)}
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {deliveryDriver.user.addresses.map((address) => (
                <div key={address.id}>
                  {address.city} - {address.state}
                </div>
              ))}
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <ScrollText className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{deliveryDriver.document}</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <NotepadText className="h-4 w-4 text-gray-400" />
            <div className="border w-full p-2 rounded-md">
              <span className="text-gray-700">{deliveryDriver.notes}</span>
            </div>
          </li>
        </ul>
      </CardContent>

      <CardFooter className="border-t flex items-center justify-between pt-4">
        <div className="flex items-center gap-1 text-[10px] text-gray-500 italic">
          <Calendar1Icon className="h-3 w-3" />
          <span suppressHydrationWarning>
            {format(
              new Date(deliveryDriver.createdAt),
              "dd/MM/yyyy 'às' HH:mm",
              {
                locale: ptBR,
              },
            )}
          </span>
        </div>
        <Select
          defaultValue={deliveryDriver.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {Object.entries(deliveryPersonStatusConfig).map(
                ([status, config]) => (
                  <SelectItem key={status} value={status}>
                    {config.label}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
};

export default DeliveryDriverCard;
