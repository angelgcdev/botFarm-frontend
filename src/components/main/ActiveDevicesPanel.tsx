"use client";

import { DevicesContext } from "@/context/DevicesContext";
import { useContext } from "react";
import { Circle, Smartphone } from "lucide-react";

const ActiveDevicesPanel = () => {
  const devices = useContext(DevicesContext);

  //Filtrar dispositivos activos
  const activeDevices = devices.filter((device) => device.status === "ACTIVO");
  const total = activeDevices.length;

  const connectionCode =
    typeof window !== "undefined" ? localStorage.getItem("userId") : "--";

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="bg-panel/95 backdrop-blur-md rounded-xl border border-panel-border shadow-lg p-5 min-w-[200px] hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* Estado principal */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Circle
                className="w-3 h-3 text-emerald-500 fill-current"
                strokeWidth={0}
              />
              <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium text-foreground">
              Conectados
            </span>
          </div>
          <Smartphone className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Contador */}
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-foreground mb-1">{total}</div>
          <div className="text-xs text-muted-foreground">
            {total === 1 ? "dispositivo activo" : "dispositivos activos"}
          </div>
        </div>

        {/* Separador visual */}
        <div className="h-px bg-border mb-4"></div>

        {/* Código de conexión */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            Código de conexión
          </span>
          <div
            className="bg-emerald-500 text-status-active-foreground rounded-md px-2 py-1 text-xs font-mono font-bold tracking-wider"
            style={{ textShadow: "0 0 2px rgba(0,0,0,0.5)" }}
          >
            {connectionCode}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ActiveDevicesPanel };
