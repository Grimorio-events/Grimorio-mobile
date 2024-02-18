import axios from "axios";

const API = process.env.EXPO_API_BD;

const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
