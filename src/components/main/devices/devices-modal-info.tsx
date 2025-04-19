import { ReactNode, useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Información del Dispositivo</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Completar la información del dispositivo para tener informes mas
          detallados
        </DialogDescription>
        <DeviceForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
