"use client";

import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ButtonLogout = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        <LogOutIcon />
        Sair
      </Button>
    </>
  );
};

export default ButtonLogout;
