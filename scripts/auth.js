import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Registrierung
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Registrierung erfolgreich!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Login
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login erfolgreich!");
      window.location.href = "game.html"; // z.B. Spielseite
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Logout
export function logout() {
  signOut(auth)
    .then(() => {
      alert("Abgemeldet.");
      window.location.href = "index.html";
    });
}

// User-Session überwachen
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User eingeloggt: ", user.email);
  } else {
    console.log("Kein User eingeloggt.");
  }
});
