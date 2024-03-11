export type SignupDetails = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  country: string;
  city: string;
};

export type RootStackParamList = {
  Home: undefined; // No se esperan parámetros para la pantalla
  Profile: undefined;
  Create: undefined;
  Login: undefined;
  Signup: undefined;
  SignupDetails: SignupDetails;
  ResetPass: undefined;
  DetailsPage: { id: string };
  Listings: undefined;
  ListCard: undefined;
  Exploreheader: undefined;
  Explore: undefined;
  Message: undefined;
  TicketsMaps: undefined;
  Requiredlogin: undefined;
  CreateEvent: undefined;
  LocationEvent: undefined;
  ModalLocation: undefined;
  ChatRoom: undefined;
  Chat: { id: string };
  // ... puedes agregar más rutas y sus parámetros aquí
};
