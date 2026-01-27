import { UserCircle } from "lucide-react";

interface CardForHeaderProps {
  restaurantName: string;
  userName: string | null | undefined;
}

const CardForHeader = ({ restaurantName, userName }: CardForHeaderProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <span className="font-medium text-red-500">Dashboard</span>
        <span>/</span>
        <span className="capitalize">{restaurantName.toLowerCase()}</span>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
        Painel Administrativo
      </h1>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <UserCircle size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            Bem-vindo, {userName?.split(" ")[0]}!
          </p>
          <p className="text-xs text-gray-500">
            Gerencie seus pedidos e a operação da sua loja em tempo real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardForHeader;
