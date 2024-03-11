import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@/app/services/chat.service";
import { globalStyles } from "@/app/styles/styles";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "./styles";
import { useUser } from "@clerk/clerk-expo";
import chatRoomsStore from "@/app/stores/chatRoomsStore";
import { useQuery } from "@apollo/client";
import { GET_CHAT_ROOM } from "@/app/graphql/queries";
import { colors } from "@/app/styles/colors";

import "react-native-get-random-values";
import Animated from "react-native-reanimated";

interface Message {
  receiverId: string;
  roomId: string;
  senderId: string;
  text?: string;
}

const { width } = Dimensions.get("window");

const Chat: React.FC = () => {
  const { stateChatRoom, updateStateChatRoom } = chatRoomsStore();
  const { user } = useUser();

  const scrollRef = useRef<Animated.ScrollView>(null);

  const roomId = stateChatRoom?.roomId;

  const { loading, error, data } = useQuery(GET_CHAT_ROOM, {
    variables: { roomId },
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data?.chatRoom) {
      setMessages(data.chatRoom);
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    }
  }, [data]);

  const { sendMessage } = useChat((newMessage) =>
    setMessages((prev) => [...prev, newMessage])
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        roomId: stateChatRoom?.roomId,
        senderId: stateChatRoom?.senderId,
        receiverId: stateChatRoom?.receiverId,
        text: message,
      };

      // Envía el mensaje
      sendMessage(newMessage);

      // Se Añade el mensaje al estado para actualizar la UI inmediatamente
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Limpia el campo de texto
      setMessage("");
    }
  };

  if (loading)
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  if (error)
    return (
      <View style={globalStyles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  return (
    <View style={globalStyles.container}>
      <View style={styles.containerMessage}>
        <Animated.ScrollView
          ref={scrollRef}
          style={{ width: width }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={{ marginHorizontal: 10, paddingVertical: 10 }}
            >
              <Text>{msg?.senderId || "Sender"}:</Text>
              <Text>{msg.text}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      <SafeAreaView style={styles.input}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje..."
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={globalStyles.textButton}>Enviar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Chat;
