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
import { SalesListProps } from "@/app/main/clientes-ventas/types";
import { deleteClient } from "@/app/main/clientes-ventas/api";
import SaleModalForm from "./SaleModalForm";

export const SalesList = ({
  fetchSales,
  salesClients,
  clients,
}: SalesListProps) => {
  const handleDeleteClient = async (id: number) => {
    console.log("Id de cliente a eliminar:", id);

    const res = await deleteClient(id);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    const resData = res.data;
    toast.success("Usuario cliente eliminado Correctamente:", resData.email);
    fetchSales();
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Badge variant="secondary">{salesClients.length} ventas</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Origen</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Fecha de modificación</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesClients.map((saleClient) => (
            <TableRow key={saleClient.id}>
              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {saleClient.client?.name}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {saleClient.total}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {saleClient.client_origin}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {formatRelativeWithDateFns(saleClient.created_at)}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {formatRelativeWithDateFns(saleClient.updated_at)}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <SaleModalForm
                    sale={saleClient}
                    fetchSales={fetchSales}
                    clients={clients}
                    trigger={
                      <Button
                        variant="outline"
                        className="cursor-pointer flex-1 border-gray-300 hover:bg-gray-50"
                        size="sm"
                      >
                        <SquarePen className="w-4 h-4 mr-1" />
                      </Button>
                    }
                  ></SaleModalForm>

                  <Button
                    variant="outline"
                    className="cursor-pointer flex-1 border-red-300 text-red-700 hover:bg-red-50"
                    size="sm"
                    onClick={() => handleDeleteClient(saleClient.id)}
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
