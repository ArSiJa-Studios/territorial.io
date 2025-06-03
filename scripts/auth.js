import { auth } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore, doc, setDoc, getDocs, collection, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();

// Registrierung + Land vergeben
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("User registriert:", user.email);

      // Freies Land suchen
      const countriesSnapshot = await getDocs(collection(db, "countries"));
      let freeCountry = null;

      countriesSnapshot.forEach((docSnap) => {
        if (!freeCountry && docSnap.data().owner === "") {
          freeCountry = docSnap.id;
        }
      });

      if (freeCountry) {
        // Land dem neuen User geben
        await updateDoc(doc(db, "countries", freeCountry), {
          owner: user.email,
          troops: 10,
          buildingLevel: 1
        });
        alert(`Account erst
