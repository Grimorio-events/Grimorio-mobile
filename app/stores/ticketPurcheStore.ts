import { create } from "zustand";

// Define el tipo para el estado y las acciones de tu store
type CounterStore = {
  count: number; // El valor actual del contador
  maxCount: number; // El máximo valor que el contador puede alcanzar
  increment: () => void; // Función para incrementar el contador
  decrement: () => void; // Función para decrementar el contador
  setMaxCount: (max: number) => void; // Función para establecer el máximo valor del contador
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 1, // Valor inicial del contador
  maxCount: 10, // Valor inicial del máximo (puedes cambiarlo según necesites)
  increment: () =>
    set((state) => ({
      count: state.count < state.maxCount ? state.count + 1 : state.maxCount,
    })),
  decrement: () =>
    set((state) => ({
      count: state.count > 1 ? state.count - 1 : 1,
    })),
  setMaxCount: (max) =>
    set(() => ({
      maxCount: max,
    })),
}));
