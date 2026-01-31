"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MenuTableCard from "../MenuTableCard";

const MenuCategoriesList = () => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-xl">Tabelas</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Crie, exclua ou edite as tabelas em que serão exibidos seus
            produtos.
          </CardDescription>
        </div>
        <div>
          <Badge variant="outline">5</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 items-center justify-center">
        <div className="p-4">
          <MenuTableCard />
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCategoriesList;
