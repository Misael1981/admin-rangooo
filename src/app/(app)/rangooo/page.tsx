export const revalidate = 0;

import { getAllEstablishments } from "@/data/get-all-establishments";
import { LayoutDashboard } from "lucide-react";
import SearchEstablishments from "./components/SearchEstablishments";
import ButtonLogout from "./components/ButtonLogout";

export default async function RangoooPage() {
  const establishments = await getAllEstablishments();

  return (
    <div className="space-y-6 px-4 lg:px-8 pb-8">
      <header>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-xl bg-primary/50 p-3 text-white sm:block">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            Painel Administrativo
          </h1>
        </div>
      </header>
      <SearchEstablishments establishments={establishments} />
      <ButtonLogout />
    </div>
  );
}
