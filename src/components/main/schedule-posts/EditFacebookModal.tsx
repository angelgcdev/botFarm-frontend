"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
import { FacebookInteractionEdit } from "@/app/main/schedule-posts/types";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  interaction: FacebookInteractionEdit;
  onEditInteraction: (id: number, data: FacebookInteractionForm) => void;
  trigger: React.ReactNode;
};

const facebookInteractionSchema = z.object({
  post_url: z
    .string()
    .url("Por favor ingresa un enlace válido")
    .min(1, "El enlace es requerido"),
  title_post: z.string().optional(),
  liked: z.boolean().optional(),
  comment: z.string().optional(),
  share_groups_count: z
    .number()
    .min(0, "El número de grupos a compartir no puede ser negativo.")
    .max(10, "No puedes compartir en más de 10 grupos.")
    .optional(),
});

export type FacebookInteractionForm = z.infer<typeof facebookInteractionSchema>;

function EditFacebookModal({ interaction, onEditInteraction, trigger }: Props) {
  // 1. Estados
  const [open, setOpen] = useState(false);

  // 4. Librerias
  //Use form
  const form = useForm<z.infer<typeof facebookInteractionSchema>>({
    resolver: zodResolver(facebookInteractionSchema),
    defaultValues: {
      post_url: interaction.post_url,
      title_post: interaction.title_post,
      liked: interaction.liked,
      comment: interaction.comment,
      share_groups_count: interaction.share_groups_count,
    },
  });

  const onSubmit = async (interactionEdited: FacebookInteractionForm) => {
    onEditInteraction(interaction.id, interactionEdited);
    setOpen(false); // Cierra el modal
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
                  name="post_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enlace de la publicación</FormLabel>
                      <FormControl>
                        <Input
                          id="post_url"
                          placeholder="Pega aquí la URL del post (ej: https://www.facebook.com/reel/1693617814661067?locale=es_LA)"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>Alguna descripcion</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title_post"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Escribe un título para la publicación
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="title_post"
                          placeholder="Escribe algo..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        El titulo de la publicación
                      </FormDescription>
                      <FormMessage />
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
                </div>

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Escribe un comentario para la publicación
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="comment"
                          placeholder="Escribe......"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>alguna descripcion</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="share_groups_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad de grupos a compartir</FormLabel>
                      <FormControl>
                        <Input
                          id="share_groups_count"
                          type="number"
                          placeholder="Ingresa la cantidad de grupos"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Math.min(Number(e.target.value), 10)
                            )
                          }
                          max={10}
                        />
                      </FormControl>
                      <FormDescription>
                        No exceder mas de 5 grupos por interacción
                      </FormDescription>
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

export { EditFacebookModal };
