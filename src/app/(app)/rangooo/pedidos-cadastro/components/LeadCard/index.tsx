import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadge from "../StatusBadge";
import { Calendar1Icon, Mail, MapPin, Phone } from "lucide-react";
import { LeadApplication } from "@prisma/client";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type LeadProps = {
  lead: LeadApplication;
};

const LeadCard = ({ lead }: LeadProps) => {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{lead.status}</CardTitle>
            <CardDescription>{lead.name}</CardDescription>
          </div>
          <StatusBadge status={lead.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{lead.email}</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {formatPhoneNumber(lead.phone)}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {lead.city} - {lead.state}
            </span>
          </li>
        </ul>
        {lead.notes && lead.notes.trim().length > 0 ? (
          <div className="min-h-12">
            <p className="mb-1 text-xs text-gray-500 uppercase font-semibold">
              Observações:
            </p>
            <p className="text-sm text-gray-700 line-clamp-2 italic">
              {lead.notes}
            </p>
          </div>
        ) : (
          <div className="min-h-12 flex items-center justify-center">
            <p className="text-sm text-gray-400 italic">
              Sem observações adicionais.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar1Icon className="h-3 w-3" />
            <span suppressHydrationWarning>
              {format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </span>
          </div>
        </div>
        <div className="space-x-2">
          <Button size="sm" variant="outline">
            Recusar
          </Button>
          <Button size="sm">Aprovar</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;
