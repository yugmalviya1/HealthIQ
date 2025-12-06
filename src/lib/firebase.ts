import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGmXsS4AWwgr7vgf9G_KDBq_vG5qsU1ZU",
  authDomain: "healthiqai.firebaseapp.com",
  projectId: "healthiqai",
  storageBucket: "healthiqai.firebasestorage.app",
  messagingSenderId: "165911550912",
  appId: "1:165911550912:web:2d856e8795c21cad2a4625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
