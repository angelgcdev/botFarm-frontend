"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";
import { formatRelativeWithDateFns } from "@/lib/utils/formatRelativeWithDateFns";
import { toast } from "sonner";
import { ClientsListProps } from "@/app/main/clientes-ventas/types";
import { deleteClient } from "@/app/main/clientes-ventas/api";
import ClientModalForm from "./ClientModalForm";

export const ClientsList = ({ fetchClients, clients }: ClientsListProps) => {
  const handleDeleteClient = async (id: number) => {
    console.log("Id de cliente a eliminar:", id);

    const res = await deleteClient(id);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    const resData = res.data;
    toast.success("Usuario cliente eliminado Correctamente:", resData.email);
    fetchClients();
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Badge variant="secondary">{clients.length} clientes</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cedula de identidad</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Cuidad</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Fecha de modificación</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">{client.name}</p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">{client.ci}</p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {client.phone}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {client.email}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">{client.city}</p>
                </div>
              </TableCell>

              <TableCell className="text-sm text-muted-foreground">
                {formatRelativeWithDateFns(client.created_at)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatRelativeWithDateFns(client.updated_at)}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <ClientModalForm
                    client={client}
                    fetchClients={fetchClients}
                    trigger={
                      <Button
                        variant="outline"
                        className="cursor-pointer flex-1 border-gray-300 hover:bg-gray-50"
                        size="sm"
                      >
                        <SquarePen className="w-4 h-4 mr-1" />
                      </Button>
                    }
                  ></ClientModalForm>

                  <Button
                    variant="outline"
                    className="cursor-pointer flex-1 border-red-300 text-red-700 hover:bg-red-50"
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
