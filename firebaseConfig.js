import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUggwmx7i_gDxU-mC411Se1QNcep7y6ho",
  authDomain: "winged-yeti-414217.firebaseapp.com",
  projectId: "winged-yeti-414217",
  storageBucket: "winged-yeti-414217.appspot.com",
  messagingSenderId: "810313169491",
  appId: "1:810313169491:web:340da56de40fde0c9624a6",
  measurementId: "G-78RWM5BCD9",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Aquí se puede inicializar e importar otros servicios de Firebase
// Por ejemplo, para usar autenticación y Firestore:
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

export { app, analytics };
