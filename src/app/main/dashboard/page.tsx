import { ChartAreaInteractive } from "@/components/main/dashboard/dashboard-chart-area-interactive";
import { SectionCards } from "@/components/main/dashboard/dashboard-section-cards";

const DashboardPage = () => {
  return (
    <div className="w-[90%] m-auto">
      <div className="mb-4">
        <SectionCards />
      </div>
      <div className="">
        <ChartAreaInteractive />
      </div>
    </div>
  );
};

export default DashboardPage;
