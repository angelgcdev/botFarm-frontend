"use client";

import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { FacebookIcon } from "@/components/icons/facebook-icon";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacebookHistory from "./FacebookHistory";
import TiktokHistory from "./TiktokHistory";

export function HistoryInteractions() {
  // Funcion para actulizar el estado en el Badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "PENDIENTE":
        return (
          <Badge
            className="text-sm px-3 py-1.5 font-medium bg-amber-500/15 text-amber-400 border-amber-500/30"
            variant="outline"
          >
            Pendiente
          </Badge>
        );
      case "COMPLETADA":
        return (
          <Badge
            className="text-sm px-3 py-1.5 font-medium bg-blue-500/15 text-blue-400 border-blue-500/30"
            variant="outline"
          >
            Completado
          </Badge>
        );
      case "CANCELADO":
        return (
          <Badge
            className="text-sm px-3 py-1.5 font-medium bg-red-500/15 text-red-400 border-red-500/30"
            variant="outline"
          >
            Cancelado
          </Badge>
        );
      default:
        return (
          <Badge
            className="text-sm px-3 py-1.5 font-medium"
            variant="destructive"
          >
            Fallida
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tiktok">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="tiktok">
            <TikTokIcon />
            Tiktok
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="facebook">
            <FacebookIcon className="text-[#1877F2]" />
            Facebook
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tiktok">
          <TiktokHistory renderStatusBadge={renderStatusBadge} />
        </TabsContent>

        <TabsContent value="facebook">
          <FacebookHistory renderStatusBadge={renderStatusBadge} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
