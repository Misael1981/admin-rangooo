import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

type StatusConfig = {
  variant: "default" | "secondary" | "destructive";
  icon: LucideIcon;
  label: string;
};

interface StatusBadgeProps<T extends string> {
  status: T;
  config: Record<T, StatusConfig>;
}

const StatusBadge = <T extends string>({
  status,
  config,
}: StatusBadgeProps<T>) => {
  const statusConfig = config[status];
  const IconComponent = statusConfig.icon;

  return (
    <Badge variant={statusConfig.variant} className="flex items-center gap-1">
      <IconComponent className="h-3 w-3" />
      {statusConfig.label}
    </Badge>
  );
};

export default StatusBadge;
