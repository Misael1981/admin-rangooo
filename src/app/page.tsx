export const revalidate = 0;

import CardForm from "@/components/CardForm";
import CardLogo from "@/components/CardLogo";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = session.user;
    if (user?.role === "ADMIN") {
      redirect("/rangooo");
    }

    if (user?.role === "RESTAURANT_OWNER" && user.slug) {
      redirect(`/${user.slug}`);
    }
    redirect("/sem-acesso");
  }

  return (
    <div className="flex p-4 items-center justify-center min-h-screen">
      <div className="flex flex-col rounded-xl border bg-white shadow-sm p-8">
        <CardLogo />
        <CardForm />
      </div>
    </div>
  );
}
