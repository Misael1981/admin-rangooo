import StatsCards from "@/components/StatsCards";
import { Clock, Warehouse } from "lucide-react";

export default function EstabelecimentosPage() {
  return (
    <div className="space-y-6 px-4 lg:px-8 pb-8">
      <header>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-xl bg-primary/50 p-3 text-white sm:block">
            <Warehouse className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              Gerenciar Estabelecimentos
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os estabelecimentos e os pedidos de cadastro.
            </p>
          </div>
        </div>
      </header>
      <section className="flex flex-wrap items-center justify-center gap-4">
        <StatsCards
          title="Total de Estabelecimentos"
          value={100}
          icon={<Clock />}
        />
        <StatsCards
          title="Pedidos Pendentes"
          value={100}
          icon={<Warehouse />}
        />
      </section>
    </div>
  );
}
