// =================== Firebase Config (yahi use karo) ===================
const firebaseConfig = {
  apiKey: "AIzaSyDRhnIrgmGwgvpfBt9_RIsZjGedjJYMnpM",
  authDomain: "mydashboard-d6693.firebaseapp.com",
  projectId: "mydashboard-d6693",
  storageBucket: "mydashboard-d6693.appspot.com",
  messagingSenderId: "940939840006",
  appId: "1:940939840006:web:db42fcea14f3105b39d187",
  measurementId: "G-GQL8J6G3NZ"
};

// Init :
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
auth.useDeviceLanguage(); 

// =================== Helpers ===================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mapFirebaseError(code, fallback) {
  switch (code) {
    case "auth/invalid-email": return "Invalid email address.";
    case "auth/user-not-found": return "No user found with this email.";
    case "auth/network-request-failed": return "Network error. Check your connection.";
    case "auth/too-many-requests": return "Too many attempts. Please try again later.";
    default: return fallback || "Something went wrong. Please try again.";
  }
}

// =================== Main ===================
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector(".btn.blue");
  const emailInput = document.getElementById("forgotEmail");

  sendBtn.addEventListener("click", async () => {
    const email = (emailInput.value || "").trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // UI: loading
    sendBtn.disabled = true;
    const original = sendBtn.querySelector(".btn-text").textContent;
    sendBtn.style.opacity = "0.7";
    sendBtn.querySelector(".btn-text").textContent = "Sending...";

    try {
      // ---------- SIMPLE: default Firebase reset page ----------
      await auth.sendPasswordResetEmail(email);

      alert("✅ Reset link sent! Please check your email inbox (and spam).");
      emailInput.value = "";
    } catch (err) {
      const msg = mapFirebaseError(err.code, err.message);
      alert("❌ " + msg);
    } finally {
      // reset UI :
      sendBtn.disabled = false;
      sendBtn.style.opacity = "1";
      sendBtn.querySelector(".btn-text").textContent = original;
    }
  });
});
