import { ReactNode, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { DeviceForm } from "./device-form";
import { getInfoDevice } from "@/app/main/devices/getInfoDevice";

interface ModalDeviceInfoProps {
  children: ReactNode;
  deviceId: number;
  onComplete: () => void;
}

interface RedSocial {
  name: string; // Aquí se asume que 'name' es una cadena de texto, ajusta si es diferente
}

interface CuentaRedSocial {
  red_social: RedSocial;
}

interface InitialData {
  email: string;
  dispositivo_id: number;
  items: string[];
}

export function DevicesModalInfo({
  children,
  deviceId,
  onComplete,
}: ModalDeviceInfoProps) {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<InitialData | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (open) {
        try {
          const data = await getInfoDevice(deviceId);

          console.log(data);

          console.log(Array.isArray(data?.cuenta_red_social));
          if (
            data?.cuentaGoogle?.email &&
            Array.isArray(data?.cuenta_red_social)
          ) {
            setInitialData({
              email: data.cuentaGoogle.email,
              dispositivo_id: deviceId,
              items: data.cuenta_red_social.map(
                (r: CuentaRedSocial) => r?.red_social?.name || "Desconocido"
              ),
            });
          } else {
            console.warn("Datos incompletos para el dispositivo:", data);
            setInitialData({
              email: "No disponible",
              dispositivo_id: deviceId,
              items: [],
            });
          }
        } catch (error) {
          console.error("Error al obtener los datos del dispositivo:", error);
          setInitialData({
            email: "Error al cargar",
            dispositivo_id: deviceId,
            items: [],
          });
        }
      } else {
        setInitialData(null);
      }
    };

    fetchInitialData();
  }, [open, deviceId]);

  console.log("Initial Data: ", initialData);

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
        <DeviceForm
          initialData={initialData}
          deviceId={deviceId}
          onClose={() => setOpen(false)}
          onComplete={onComplete}
        />
      </DialogContent>
    </Dialog>
  );
}
