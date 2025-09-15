"use client";

import { Users, ArrowLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollapsibleNavMain } from "../collapsible-nav";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";

const data = {
  navMain: [
    // {
    //   title: "Dashboard General",
    //   url: "/admin/dashboard",
    //   icon: ChartSpline,
    //   isActive: true,
    // },
    {
      title: "Usuarios",
      url: "/admin/usuarios",
      icon: Users,
      isActive: true,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Link href="/main/dashboard-admin">
              <SidebarMenuButton>
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="text-lg font-semibold">Volver</span>
              </SidebarMenuButton>
            </Link>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <CollapsibleNavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
