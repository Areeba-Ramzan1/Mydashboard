// Firebase Config & Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDRhnIrgmGwgvpfBt9_RIsZjGedjJYMnpM",
  authDomain: "mydashboard-d6693.firebaseapp.com",
  projectId: "mydashboard-d6693",
  storageBucket: "mydashboard-d6693.appspot.com",
  messagingSenderId: "940939840006",
  appId: "1:940939840006:web:db42fcea14f3105b39d187",
  measurementId: "G-GQL8J6G3NZ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation
function isValidPassword(password) {
  const minLength = password.length >= 8;
  const upperCase = /[A-Z]/.test(password);
  const lowerCase = /[a-z]/.test(password);
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return minLength && upperCase && lowerCase && specialChar;
}

// Popup/alert
function showPopup(message) {
  alert(message);
}

// Signup function
async function signup() {
  const name = document.querySelector('input[placeholder="Full Name"]').value.trim();
  const email = document.querySelector('input[placeholder="Email"]').value.trim();
  const password = document.querySelector('input[placeholder="Password"]').value;

  if (!name || !email || !password) {
    showPopup("Please fill all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    showPopup("Please enter a valid email.");
    return;
  }

  if (!isValidPassword(password)) {
    showPopup("Password must be 8+ chars, include uppercase, lowercase & special character.");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await user.updateProfile({ displayName: name });

    await db.collection("users").doc(user.uid).set({
      name: name,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    showPopup("🎉 Congratulations Signup successful!...");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (error) {
    showPopup(error.message || "Signup failed. Please try again.");
  }
}

// Google Sign-In
async function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    await db.collection("users").doc(user.uid).set({
      name: user.displayName,
      email: user.email,
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    window.location.href = "index.html";
  } catch (error) {
    showPopup(error.message || "Google Sign-In failed.");
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".btn.blue").addEventListener("click", signup);
  document.querySelector(".btn.white").addEventListener("click", googleSignIn);

  // Password Eye Toggle
  const toggleIcons = document.querySelectorAll(".togglePassword"); // class use karna better
  toggleIcons.forEach(icon => {
    icon.addEventListener("click", function () {
      const input = this.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
      }
    });
  });
});
