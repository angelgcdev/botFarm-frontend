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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client, SaleClient } from "@/app/main/clientes-ventas/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { createSale, updateSale } from "@/app/main/clientes-ventas/api";

export const clientOrigin = ["TIKTOK", "FACEBOOK", "RECOMENDACION", "OTRO"];

export interface Props {
  fetchSales: () => void;
  sale?: SaleClient;
  trigger: ReactNode;
  clients?: Client[];
}

const salesSchema = z.object({
  client_id: z.number().nullable(),
  total: z.number(),
  client_origin: z.enum(["TIKTOK", "FACEBOOK", "RECOMENDACION", "OTRO"], {
    errorMap: () => ({ message: "Debe seleccionar una opción" }),
  }),
});

export type SalesForm = z.infer<typeof salesSchema>;

const SaleModalForm = ({ fetchSales, sale, trigger, clients }: Props) => {
  const isEditing = !!sale;

  // 1. Estado
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // 4. Librerias
  const form = useForm<z.infer<typeof salesSchema>>({
    resolver: zodResolver(salesSchema),
    defaultValues: {
      client_id: sale?.client_id || null,
      total: sale?.total || 0,
      client_origin: sale?.client_origin || undefined,
    },
  });

  // Efectos
  useEffect(() => {
    if (isOpen) {
      // Datos por default
      form.reset({
        client_id: sale?.client_id || null,
        total: sale?.total || 0,
        client_origin: sale?.client_origin || undefined,
      });

      // Limpiar el command
      setSearch("");
      setSelectedClient(null);
    }
  }, [isOpen, sale, form]);

  const filteredClients =
    search.trim() === ""
      ? []
      : clients?.filter((client) => client.ci.includes(search)) || [];

  const onSubmit = async (saleDataForm: SalesForm) => {
    if (isEditing) {
      // Modo edición
      console.log("Datos a actualizar de la venta:", saleDataForm);

      const res = await updateSale(saleDataForm, sale.id);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success(`Venta actualizada correctamente.`);
    } else {
      // Modo creación
      console.log("Datos de la venta:", saleDataForm);

      const res = await createSale(saleDataForm);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Registrado correctamente");
    }

    //Actualizar datos del servidor
    fetchSales();

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
            {isEditing ? "Editar venta" : "Registrar una nueva venta"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza la información de la venta."
              : "Completa la información de la venta."}
          </DialogDescription>
        </DialogHeader>

        <Card className="w-full border rounded">
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="client_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Busca al cliente por CI</FormLabel>
                      <FormControl>
                        <Command>
                          <CommandInput
                            placeholder="Buscar al cliente por CI"
                            value={search}
                            onValueChange={(value) => {
                              setSearch(value);
                              if (value === "") {
                                field.onChange(null); // si se borra la búsqueda, client_id será null
                                setSelectedClient(null);
                              }
                            }}
                          />
                          {search.trim() !== "" && (
                            <CommandList>
                              <CommandEmpty>No encontrado.</CommandEmpty>
                              <CommandGroup heading="">
                                {filteredClients.map((client) => (
                                  <CommandItem
                                    key={client.id}
                                    onSelect={() => {
                                      field.onChange(client.id);
                                      setSelectedClient(client);
                                      setSearch(client.ci);
                                    }}
                                  >
                                    {client.ci}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          )}
                        </Command>
                      </FormControl>
                      {selectedClient ? (
                        <div className="text-sm text-white mt-1 bg-gray-800/60 px-2.5 py-1.5 rounded-md border tracking-wide">
                          <p className="font-semibold mb-2">
                            Cliente seleccionado:
                          </p>
                          <div className="pl-4">
                            <p> Nombre: {selectedClient.name}</p>
                            <p> CI: {selectedClient.ci}</p>
                            <p> Ciudad: {selectedClient.city}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400 mt-1">
                          Venta anónima (sin cliente)
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monto total de la venta:</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          id="total"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="client_origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        ¿Como conocio el cliente a la empresa?
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value?.toString() ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opción." />
                          </SelectTrigger>
                          <SelectContent>
                            {clientOrigin.map((origin) => (
                              <SelectItem key={origin} value={origin}>
                                {origin}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
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
              {isEditing ? "Actualizar Venta" : "Registrar Venta"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SaleModalForm;
