"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useContext } from "react";

// 3. Librerías internas absolutas
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSocket } from "@/lib/socket/socketClient";
import { DevicesContext } from "@/context/DevicesContext";

// 4. Imports relativos
import { TikTokIcon } from "../../icons/tiktok-icon";
import { FacebookIcon } from "../../icons/facebook-icon";

const interactionsTiktokItems = [
  {
    id: "liked",
    label: "Me Gusta",
  },
  {
    id: "saved",
    label: "Guardar Video",
  },
];

const tiktokInteractionSchema = z.object({
  video_url: z.string().url().min(1, "El enlace es requerido"),
  views_count: z
    .number()
    .min(0, "El número de vistas no puede ser menor que 0.")
    .optional(),
  items: z.array(z.string()),
  comment: z.string().optional(),
});

type TikTokInteractionForm = z.infer<typeof tiktokInteractionSchema>;

export function ScheduleInteractionsForm() {
  //Obtener datos de los dispositivos mediante useContext
  const devices = useContext(DevicesContext);

  //Use form
  const form = useForm<z.infer<typeof tiktokInteractionSchema>>({
    resolver: zodResolver(tiktokInteractionSchema),
    defaultValues: {
      video_url: "",
      views_count: undefined,
      items: [],
      comment: "",
    },
  });

  const [activeTab, setActiveTab] = useState("tiktok");
  const [addComment, setAddComment] = useState(false);

  const onSubmit = (scheduledTiktokData: TikTokInteractionForm) => {
    toast.success(
      `Interacción de ${
        activeTab === "tiktok" ? "TikTok" : "Facebook"
      } iniciada correctamente`
    );

    //Filtrar dispositivos conectados
    const activeDevices = devices.filter(
      (device) => device.status === "ACTIVO"
    );
    console.log(activeDevices);
    console.log(scheduledTiktokData);

    console.log("enviando datos a socket io... ");

    const socket = getSocket();

    // Enviar los datos al servidor
    socket.emit("schedule:tiktok:start", {
      scheduledTiktokData,
      activeDevices,
    });

    // Limpiar el formulario después de enviarlo
    form.reset(); // Restablece todos los valores del formulario
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
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
              Potencia tu visibilidad en TikTok
            </CardTitle>
            <CardDescription>
              Amplifica tu alcance automáticamente generando interacciones
              reales en tus videos favoritos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="video_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enlace del video</FormLabel>
                      <FormControl>
                        <Input
                          id="video_url"
                          placeholder="Pega aquí la URL del video (ej: https://tiktok.com/@usuario/video/123456789)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Alguna descripcion</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          ¿Qué acciones quieres realizar?
                        </FormLabel>
                        <FormDescription>
                          Alguna descripcion o borrame
                        </FormDescription>
                      </div>
                      {interactionsTiktokItems.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    id="tiktok-like"
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tiktok-comment"
                    checked={addComment}
                    onCheckedChange={(checked) => {
                      if (typeof checked === "boolean") setAddComment(checked);
                    }}
                  />
                  <Label htmlFor="tiktok-comment" className="font-normal">
                    Comentar (Opcional)
                  </Label>
                </div>

                {addComment && (
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Escribe el comentario a publicar</FormLabel>
                        <FormControl>
                          <Textarea
                            id="tiktok-comment-text"
                            placeholder="Escribe......"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>alguna descripcion</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="views_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        ¿Cuántas visualizaciones deseas generar?
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="tiktok-views"
                          type="number"
                          min="0"
                          placeholder="100"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>Alguna descripcion</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-black hover:bg-black/40 text-white"
            >
              Iniciar Interacciones
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="facebook"></TabsContent>
    </Tabs>
  );
}
