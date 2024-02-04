// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_KEY;

// Creamos usuario
export async function registerUser(userData) {
  console.log("🚀 ~ registerUser ~ userData:", userData);
  try {
    const response = await axios.post(`${apiUrl}/api/users/register`, userData);
    console.log("🚀 ~ registerUser:", response.data);
    return response.data;

    // return loginResponse;
  } catch (error) {
    // Verifica si el error tiene una respuesta y si el status es 400
    if (error.response && error.response.status === 400) {
      console.error("Error al registrar usuario:", error.response.data.message);

      // Opcional: Mostrar el mensaje de error en la interfaz de usuario
      // Por ejemplo, si estás usando React, podrías establecer el estado con este mensaje
      // y mostrarlo en tu componente.

      // Lanza el error con el mensaje para manejarlo más arriba en la cadena de promesas o mostrarlo en la UI
      throw new Error(
        error.response.data.message || "Error al registrar usuario"
      );
    } else {
      // Para otros errores no relacionados con la validación del servidor o errores de red
      console.error("Error al conectar con el servidor:", error);
      throw error; // Lanza el error para manejarlo más arriba en la cadena o para una lógica de fallback
    }
  }
}

// Storge items
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("my-data", jsonValue);
  } catch (error) {
    console.log("Storing data failed", error);
  }
};

// Storage token
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("🚀 ~ set user token");
  } catch (error) {
    console.log("Storing token failed", error);
  }
};

// Get token
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.log("Fetching token failed", error);
    return null;
  }
};

// Decode token

// Ingreso de usuario
export async function loginUserApi(userData) {
  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, userData);

    console.log("🚀 ~ loginUserApi ~ response:", response.data);
    // Set store token
    await storeToken(response.data.token);

    return response.data.token;
  } catch (error) {
    console.error("Error al ingresar usuario:", error.response.data.message);
    throw new Error(error.response.data.message || "Error al ingresar usuario");
  }
}
