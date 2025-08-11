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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase auth reference (compat)
const auth = firebase.auth();

// Email validation
function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector(".btn.blue");
  sendBtn.addEventListener("click", sendResetLink);
});

async function sendResetLink() {
  const emailInput = document.getElementById("forgotEmail");
  let email = emailInput.value.trim();

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    alert("✅ Reset link sent! Please check your email.");
    emailInput.value = "";
  } catch (error) {
    alert(error.message || "Something went wrong. Please try again.");
  }
}
