"use client";

import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

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
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { DollarSign } from "lucide-react";
import { getTotalSalesForDay } from "@/app/main/dashboard/api";

const chartConfig = {
  totalSales: {
    label: "Ventas",
    color: "#9333ea",
  },
} satisfies ChartConfig;

const DashboardChartAreaDefault = () => {
  // Estados
  const [chartData, setChartData] = useState<
    {
      date: string;
      totalSales: number;
    }[]
  >([]);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("90d");

  const isMobile = useIsMobile();

  // Efectos
  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTotalSalesForDay(timeRange);
      if (!res.ok) {
        console.error("Error:", res.message);
      }
      setChartData(res.data);
    };

    fetchData();
  }, [timeRange]);

  console.log("Total ventas por dia:", chartData);

  // Calcular el total de clientes
  const total = chartData.reduce((acc, curr) => acc + curr.totalSales, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 border-b">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5" />
            Crecimiento de ingresos
          </CardTitle>
          <CardDescription>Ingresos</CardDescription>
        </div>

        {/* Total clientes */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">Total</span>
          <span className="text-lg font-bold sm:text-2xl">{total} Bs.</span>
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
          className="mx-auto aspect-square max-h-[250] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
                tickFormatter={(value) => {
                  const date = new Date(value + "T00:00:00");
                  return date.toLocaleDateString("es-BO", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="totalSales"
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
              <Area
                dataKey="totalSales"
                type="natural"
                fill={chartConfig.totalSales.color}
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardChartAreaDefault;
