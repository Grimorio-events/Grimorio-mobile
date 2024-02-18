import { EventData } from "../interface/event.interface";
import api from "./api";

const createEvent = async (eventData: EventData, token: string) => {
  return api.post("/events", eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
