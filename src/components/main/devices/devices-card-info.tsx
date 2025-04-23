import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { DevicesModalInfo } from "./devices-modal-info";
import { Device } from "@/types/device";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DevicesCardInfo({ device }: { device: Device }) {
  const [infoCompletada, setInfoCompletada] = useState<boolean>(
    device.configuracion_completa
  );
  const router = useRouter();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">{device.marca}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-3 bg-white w-40 rounded m-auto mb-8">
          <Image
            src="/device.png"
            alt="Dispositivo Móvil"
            className=" h-[150px] w-auto object-contain"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col space-y-1.5 mb-4">
          <Label className="mb-4">Información del dispositivo</Label>
          <div className="text-sm rounded-md border p-3 space-y-1">
            <p>
              <span className="font-medium">Sistema Operativo: </span>
              {device.version_so}
            </p>
            <p>
              <span className="font-medium">Tipo de dispositivo: </span>
              {device.device_type}
            </p>
            <p>
              <span className="font-medium">Estado: </span>
              {device.status}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <DevicesModalInfo
          deviceId={device.id}
          onComplete={() => {
            setInfoCompletada(true);
            router.refresh();
          }}
        >
          <Button className={`w-full ${infoCompletada ? "" : "bg-yellow-200"}`}>
            {infoCompletada ? "Modificar información" : "Completar información"}
          </Button>
        </DevicesModalInfo>
      </CardFooter>
    </Card>
  );
}
