import React, { useEffect, useState } from "react";
import { useChat } from "@/app/services/chatService";
import { globalStyles } from "@/app/styles/styles";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useUser } from "@clerk/clerk-expo";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  text: string;
  sender: string;
  receiverId: string;
}

const Chat: React.FC = () => {
  const { user } = useUser();

  const userIdNull = "user_2dMgQJ6EC3rnuvmYTfgnMOwqUpC";
  const userIdCamilo = "user_2bpePAP3e4VIUC75OkQkLhxUe6R";

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState<string>("");
  const userName = user?.firstName || "Sender";

  useEffect(() => {
    if (user?.id) {
      setReceiverId(user.id);
    }
  }, [user]);

  const { sendMessage } = useChat((newMessage) =>
    setMessages((prev) => [...prev, newMessage])
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      //   if (user?.id) {
      sendMessage({
        sender: userName,
        receiverId: userIdNull,
        text: message,
        id: uuidv4(),
      });
      //   }
      setMessage("");
    }
  };

  return (
    <View style={globalStyles.container}>
      <View>
        <Text>Conversacion text v1:</Text>
        {messages.map((msg, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{msg.sender}:</Text>
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
