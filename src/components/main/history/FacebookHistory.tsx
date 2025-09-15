import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeWithDateFns } from "@/lib/utils/formatRelativeWithDateFns";
import {
  Calendar,
  ChevronsUpDown,
  ExternalLink,
  Heart,
  MessageCircle,
  Smartphone,
  Users,
} from "lucide-react";
import {
  FacebookHistoryProps,
  FacebookInteractionHistoryFull,
} from "@/app/main/history/types";
import { toast } from "sonner";
import { getFacebookHistory } from "@/app/main/history/api";
import { Button } from "@/components/ui/button";

const FacebookHistory = ({ renderStatusBadge }: FacebookHistoryProps) => {
  // Estados
  const [facebookHistories, setFacebookHistories] = useState<
    FacebookInteractionHistoryFull[]
  >([]);
  const [openHistoryId, setOpenHistoryId] = useState<number | null>(null);

  // Efectos
  useEffect(() => {
    const fetchData = async () => {
      const res = await getFacebookHistory();

      console.log(res);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      setFacebookHistories(res.data);
    };

    fetchData();
  }, []);

  console.log("Historial de facebook:", facebookHistories);

  const handleDetails = (id: number) => {
    setOpenHistoryId(openHistoryId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {facebookHistories.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No se encontraron interacciones
          </CardContent>
        </Card>
      ) : (
        facebookHistories.map((facebookHistory) => (
          <Card
            key={facebookHistory.id}
            className="hover:shadow-md transition-shadow overflow-auto mb-4"
          >
            <CardContent className="flex justify-between">
              <div className="flex flex-wrap items-start justify-between flex-1">
                <div className=" space-y-2">
                  {/* Header con dispositivo y plataforma */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-sm">
                        {facebookHistory.device.brand}
                      </span>
                      <span className="font-medium text-sm">
                        {facebookHistory.device.udid}
                      </span>
                    </div>

                    {renderStatusBadge(facebookHistory.status)}
                  </div>

                  {/* URL del contenido */}
                  {facebookHistory.post_url && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <a
                        href={facebookHistory.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-md"
                      >
                        {facebookHistory.post_url}
                      </a>
                    </div>
                  )}

                  {/* Acciones realizadas */}
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    {facebookHistory.liked === true && (
                      <div className="text-sm flex items-center gap-1 justify-center bg-gray-800/60 px-2.5 py-1.5 rounded-md border border-gray-700/50">
                        <Heart
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                        />
                        <span className="text-white font-normal">Me Gusta</span>
                      </div>
                    )}

                    {facebookHistory.comment?.trim() !== "" && (
                      <div className="text-sm flex items-center gap-2 bg-gray-800/60 p-2 rounded-md border">
                        <div>
                          <MessageCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-evenly gap-1.5 text-sm text-gray-400 ">
                          <div className="overflow-auto">
                            {facebookHistory.comment}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fecha */}
                <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap pr-4">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {formatRelativeWithDateFns(facebookHistory.finished_at)}
                  </span>
                </div>

                {openHistoryId === facebookHistory.id && (
                  <div className="mt-4 p-4 rounded-md border-2 w-full">
                    <span className="font-semibold text-sm flex gap-2 items-center">
                      <Users className="h-4" />
                      Grupos compartidos:
                    </span>
                    <div className="mt-4 flex-col gap-4">
                      <ol className="list-decimal ml-5 space-y-1">
                        {facebookHistory.facebook_shared_groups.length > 0 ? (
                          facebookHistory.facebook_shared_groups.map(
                            (group) => (
                              <li
                                key={group.id}
                                className="px-3 py-1 text-sm font-light "
                              >
                                {group.name}
                              </li>
                            )
                          )
                        ) : (
                          <div className="text-center text-sm font-light">
                            No se compartio en ningun grupo
                          </div>
                        )}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
              <Button
                onClick={() => handleDetails(facebookHistory.id)}
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <ChevronsUpDown />
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default FacebookHistory;
