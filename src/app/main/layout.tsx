"use client";

import { MainSidebar } from "@/components/main/main-sidebar";
import { MainSiteHeader } from "@/components/main/main-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { toast, Toaster } from "sonner";
import SendUserIdOnLoad from "./ClientUserSender";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

import { DevicesProvider } from "@/context/DevicesContext";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    const handleDeviceConnected = (udid: string) => {
      console.log("Dispositivo conectado: ", udid);
      toast.info(`Dispositivo conectado: ${udid}`);
    };

    const handleDeviceDisconnected = (udid: string) => {
      console.log("Dispositivo desconectado: ", udid);
      toast.warning(`Dispositivo desconectado: ${udid}`);
    };

    const handleScheduleTiktokStatusNotification = (data: {
      id: number;
      status: string;
    }) => {
      // console.log("Dispositivo desconectado: ", udid);
      toast.info(`Interacción : ${data.status}`);
    };

    const socket = getSocket();

    socket.on("device:connected:notification", handleDeviceConnected);
    socket.on("device:disconnected:notification", handleDeviceDisconnected);
    socket.on(
      "schedule:tiktok:status:notification",
      handleScheduleTiktokStatusNotification
    );

    return () => {
      socket.off("device:connected:notification", handleDeviceConnected);
      socket.off("device:disconnected:notification", handleDeviceDisconnected);
      socket.off(
        "schedule:tiktok:status:notification",
        handleScheduleTiktokStatusNotification
      );
    };
  }, []);

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
