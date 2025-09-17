"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getTotalClientsForDay } from "@/app/main/dashboard/api";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

const chartConfig = {
  views: {
    label: "Clientes",
  },
  clients: {
    label: "Clientes",
    color: "#9333ea",
  },
} satisfies ChartConfig;

export function ChartBarInteractive() {
  // Estados
  const [chartData, setChartData] = useState<
    {
      date: string;
      clients: number;
    }[]
  >([]);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("90d");

  // Contextos
  const isMobile = useIsMobile();

  // Efectos
  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTotalClientsForDay(timeRange);
      if (!res.ok) {
        console.error("Error:", res.message);
      }
      setChartData(res.data);
    };

    fetchData();
  }, [timeRange]);

  console.log("Total clientes por dia:", chartData);

  // Calcular el total de clientes
  const total = chartData.reduce((acc, curr) => acc + curr.clients, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b">
        <div className="flex flex-col">
          <CardTitle>Clientes Registrados</CardTitle>
          <CardDescription>Clientes registrados por día</CardDescription>
        </div>

        {/* Total clientes */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">
            {chartConfig.clients.label}
          </span>
          <span className="text-lg font-bold sm:text-2xl">{total}</span>
        </div>

        {/* Select de rango */}
        <div className="flex">
          <div className="w-full sm:w-auto">
            <Select
              value={timeRange}
              onValueChange={(val) => {
                if (val) {
                  setTimeRange(val as "7d" | "30d" | "90d");
                }
              }}
            >
              <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Selecciona un valor"
              >
                <SelectValue placeholder="Últimos 3 meses" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Últimos 3 meses
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Últimos 30 días
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Últimos 7 días
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value + "T00:00:00");
                return date.toLocaleDateString("es-BO", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="clients"
                  labelFormatter={(value) => {
                    return new Date(value + "T00:00:00").toLocaleDateString(
                      "es-BO",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    );
                  }}
                />
              }
            />
            <Bar dataKey={"clients"} fill={chartConfig.clients.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
