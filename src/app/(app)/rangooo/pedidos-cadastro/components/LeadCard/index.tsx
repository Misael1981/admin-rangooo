"use client";

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
import {
  Calendar1Icon,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { LeadApplication } from "@prisma/client";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTransition } from "react";
import { approveLead } from "@/app/_actions/approve-lead";
import { rejectLead } from "@/app/_actions/reject-lead";
import { toast } from "sonner";

type LeadProps = {
  lead: LeadApplication;
};

const LeadCard = ({ lead }: LeadProps) => {
  const [isPending, startTransition] = useTransition();

  const openWhatsApp = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const finalPhone = cleanPhone.startsWith("55")
      ? cleanPhone
      : `55${cleanPhone}`;
    const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleApprove = () => {
    startTransition(async () => {
      const result = await approveLead(lead.id);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Lead aprovado com sucesso!");

      const message = `Olá ${lead.name.split(" ")[0]}! Boas notícias: sua solicitação para o ${lead.restaurantName} foi aprovada. 🚀\n\nPara configurar seu sistema, acesse o link de onboarding:\n${result.inviteLink}`;

      openWhatsApp(lead.phone, message);
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      const result = await rejectLead(lead.id);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.info("Lead recusado.");

      const message = `Olá ${lead.name.split(" ")[0]}, agradecemos seu interesse no Rangooo. No momento, não conseguimos dar prosseguimento à sua solicitação para o ${lead.restaurantName}. Se tiver dúvidas, estamos à disposição!`;

      openWhatsApp(lead.phone, message);
    });
  };

  return (
    <Card
      className="w-full max-w-md shadow-md border-l-4 data-[status=APPROVED]:border-l-green-500 data-[status=REJECTED]:border-l-red-500"
      data-status={lead.status}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {lead.restaurantName}
            </CardTitle>
            <CardDescription className="text-lg font-semibold text-gray-900">
              {lead.name}
            </CardDescription>
          </div>
          <StatusBadge status={lead.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-1">
          <li className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{lead.email}</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {formatPhoneNumber(lead.phone)}
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {lead.city} - {lead.state}
            </span>
          </li>
        </ul>

        {/* Seção de observações igual ao seu anterior */}
      </CardContent>

      <CardFooter className="border-t flex items-center justify-between pt-4">
        <div className="flex items-center gap-1 text-[10px] text-gray-500 italic">
          <Calendar1Icon className="h-3 w-3" />
          <span suppressHydrationWarning>
            {format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", {
              locale: ptBR,
            })}
          </span>
        </div>

        <div className="flex gap-2">
          {lead.status === "PENDING" ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleReject}
                disabled={isPending}
              >
                Recusar
              </Button>

              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove}
                disabled={isPending}
              >
                Aprovar e Enviar Link
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={
                lead.status === "APPROVED" ? handleApprove : handleReject
              }
              disabled={isPending}
            >
              <MessageCircle className="h-4 w-4" />
              {lead.status === "APPROVED"
                ? "Reenviar Link"
                : "Reenviar Mensagem"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LeadCard;
