import axios from "axios";

const API = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
