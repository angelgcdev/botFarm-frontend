"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getOriginClients } from "@/app/main/dashboard/api";

export const description = "A donut chart";

type ChartItemConfig = {
  label: string;
  color?: string;
};

const chartConfig: Record<string, ChartItemConfig> = {
  total: {
    label: "Total",
  },
  tiktok: {
    label: "Tiktok",
    color: "#080808",
  },
  facebook: {
    label: "Facebook",
    color: "#087cf6",
  },
  recomendacion: {
    label: "Recomendación",
    color: "#9aedc4",
  },
  otro: {
    label: "Otro",
    color: "#b4d3c3",
  },
};
const DashboardPieChartDonut = () => {
  // Estados
  const [chartData, setChartData] = useState<
    {
      socialMedia: string;
      totalClients: number;
    }[]
  >([]);

  // Efectos
  useEffect(() => {
    const fetchData = async () => {
      const res = await getOriginClients();
      if (!res.ok) {
        console.error("Error:", res.message);
      }
      setChartData(res.data);
    };

    fetchData();
  }, []);

  console.log("Origen de clientes:", chartData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución por plataforma</CardTitle>
        <CardDescription>Origen de los clientes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="totalClients"
                nameKey="socialMedia"
                innerRadius={70}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      chartConfig[entry.socialMedia as keyof typeof chartConfig]
                        ?.color
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex flex-wrap gap-2 mt-4">
          {(() => {
            const total = chartData.reduce(
              (sum, item) => sum + item.totalClients,
              0
            );
            return chartData.map((item, index) => {
              const percentage =
                total > 0 ? ((item.totalClients / total) * 100).toFixed(1) : 0;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        chartConfig[
                          item.socialMedia as keyof typeof chartConfig
                        ]?.color,
                    }}
                  />
                  <span className="text-xs">
                    {item.socialMedia}: {item.totalClients} ({percentage}%)
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardPieChartDonut;
