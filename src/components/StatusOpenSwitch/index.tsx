"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StatusOpenSwitchProps {
  initialIsOpen: boolean;
  restaurantId: string;
  restaurantSlug: string;
}

const StatusOpenSwitch = ({
  initialIsOpen,
  restaurantId,
  restaurantSlug,
}: StatusOpenSwitchProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const handleToggle = async (newStatus: boolean) => {
    setIsUpdating(true);
    // Otimismo na UI: muda antes de voltar do servidor
    setIsOpen(newStatus);

    try {
      const response = await fetch(`/api/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: restaurantId,
          isOpen: newStatus,
          slug: restaurantSlug,
        }),
      });

      if (!response.ok) throw new Error();

      toast.success(newStatus ? "Loja Aberta" : "Loja Fechada");

      window.dispatchEvent(
        new CustomEvent("restaurant-status-changed", {
          detail: { isOpen: newStatus },
        }),
      );
    } catch (error) {
      toast.error("Erro ao atualizar status");
      setIsOpen(!newStatus);
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-3 px-2 py-1 bg-slate-50 border rounded-full transition-all">
      <div className="flex items-center gap-1.5">
        {isOpen ? (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-red-400" />
        )}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${isOpen ? "text-emerald-600" : "text-red-500"}`}
        >
          {isOpen ? "Aberto" : "Fechado"}
        </span>
      </div>

      <div className="relative flex items-center">
        <Switch
          checked={isOpen}
          onCheckedChange={handleToggle}
          disabled={isUpdating}
          className="scale-75 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-red-300"
        />
        {isUpdating && (
          <Loader2 className="absolute -right-6 h-3 w-3 animate-spin text-red-400" />
        )}
      </div>
    </div>
  );
};

export default StatusOpenSwitch;
