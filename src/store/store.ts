import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { useDispatch } from "react-redux";
// Importa tus reducers aquí

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Tus reducers van aquí
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
