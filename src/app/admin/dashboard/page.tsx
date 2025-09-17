"use client";

import AdminDasboardChartAreaInteractive from "@/components/admin/dashboard/AdminDasboardChartAreaInteractive";
import AdminDashboardSectionCards from "@/components/admin/dashboard/AdminDashboardSectionCards";
import React from "react";

const DashboardAdminPage = () => {
  return (
    <div className="w-[90%] m-auto">
      <div className="mb-4">
        <AdminDashboardSectionCards />
      </div>
      <div className="">
        <AdminDasboardChartAreaInteractive />
      </div>
    </div>
  );
};

export default DashboardAdminPage;
