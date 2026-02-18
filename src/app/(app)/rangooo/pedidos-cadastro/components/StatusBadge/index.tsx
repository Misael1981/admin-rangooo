import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

type StatusType = "PENDING" | "APPROVED" | "REJECTED";

type StatusConfig = {
  variant: "default" | "secondary" | "destructive";
  icon: LucideIcon;
  label: string;
};

const statusConfig: Record<StatusType, StatusConfig> = {
  PENDING: { variant: "secondary", icon: Clock, label: "Pendente" },
  APPROVED: { variant: "default", icon: CheckCircle, label: "Aprovado" },
  REJECTED: { variant: "destructive", icon: XCircle, label: "Rejeitado" },
};

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <IconComponent className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
