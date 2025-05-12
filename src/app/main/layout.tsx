"use client";

import { MainSidebar } from "@/components/main/main-sidebar";
import { MainSiteHeader } from "@/components/main/main-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import SendUserIdOnLoad from "./ClientUserSender";

import { DevicesProvider } from "@/context/DevicesContext";
import { useSocket } from "@/hooks/useSocket";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //Iniciando la conexion socket io client
  useSocket();

  return (
    <>
      <DevicesProvider>
        <SendUserIdOnLoad />

        <Toaster position="bottom-right" richColors closeButton />
        <SidebarProvider>
          <MainSidebar variant="inset" />

          <SidebarInset>
            <MainSiteHeader />
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
    </>
  );
};

export default MainLayout;
