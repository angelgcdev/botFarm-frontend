// app/main/ClientUserSender.tsx
"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { sendIdUser } from "@/app/login/localBackend.api";

const ClienUserSender = () => {
  useEffect(() => {
    const enviarUsuario = async () => {
      const usuario_id = Number(Cookies.get("usuario_id"));

      if (!usuario_id) {
        console.error("No se encontro el usuario_id en las cookies");
        return;
      }

      //Envia el usuario_id al servidor local
      const res = await sendIdUser({ usuario_id });

      //Verificar si el envio fue exitoso
      if (!res.ok) {
        console.error("Envio de datos fallido: ", res);
      }
    };
    enviarUsuario();
  }, []);

  return null; // no renderiza nada
};

export default ClienUserSender;
