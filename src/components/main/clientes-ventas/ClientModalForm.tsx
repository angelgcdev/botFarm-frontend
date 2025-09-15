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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { createClient, updateClient } from "@/app/main/clientes-ventas/api";
import { Client } from "@/app/main/clientes-ventas/types";

export interface Props {
  fetchClients: () => void;
  trigger: ReactNode;
  client?: Client;
}

const clientSchema = z.object({
  name: z.string().optional(),
  ci: z.string().min(1, "El CI es requerido"),
  phone: z.string().optional(),
  email: z.string().optional(),
  city: z.string().optional(),
});

export type ClientForm = z.infer<typeof clientSchema>;

const ClientModalForm = ({ fetchClients, trigger, client }: Props) => {
  const isEditing = !!client;

  // 1. Estado
  const [isOpen, setIsOpen] = useState(false);

  // 4. Librerias
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      ci: client?.ci || "",
      phone: client?.phone || "",
      email: client?.email || "",
      city: client?.city || "",
    },
  });

  // Efectos
  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: client?.name || "",
        ci: client?.ci || "",
        phone: client?.phone || "",
        email: client?.email || "",
        city: client?.city || "",
      });
    }
  }, [isOpen, client, form]);

  const onSubmit = async (clientDataForm: ClientForm) => {
    if (isEditing) {
      // Modo edición
      console.log("Datos a actualizar del cliente:", clientDataForm);

      const res = await updateClient(clientDataForm, client.id);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success(`Cliente actualizado correctamente.`);
    } else {
      // Modo agregar
      console.log("Datos del cliente:", clientDataForm);

      const res = await createClient(clientDataForm);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Creado correctamente");
    }

    //Actualizar datos del servidor
    fetchClients();

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
            {isEditing ? "Editar Cliente" : "Agrega un nuevo cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza la información del cliente."
              : "Completa la información del cliente."}
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full border rounded">
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Nombre del cliente"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ci"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cedula de identidad</FormLabel>
                      <FormControl>
                        <Input id="ci" placeholder="Ejem: 9955448" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefono</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder="Numero de celular o telefono"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="cliente@cliente.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuidad o Departamento</FormLabel>
                      <FormControl>
                        <Input
                          id="city"
                          placeholder="Nombre de la ciuidad"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button
              onClick={() => {
                setIsOpen(false);
                form.reset();
              }}
              className="bg-black hover:bg-black/40 text-white"
            >
              Cancelar
            </Button>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-black hover:bg-black/40 text-white"
            >
              {isEditing ? "Actualizar Cliente" : "Guardar Cliente"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModalForm;
