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
import { ScheduledTiktokInteraction } from "@/app/main/schedule-posts/types";
import { TikTokScriptLoader } from "@/app/main/schedule-posts/TiktokScriptLoader";
import { Trash2, SquarePen } from "lucide-react";
import { EditModal } from "./EditModal";

type Props = {
  scheduledTiktokInteractions: ScheduledTiktokInteraction[];
  onExecuteInteraction: (interaction: ScheduledTiktokInteraction) => void;
  onEditInteraction: () => void;
  onDeleteInteraction: (id: number) => void;
};

const ScheduledTiktokInteractions = ({
  scheduledTiktokInteractions,
  onExecuteInteraction,
  onEditInteraction,
  onDeleteInteraction,
}: Props) => {
  //
  if (scheduledTiktokInteractions.length === 0) {
    return null;
  }

  const getDataVideoId = (videoUrl: string) => {
    const match = videoUrl.match(/\/(video|photo)\/([^\/]+)/);
    const videoId = match ? match[2] : null;
    return videoId;
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
      <TikTokScriptLoader />

      {scheduledTiktokInteractions.map((interaction, index) => (
        <Card key={interaction.id}>
          <CardHeader>
            <CardTitle>Interacción #{index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote
              className="tiktok-embed"
              cite={interaction.video_url}
              data-video-id={getDataVideoId(interaction.video_url)}
              style={{
                width: "100%",
                height: "750px",
                borderRadius: "7px",
                overflow: "hidden",
              }}
              data-embed-type="video"
            >
              <section>Loading...</section>
            </blockquote>

            <p>
              Acciones:
              {interaction.liked ? (
                <Badge variant="outline">Me Gusta</Badge>
              ) : (
                <Badge variant="outline">-</Badge>
              )}
              {interaction.saved ? (
                <Badge variant="outline">Guardar video</Badge>
              ) : (
                <Badge variant="outline">-</Badge>
              )}
            </p>

            <p>Comentario: {interaction.comment}</p>

            <p>Cantidad de vistas: {interaction.views_count}</p>

            <p>
              Estado:
              {interaction.status === "PENDIENTE" ? (
                <Badge
                  className="bg-yellow-100 text-yellow-800 border border-yellow-300"
                  variant="outline"
                >
                  Pendiente
                </Badge>
              ) : interaction.status === "EN_PROGRESO" ? (
                <Badge
                  className="bg-blue-100 text-blue-800 border border-blue-300"
                  variant="outline"
                >
                  En proceso
                </Badge>
              ) : interaction.status === "COMPLETADA" ? (
                <Badge
                  className="bg-green-100 text-green-800 border border-green-300"
                  variant="outline"
                >
                  Completada
                </Badge>
              ) : (
                <Badge variant="destructive">Fallida</Badge>
              )}
            </p>
          </CardContent>
          <CardFooter className="flex gap-4 justify-between">
            <Button
              variant="default"
              className="cursor-pointer"
              onClick={() => onExecuteInteraction(interaction)}
            >
              Ejecutar Interacción
            </Button>

            <div className="flex gap-2">
              <EditModal
                interaction={interaction}
                onEditInteraction={onEditInteraction}
                index={index}
                trigger={
                  <Button variant="outline" className="cursor-pointer">
                    <SquarePen />
                  </Button>
                }
              />

              <Button
                variant="outline"
                className="cursor-pointer "
                onClick={() => onDeleteInteraction(interaction.id)}
              >
                <Trash2 />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export { ScheduledTiktokInteractions };
