import { useEffect } from "react";
import { io } from "socket.io-client";
import useAuthToken from "../hooks/useAuthToken";

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  roomId: string;
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
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Error al conectar:", error);
    });

    // Escucha por mensajes entrantes
    socket.on("message", (message: Message) => {
      console.log("Incoming message:", message);
      onNewMessage(message); // Llama al callback con el nuevo mensaje
    });

    // Escuchar confirmaciones de mensajes enviados.
    socket.on("message-confirmation", (confirmedMessage) => {
      console.log("Mensaje confirmado:", confirmedMessage);
      // Aquí podrías, por ejemplo, actualizar el estado para reflejar que el mensaje ha sido entregado.
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.off("message");
      socket.off("message-confirmation");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [onNewMessage]);

  // Envio de mensajes (Sender)
  const sendMessage = (message: Message) => {
    console.log("🚀 ~ Sending message:", message);
    socket.emit("sendMessage", message);
  };

  return { sendMessage };
};
