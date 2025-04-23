"use client";

import { createContext, useEffect, useState } from "react";
import { Device } from "@/types/device";
import { getAllDevices } from "@/app/main/devices/device.api";

//1. Crear el contexto
const DevicesContext = createContext<Device[]>([]);

//2. Crear el proveedor
export const DevicesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getAllDevices();
        setDevices(fetchedDevices);
      } catch (error) {
        console.error("Error al obtener los dispositivos:", error);
      }
    };

    fetchDevices();
  }, []);

  console.log(devices);

  return (
    <DevicesContext.Provider value={devices}>
      {children}
    </DevicesContext.Provider>
  );
};

export { DevicesContext };
