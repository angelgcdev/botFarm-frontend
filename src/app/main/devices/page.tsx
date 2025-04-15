import { CardDeviceInfo } from "@/components/main/devices/devices-card-info";
import React from "react";

const DevicesPage = () => {
  return (
    <div className="grid  grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 p-6 justify-items-center">
      <CardDeviceInfo />
    </div>
  );
};

export default DevicesPage;
