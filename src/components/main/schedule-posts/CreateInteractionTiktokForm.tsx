"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import {
  createInteractionTiktokData,
  fetchTikTokPreview,
} from "@/app/main/schedule-posts/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { TikTokPreview } from "@/app/main/schedule-posts/types";
import Image from "next/image";

export interface Props {
  loadData: () => void;
  trigger: ReactNode;
}

const tiktokInteractionSchema = z.object({
  video_url: z.string().url().min(1, "El enlace es requerido"),
  views_count: z
    .number()
    .min(0, "El número de vistas no puede ser menor que 0.")
    .optional(),
  liked: z.boolean().optional(),
  saved: z.boolean().optional(),
  shared_on_facebook: z.boolean().optional(),
  comment: z.string().optional(),
});

export type TikTokInteractionForm = z.infer<typeof tiktokInteractionSchema>;

const CreateInteractionTiktokForm = ({ loadData, trigger }: Props) => {
  // 1. Estado
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<null | TikTokPreview>(null);

  // 4. Librerias
  const form = useForm<z.infer<typeof tiktokInteractionSchema>>({
    resolver: zodResolver(tiktokInteractionSchema),
    defaultValues: {
      video_url: "",
      views_count: 0,
      liked: false,
      saved: false,
      shared_on_facebook: false,
      comment: "",
    },
  });

  // 5. Efectos
  //Efecto para actualizar la previsualización al cambiar el link
  useEffect(() => {
    const subscription = form.watch(async (value) => {
      const url = value.video_url;

      if (!url) {
        setPreview(null);
        return;
      }

      const previewData = await fetchTikTokPreview(url);

      if (!previewData.ok) {
        toast(previewData.message || "Error al obtener la previsualización");
        setPreview(null);
        return;
      }

      setPreview(previewData.data);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (scheduledTiktokDataForm: TikTokInteractionForm) => {
    console.log("Datos de la interaccion de tiktok:", scheduledTiktokDataForm);

    const res = await createInteractionTiktokData(scheduledTiktokDataForm);

    if (!res.ok) {
      toast.error(res.message);
    }

    //Actualizar datos del servidor
    await loadData();

    toast.success("Creado correctamente");

    //Cerrar el modal
    setIsOpen(false);

    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TikTokIcon className="h-5 w-5" />
            Potencia tu visibilidad en TikTok
          </DialogTitle>
          <DialogDescription>
            Amplifica tu alcance automáticamente generando interacciones reales
            en tus videos favoritos.
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full border rounded">
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
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
                      {/* <FormDescription>Alguna descripcion</FormDescription> */}
                      <FormMessage />
                      {/* Mostramos la previsualización */}
                      {preview && (
                        <div className="mt-2 flex items-center gap-3 border rounded p-2 bg-gray-800">
                          <Image
                            src={preview.thumbnail_url ?? ""}
                            alt={preview.title ?? ""}
                            width={90}
                            height={90}
                            className="object-cover rounded"
                          />
                          <div className="flex-col text-sm text-white">
                            <p className="font-medium">
                              {preview.provider_name}.{preview.author_name}
                            </p>
                            <p className="font-light">{preview.title}</p>
                          </div>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <p className="text-base">¿Qué acciones quieres realizar?</p>

                <div className="flex gap-4 flex-wrap">
                  <FormField
                    control={form.control}
                    name="liked"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Me gusta</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="saved"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Guardar video
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shared_on_facebook"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Compartir en un grupo de Facebook
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
              Crear Interacción
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInteractionTiktokForm;
