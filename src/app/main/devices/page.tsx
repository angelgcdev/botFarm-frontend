"use client";

import { CardDeviceInfo } from "@/components/main/devices/devices-card-info";
import React, { useEffect, useState } from "react";
import { getAllDevices } from "./device.api";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getAllDevices();
        console.log(fetchedDevices);
        setDevices(fetchedDevices);
      } catch (error) {
        console.error("Error al obtener los dispositivos:", error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="grid  grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 p-6 justify-items-center">
      {devices.map((device, index) => (
        <CardDeviceInfo key={index} device={device} />
      ))}
    </div>
  );
};

export default DevicesPage;
