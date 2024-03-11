import { create } from "zustand";

type ChatRoom = {
  roomId: string;
  senderId: string;
  receiverId: string;
};

type ChatRoomStore = {
  stateChatRoom: ChatRoom;
  updateStateChatRoom: (newState: ChatRoom) => void;
};

const chatRoomsStore = create<ChatRoomStore>((set) => ({
  stateChatRoom: {
    roomId: "",
    senderId: "",
    receiverId: "",
  },
  updateStateChatRoom: (newState: ChatRoom) =>
    set(() => ({
      stateChatRoom: newState,
    })),
}));

export default chatRoomsStore;
