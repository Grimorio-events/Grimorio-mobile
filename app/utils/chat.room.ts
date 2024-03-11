import api from "./api";

const apiFindRoomBetweenUsers = async (
  token: string,
  sessionId: string,
  userId: string,
  ownerId: string
) => {
  try {
    const response = await api.post(
      "/chat/find-room",
      { userId, ownerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Session-Id": sessionId,
        },
      }
    );
    return response.data ? response.data : null;
  } catch (error: any) {
    if (error.response) {
      console.error("Error find Room:", error.response.data);
      return error.response.data;
    }
    console.error("Error find Room:", error.message);
    return { message: "An unexpected error occurred." };
  }
};

const apiCreateRoomBetweenUsers = async (
  token: string,
  sessionId: string,
  userId: string,
  ownerId: string,
  roomId: string
) => {
  try {
    const response = await api.post(
      "/chat/create-room",
      { userId, ownerId, roomId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Session-Id": sessionId,
        },
      }
    );
    return response.data ? response.data : null;
  } catch (error: any) {
    if (error.response) {
      console.error("Error create Room:", error.response.data);
      return error.response.data;
    }
    console.error("Error create Room:", error.message);
    return { message: "An unexpected error occurred." };
  }
};

// const getAllChatRoom = async (
//   token: string,
//   sessionId: string,
//   roomIds: string,
// ) => {
//   try {
//     const response = await api.post(
//       "/chat/get-chatRooms",
//       { roomIds },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-Session-Id": sessionId,
//         },
//       }
//     );
//     // console.log("🚀 ~ response:", response.data);
//     return response.data ? response.data : [];
//   } catch (error: any) {
//     if (error.response) {
//       console.error("Error get Rooms:", error.response.data);
//       return error.response.data;
//     }
//     console.error("Error get Rooms:", error.message);
//     return { message: "An unexpected error occurred." };
//   }
// };

export { apiFindRoomBetweenUsers, apiCreateRoomBetweenUsers };
