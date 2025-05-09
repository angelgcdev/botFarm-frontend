"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { getSocket } from "./socket";

export const useRegisterSocketUser = () => {
  useEffect(() => {
    const user_id = Number(Cookies.get("user_id"));
    if (!user_id || isNaN(user_id)) {
      console.error("🚨 No se encontró user_id válido en la cookie");
      return;
    }

    const socket = getSocket();
    socket.emit("user:register", { user_id });
  }, []);
};
