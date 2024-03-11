import api from "./api";

const ticketByUserId = async (
  token: string,
  sessionId: string,
  userId: string
) => {
  try {
    const response = await api.get(`/tickets/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Session-Id": sessionId,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Tickets by User:", error.response.data);
      return error.response.data;
    }
    console.error("Error Tickets by User:", error.message);
    return { message: "An unexpected error occurred." };
  }
};

export { ticketByUserId };
