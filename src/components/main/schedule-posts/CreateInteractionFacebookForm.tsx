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
import { createInteractionFacebookData } from "@/app/main/schedule-posts/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { FacebookIcon } from "@/components/icons/facebook-icon";

export interface Props {
  loadData: () => void;
  trigger: ReactNode;
}

const facebookInteractionSchema = z.object({
  post_url: z
    .string()
    .url("Por favor ingresa un enlace válido")
    .min(1, "El enlace es requerido"),
  title_post: z.string().optional(),
  liked: z.boolean().optional(),
  comment: z.string().optional(),
  share_groups_count: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(0, "El número de grupos a compartir no puede ser negativo.")
    .max(10, "No puedes compartir en más de 10 grupos.")
    .optional(),
});

type FacebookInteractionForm = z.infer<typeof facebookInteractionSchema>;

const CreateInteractionFacebookForm = ({ loadData, trigger }: Props) => {
  // 1. Estado
  const [isOpen, setIsOpen] = useState(false);

  // 4. Librerias
  const form = useForm<z.infer<typeof facebookInteractionSchema>>({
    resolver: zodResolver(facebookInteractionSchema),
    defaultValues: {
      post_url: "",
      title_post: "",
      liked: false,
      comment: "",
      share_groups_count: undefined,
    },
  });

  // Efectos
  // Resetear formulario al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      form.reset({
        post_url: "",
        title_post: "",
        liked: false,
        comment: "",
        share_groups_count: undefined,
      });
    }
  }, [isOpen, form]);

  const onSubmit = async (
    scheduledFacebookDataForm: FacebookInteractionForm
  ) => {
    console.log(
      "Datos de la interaccion de facebook:",
      scheduledFacebookDataForm
    );

    const res = await createInteractionFacebookData(scheduledFacebookDataForm);

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
            <FacebookIcon className="h-5 w-5 text-blue-500" />
            Potencia tu visibilidad en Facebook
          </DialogTitle>
          <DialogDescription>
            Amplifica tu alcance automáticamente generando interacciones reales
            en tus publicaciones favoritas.
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full border rounded">
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
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
                      <FormLabel>
                        ¿En cuántos grupos deseas compartir esta publicación?
                      </FormLabel>
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
                        Puedes compartir en un máximo de <b>10 grupos</b>. Te
                        recomendamos no exceder <b>5 grupos por interacción</b>.
                      </FormDescription>
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

export default CreateInteractionFacebookForm;
