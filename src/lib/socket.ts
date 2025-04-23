"use client";

import { io, Socket } from "socket.io-client";

//Singleton para el socket
let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
    socket = io(backendUrl);

    socket.on("connect", () => {
      console.log("🔗 Conectado al servidor Socket.IO");
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado del servidor Socket.IO");
    });

    socket.on("connect_error", (error) => {
      console.error("🚨 Error de conexión:", error.message);
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

// import { io } from "socket.io-client";
// import Cookies from "js-cookie";

// const socket = io(
//   process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
// );

// const usuario_id = Number(Cookies.get("usuario_id"));

// socket.on("connect", () => {
//   console.log("🔗 Conectado al servidor Socket.IO");

//   //Registrar cliente socket io a la sala privada
//   socket.emit("registrar_usuario", { usuario_id });
// });

// socket.on("disconnect", () => {
//   console.log("❌ Desconectado del servidor Socket.IO");
// });

// socket.on("connect_error", (error) => {
//   console.error("🚨 Error de conexión:", error.message);
// });

// export default socket;
