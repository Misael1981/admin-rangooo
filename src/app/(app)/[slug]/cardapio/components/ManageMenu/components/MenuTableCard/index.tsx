import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Edit, Grid, MoreVertical, Trash2 } from "lucide-react";

const MenuTableCard = () => {
  return (
    <div className="border flex-1 border-primary/20 bg-primary/10 max-w-60 flex items-center justify-between p-2">
      <Grid size={16} />
      <p className="text-primary font-medium">Tabela 1</p>
      <div className="flex items-center gap-2  transition-opacity group-hover:opacity-100">
        <ChevronRight size={16} />
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
            <DropdownMenuItem className="text-red-600">
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
