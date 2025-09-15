"use client";

import ClientModalForm from "@/components/main/clientes-ventas/ClientModalForm";
import SaleModalForm from "@/components/main/clientes-ventas/SaleModalForm";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Client, Sale } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientsList } from "@/components/main/clientes-ventas/ClientsList";
import { SalesList } from "@/components/main/clientes-ventas/SalesList";
import { getClients, getSales } from "./api";

const ClientesVentasPage = () => {
  // Estados
  const [clients, setClients] = useState<Client[]>([]);
  const [salesClients, setSalesClients] = useState<Sale[]>([]);

  // Funcion para obtener datos de los clientes
  const fetchClients = useCallback(async () => {
    const res = await getClients();
    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    setClients(res.data);
  }, []);

  // Funcion para obtener datos de las ventas
  const fetchSales = useCallback(async () => {
    const res = await getSales();

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    setSalesClients(res.data);
  }, []);

  // Efectos
  useEffect(() => {
    fetchClients();
    fetchSales();
  }, [fetchClients, fetchSales]);

  console.log("Fetch clients:", clients);
  console.log("Fetch sales:", salesClients);

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="flex-col items-center justify-center w-[90%]">
          <header className="flex items-center justify-between bg-card  h-[10vh] px-6 lg:px-8 mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Clientes y Ventas
            </h1>

            <div className="flex gap-4 ">
              <SaleModalForm
                clients={clients}
                fetchSales={fetchSales}
                trigger={
                  <Button>
                    <Plus />
                    <span>Registrar Venta</span>
                  </Button>
                }
              />

              <ClientModalForm
                fetchClients={fetchClients}
                trigger={
                  <Button>
                    <UserPlus />
                    <span>Nuevo Cliente</span>
                  </Button>
                }
              />
            </div>
          </header>

          <Tabs defaultValue="sales" className="">
            <TabsList>
              <TabsTrigger value="sales">Ventas</TabsTrigger>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
            </TabsList>
            <TabsContent value="clients">
              <ClientsList fetchClients={fetchClients} clients={clients} />
            </TabsContent>
            <TabsContent value="sales">
              <SalesList
                fetchSales={fetchSales}
                clients={clients}
                salesClients={salesClients}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ClientesVentasPage;
