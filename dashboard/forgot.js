// Email validation
function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send reset link function
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
    // Replace this URL with your backend forgot password API endpoint
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error("Failed to send reset link. Please try again later.");
    }

    alert("✅ Reset link sent! Please check your email.");

    // Optional: Clear input after sending
    emailInput.value = "";

  } catch (error) {
    alert(error.message || "Something went wrong. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector(".btn.blue");
  sendBtn.addEventListener("click", sendResetLink);
});
