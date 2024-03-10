import React, { useEffect, useState } from "react";
import { useChat } from "@/app/services/chat.service";
import { globalStyles } from "@/app/styles/styles";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useUser } from "@clerk/clerk-expo";
import useAuthToken from "@/app/hooks/useAuthToken";
import { getAllChatRooms } from "@/app/utils/chat.room";

import "react-native-get-random-values";

interface Message {
  receiverId: string;
  roomId: string;
  senderId: string;
  text?: string;
}

const Chat: React.FC = () => {
  const { user } = useUser();
  const { token, sessionId } = useAuthToken();
  // Nos asegúramos de que roomsIds siempre sea un array
  const roomsIds = Array.isArray(user?.unsafeMetadata?.roomId)
    ? user.unsafeMetadata.roomId
    : [];

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (token && sessionId && user?.id && roomsIds) {
        getAllChatRooms(token, sessionId, roomsIds);
        // setSenderId(user.id);
        // setReceiverId();
        // setRoomId(roomsIds[0]);
      }
    };

    fetchChatRooms();
  }, [user]);

  const { sendMessage } = useChat((newMessage) =>
    setMessages((prev) => [...prev, newMessage])
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({
        senderId: senderId,
        receiverId: receiverId,
        text: message,
        roomId: roomId,
      });
      setMessage("");
    }
  };

  return (
    <View style={globalStyles.container}>
      <View>
        <Text>Reciver:</Text>
        {messages.map((msg, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{user?.firstName || "Sender"}:</Text>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.containerMessage}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje..."
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={globalStyles.textButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
