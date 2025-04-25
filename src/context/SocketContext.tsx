"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";

const SocketContext = createContext({});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const handleDeviceConnected = (udid: string) => {
      console.log("Dispositivo conectado: ", udid);
      setDevice(udid);
      toast.info(`Dispositivo conectado: ${udid}`);
    };

    const socket = getSocket();
    socket.on("deviceConnectedNotification", handleDeviceConnected);

    return () => {
      socket.off("deviceConnectedNotification", handleDeviceConnected);
    };
  }, []);

  return <SocketContext value={{ device }}>{children}</SocketContext>;
};

export const useSocket = () => useContext(SocketContext);
