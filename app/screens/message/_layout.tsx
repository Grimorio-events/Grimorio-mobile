import ChatRoom from "@/app/components/chatRoom/_layout";
import { GET_CHATS_BY_ROOM_IDS } from "@/app/graphql/queries";
import { Message } from "@/app/interface/message";
import { colors } from "@/app/styles/colors";
import { globalStyles } from "@/app/styles/styles";
import { adjustMessageSenderReceiver } from "@/app/utils/chat.userId";
import { useQuery } from "@apollo/client";
import { useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

interface ChatData {
  id: string;
  receiverId: string;
  roomId: string;
  senderId: string;
}

const ChatBox = () => {
  const [dataRooms, setdataRooms] = useState<Message[]>([]);
  const listRef = useRef<FlashList<ChatData>>(null);
  const { user } = useUser();
  const userId = user?.id;

  // Nos asegúramos de que roomsIds siempre sea un array
  const roomIds = Array.isArray(user?.unsafeMetadata?.roomId)
    ? user.unsafeMetadata.roomId
    : [];

  const { loading, error, data } = useQuery(GET_CHATS_BY_ROOM_IDS, {
    variables: { roomIds },
  });

  const dataChatRooms = data?.chatRooms;

  useEffect(() => {
    if (userId && Array.isArray(dataChatRooms)) {
      const adjustedMessages = adjustMessageSenderReceiver(
        dataChatRooms,
        userId
      );
      console.log("🚀 ~ Message ~ adjustedMessages:", adjustedMessages);
      setdataRooms(adjustedMessages);
    }
  }, [dataChatRooms, userId]);

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

  const renderRow = ({ item }: { item: ChatData }) => <ChatRoom item={item} />;

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <FlashList
        data={loading ? [] : dataRooms}
        renderItem={renderRow}
        ref={listRef}
        estimatedItemSize={100}
        keyExtractor={(item: ChatData, index) => item.id || String(index)}
        ListEmptyComponent={<Text>Not found or Empty section</Text>}
        renderScrollComponent={ScrollView}
      />
    </GestureHandlerRootView>
  );
};

export default ChatBox;
