import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB2E61f9MwaWRzbRLjgrwhN-puA-ApO5rY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "udemy-cloned.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "udemy-cloned",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "udemy-cloned.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "609953392950",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:609953392950:web:05b72ec65a776b9c6beb97",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default db;
