import { MainSidebar } from "@/components/main/main-sidebar";
import { MainSiteHeader } from "@/components/main/main-site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";
import { Toaster } from "sonner";
import ClientUserSender from "./ClienUserSender";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ClientUserSender />
      <SocketProvider>
        <Toaster />
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
      </SocketProvider>
    </>
  );
};

export default MainLayout;
