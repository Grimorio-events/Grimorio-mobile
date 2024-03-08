export interface TicketData {
  map(
    arg0: ({ event, ...ticket }: { [x: string]: any; event: any }) => {
      [x: string]: any;
    }
  ): unknown;
  id: string;
  event: Event;
  price: number;
  purchaseDeadline: Date;
  available: boolean;
  userId: string;
}
