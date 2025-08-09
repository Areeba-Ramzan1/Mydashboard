// Email validation
function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation
function isValidPassword(password) {
  let minLength = password.length >= 8;
  let upperCase = /[A-Z]/.test(password);
  let lowerCase = /[a-z]/.test(password);
  let specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return minLength && upperCase && lowerCase && specialChar;
}

// Show popup message
function showPopup(message) {
  alert(message);
  // Agar tum modal ya custom popup chahte ho to wo bhi add kar sakta hoon
}

// Signup function
async function signup() {
  let name = document.querySelector('input[placeholder="Full Name"]').value.trim();
  let email = document.querySelector('input[placeholder="Email"]').value.trim();
  let password = document.querySelector('input[placeholder="Password"]').value.trim();

  if (!name || !email || !password) {
    showPopup("Please fill all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    showPopup("Please enter a valid email.");
    return;
  }

  if (!isValidPassword(password)) {
    showPopup("Password must be 8+ chars, uppercase, lowercase & special char.");
    return;
  }

  try {
    // Demo fake API: Replace with your real signup API
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) throw new Error("Signup failed.");

    // Signup successful
    showPopup("🎉 Congratulations! Signup successful.");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = "index.html"; // login page
    }, 2000);

  } catch (err) {
    showPopup(err.message || "Signup failed. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.querySelector(".btn.blue");
  signupBtn.addEventListener("click", signup);
});
