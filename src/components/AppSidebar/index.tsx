"use client";

import {
  ClipboardPenLine,
  Home,
  Motorbike,
  Settings,
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
import Link from "next/link";

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

export function AppSidebar() {
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
          <SidebarGroupLabel>Painel Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {linksRangooo.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
