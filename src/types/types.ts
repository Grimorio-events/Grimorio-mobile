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
  Home: undefined; // No se esperan parámetros para la pantalla Home
  Login: undefined; // No se esperan parámetros para la pantalla Login
  Signup: undefined; // No se esperan parámetros para la pantalla Signup
  SignupDetails: SignupDetails;
  // ... puedes agregar más rutas y sus parámetros aquí
};
