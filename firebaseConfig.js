import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnfuC8J_x8yx8a4tB_7OLxX4MfaH8vB-o",
  authDomain: "grimorio-cfd09.firebaseapp.com",
  databaseURL: "https://grimorio-cfd09.firebaseio.com",
  projectId: "grimorio-cfd09",
  storageBucket: "grimorio-cfd09.appspot.com",
  messagingSenderId: "55164603383",
  appId: "1:55164603383:android:781436a19b008ee001bcf2",
  measurementId: "G-YMLLPP16ZM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Aquí puedes inicializar e importar otros servicios de Firebase si planeas usarlos
// Por ejemplo, para usar autenticación y Firestore:
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

export { app, analytics };
