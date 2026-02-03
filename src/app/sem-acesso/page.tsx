"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function NoAccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold">Quase lá! 🚀</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Seu usuário foi identificado, mas parece que ainda não há um
        estabelecimento vinculado a este e-mail.
      </p>
      <p className="mt-4 text-sm bg-yellow-100 p-3 rounded-md border border-yellow-200">
        Dica: Entre em contato com o suporte ou verifique se você digitou o
        e-mail correto.
      </p>
      <Button variant="destructive" className="mt-6" onClick={() => signOut()}>
        Sair e tentar outro e-mail
      </Button>
    </div>
  );
}
