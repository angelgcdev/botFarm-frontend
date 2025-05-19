"use client";
import { toast } from "sonner";
import { Socket } from "socket.io-client";

type ScheduleTiktokStatusData = {
  activeDevice: {
    udid?: string;
    device_id?: number;
    device_scheduled_tiktok_interaction_id?: number;
  };
  status?: string;
  error?: string;
};

const socketDeviceConnectionNotification = (socket: Socket) => {
  const handleDeviceConnected = (udid: string) => {
    console.log("Dispositivo conectado: ", udid);
    toast.info(`Dispositivo conectado: ${udid}`);
  };

  const handleDeviceDisconnected = (udid: string) => {
    console.log("Dispositivo desconectado: ", udid);
    toast.warning(`Dispositivo desconectado: ${udid}`);
  };

  const handleScheduleTiktokStatusNotification = (
    data: ScheduleTiktokStatusData
  ) => {
    toast.info(
      `Interacción en dispositivo ${data.activeDevice?.udid} : ${data.status}`,
      {
        description: data.error,
        duration: 8000,
      }
    );
  };

  socket.off("device:connected:notification", handleDeviceConnected);
  socket.on("device:connected:notification", handleDeviceConnected);

  socket.off("device:disconnected:notification", handleDeviceDisconnected);
  socket.on("device:disconnected:notification", handleDeviceDisconnected);

  socket.off(
    "schedule:tiktok:status:notification",
    handleScheduleTiktokStatusNotification
  );
  socket.on(
    "schedule:tiktok:status:notification",
    handleScheduleTiktokStatusNotification
  );
};

export { socketDeviceConnectionNotification };
