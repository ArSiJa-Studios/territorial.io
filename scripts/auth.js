import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection, getDocs, doc, setDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Registrierung + automatisches Land
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Prüfen ob ein freies Land existiert
      const countriesSnapshot = await getDocs(collection(db, "countries"));
      let freeCountry = null;

      countriesSnapshot.forEach((docSnap) => {
        if (!freeCountry && docSnap.data().owner === "") {
          freeCountry = docSnap.id;
        }
      });

      if (freeCountry) {
        await updateDoc(doc(db, "countries", freeCountry), {
          owner: user.email,
          troops: 10,
          buildingLevel: 1
        });
        alert(`Account erstellt & Land ${freeCountry} zugewiesen!`);
      } else {
        const newCountryId = `country_${Date.now()}`;
        await setDoc(doc(db, "countries", newCountryId), {
          countryId: newCountryId,
          owner: user.email,
          troops: 10,
          buildingLevel: 1
        });
        alert(`Account erstellt & neues Land ${newCountryId} erzeugt!`);
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}

export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login erfolgreich!");
      window.location.href = "game.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

export function logout() {
  signOut(auth)
    .then(() => {
      alert("Abgemeldet.");
      window.location.href = "index.html";
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Eingeloggt: ", user.email);
  } else {
    console.log("Kein User.");
  }
});
