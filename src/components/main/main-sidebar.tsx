"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  ClockIcon,
  SmartphoneIcon,
  CalendarRange,
  Shield,
  ChartSpline,
} from "lucide-react";
// import { NavSecondary } from "./nav-secondary";
import { MainNavUser } from "./main-nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollapsibleNavMain } from "../collapsible-nav";
import { ModeToggle } from "../mode-toggle";
import { ActiveDevicesPanel } from "./ActiveDevicesPanel";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/main/dashboard",
      icon: ChartSpline,
      isActive: true,
    },
    {
      title: "Programar Interacciones",
      url: "/main/schedule-posts",
      icon: CalendarRange,
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
};

export function MainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [email, setEmail] = useState("usuario@ejemplo.com");
  const [navItems, setNavItems] = useState(data.navMain); // estado propio para el menu

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setEmail(email);
    }

    // Obtener rol y actualizar menú si es ADM
    const role = localStorage.getItem("role");
    if (role === "ADMINISTRADOR") {
      setNavItems([
        ...data.navMain,
        {
          title: "Panel de administración",
          url: "/admin/dashboard",
          icon: Shield,
        },
      ]);
    }
  }, []);

  const user = {
    email,
    avatar: "/avatar/perfil.png",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex w-8 h-8 bg-primary rounded-lg items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Bots Redes Sociales</span>
              <ModeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <CollapsibleNavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="gap-8">
        <ActiveDevicesPanel />
        <MainNavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
