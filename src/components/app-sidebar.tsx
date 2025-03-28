"use client";

import type * as React from "react";
import {
  ArrowUpCircleIcon,
  ClockIcon,
  GlobeIcon,
  LogOutIcon,
  SmartphoneIcon,
  UserIcon,
} from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";

import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollapsibleNavMain } from "./collapsible-nav-main";

const data = {
  user: {
    name: "Usuario",
    email: "usuario@ejemplo.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Redes Sociales",
      url: "#",
      icon: GlobeIcon,
      children: [
        {
          title: "TikTok",
          url: "#",
          icon: TikTokIcon,
        },
        {
          title: "Facebook",
          url: "#",
          icon: FacebookIcon,
        },
      ],
    },
    {
      title: "Programar Interacciones",
      url: "#",
      icon: CalendarIcon,
      isActive: true,
    },
    {
      title: "Historial",
      url: "#",
      icon: ClockIcon,
    },
    {
      title: "Dispositivos",
      url: "#",
      icon: SmartphoneIcon,
    },
  ],
  navSecondary: [
    {
      title: "Usuario",
      url: "#",
      icon: UserIcon,
    },
    {
      title: "Cerrar Sesión",
      url: "#",
      icon: LogOutIcon,
    },
  ],
  documents: [
    {
      name: "Guía de TikTok",
      url: "#",
      icon: TikTokIcon,
    },
    {
      name: "Guía de Facebook",
      url: "#",
      icon: FacebookIcon,
    },
    {
      name: "Conexión de Dispositivos",
      url: "#",
      icon: SmartphoneIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  Bots Redes Sociales
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CollapsibleNavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
