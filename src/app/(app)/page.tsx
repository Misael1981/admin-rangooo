import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  console.log(session?.user);
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
