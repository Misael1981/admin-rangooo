"use client";

import {
  Calendar,
  ClipboardList,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingBasket,
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
      title: "Gerenciar Cardápio",
      url: `/${slug}/cardapio`,
      icon: ShoppingBasket,
    },
    {
      title: "Gerenciar Usuários",
      url: `/${slug}/usuarios`,
      icon: Users,
    },
  ];

  const linksRangooo = [
    {
      title: "Home",
      url: "/admin-rangooo",
      icon: Home,
    },
    {
      title: "Gerenciar Pedidos",
      url: `${slug}/pedidos}`,
      icon: Inbox,
    },
    {
      title: "Perfil do Estabelecimento",
      url: `/${slug}/perfil`,
      icon: Warehouse,
    },
    {
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
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
