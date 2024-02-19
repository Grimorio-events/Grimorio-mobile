import { create } from "zustand";

interface EventStoreState {
  stateEvent: number; // Estado para el contador
  increment: () => void; // Acción para incrementar el contador
  decrement: () => void; // Acción para decrementar el contador
}

const useEventStore = create<EventStoreState>((set) => ({
  stateEvent: 1,
  increment: () =>
    set((state) => ({
      stateEvent:
        state.stateEvent < 9 ? state.stateEvent + 1 : state.stateEvent,
    })),
  decrement: () =>
    set((state) => ({
      stateEvent:
        state.stateEvent > 1 ? state.stateEvent - 1 : state.stateEvent,
    })),
}));

export default useEventStore;
