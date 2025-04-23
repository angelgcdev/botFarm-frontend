"use client";

import { ChartAreaInteractive } from "@/components/main/dashboard/dashboard-chart-area-interactive";
import { SectionCards } from "@/components/main/dashboard/dashboard-section-cards";
import { useRegisterSocketUser } from "@/lib/registerSocketUser";

const DashboardPage = () => {
  // Registrar el usuario
  useRegisterSocketUser();

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
};

export default DashboardPage;
