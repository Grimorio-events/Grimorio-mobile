import { create } from "zustand";
import { EventData } from "../interface/event.interface";

interface FormEventStore {
  stateFormEvent: EventData;
  stateAddress: boolean;
  updateFormEvent: (field: string, value: any) => void;
  updateStatusAddress: (value: boolean) => void;
}

const useFormEventStore = create<FormEventStore>((set) => ({
  stateFormEvent: {
    address: "", // LocationEvent
    latitude: 0.0, // LocationEvent
    longitude: 0.0, // LocationEvent
    totalCapacity: 0, // DateEvent
    eventType: "", // EventType
    ticketPrice: 0, // DateEvent
    ownerId: "", // User information
    title: "", // AboutEvent (New)
    description: "", // AboutEvent
    images: [], // ContentEvent
    eventDate: new Date(), // DateEvent
    eventEndDate: new Date(), // DateEvent
    categories: [], // EventType (Opcional)
    ticketPurchaseDeadline: new Date(), // DateEvent (Opcional)
    refundPolicy: "", // Automatic (Opcional)
    socialLinks: [], // (Opcional)
    rating: 0, // Automatic
    availableTickets: 0, // DateEvent (Opcional)
    ageRestriction: "", // EventImportantInfo (Opcional)
    organizerContact: "", // User information (Opcional)
    accessibilityInfo: "", // EventImportantInfo (Opcional)
    documents: [], // EventDocuments (Opcional)
  },
  stateAddress: false,
  updateFormEvent: (field: string, value: any) =>
    set((state) => ({
      stateFormEvent: { ...state.stateFormEvent, [field]: value },
    })),
  updateStatusAddress: (value: boolean) =>
    set((state) => ({ stateAddress: value })),
}));

export default useFormEventStore;
