import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"
);

socket.on("connect", () => {
  console.log("🔗 Conectado al servidor Socket.IO");
});

socket.on("disconnect", () => {
  console.log("❌ Desconectado del servidor Socket.IO");
});

socket.on("connect_error", (error) => {
  console.error("🚨 Error de conexión:", error.message);
});

export default socket;
