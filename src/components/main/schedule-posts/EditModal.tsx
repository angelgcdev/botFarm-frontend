"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// 3. Librerías internas absolutas
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// 4. Imports relativos
import {
  ScheduledTiktokInteractionEdit,
  TikTokPreview,
} from "@/app/main/schedule-posts/types";
import Image from "next/image";
import { fetchTikTokPreview } from "@/app/main/schedule-posts/api";
// import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  interaction: ScheduledTiktokInteractionEdit;
  onEditInteraction: (id: number, data: TikTokInteractionForm) => void;
  trigger: React.ReactNode;
};

const tiktokInteractionSchema = z.object({
  video_url: z
    .string()
    .url("Por favor ingresa un enlace válido")
    .min(1, "El enlace es requerido"),
  views_count: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0, "El número de vistas no puede ser negativo.")
    .optional(),
  liked: z.boolean().optional(),
  saved: z.boolean().optional(),
  shared_on_facebook: z.boolean().optional(),
  comment: z.string().optional(),
});

export type TikTokInteractionForm = z.infer<typeof tiktokInteractionSchema>;

function EditModal({ interaction, onEditInteraction, trigger }: Props) {
  // 1. Estados
  const [preview, setPreview] = useState<null | TikTokPreview>(null);
  const [open, setOpen] = useState(false);

  // 4. Librerias
  //Use form
  const form = useForm<z.infer<typeof tiktokInteractionSchema>>({
    resolver: zodResolver(tiktokInteractionSchema),
    defaultValues: {
      video_url: interaction.video_url,
      views_count: interaction.views_count,
      liked: interaction.liked,
      saved: interaction.saved,
      shared_on_facebook: interaction.shared_on_facebook,
      comment: interaction.comment,
    },
  });

  const videoUrl = form.watch("video_url");

  // 5. Efectos
  //Efecto para actualizar la previsualización al cambiar el link
  useEffect(() => {
    if (!videoUrl) {
      setPreview(null);
      return;
    }

    const fetchPreview = async () => {
      const previewData = await fetchTikTokPreview(videoUrl);
      if (!previewData.ok) {
        // toast.error(
        //   previewData.message || "Error al obtener la previsualizacion"
        // );
        setPreview(null);
        return;
      }
      setPreview(previewData.data);
    };

    fetchPreview();
  }, [videoUrl]);

  const onSubmit = async (interactionEdited: TikTokInteractionForm) => {
    onEditInteraction(interaction.id, interactionEdited);
    setOpen(false); // Cierra el modal
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar interacción #{interaction.id}</DialogTitle>
        </DialogHeader>

        <Card className="w-full border rounded">
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
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

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentario</FormLabel>
                      <FormControl>
                        <Textarea
                          id="tiktok-comment-text"
                          placeholder="Escribe......"
                          {...field}
                        />
                      </FormControl>
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
                          placeholder="50"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Guardar cambios</Button>
                </DialogFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export { EditModal };
