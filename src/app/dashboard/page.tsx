"use client";

import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token", { path: "/" });
    router.push("/login");
  };

  return (
    <div>
      <h1>Bienvinido al Dashboard</h1>

      <Button onClick={handleLogout}>Cerrar Sesión</Button>
    </div>
  );
};

export default DashboardPage;
