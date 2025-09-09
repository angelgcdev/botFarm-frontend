"use client";

// 1. Librerías de Node.js

// 2. Librerías de terceros

// 3. Librerías internas absolutas
import { DevicesCardInfo } from "@/components/main/devices/devices-card-info";
import { useDevices } from "@/context/DevicesContext";

// 4. Imports relativos

const DevicesPage = () => {
  const { devices, fetchDevices } = useDevices();

  console.log(devices);

  return (
    <>
      {devices.length === 0 ? (
        <div>
          <p className="text-center text-muted-foreground">
            No hay dispositivos registrados todavia
          </p>
        </div>
      ) : (
        <div className="grid  grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 p-6 justify-items-center">
          {devices.map((device, index) => (
            <DevicesCardInfo
              key={index}
              device={device}
              fetchDevices={fetchDevices}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DevicesPage;
