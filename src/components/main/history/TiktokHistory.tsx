"use client";

import { getTiktokHistory } from "@/app/main/history/api";
import {
  TiktokHistoryProps,
  TiktokInteractionHistoryFull,
} from "@/app/main/history/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeWithDateFns } from "@/lib/utils/formatRelativeWithDateFns";
import {
  Bookmark,
  Calendar,
  ExternalLink,
  Eye,
  Forward,
  Heart,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TiktokHistory = ({ renderStatusBadge }: TiktokHistoryProps) => {
  // Estados
  const [tiktokHistories, setTiktokHistories] = useState<
    TiktokInteractionHistoryFull[]
  >([]);

  // Efectos
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTiktokHistory();

      console.log(res);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      setTiktokHistories(res.data);
    };

    fetchData();
  }, []);

  console.log("Historial de tiktok:", tiktokHistories);

  return (
    <div className="space-y-3">
      {tiktokHistories.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No se encontraron interacciones
          </CardContent>
        </Card>
      ) : (
        tiktokHistories.map((tiktokHistory) => (
          <Card
            key={tiktokHistory.id}
            className="hover:shadow-md transition-shadow overflow-auto mb-4"
          >
            <CardContent>
              <div className="flex flex-wrap items-start justify-between">
                <div className=" space-y-2">
                  {/* Header con dispositivo y plataforma */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-sm">
                        {tiktokHistory.device.brand}
                      </span>
                      <span className="font-medium text-sm">
                        {tiktokHistory.device.udid}
                      </span>
                    </div>

                    {renderStatusBadge(tiktokHistory.status)}
                  </div>

                  {/* URL del contenido */}
                  {tiktokHistory.video_url && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <a
                        href={tiktokHistory.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-md"
                      >
                        {tiktokHistory.video_url}
                      </a>
                    </div>
                  )}

                  {/* Acciones realizadas */}
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    {tiktokHistory.liked === true && (
                      <div className="text-sm flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                        <Heart
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                        />
                        <span className="text-white font-normal">Me Gusta</span>
                      </div>
                    )}
                    {tiktokHistory.video_saved === true && (
                      <div className="text-sm flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                        <Bookmark
                          className="w-4 h-4 text-yellow-600"
                          fill="currentColor"
                        />
                        <span className="text-white font-normal">Guardar</span>
                      </div>
                    )}
                    {tiktokHistory.shared_on_facebook === true && (
                      <div className="text-sm flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                        <Forward
                          className="w-4 h-4 text-yellow-600"
                          fill="currentColor"
                        />
                        <span className="text-white font-normal">
                          Compartir
                        </span>
                      </div>
                    )}
                    {tiktokHistory.total_views !== 0 && (
                      <div className="text-sm flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                        <div className="">
                          <Eye className="w-4 h-4 text-purple-600" />
                          {/* <span className="font-medium">Vistas:</span> */}
                        </div>
                        <span className="font-bold text-purple-600">
                          {tiktokHistory.total_views}
                        </span>
                      </div>
                    )}
                    {tiktokHistory.commented?.trim() !== "" && (
                      <div className="text-sm flex items-center gap-2 bg-gray-800/60 p-2 rounded-md border">
                        <div>
                          <MessageCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-evenly gap-1.5 text-sm text-gray-400 ">
                          <div className="overflow-auto">
                            {tiktokHistory.commented}
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Usuario: </span>
                      <span className="font-bold">
                        {tiktokHistory.username}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fecha */}
                <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap pr-4">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {formatRelativeWithDateFns(tiktokHistory.finished_at)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TiktokHistory;
