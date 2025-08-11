// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDRhnIrgmGwgvpfBt9_RIsZjGedjJYMnpM",
  authDomain: "mydashboard-d6693.firebaseapp.com",
  projectId: "mydashboard-d6693",
  storageBucket: "mydashboard-d6693.appspot.com",
  messagingSenderId: "940939840006",
  appId: "1:940939840006:web:db42fcea14f3105b39d187",
  measurementId: "G-GQL8J6G3NZ"
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  // Load current user data on page load
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('profileEmail').value = user.email || "";
      db.collection("users").doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            document.getElementById('profileName').value = data.name || "";
            document.getElementById('profilePhone').value = data.phone || "";
          }
        });
    } else {
      alert("No user logged in. Please login first.");
      window.location.href = "index.html";
    }
  });

  document.getElementById('updateBtn').addEventListener('click', updateProfile);
});

function updateProfile() {
  const name = document.getElementById('profileName').value.trim();
  const email = document.getElementById('profileEmail').value.trim();
  const phone = document.getElementById('profilePhone').value.trim();

  if (!name || !email) {
    alert('Name and Email are required.');
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("No user is logged in.");
    window.location.href = "index.html";
    return;
  }

  user.updateEmail(email).then(() => {
    return db.collection("users").doc(user.uid).set({
      name: name,
      email: email,
      phone: phone
    }, { merge: true });
  }).then(() => {
    alert("Profile updated successfully!");
      window.location.href = "dashboard.html"; // Redirect dashboard
  }).catch((error) => {
    console.error("Error updating profile: ", error);
    alert("Error: " + error.message);
  });
}
