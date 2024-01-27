import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  // Otros estados relacionados con la autenticación
}

const initialState: AuthState = {
  isLoggedIn: false,
  // Inicializa otros estados aquí
};

export const authSlice = createSlice({
  name: 'auth',
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
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
