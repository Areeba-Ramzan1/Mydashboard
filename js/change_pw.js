// Firebase Config & Init
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

document.addEventListener("DOMContentLoaded", function () {
  const toggleIcons = document.querySelectorAll(".icon.inside-input");

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

// Event Listener for Change Password
document.querySelector(".btn.blue").addEventListener("click", async function (e) {
  e.preventDefault();

  let currentPw = document.getElementById("currentPassword").value.trim();
  let newPw = document.getElementById("newPassword").value.trim();
  let confirmPw = document.getElementById("confirmPassword").value.trim();

  // Validations
  if (!currentPw || !newPw || !confirmPw) {
    alert("Please fill in all fields.");
    return;
  }
  if (newPw.length < 8) {
    alert("New password must be at least 8 characters long.");
    return;
  }
  let upperCase = /[A-Z]/.test(newPw);
  let lowerCase = /[a-z]/.test(newPw);
  let specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPw);
  if (!upperCase || !lowerCase || !specialChar) {
    alert("New password must contain at least 1 uppercase, 1 lowercase, and 1 special character.");
    return;
  }
  if (newPw !== confirmPw) {
    alert("New password and Confirm password do not match.");
    return;
  }
  

  // Firebase Auth: Reauthenticate & Update password
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("You need to be logged in to change your password.");
      return;
    }

    const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPw);
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPw);

    alert("Password updated successfully!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});
