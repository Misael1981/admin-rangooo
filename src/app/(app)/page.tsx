import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardContent>
          <h1>Dashboard Administrativo</h1>

          <Button>Botão</Button>
        </CardContent>
      </Card>
    </div>
  );
}
