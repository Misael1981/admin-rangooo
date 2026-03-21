import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="text-2xl font-bold">Acesso não autorizado</h1>
      <p className="text-muted-foreground max-w-sm">
        Seu e-mail ainda não está cadastrado no sistema. Entre em contato com o
        Rangooo para solicitar seu acesso.
      </p>
      <Button asChild>
        <Link href="https://wa.me/5535999110933">Falar com o Rangooo</Link>
      </Button>
    </div>
  );
}
