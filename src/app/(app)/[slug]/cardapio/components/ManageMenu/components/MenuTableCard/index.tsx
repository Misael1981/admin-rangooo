"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Edit, Grid, MoreVertical, Trash2 } from "lucide-react";

type CategorySummary = {
  id: string;
  name: string;
  productsCount: number;
};

type Props = {
  table: CategorySummary;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedCategoryId: string;
};

const MenuTableCard = ({
  table,
  onSelect,
  onDelete,
  selectedCategoryId,
}: Props) => {
  const isSelected = table.id === selectedCategoryId;

  return (
    <div
      onClick={() => onSelect(table.id)}
      className={`group relative cursor-pointer border h-24 flex-1 rounded-md min-w-60 max-w-72 gap-2 flex items-center justify-between p-2  transition-all
    ${
      isSelected
        ? " border-primary/20 bg-primary/10"
        : "border-gray-300 hover:bg-gray-50"
    }
  `}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-primary"}`}
      >
        <Grid size={16} />
      </div>
      <div className="text-center">
        <p className="font-medium ">{table.name}</p>
        <p className="text-xs text-gray-500">
          {table.productsCount} produto(s)
        </p>
      </div>
      <div className="flex items-center gap-2 md:opacity-0 transition-opacity group-hover:opacity-100">
        <ChevronRight
          size={16}
          className={`${isSelected ? "text-primary" : "text-gray-400"}`}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Renomear
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(table.id);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MenuTableCard;
