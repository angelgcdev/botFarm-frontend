"use client";

import AdminDasboardChartAreaInteractive from "@/components/main/dashboard-admin/AdminDasboardChartAreaInteractive";
import AdminDashboardSectionCards from "@/components/main/dashboard-admin/AdminDashboardSectionCards";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardAdminPage = () => {
  const router = useRouter();
  const [roleChecked, setRoleChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkRole = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verificar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const error = await res.json();
          console.warn(error.message);
          router.push("/main/dashboard");
          return;
        }

        setRoleChecked(true); // Solo mostrar hijos si está autenticado
      } catch (err) {
        router.push("/main/dashboard");
        console.log(err);
      }
    };

    checkRole();
  }, [router]);

  if (!roleChecked) return <div>Cargando...</div>; // Evita mostrar el layout hasta verificar

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
