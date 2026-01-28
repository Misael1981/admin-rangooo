// src/app/(app)/[slug]/components/MetricCard.tsx
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number; // ex: 10 para +10%
    isPositive: boolean;
  };
}

const MetricCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: MetricCardProps) => {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden gap-0 min-w-60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black text-slate-900">{value}</div>
        <div className="mt-1 flex items-center gap-1">
          {trend && (
            <span
              className={`text-xs font-bold ${trend.isPositive ? "text-emerald-600" : "text-rose-600"}`}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}%
            </span>
          )}
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
