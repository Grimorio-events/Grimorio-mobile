export interface EventData {
  id?: string; // Opcional porque es generado automáticamente
  address: string;
  latitude: number;
  longitude: number;
  totalCapacity: number;
  eventType: string;
  ticketPrice: number;
  ownerId: string;
  description: string;
  images: string[];
  eventDate: Date;
  eventEndDate?: Date; // Opcional
  status?: string; // Puede ser opcional dependiendo de si se establece automáticamente
  categories?: string[]; // Opcional
  ticketPurchaseDeadline?: Date; // Opcional
  refundPolicy?: string; // Opcional
  socialLinks?: string[]; // Opcional
  rating?: number; // Opcional
  availableTickets?: number; // Opcional
  ageRestriction?: string; // Opcional
  organizerContact?: string; // Opcional
  accessibilityInfo?: string; // Opcional
  documents?: string[]; // Opcional
  createdAt?: Date; // Opcional, generalmente manejado por la base de datos
  updatedAt?: Date; // Opcional, generalmente manejado por la base de datos
}
