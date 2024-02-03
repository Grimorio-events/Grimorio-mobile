import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserApi } from "../utils/auth.js";
import { AxiosError } from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  phone_number?: string;
  description?: string;
  profile_image?: string;
  address?: string;
  country?: string;
  city?: string;
  // Otros campos si es necesario
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  // Otros estados relacionados con la autenticación
}

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (userData: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(userData);
    console.log("🚀 ~ > ~ response:", response);
    return response.data as User;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (
      axiosError.response &&
      typeof axiosError.response.data === "object" &&
      axiosError.response.data !== null &&
      "message" in axiosError.response.data
    ) {
      return rejectWithValue(
        (axiosError.response.data as { message: string }).message ||
          "An error occurred"
      );
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  // Inicializa otros estados aquí
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    // Otros reducers aquí
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state: AuthState, action: PayloadAction<User>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      }
    );
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
