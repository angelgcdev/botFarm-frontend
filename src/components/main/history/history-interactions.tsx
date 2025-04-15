"use client";
import { CheckCircle2, Clock, ExternalLink, TrendingUp } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { FacebookIcon } from "@/components/icons/facebook-icon";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Datos de ejemplo para el historial de interacciones
const historyData = [
  {
    id: 1,
    date: "2024-04-30",
    platform: "tiktok",
    url: "https://tiktok.com/video/12345",
    actions: ["Me gusta", "Guardar", "Comentar"],
    views: 1200,
    status: "Completado",
  },
  {
    id: 2,
    date: "2024-04-29",
    platform: "facebook",
    url: "https://facebook.com/post/67890",
    actions: ["Me gusta", "Comentar"],
    views: 0,
    status: "Completado",
  },
  {
    id: 3,
    date: "2024-04-28",
    platform: "tiktok",
    url: "https://tiktok.com/video/54321",
    actions: ["Me gusta", "Guardar"],
    views: 800,
    status: "Completado",
  },
  {
    id: 4,
    date: "2024-04-27",
    platform: "facebook",
    url: "https://facebook.com/post/09876",
    actions: ["Me gusta"],
    views: 0,
    status: "Completado",
  },
  {
    id: 5,
    date: "2024-05-01",
    platform: "tiktok",
    url: "https://tiktok.com/video/13579",
    actions: ["Me gusta", "Guardar", "Comentar"],
    views: 1500,
    status: "Pendiente",
  },
];

export function HistoryInteractions() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Historial de Interacciones
        </CardTitle>
        <CardDescription>
          Registro de todas las interacciones programadas en tus redes sociales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Plataforma</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Acciones</TableHead>
              <TableHead className="text-right">Vistas</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {item.platform === "tiktok" ? (
                    <div className="flex items-center gap-1">
                      <TikTokIcon className="h-4 w-4" />
                      <span>TikTok</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <FacebookIcon className="h-4 w-4 text-blue-600" />
                      <span>Facebook</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="link" className="h-auto p-0" asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="truncate max-w-[120px]">
                        {item.url.replace(/https?:\/\//, "")}
                      </span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.views > 0 ? (
                    <div className="flex items-center justify-end gap-1">
                      <span>{item.views.toLocaleString("es-ES")}</span>
                      {item.platform === "tiktok" && (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell>
                  {item.status === "Completado" ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Completado
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200"
                    >
                      <Clock className="h-3 w-3" />
                      Pendiente
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
