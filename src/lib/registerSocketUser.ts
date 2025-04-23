"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { getSocket } from "./socket";

export const useRegisterSocketUser = () => {
  useEffect(() => {
    const usuario_id = Number(Cookies.get("usuario_id"));
    if (!usuario_id || isNaN(usuario_id)) {
      console.error("🚨 No se encontró usuario_id válido en la cookie");
      return;
    }

    const socket = getSocket();
    socket.emit("registrar_usuario", { usuario_id });
  }, []);
};
