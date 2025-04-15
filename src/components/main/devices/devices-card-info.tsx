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
import { ModalDeviceInfo } from "./devices-modal-info";

export function CardDeviceInfo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center">Nombre del dispositivo</CardTitle>
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
              <span className="font-medium">Modelo:</span> iPhone 14
            </p>
            <p>
              <span className="font-medium">Sistema operativo:</span> iOS 16
            </p>
            <p>
              <span className="font-medium">Tamaño de pantalla:</span> 6.1
              pulgadas
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <ModalDeviceInfo>
          <Button className="w-full">Completar información</Button>
        </ModalDeviceInfo>
      </CardFooter>
    </Card>
  );
}
