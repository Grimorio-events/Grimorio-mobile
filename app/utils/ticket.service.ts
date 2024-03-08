import api from "./api";

const buyTicket = async (
  count: number,
  eventId: string,
  token: string,
  sessionId: string,
  userId: string
) => {
  try {
    const response = await api.post(
      "/tickets/buy",
      {
        eventId,
        userId,
        quantity: count,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Session-Id": sessionId, // Añade el sessionId en los headers si es necesario
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Buy Tickets:", error.response.data);
      return error.response.data;
    }
    console.error("Error Buy Tickets:", error.message);
    return { message: "An unexpected error occurred." };
  }
};

export { buyTicket };
