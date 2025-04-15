"use client";

import type * as React from "react";
import {
  ArrowUpCircleIcon,
  ClockIcon,
  LogOutIcon,
  SmartphoneIcon,
  UserIcon,
} from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";

import { MainNavDocuments } from "./main-nav-documents";
// import { NavSecondary } from "./nav-secondary";
import { MainNavUser } from "./main-nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollapsibleNavMain } from "./main-collapsible-nav";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const data = {
  user: {
    name: "Usuario",
    email: "usuario@ejemplo.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // {
    //   title: "Redes Sociales",
    //   url: "#",
    //   icon: GlobeIcon,
    //   children: [
    //     {
    //       title: "TikTok",
    //       url: "#",
    //       icon: TikTokIcon,
    //     },
    //     {
    //       title: "Facebook",
    //       url: "#",
    //       icon: FacebookIcon,
    //     },
    //   ],
    // },
    {
      title: "Programar Interacciones",
      url: "/main/schedule-posts",
      icon: CalendarIcon,
      isActive: true,
    },
    {
      title: "Dispositivos",
      url: "/main/devices",
      icon: SmartphoneIcon,
    },
    {
      title: "Historial",
      url: "/main/history",
      icon: ClockIcon,
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
      url: "/login",
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

export function MainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/main">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  Bots Redes Sociales
                </span>
              </Link>
            </SidebarMenuButton>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CollapsibleNavMain items={data.navMain} />
        <MainNavDocuments items={data.documents} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <MainNavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
