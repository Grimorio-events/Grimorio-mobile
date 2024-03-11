export interface Message {
  id: string;
  receiverId: string;
  roomId: string;
  senderId: string;
  text?: string;
}
