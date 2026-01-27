"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const CardForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginWithGoogleClick = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      toast.error(
        "Erro ao fazer login com Google. Por favor, tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex flex-col gap-6 justify-between w-full">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Faça seu login</h2>
        <p className="text-sm text-muted-foreground">
          Use o e-mail que foi cadastrado no sistema.
        </p>
      </div>

      <Button
        className="w-full cursor-pointer"
        variant="outline"
        size="sm"
        onClick={handleLoginWithGoogleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          "Aguarde..."
        ) : (
          <>
            <FcGoogle className="mr-2" /> Entrar com Google
          </>
        )}
      </Button>
    </section>
  );
};

export default CardForm;
