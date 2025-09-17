"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminSiteHeader } from "@/components/admin/AdminSiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DevicesProvider } from "@/context/DevicesContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [roleChecked, setRoleChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkRole = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verificar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const error = await res.json();
          console.warn(error.message);
          router.push("/main/dashboard");
          return;
        }

        setRoleChecked(true); // Solo mostrar hijos si está autenticado
      } catch (err) {
        router.push("/main/dashboard");
        console.log(err);
      }
    };

    checkRole();
  }, [router]);

  if (!roleChecked) return <div>Cargando...</div>; // Evita mostrar el layout hasta verificar

  return (
    <DevicesProvider>
      <SidebarProvider>
        <AdminSidebar variant="inset" />

        <SidebarInset>
          <AdminSiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DevicesProvider>
  );
};

export default AdminLayout;
