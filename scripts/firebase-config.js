// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase-Konfig
const firebaseConfig = {
  apiKey: "AIzaSyClBhphyNWbDdrEJhKl8CoGfI6iL6MEnSI",
  authDomain: "territorial-io.firebaseapp.com",
  projectId: "territorial-io",
  storageBucket: "territorial-io.appspot.com",
  messagingSenderId: "832260574713",
  appId: "1:832260574713:web:e59ce072e28e8e2353c128",
  measurementId: "G-1E3W7VD4ZX"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth-Dienst initialisieren & exportieren
export const auth = getAuth(app);
