// Navigate to another page
function goToPage(page) {
  window.location.href = page;
}

// Show screen based on button click
function showScreen(screen) {
  if (screen === "forgotScreen") {
    goToPage("forgot_pw.html");
  } else if (screen === "registerScreen") {
    goToPage("signup.html");
  }
}

// Email validation
function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation (same as change password)
function isValidPassword(password) {
  let minLength = password.length >= 8;
  let upperCase = /[A-Z]/.test(password);
  let lowerCase = /[a-z]/.test(password);
  let specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return minLength && upperCase && lowerCase && specialChar;
}

// Login with API + JWT decode
async function login() {
  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

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
    // API call (replace URL with your backend API)
    let response = await fetch("https://your-api.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Invalid email or password.");
    }

    let data = await response.json();
    let token = data.token;

    if (!token) {
      throw new Error("Token not received from server.");
    }

    // Save token
    localStorage.setItem("token", token);

    // Decode JWT
    let payload = JSON.parse(atob(token.split(".")[1]));
    localStorage.setItem("userName", payload.name || "User");
    localStorage.setItem("userEmail", payload.email || email);

    alert("Login successful!");
    goToPage("dashboard.html");

  } catch (err) {
    alert(err.message);
  }
}

// Google login demo
document.addEventListener("DOMContentLoaded", function () {
  let googleBtn = document.querySelector(".btn.white");
  if (googleBtn) {
    googleBtn.addEventListener("click", function () {
      alert("Google Login successful! Redirecting...");
      localStorage.setItem("userName", "Google User");
      localStorage.setItem("userEmail", "googleuser@example.com");
      localStorage.setItem("token", "dummy-google-token");
      goToPage("dashboard.html");
    });
  }
});

// Load user data on dashboard
function loadWelcomeData() {
  let name = localStorage.getItem("userName") || "User";
  let email = localStorage.getItem("userEmail") || "Not available";

  let nameElement = document.getElementById("welcomeMsg");
  let emailElement = document.getElementById("userEmail");

  if (nameElement) nameElement.textContent = `Welcome, ${name}!`;
  if (emailElement) emailElement.textContent = email;

  // Avatar initials
  let initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  let avatarText = document.getElementById("avatarText");
  if (avatarText) avatarText.textContent = initials;
}

// Logout function
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  alert("You have been logged out.");
  // thoda delay
  setTimeout(() => {
    window.location.href = "index.html"; // login page
  }, 100);
}

