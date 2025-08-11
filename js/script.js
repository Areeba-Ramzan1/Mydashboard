// Import Firebase modules from CDN (latest version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRhnIrgmGwgvpfBt9_RIsZjGedjJYMnpM",
  authDomain: "mydashboard-d6693.firebaseapp.com",
  projectId: "mydashboard-d6693",
  storageBucket: "mydashboard-d6693.appspot.com",
  messagingSenderId: "940939840006",
  appId: "1:940939840006:web:db42fcea14f3105b39d187",
  measurementId: "G-GQL8J6G3NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helper function to redirect page
function goToPage(page) {
  window.location.href = page;
}

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

const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("loginPassword");

  togglePassword.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    // Eye icon toggle
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

// Email/Password Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!isValidPassword(password)) {
    alert("Password must be at least 8 characters, with 1 uppercase, 1 lowercase, and 1 special character.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("userName", user.displayName || "User");
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("uid", user.uid);

    alert("Login successful!");
    goToPage("dashboard.html");
  } catch (error) {
    alert(error.message);
  }
});

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("userName", user.displayName || "Google User");
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("uid", user.uid);

    alert("Google login successful!");
    goToPage("dashboard.html");
  } catch (error) {
    alert(error.message);
  }
});

// Auto redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("login")) {
    goToPage("dashboard.html");
  }
});
