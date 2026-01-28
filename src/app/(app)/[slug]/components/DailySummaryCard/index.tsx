import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Store, Calculator } from "lucide-react";

interface SummaryItem {
  count: number;
  value: number;
}

interface DailySummaryProps {
  delivery: SummaryItem;
  pickup: SummaryItem;
}

const DailySummaryCard = ({ delivery, pickup }: DailySummaryProps) => {
  const totalValue = delivery.value + pickup.value;
  const totalCount = delivery.count + pickup.count;

  return (
    <Card className="border-none shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Fechamento Parcial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-slate-100">
          {/* Entregas */}
          <li className="flex items-center justify-between py-4 group hover:bg-slate-50/50 transition-colors rounded-lg px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <Bike className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Entregas
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">{delivery.count} pedidos</p>
              <p className="text-lg font-bold text-slate-900">
                {delivery.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </li>

          {/* Retiradas */}
          <li className="flex items-center justify-between py-4 group hover:bg-slate-50/50 transition-colors rounded-lg px-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-full">
                <Store className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Retiradas
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">{pickup.count} pedidos</p>
              <p className="text-lg font-bold text-slate-900">
                {pickup.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </li>

          {/* Totalizador */}
          <li className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-6 mt-2">
            <span className="text-lg font-black text-slate-900">
              Total do Dia
            </span>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-widest">
                {totalCount} total
              </p>
              <p className="text-3xl font-black text-emerald-600">
                {totalValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default DailySummaryCard;
