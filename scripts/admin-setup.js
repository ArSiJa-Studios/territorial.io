import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Deine Firebase-Konfig
const firebaseConfig = {
apiKey: "AIzaSyClBhphyNWbDdrEJhKl8CoGfI6iL6MEnSI",
  authDomain: "territorial-io.firebaseapp.com",
  projectId: "territorial-io",
  storageBucket: "territorial-io.appspot.com",
  messagingSenderId: "832260574713",
  appId: "1:832260574713:web:e59ce072e28e8e2353c128",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("createCountriesBtn").addEventListener("click", async () => {
  for (let i = 1; i <= 50; i++) {
    const countryId = `country_${i}`;
    const docRef = doc(db, "countries", countryId);

    await setDoc(docRef, {
      countryId: countryId,
      owner: "",
      troops: 0,
      buildingLevel: 0
    });

    console.log(`Angelegt: ${countryId}`);
  }

  alert("50 Länder erfolgreich angelegt! 🗺️🔥");
});
