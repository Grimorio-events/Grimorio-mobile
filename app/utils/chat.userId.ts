import { Message } from "../interface/message";

const adjustMessageSenderReceiver = (
  data: Message[],
  userId: string
): Message[] => {
  return data.map((message) => {
    let adjustedSenderId = message.senderId;
    let adjustedReceiverId = message.receiverId;

    // Ajusta el receiverId si es igual al userId; de lo contrario, deja el receiverId tal como está
    if (message.receiverId === userId) {
      adjustedReceiverId = message.senderId; // Cambia receiverId a senderId
    }
    if (message.senderId === userId) {
      adjustedSenderId = userId; // Redundante dado que senderId ya es igual a userId, pero mantiene la lógica clara
    }

    return {
      ...message,
      senderId: adjustedSenderId,
      receiverId: adjustedReceiverId,
    };
  });
};

export { adjustMessageSenderReceiver };
