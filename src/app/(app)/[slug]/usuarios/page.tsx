import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Image from "next/image";

export default async function UsuariosPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return (
    <div className="space-y-6 px-8 pb-8">
      {/* Breadcrumb */}
      <BreadcrumbComponent currentPage="Usuários" slug={slug} />
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Gerenciar Usuários
      </h1>
      <div className="flex justify-center">
        <Image
          src="/page-under-construction.png"
          alt="Página em Cobtrução"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}
