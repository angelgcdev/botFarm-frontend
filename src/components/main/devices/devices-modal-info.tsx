import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { DeviceForm } from "./device-form";

interface ModalDeviceInfoProps {
  children: ReactNode;
}

export function ModalDeviceInfo({ children }: ModalDeviceInfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Información del Dispositivo</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Completar la información del dispositivo para tener informes mas
          detallados
        </DialogDescription>
        <DeviceForm />
      </DialogContent>
    </Dialog>
  );
}
