"use client";

import * as React from "react";
import { TikTokIcon } from "./icons/tiktok-icon";
import { FacebookIcon } from "./icons/facebook-icon";
import { Check, ChevronDown, ChevronUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock data for Facebook groups
const facebookGroups = [
  { id: "group1", name: "Grupo de Marketing Digital" },
  { id: "group2", name: "Emprendedores en Línea" },
  { id: "group3", name: "Ventas y Publicidad" },
  { id: "group4", name: "Desarrollo Web y Apps" },
  { id: "group5", name: "Social Media Specialists" },
];

// Mock data for connected devices
const connectedDevices = [
  { id: "dev1", name: "Samsung Galaxy S21", platform: "Android" },
  { id: "dev2", name: "iPhone 13", platform: "iOS" },
  { id: "dev3", name: "Xiaomi Redmi Note 10", platform: "Android" },
  { id: "dev4", name: "Motorola G9 Plus", platform: "Android" },
  { id: "dev5", name: "Samsung Galaxy A52", platform: "Android" },
];

export function ScheduleInteractionsForm() {
  const [activeTab, setActiveTab] = React.useState("tiktok");
  const [addComment, setAddComment] = React.useState(false);
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);
  const [showGroupList, setShowGroupList] = React.useState(false);
  const [selectedDevices, setSelectedDevices] = React.useState<string[]>([]);
  const [showDeviceList, setShowDeviceList] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Interacción de ${
        activeTab === "tiktok" ? "TikTok" : "Facebook"
      } programada correctamente`
    );
  };

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tiktok" className="flex items-center gap-2">
          <TikTokIcon className="h-4 w-4" />
          <span>TikTok</span>
        </TabsTrigger>
        <TabsTrigger value="facebook" className="flex items-center gap-2">
          <FacebookIcon className="h-4 w-4 text-blue-600" />
          <span className="text-blue-600">Facebook</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tiktok">
        <Card className="w-full border-t-0 rounded-tl-none rounded-tr-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TikTokIcon className="h-5 w-5" />
              Programar Interacciones en TikTok
            </CardTitle>
            <CardDescription>
              Configura las interacciones que deseas programar en TikTok
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tiktok-url">URL del Video</Label>
                  <Input
                    id="tiktok-url"
                    placeholder="https://tiktok.com/@usuario/video/123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Interacción</Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tiktok-like" />
                      <Label htmlFor="tiktok-like" className="font-normal">
                        Dar Me Gusta
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tiktok-save" />
                      <Label htmlFor="tiktok-save" className="font-normal">
                        Guardar Video
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tiktok-comment"
                        checked={addComment}
                        onCheckedChange={(checked) => {
                          if (typeof checked === "boolean")
                            setAddComment(checked);
                        }}
                      />
                      <Label htmlFor="tiktok-comment" className="font-normal">
                        Añadir Comentario
                      </Label>
                    </div>
                  </div>
                </div>

                {addComment && (
                  <div className="space-y-2">
                    <Label htmlFor="tiktok-comment-text">
                      Texto del Comentario
                    </Label>
                    <Textarea
                      id="tiktok-comment-text"
                      placeholder="Escribe tu comentario aquí..."
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="tiktok-views">
                    Cantidad de Vistas a Generar
                  </Label>
                  <Input
                    id="tiktok-views"
                    type="number"
                    min="0"
                    placeholder="1000"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tiktok-devices">
                      Dispositivos a Utilizar
                    </Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="tiktok-devices">
                        <SelectValue placeholder="Selecciona dispositivos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          Todos los dispositivos
                        </SelectItem>
                        <SelectItem value="group1">
                          Grupo 1 (5 dispositivos)
                        </SelectItem>
                        <SelectItem value="group2">
                          Grupo 2 (3 dispositivos)
                        </SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiktok-schedule">Programar para</Label>
                    <Select defaultValue="now">
                      <SelectTrigger id="tiktok-schedule">
                        <SelectValue placeholder="Selecciona cuándo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Ejecutar ahora</SelectItem>
                        <SelectItem value="1h">En 1 hora</SelectItem>
                        <SelectItem value="today">Hoy a las 20:00</SelectItem>
                        <SelectItem value="tomorrow">
                          Mañana a las 10:00
                        </SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-black hover:bg-black/40 text-white"
            >
              Programar Interacción
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="facebook">
        <Card className="w-full border-t-0 rounded-tl-none rounded-tr-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#1877F2]">
              <FacebookIcon className="h-5 w-5 text-[#1877F2]" />
              Programar Interacciones en Facebook
            </CardTitle>
            <CardDescription>
              Configura las interacciones que deseas programar en Facebook
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook-url">URL de la Publicación</Label>
                  <Input
                    id="facebook-url"
                    placeholder="https://facebook.com/usuario/posts/123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Interacción</Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="facebook-like" />
                      <Label htmlFor="facebook-like" className="font-normal">
                        Dar Me Gusta
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="facebook-comment"
                        checked={addComment}
                        onCheckedChange={(checked) => {
                          if (typeof checked === "boolean")
                            setAddComment(checked);
                        }}
                      />
                      <Label htmlFor="facebook-comment" className="font-normal">
                        Añadir Comentario
                      </Label>
                    </div>
                  </div>
                </div>

                {addComment && (
                  <div className="space-y-2">
                    <Label htmlFor="facebook-comment-text">
                      Texto del Comentario
                    </Label>
                    <Textarea
                      id="facebook-comment-text"
                      placeholder="Escribe tu comentario aquí..."
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="facebook-groups">Grupos a Compartir</Label>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setShowGroupList(!showGroupList)}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          {selectedGroups.length === 0
                            ? "Selecciona grupos para compartir"
                            : `${selectedGroups.length} grupos seleccionados`}
                        </span>
                      </div>
                      {showGroupList ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>

                    {showGroupList && (
                      <Card className="absolute z-10 w-full mt-1">
                        <CardContent className="p-2">
                          <ScrollArea className="h-60">
                            <div className="space-y-2 p-2">
                              {facebookGroups.map((group) => (
                                <div
                                  key={group.id}
                                  className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer"
                                  onClick={() => toggleGroupSelection(group.id)}
                                >
                                  <Checkbox
                                    checked={selectedGroups.includes(group.id)}
                                    id={`group-${group.id}`}
                                  />
                                  <Label
                                    htmlFor={`group-${group.id}`}
                                    className="font-normal cursor-pointer flex-1"
                                  >
                                    {group.name}
                                  </Label>
                                  {selectedGroups.includes(group.id) && (
                                    <Check className="h-4 w-4 text-blue-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {selectedGroups.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedGroups.map((groupId) => {
                        const group = facebookGroups.find(
                          (g) => g.id === groupId
                        );
                        return (
                          <Badge
                            key={groupId}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {group?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-devices">
                      Dispositivos a Utilizar
                    </Label>
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => setShowDeviceList(!showDeviceList)}
                      >
                        <div className="flex items-center gap-2">
                          <span>
                            {selectedDevices.length === 0
                              ? "Selecciona dispositivos"
                              : `${selectedDevices.length} dispositivos seleccionados`}
                          </span>
                        </div>
                        {showDeviceList ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>

                      {showDeviceList && (
                        <Card className="absolute z-10 w-full mt-1">
                          <CardContent className="p-2">
                            <ScrollArea className="h-52">
                              <div className="space-y-2 p-2">
                                {connectedDevices.map((device) => (
                                  <div
                                    key={device.id}
                                    className="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer"
                                    onClick={() =>
                                      toggleDeviceSelection(device.id)
                                    }
                                  >
                                    <Checkbox
                                      checked={selectedDevices.includes(
                                        device.id
                                      )}
                                      id={`device-${device.id}`}
                                    />
                                    <div className="flex-1">
                                      <Label
                                        htmlFor={`device-${device.id}`}
                                        className="font-normal cursor-pointer"
                                      >
                                        {device.name}
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        {device.platform}
                                      </p>
                                    </div>
                                    {selectedDevices.includes(device.id) && (
                                      <Check className="h-4 w-4 text-blue-600" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {selectedDevices.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedDevices.map((deviceId) => {
                          const device = connectedDevices.find(
                            (d) => d.id === deviceId
                          );
                          return (
                            <Badge
                              key={deviceId}
                              variant="outline"
                              className="bg-slate-50 text-slate-700 border-slate-200"
                            >
                              {device?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook-schedule">Programar para</Label>
                    <Select defaultValue="now">
                      <SelectTrigger id="facebook-schedule">
                        <SelectValue placeholder="Selecciona cuándo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Ejecutar ahora</SelectItem>
                        <SelectItem value="1h">En 1 hora</SelectItem>
                        <SelectItem value="today">Hoy a las 20:00</SelectItem>
                        <SelectItem value="tomorrow">
                          Mañana a las 10:00
                        </SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-[#1877F2] hover:bg-[#1877F2]/80"
            >
              Programar Interacción
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
