"use client";

import {
  ClipboardList,
  ClipboardPenLine,
  Clock3,
  Home,
  Motorbike,
  Settings,
  ShoppingBasket,
  SlidersHorizontal,
  Store,
  Users,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/rangooo");

  const segments = pathname.split("/");
  const slug = !isAdminRoute ? segments[1] : null;

  const linksEstablishments = [
    {
      title: "Dashboard Administrativo",
      url: `/${slug}`,
      icon: Home,
    },
    {
      title: "Gerenciar Pedidos",
      url: `/${slug}/pedidos`,
      icon: ClipboardList,
    },
    {
      title: "Perfil do Estabelecimento",
      url: `/${slug}/perfil`,
      icon: Store,
    },
    {
      title: "Plano e Métodos",
      url: `/${slug}/plano-metodos`,
      icon: SlidersHorizontal,
    },
    {
      title: "Horários de Funcionamento",
      url: `/${slug}/horarios-funcionamento`,
      icon: Clock3,
    },
    {
      title: "Gerenciar Cardápio",
      url: `/${slug}/cardapio`,
      icon: ShoppingBasket,
    },
    {
      title: "Gerenciar Usuários",
      url: `/${slug}/usuarios`,
      icon: Users,
    },
    {
      title: "Entregadores Rangooo Disponíveis",
      url: `/${slug}/entregadores-disponiveis`,
      icon: Motorbike,
    },
  ];

  const linksRangooo = [
    {
      title: "Home",
      url: "/rangooo",
      icon: Home,
    },
    {
      title: "Gerenciar Estabelecimentos",
      url: "/rangooo/estabelecimentos",
      icon: Warehouse,
    },
    {
      title: "Pedidos de Cadastro",
      url: `/rangooo/pedidos-cadastro`,
      icon: ClipboardPenLine,
    },
    {
      title: "Pedidos Entregadores",
      url: "/rangooo/pedidos-entregadores",
      icon: Motorbike,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];

  const activeLinks = isAdminRoute ? linksRangooo : linksEstablishments;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="relative w-full h-52 p-4 border-2 shadow-lg border-red-500 rounded-lg bg-white">
          <Image
            src="/logo-rangooo.png"
            alt="Logo Rangooo"
            fill
            className="object-contain p-4"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {isAdminRoute ? "Painel Admin" : "Gerenciamento"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Agora percorremos a lista correta */}
              {activeLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    {/* Use Link em vez de <a> para não dar refresh na página */}
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
