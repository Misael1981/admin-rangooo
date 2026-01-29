import { Badge } from "@/components/ui/badge";
import { ClipboardList, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HeaderOrdersPageProps {
  totalOrders: number;
}

const HeaderOrdersPage = ({ totalOrders }: HeaderOrdersPageProps) => {
  const today = format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR });

  return (
    <header className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="hidden rounded-xl bg-emerald-100 p-3 text-emerald-600 sm:block">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Gerenciar Pedidos
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span className="capitalize">{today}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Fluxo do Turno
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {totalOrders}
              </span>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 py-0.5"
              >
                pedidos
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />
    </header>
  );
};

export default HeaderOrdersPage;
