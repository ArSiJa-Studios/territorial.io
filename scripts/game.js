import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, collection, query, where, getDocs, setDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    console.log("Eingeloggt als:", user.email);
    
    // Prüfen ob User ein Land hat
    const q = query(collection(db, "countries"), where("owner", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Neues Land anlegen für User
      const newCountryId = `country_${Date.now()}`;
      await setDoc(doc(db, "countries", newCountryId), {
        countryId: newCountryId,
        owner: user.email,
        troops: 10,
        buildingLevel: 1
      });
      console.log(`Neues Land ${newCountryId} für ${user.email} erstellt`);
      alert(`Willkommen ${user.email}, du hast dein erstes Land: ${newCountryId}`);
    } else {
      console.log(`User ${user.email} hat bereits ein Land`);
    }

    setupMap(user);
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});

// Map Interaktion bleibt wie bisher
function setupMap(user) {
  const mapElements = document.querySelectorAll("rect");
  mapElements.forEach(el => {
    el.addEventListener("click", () => handleCountryClick(el.id, user));
  });
}
