"use client";

import DashboardChartAreaDefault from "@/components/main/dashboard/DasboardChartAreaDefault";
import { ChartBarInteractive } from "@/components/main/dashboard/ChartBarInteractive";
// import { ChartAreaInteractive } from "@/components/main/dashboard/dashboard-chart-area-interactive";
import { SectionCards } from "@/components/main/dashboard/dashboard-section-cards";
import DashboardPieChartDonut from "@/components/main/dashboard/DashboardPieChartDonut";

const DashboardPage = () => {
  return (
    <div className="w-[90%] m-auto">
      <div className="mb-4">
        <SectionCards />
      </div>
      {/* <div className="mb-4">
        <ChartAreaInteractive />
      </div> */}
      <div className="mb-4">
        <ChartBarInteractive />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardChartAreaDefault />
        <DashboardPieChartDonut />
      </div>
    </div>
  );
};

export default DashboardPage;
