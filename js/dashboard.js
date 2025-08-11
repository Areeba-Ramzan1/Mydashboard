// Firebase config (same as your project)
const firebaseConfig = {
  apiKey: "AIzaSyDRhnIrgmGwgvpfBt9_RIsZjGedjJYMnpM",
  authDomain: "mydashboard-d6693.firebaseapp.com",
  projectId: "mydashboard-d6693",
  storageBucket: "mydashboard-d6693.appspot.com",
  messagingSenderId: "940939840006",
  appId: "1:940939840006:web:db42fcea14f3105b39d187",
  measurementId: "G-GQL8J6G3NZ"
};

// Initialize Firebase app only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  loadWelcomeData();
});

function loadWelcomeData() {
  auth.onAuthStateChanged(user => {
    if (user) {
      const email = user.email;
      const displayName = user.displayName || email.split('@')[0];

      // Update welcome message and email
      document.getElementById('welcomeMsg').textContent = `Welcome, ${displayName}!`;
      document.getElementById('userEmail').textContent = email;

      // Set avatar initials
      document.getElementById('avatarText').textContent = getInitials(displayName);

      // Fetch extra profile data (phone, name) from Firestore
      db.collection("users").doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            // Update phone number display
            document.getElementById('userPhone').textContent = `Phone no: ${data.phone || 'Not available'}`;

            // If Firestore has 'name', update welcome message and avatar accordingly
            if (data.name) {
              document.getElementById('welcomeMsg').textContent = `Welcome, ${data.name}!`;
              document.getElementById('avatarText').textContent = getInitials(data.name);
            }
          } else {
            document.getElementById('userPhone').textContent = "Phone no: Not available";
          }
        }).catch(error => {
          console.error("Error fetching user data:", error);
          document.getElementById('userPhone').textContent = "Phone no: Not available";
        });
    } else {
      // User not logged in, redirect to login
      window.location.href = "index.html";
    }
  });
}

function getInitials(name) {
  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  } else {
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  }
}

function logout() {
  auth.signOut()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    });
}

function goToPage(page) {
  window.location.href = page;
}
