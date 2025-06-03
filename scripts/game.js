import { auth, db } from './firebase-config.js';
import {
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getDocs, collection, doc, getDoc, setDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    console.log("Eingeloggt als:", user.email);
    await checkOrCreateCountry(user);
    setupMap(user);
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});

// Land erzeugen wenn keins vorhanden
async function checkOrCreateCountry(user) {
  const q = collection(db, "countries");
  const snapshot = await getDocs(q);

  const ownCountry = Array.from(snapshot.docs).find(doc => doc.data().owner === user.email);

  if (!ownCountry) {
    const newCountryId = `country_${Date.now()}`;
    await setDoc(doc(db, "countries", newCountryId), {
      countryId: newCountryId,
      owner: user.email,
      troops: 10,
      buildingLevel: 1
    });
    console.log(`Neues Land ${newCountryId} für ${user.email} erstellt`);
  }
}

// Dynamische Map
async function setupMap(user) {
  const mapContainer = document.getElementById("map");
  mapContainer.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "800");
  svg.setAttribute("height", "500");

  const q = collection(db, "countries");
  const snapshot = await getDocs(q);

  let x = 10, y = 10, count = 0;

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("id", data.countryId);
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", "80");
    rect.setAttribute("height", "80");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "1");

    rect.setAttribute("fill",
      data.owner === user.email ? "green" :
      data.owner === "" ? "lightgray" : "gray"
    );

    rect.addEventListener("click", () => handleCountryClick(data.countryId, user));
    svg.appendChild(rect);

    x += 90;
    count++;
    if (count % 8 === 0) { x = 10; y += 90; }
  });

  mapContainer.appendChild(svg);
}

async function handleCountryClick(countryId, user) {
  const docRef = doc(db, "countries", countryId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  const data = docSnap.data();

  if (data.owner === user.email) {
    const newLevel = data.buildingLevel + 1;
    await updateDoc(docRef, {
      buildingLevel: newLevel,
      troops: data.troops + (10 * newLevel)
    });
    alert(`Gebäude in ${countryId} auf Level ${newLevel} erhöht!`);
  } else if (data.owner === "") {
    await updateDoc(docRef, {
      owner: user.email,
      troops: 10,
      buildingLevel: 1
    });
    alert(`${countryId} übernommen!`);
  } else {
    alert(`Gehört ${data.owner}`);
  }

  setupMap(user);
}
