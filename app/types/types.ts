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
  Login: undefined;
  Signup: undefined;
  SignupDetails: SignupDetails;
  ResetPass: undefined;
  DetailsPage: { id: string };
  Listings: undefined;
  ListCard: undefined;
  // ... puedes agregar más rutas y sus parámetros aquí
};
