"use client";

import { createContext, useContext, useEffect, useState } from "react";
import socket from "@/lib/socket";
import { toast } from "sonner";

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const handleDeviceConnected = (udid: string) => {
      console.log("Dispositivo conectado: ", udid);
      setDevice(udid);
      toast.info(`Dispositivo conectado: ${udid}`);
    };

    socket.on("device_connected_notification", handleDeviceConnected);

    return () => {
      socket.off("device_connected_notification", handleDeviceConnected);
    };
  }, []);

  return <SocketContext value={{ device }}>{children}</SocketContext>;
};

export const useSocket = () => useContext(SocketContext);
