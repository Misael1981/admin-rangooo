"use client";

import {
  createAdditional,
  deleteAdditional,
  updateAdditional, // Certifique-se de ter importado a função de update
} from "@/app/_actions/menu/create-additional";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronDown, ChevronUp, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CategorySummary = {
  id: string;
  name: string;
  additionalProducts: {
    id: string;
    name: string;
    price: number;
  }[];
};

type AdditionalProductsCardProps = {
  selectedCategory: CategorySummary | null;
  slug: string;
};

const AdditionalProductsCard = ({
  selectedCategory,
  slug,
}: AdditionalProductsCardProps) => {
  const [showList, setShowList] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Usaremos State para os inputs para facilitar a via de mão dupla (edição)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  if (!selectedCategory) return null;

  const handleReset = () => {
    setEditingId(null);
    setName("");
    setPrice("");
  };

  const handleSubmit = async () => {
    const numPrice = Number(price);
    if (!name || isNaN(numPrice))
      return toast.error("Preencha nome e preço corretamente!");

    try {
      if (editingId) {
        // Lógica de Edição
        const result = await updateAdditional({
          id: editingId,
          name,
          price: numPrice,
          slug,
        });
        if (result.success) toast.success("Item atualizado!");
      } else {
        // Lógica de Criação
        const result = await createAdditional({
          name,
          price: numPrice,
          menuCategoryId: selectedCategory.id,
          slug,
        });
        if (result.success) toast.success("Adicionado com sucesso!");
      }
      handleReset();
    } catch (error) {
      toast.error("Erro ao processar solicitação.");
      console.error(error);
    }
  };

  const handleEditClick = (ing: {
    id: string;
    name: string;
    price: number;
  }) => {
    setEditingId(ing.id);
    setName(ing.name);
    setPrice(ing.price.toString());
    // Opcional: rolar a tela para o topo do card para facilitar a visão do input
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este adicional?")) return;
    const result = await deleteAdditional(id, slug);
    if (result.success) toast.success("Item removido!");
  };

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl">
            Ingredientes Adicionais -{" "}
            <span className="text-primary">{selectedCategory.name}</span>
          </CardTitle>
          <CardDescription>
            Gerencie o que pode ser acrescentado aos pedidos.
          </CardDescription>
        </div>
        <Badge variant="outline" className="bg-primary/5">
          {selectedCategory.additionalProducts.length}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 lg:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Bacon Extra"
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Preço (Ex: 5.00)"
          />

          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              {editingId ? "Salvar" : "Adicionar"}
            </Button>
            {editingId && (
              <Button
                variant="destructive"
                onClick={handleReset}
                title="Cancelar edição"
              >
                <X size={18} /> Cancelar
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center border-t gap-4 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowList((prev) => !prev)}
          className="text-muted-foreground hover:text-primary"
        >
          {showList ? (
            <ChevronUp className="mr-2" size={16} />
          ) : (
            <ChevronDown className="mr-2" size={16} />
          )}
          {showList
            ? "Ocultar Lista"
            : `Ver Lista (${selectedCategory.additionalProducts.length})`}
        </Button>

        {showList && (
          <ul className="w-full max-w-md space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            {selectedCategory.additionalProducts.map((ing) => (
              <li
                key={ing.id}
                className="group flex items-center justify-between gap-6 rounded-md border bg-card p-3 transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">{ing.name}</span>
                  <span className="text-xs text-green-600 font-semibold">
                    {formatCurrency(ing.price)}
                  </span>
                </div>

                <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditClick(ing)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(ing.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </li>
            ))}

            {selectedCategory.additionalProducts.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-4">
                Nenhum adicional cadastrado.
              </p>
            )}
          </ul>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdditionalProductsCard;
