export const dynamic = "force-dynamic";

import { ClipboardPenLine } from "lucide-react";
import HeaderPages from "../components/HeaderPages";
import { getLeads } from "@/data/rangooo/get-leads";
import LeadCard from "./components/LeadCard";

export default async function PedidosCadastroPage() {
  const leads = await getLeads();

  return (
    <div className="px-4 lg:px-8 pb-8">
      <HeaderPages
        title="Pedidos de Cadastro"
        description="Cadastre um novo pedido"
        icon={<ClipboardPenLine className="h-6 w-6" />}
      />
      <section className="mt-8 flex justify-center items-center flex-wrap gap-4">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </section>
    </div>
  );
}
