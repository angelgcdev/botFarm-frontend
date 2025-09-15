"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExecutionInfo,
  ScheduledTiktokInteraction,
  TiktokInteraction,
} from "@/app/main/schedule-posts/types";
import { TikTokScriptLoader } from "@/app/main/schedule-posts/TiktokScriptLoader";
import {
  Trash2,
  SquarePen,
  Loader2,
  Ban,
  Clock,
  Play,
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
  Monitor,
  Circle,
  Forward,
} from "lucide-react";
import { EditModal } from "./EditModal";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/context/SocketContext";
import { toast } from "sonner";
import { useDevices } from "@/context/DevicesContext";
import {
  deleteInteractionTiktokData,
  editInteractionTiktokData,
} from "@/app/main/schedule-posts/api";
import { TikTokIcon } from "@/components/icons/tiktok-icon";

type Props = {
  loadData: () => void;
  scheduledTiktokInteractions: TiktokInteraction[];
};

const ScheduledTiktokInteractions = ({
  loadData,
  scheduledTiktokInteractions,
}: Props) => {
  // Estados
  const [completedDevices, setCompletedDevices] = useState<number>(0);
  const [totalDevices, setTotalDevices] = useState<number>(0);
  const [cancelingIds, setCancelingIds] = useState<number[]>([]);
  const [executionInfo, setExecutionInfo] = useState<ExecutionInfo | null>(
    null
  );

  // Contextos
  const { socket } = useContext(SocketContext);
  const { devices } = useDevices();

  // Efectos
  //Liberar el bloqueo de las interacciones
  useEffect(() => {
    if (!socket) {
      toast.error("No hay conexión con el servidor.");
      return;
    }

    socket.on("interaction:canceled", () => {
      setCancelingIds([]);
    });

    socket.on("schedule:execution_info", (data) => {
      setExecutionInfo(data);
    });

    socket.on("schedule:progress", ({ completedDevices, totalDevices }) => {
      setCompletedDevices(Number(completedDevices));
      setTotalDevices(Number(totalDevices));
    });

    return () => {
      socket.off("interaction:canceled");
      socket.off("schedule:execution_info");
      socket.off("schedule:progress");
    };
  }, [socket]);

  //por si acaso
  if (!socket) {
    toast.error("No hay conexión con el servidor.");
    return;
  }

  //
  if (scheduledTiktokInteractions.length === 0) {
    return null;
  }

  const getDataVideoId = (videoUrl: string) => {
    const match = videoUrl.match(/\/(video|photo)\/([^\/]+)/);
    const videoId = match ? match[2] : null;
    return videoId;
  };

  //En el frontend, deshabilita todos los botones si cualquier interacción está en progreso:
  const anyExecuting = scheduledTiktokInteractions.some(
    (interaction) => interaction.status === "EN_PROGRESO"
  );

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
      case "EN_PROGRESO":
        return (
          <Badge
            variant="secondary"
            className="text-sm px-3 py-1.5 font-medium bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          >
            <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
            Ejecutando...
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

  //Funcion para ejecutar interaccion
  const handleExecuteScheduledTiktokInteraction = (
    scheduledTiktokInteractionData: ScheduledTiktokInteraction
  ) => {
    //Filtrar dispositivos conectados
    const activeDevices = devices.filter(
      (device) => device.status === "ACTIVO"
    );
    console.log("Dispositivos activos:", activeDevices);
    console.log("Datos de la interaccion", scheduledTiktokInteractionData);

    // Verificar que los dispositivos activos tengan su informacion completada
    const isCompleteInfoDevices = activeDevices.some(
      (device) => device.complete_config === false
    );

    if (isCompleteInfoDevices) {
      toast.warning("❗ Completar información adicional del dispositivo...");
      return;
    }

    if (activeDevices.length === 0) {
      toast.warning("🚨 No se encontraron dispositivos conectados.");
      return;
    }

    console.log("enviando datos a socket io... ");

    // Enviar los datos al servidor
    socket.emit("schedule:tiktok:start", scheduledTiktokInteractionData);

    toast.success(`Interacción de iniciada correctamente`);

    // return true;
  };

  //Funcion para editar interaccion
  const handleEditScheduledTiktokInteraction = async (
    id: number,
    interactionEdited: ScheduledTiktokInteraction
  ) => {
    const res = await editInteractionTiktokData(id, interactionEdited);

    console.log(res);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    //Actualizar datos del servidor
    await loadData();

    toast.success("Editado correctamente");
  };

  //Funcion para eliminar interaccion
  const handleDeleteScheduledTiktokInteraction = async (id: number) => {
    const res = await deleteInteractionTiktokData(id);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    //Actualizar datos del servidor
    await loadData();

    toast.success("Eliminado correctamente");
  };

  //Funcion para cancelar la interaccion
  const handleCancelScheduledTiktokInteraction = async (
    interaction_id: number
  ) => {
    socket.emit("cancel:tiktok:interaction", interaction_id);
  };

  return (
    <div
      className="max-w-[1200px] mx-auto mt-4"
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fill, 373px)",
        justifyContent: "center",
      }}
    >
      <TikTokScriptLoader reloadTrigger={scheduledTiktokInteractions} />
      {scheduledTiktokInteractions.map((interaction) => (
        <Card key={interaction.updated_at}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold ">
              <div className="flex gap-2 items-center">
                <TikTokIcon />
                Interacción
              </div>
            </CardTitle>
            {renderStatusBadge(interaction.status)}
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <blockquote
                key={interaction.video_url} // 👈 esto fuerza a React a regenerar el nodo
                className="tiktok-embed"
                cite={interaction.video_url}
                data-video-id={getDataVideoId(interaction.video_url)}
                style={{
                  width: "100%",
                  height: "575px",
                  borderRadius: "7px",
                  overflow: "hidden",
                  margin: "initial",
                }}
                data-embed-type="video"
              >
                <section>Loading...</section>
              </blockquote>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center z-10 rounded-md
        bg-black/70  transition-opacity duration-200 
        ${
          interaction.status === "EN_PROGRESO"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }
      `}
              >
                <Loader2 className="h-10 w-10 animate-spin text-blue-100" />
                <p className="mt-4 text-[24px] text-blue-100">Ejecutando...</p>
              </div>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center z-10 rounded-md
        bg-black/70  transition-opacity duration-200 
        ${
          cancelingIds.includes(interaction.id)
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }
      `}
              >
                <Loader2 className="h-10 w-10 animate-spin text-blue-100" />
                <p className="mt-4 text-[24px] text-blue-100">Cancelando...</p>
              </div>
            </div>

            <div className="mb-4 text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                <h4 className="font-medium">Acciones configuradas:</h4>
              </div>

              <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,80px),1fr))] gap-2 text-center text-sm font-light mb-4">
                {interaction.liked ? (
                  <div className="flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                    <Heart
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                    />
                    <span className="text-white font-normal">Me Gusta</span>
                  </div>
                ) : (
                  ""
                )}

                {interaction.saved ? (
                  <div className=" flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                    <Bookmark
                      className="w-4 h-4 text-yellow-600"
                      fill="currentColor"
                    />
                    <span className="text-white font-normal">Guardar</span>
                  </div>
                ) : (
                  ""
                )}

                {interaction.shared_on_facebook ? (
                  <div className=" flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                    <Forward
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                    />
                    <span className="text-white font-normal">Compartir</span>
                  </div>
                ) : (
                  ""
                )}

                {interaction.views_count !== 0 ? (
                  <div className=" flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                    <div className="">
                      <Eye className="w-4 h-4 text-purple-600" />
                      {/* <span className="font-medium">Vistas:</span> */}
                    </div>
                    <span className="font-bold text-purple-600">
                      {interaction.views_count}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {interaction.comment?.trim() !== "" ? (
                <div className="flex-col">
                  <div className="flex gap-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Comentario</span>
                  </div>
                  <div className="flex items-center justify-evenly gap-1.5 text-sm text-gray-400 bg-gray-800/60 p-2 rounded border">
                    <div className="overflow-auto">{interaction.comment}</div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Contador de dispositivo */}
            {interaction.status === "EN_PROGRESO" ? (
              <div className="flex-col">
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Dispositivos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-foreground">
                      {completedDevices}/{totalDevices}
                    </span>

                    <div className="relative ">
                      <Circle
                        className="w-3 h-3 text-emerald-500 fill-current"
                        strokeWidth={0}
                      />
                      <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progreso</span>
                    <span>
                      {totalDevices > 0
                        ? Math.round((completedDevices / totalDevices) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                      style={{
                        width:
                          totalDevices > 0
                            ? `${(completedDevices / totalDevices) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="mt-4 pt-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-blue-50 py-2 px-3 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>
                  Tiempo estimado:{" "}
                  <strong>
                    {executionInfo?.interactionId === interaction.id
                      ? executionInfo?.estimatedTime
                      : 0}
                  </strong>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <div className="space-y-3 flex-1">
              <Button
                className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 text-white font-medium"
                onClick={() => {
                  handleExecuteScheduledTiktokInteraction(interaction);
                }}
                disabled={anyExecuting || interaction.status === "EN_PROGRESO"}
              >
                {interaction.status === "EN_PROGRESO" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    Ejecutando Interacción
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Ejecutar Interacción
                  </>
                )}
              </Button>

              <div className="flex gap-2">
                <EditModal
                  interaction={interaction}
                  onEditInteraction={handleEditScheduledTiktokInteraction}
                  trigger={
                    <Button
                      variant="outline"
                      className="cursor-pointer flex-1 border-gray-300 hover:bg-gray-50"
                      size="sm"
                      disabled={
                        anyExecuting && interaction.status !== "EN_PROGRESO"
                      }
                    >
                      <SquarePen className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  }
                />

                <Button
                  variant="outline"
                  className="cursor-pointer flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  size="sm"
                  onClick={() => {
                    setCancelingIds((prev) => [...prev, interaction.id]);
                    handleCancelScheduledTiktokInteraction(interaction.id);
                  }}
                  disabled={
                    interaction.status === "PENDIENTE" ||
                    interaction.status === "COMPLETADA" ||
                    interaction.status === "CANCELADO"
                  }
                >
                  <Ban />
                  Cancelar
                </Button>

                <Button
                  variant="outline"
                  className="cursor-pointer flex-1 border-red-300 text-red-700 hover:bg-red-50"
                  size="sm"
                  onClick={() =>
                    handleDeleteScheduledTiktokInteraction(interaction.id)
                  }
                  disabled={
                    anyExecuting && interaction.status !== "EN_PROGRESO"
                  }
                >
                  <Trash2 />
                  Eliminar
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export { ScheduledTiktokInteractions };
