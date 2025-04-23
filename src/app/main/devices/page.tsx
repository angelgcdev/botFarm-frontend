"use client";

import { DevicesCardInfo } from "@/components/main/devices/devices-card-info";
import { DevicesContext } from "@/context/DevicesContext";
import React, { useContext } from "react";

const DevicesPage = () => {
  const devices = useContext(DevicesContext);

  return (
    <div className="grid  grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 p-6 justify-items-center">
      {devices.map((device, index) => (
        <DevicesCardInfo key={index} device={device} />
      ))}
    </div>
  );
};

export default DevicesPage;
