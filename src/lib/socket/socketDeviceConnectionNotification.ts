"use client";
import { toast } from "sonner";
import { Socket } from "socket.io-client";

const socketDeviceConnectionNotification = (socket: Socket) => {
  const handleDeviceConnected = (udid: string) => {
    console.log("Dispositivo conectado: ", udid);
    toast.info(`Dispositivo conectado: ${udid}`);
  };

  const handleDeviceDisconnected = (udid: string) => {
    console.log("Dispositivo desconectado: ", udid);
    toast.warning(`Dispositivo desconectado: ${udid}`);
  };

  const handleScheduleTiktokStatusNotification = (data: {
    id: number;
    status: string;
  }) => {
    toast.info(`Interacción : ${data.status}`);
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
