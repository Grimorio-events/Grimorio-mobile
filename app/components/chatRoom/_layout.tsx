import chatRoomsStore from "@/app/stores/chatRoomsStore";
import { colors } from "@/app/styles/colors";
import { RootStackParamList } from "@/app/types/types";
import { getUserByClerkId } from "@/app/utils/userDataClerk";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface ChatData {
  id: string;
  receiverId: string;
  roomId: string;
  senderId: string;
}

interface receiverType {
  image_url: string;
  first_name?: string;
  last_name?: string;
}
type NavigationType = NativeStackNavigationProp<RootStackParamList, "ChatRoom">;

const ChatRoom = ({ item, userId }: { item: ChatData; userId: string }) => {
  const [receiverId, setReceiverId] = useState<receiverType | null>(null);
  const { updateStateChatRoom } = chatRoomsStore();
  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    const reciverUser = async () => {
      try {
        const response = await getUserByClerkId(item.receiverId);
        setReceiverId(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    reciverUser();
  }, []);

  const handleChatRoom = () => {
    const chatRoomSate = {
      roomId: item?.roomId,
      receiverId: item?.receiverId,
      senderId: userId,
    };

    updateStateChatRoom(chatRoomSate);
    navigation.navigate("Chat", { id: item?.roomId as string });
  };

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={styles.containerChat}
    >
      <TouchableOpacity style={styles.chat} onPress={handleChatRoom}>
        <Image source={{ uri: receiverId?.image_url }} style={styles.avatar} />
        <Text>
          {receiverId?.first_name} {receiverId?.last_name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerChat: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: 80,
    paddingHorizontal: 30,
  },
  chat: {
    flexDirection: "row",
    width: 370,
    padding: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
});

export default ChatRoom;
