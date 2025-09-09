"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useContext } from "react";

// 3. Librerías internas absolutas
import { Button } from "@/components/ui/button";

// 4. Imports relativos
import { TikTokIcon } from "../../icons/tiktok-icon";
import { FacebookIcon } from "../../icons/facebook-icon";
import { ScheduledTiktokInteractions } from "./ScheduledTiktokInteractions";
import { ScheduledInteractions } from "@/app/main/schedule-posts/types";
import { SocketContext } from "@/context/SocketContext";
import { getInteractionsTiktokData } from "@/app/main/schedule-posts/api";
import CreateInteractionTiktokForm from "./CreateInteractionTiktokForm";
import { Plus } from "lucide-react";
import CreateInteractionFacebookForm from "./CreateInteractionFacebookForm";
import { ScheduledFacebookInteractions } from "./ScheduledFacebookInteractions";

export function ScheduleInteractionsForm() {
  // Estados
  const [scheduledInteractions, setscheduledInteractions] =
    useState<ScheduledInteractions>({ tiktok: [], facebook: [] });

  // Contextos
  const { socket } = useContext(SocketContext);

  //obtener datos
  const loadData = useCallback(async () => {
    const res = await getInteractionsTiktokData();
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    console.log(res);
    setscheduledInteractions(res.data);
  }, []);

  // Efectos
  useEffect(() => {
    if (!socket) {
      toast.error("No hay conexión con el servidor.");
      return;
    }

    loadData();

    socket.on("schedule:interactions:update", loadData);

    return () => {
      socket.off("schedule:interactions:update", loadData);
    };
  }, [socket, loadData]);

  //por si acaso
  if (!socket) {
    toast.error("No hay conexión con el servidor.");
    return;
  }

  return (
    <>
      <div className="flex gap-4">
        <CreateInteractionTiktokForm
          loadData={loadData}
          trigger={
            <Button variant="outline" size="sm">
              <Plus strokeWidth={4} />
              <TikTokIcon className="h-4 w-4" />
              Tiktok
            </Button>
          }
        />

        <CreateInteractionFacebookForm
          loadData={loadData}
          trigger={
            <Button
              className="bg-[#1877F2] text-white hover:bg-blue-600"
              size="sm"
            >
              <Plus strokeWidth={4} />
              <FacebookIcon className="h-4 w-4" />
              Facebook
            </Button>
          }
        />
      </div>

      {scheduledInteractions.tiktok.length === 0 &&
      scheduledInteractions.facebook.length === 0 ? (
        <div className="mt-20 flex items-center justify-center">
          <p className="text-center text-muted-foreground">
            No hay Interacciones creadas todavía
          </p>
        </div>
      ) : (
        <>
          <ScheduledTiktokInteractions
            loadData={loadData}
            scheduledTiktokInteractions={scheduledInteractions.tiktok}
          />
          <ScheduledFacebookInteractions
            loadData={loadData}
            scheduledFacebookInteractions={scheduledInteractions.facebook}
          />
        </>
      )}
    </>
  );
}
