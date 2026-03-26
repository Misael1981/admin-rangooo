"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CardForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleLoginWithGoogleClick = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { redirect: false });
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      let destination = "/";

      if (session.user.role === "ADMIN") {
        destination = "/rangooo";
      } else if (
        session.user.role === "RESTAURANT_OWNER" &&
        session.user.slug
      ) {
        destination = `/${session.user.slug}`;
      }

      window.location.href = destination;
    }
  }, [session, status]);

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
