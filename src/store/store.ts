import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
// Importa tus reducers aquí

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Tus reducers van aquí
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
