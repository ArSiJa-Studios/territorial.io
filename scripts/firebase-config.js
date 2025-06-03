import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClBhphyNWbDdrEJhKl8CoGfI6iL6MEnSI",
  authDomain: "territorial-io.firebaseapp.com",
  projectId: "territorial-io",
  storageBucket: "territorial-io.appspot.com",
  messagingSenderId: "832260574713",
  appId: "1:832260574713:web:e59ce072e28e8e2353c128",
  measurementId: "G-1E3W7VD4ZX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
