import { colors } from "@/app/styles/colors";
import { getUserByClerkId } from "@/app/utils/userDataClerk";
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

const ChatRoom = ({ item }: { item: ChatData }) => {
  const [receiverId, setReceiverId] = useState<receiverType | null>(null);

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

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={styles.containerChat}
    >
      <TouchableOpacity style={styles.chat}>
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
