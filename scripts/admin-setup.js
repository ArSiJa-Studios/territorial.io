import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Deine Firebase-Konfig
const firebaseConfig = {
  apiKey: "DEINE_API_KEY",
  authDomain: "DEIN_PROJECT_ID.firebaseapp.com",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
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
