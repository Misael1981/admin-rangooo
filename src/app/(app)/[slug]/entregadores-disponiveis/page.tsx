import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import HeaderEstablishmentsPage from "@/components/HeaderEstablishmentsPage";
import { Badge } from "@/components/ui/badge";
import { getOnlineDeliveryPersons } from "@/data/get-online-delivery-persons";
import { Motorbike } from "lucide-react";
import DeliveryPersonCard from "./components/DeliveryPersonCard";

interface DeliveryDriversPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DeliveryDriversPage({
  params,
}: DeliveryDriversPageProps) {
  const { slug } = await params;

  const deliveryPersons = await getOnlineDeliveryPersons();
  console.log(deliveryPersons);

  return (
    <div className="space-y-6 px-8 pb-8">
      <div className="flex items-center justify-between">
        <BreadcrumbComponent
          currentPage="entregadores-disponiveis"
          slug={slug}
        />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-900">
            {deliveryPersons.length}
          </span>
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none px-2 py-0.5"
          >
            {deliveryPersons.length === 1 ? "entregador" : "entregadores"}
          </Badge>
        </div>
      </div>

      <HeaderEstablishmentsPage
        title="Entregadores disponíveis"
        icon={<Motorbike />}
        description="Veja os entregadores do Rangooo que estão online e prontos para receber pedidos neste momento."
        notice="Disponível apenas para estabelecimentos no plano Pró. Caso ainda não tenha acesso, faça o upgrade do seu plano e aproveite essa funcionalidade."
      />

      {deliveryPersons.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
          <div className="p-4 bg-muted rounded-full">
            <Motorbike className="opacity-50" />
          </div>

          <p className="text-lg font-semibold">Nenhum entregador disponível</p>

          <p className="text-sm text-muted-foreground max-w-xs">
            No momento não há entregadores online para receber pedidos. Tente
            novamente em alguns instantes.
          </p>
        </div>
      ) : (
        <section className="gap-4 w-full flex flex-col justify-center items-center">
          {deliveryPersons.map((person) => (
            <DeliveryPersonCard key={person.id} person={person} />
          ))}
        </section>
      )}
    </div>
  );
}
