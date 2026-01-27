"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-svh flex items-center justify-center">
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
}
