import { EventData } from "../interface/event.interface";
import api from "./api";

const createEvent = async (
  eventData: EventData,
  token: string,
  sessionId: string
) => {
  const eventDataJSON = JSON.stringify(eventData);
  try {
    return api.post("/events", eventDataJSON, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Session-Id": sessionId, // Añade el sessionId en los headers si es necesario
      },
    });
  } catch (error: any) {
    if (error.response) {
      console.error("Error Create Event:", error.response.data);
      return error.response.data; // Devuelve los datos del error
    } else {
      console.error("Error Create Event:", error.message);
      return { message: "An unexpected error occurred." }; // Devuelve un mensaje genérico en caso de un error no manejado
    }
  }
};

const getEvents = async () => {
  return api.get("/events", {});
};

const updateEvent = async (id: string, eventData: EventData, token: string) => {
  return api.patch(`/events/${id}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteEvent = async (id: string, token: string) => {
  return api.delete(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { createEvent, getEvents, updateEvent, deleteEvent };
