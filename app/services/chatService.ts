import { useEffect } from "react";
import { io } from "socket.io-client";
import useAuthToken from "../hooks/useAuthToken";

interface Message {
  id: string;
  text: string;
  sender: string;
  receiverId: string;
}

const socket = io("http://192.168.0.22:3000", {
  transports: ["websocket"], // Utiliza WebSockets
  timeout: 5000,
});

export const useChat = (onNewMessage: (message: Message) => void) => {
  const { sessionId } = useAuthToken();

  useEffect(() => {
    // Intenta autenticar después de establecer la conexión
    socket.on("connect", () => {
      console.log("🚀 ~ connect:", socket.connected);
      if (sessionId) {
        socket.emit("authenticate", sessionId);
        // socket.emit("authenticate", { sessionId: sessionId });
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Error al conectar:", error);
    });

    // Escucha por mensajes entrantes
    const messageListener = (message: Message) => {
      onNewMessage(message); // Llama al callback con el nuevo mensaje
    };

    // Recivir mensajes (Receiver)
    socket.on("message", messageListener);

    // Limpieza al desmontar el componente
    return () => {
      socket.off("message", messageListener);
      socket.off("connect");
    };
  }, [onNewMessage]);

  // Envio de mensajes (Sender)
  const sendMessage = (message: Message) => {
    console.log("🚀 ~ sendMessage:", message);
    socket.emit("sendMessage", message);
  };

  return { sendMessage };
};
