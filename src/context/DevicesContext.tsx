"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { getAllDevices } from "@/app/main/devices/api";
import { SocketContext } from "@/context/SocketContext";
import { toast, Toaster } from "sonner";
import { Device } from "@/app/main/devices/types";

// Tipado para el contexto
interface DevicesContextType {
  devices: Device[];
  fetchDevices: () => Promise<void>;
}

//1. Crear el contexto
const DevicesContext = createContext<DevicesContextType | undefined>(undefined);

//2. Crear el proveedor
const DevicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const { socket } = useContext(SocketContext);

  // funcion para obtener datos del servidor
  const fetchDevices = async () => {
    try {
      const res = await getAllDevices();

      if (!res.ok) {
        toast.error(res.message);
        console.error("Error:", res.message);
        return;
      }

      const resData = res.data;

      setDevices(resData);
    } catch (error) {
      console.error("Error al obtener los dispositivos:", error);
    }
  };

  useEffect(() => {
    fetchDevices();

    if (!socket) {
      return;
    }

    // Escucha eventos de conexión/desconexión
    socket.on("device:connected:notification", fetchDevices);
    socket.on("device:disconnected:notification", fetchDevices);

    // Actualizar la informacion de los dispositivos
    socket.on("device:refresh", fetchDevices);

    // Limpieza al desmontar
    return () => {
      socket.off("device:connected:notification", fetchDevices);
      socket.off("device:disconnected:notification", fetchDevices);
      socket.off("device:refresh", fetchDevices);
    };
  }, [socket]);

  console.log(devices);

  return (
    <>
      <Toaster />
      <DevicesContext.Provider value={{ devices, fetchDevices }}>
        {children}
      </DevicesContext.Provider>
    </>
  );
};

// Custom hook para usar el contexto facilmente
export const useDevices = () => {
  const context = useContext(DevicesContext);
  if (!context) {
    throw new Error("useDevices debe usarse dentro de un DevicesProvider");
  }
  return context;
};

export { DevicesContext, DevicesProvider };
