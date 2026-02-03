import CardForm from "@/components/CardForm";
import CardLogo from "@/components/CardLogo";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (session) {
    // 1. Se for ADMIN, vai para a área mestre
    if (user?.role === "ADMIN") {
      return redirect("/rangooo");
    }

    // 2. Se for DONO, vai para o slug dele
    if (user?.role === "RESTAURANT_OWNER" && user.slug) {
      return redirect(`/${user.slug}`);
    }
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
