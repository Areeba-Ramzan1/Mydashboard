# 🧭 Dashboard – User Authentication Screens

This is a responsive,modern dashboard with the following screens:

- 🔓 Login (index.html)
- 📝 Signup
- 🔑 Forgot Password
- 🛠️ Change Password
- 🧭 Dashboard (after login)
- ⚙️ Profile Settings (profile_set.html)

---

📌 ***This is Task 2 of the internship at Krytix Solutions.***

## 🛠️ Technologies Used
- HTML
- CSS
- JavaScript


## 🌐 Live Demo

👉 [Click Here to View the Deployed Site](https://static-web-app-w81h.vercel.app/)

---

## 📁 Project Structure

dashboard/# Root folder of project
│

├── css/ # All CSS stylesheets
│ ├── styles.css # CSS for Login/Index page
│ ├── signup.css # CSS for Signup page
│ ├── forgot_pw.css # CSS for Forgot password page
│ ├── change_pw.css # CSS for Change password page
│ ├── dashboard.css # CSS for Dashboard page
│ └── profile.css # CSS for Profile settings page
│

├── js/ # All JavaScript files
│ ├── script.js # JS for Login/Index and Dashboard page
│ ├── signup.js # JS for Signup page
│ └── forgot.js # JS for Forgot password page
│

├── images/      # Images used in the project
│ └── db.jpg     # Image used in dashboard page
│ ├── forgot.jpg # Image used in forgot page
│ ├── login.jpg  # Image used in login/index page
│ ├── reset.jpg  # Image used in reset password page
│ └── signup.jpg # Image used in signup page
│ └── profile.jpg # Image used in profile page
│

├── index.html             # Login Page
├── signup.html            # Sign up Page
├── forgot_pw.html         # Forgot Password Page
├── change_pw.html         # Change Password Page
├── dashboard.html         # Dashboard (post-login)
├── profile.html           # Profile Settings Page

---

## 🚀 Deployment Info

- ***Hosted on Vercel***
- ***Repo:*** [GitHub - Dashboard](https://github.com/Areeba-Ramzan1/Dashboard/tree/main/dashboard)
- ***Live Link:*** [View Website](https://static-web-app-w81h.vercel.app/)

---

## Setup
1. Clone repo
2. Open `index.html` in browser
3. Update API URL in `js/login.js`

## Authentication Flow
- User logs in → API returns JWT token → Token stored in localStorage → Decoded on welcome page.

## Test
Use:
Email: test@example.com  
Password: Password@123


## 👩‍💻 Developed by

***Areeba Ramzan***  
📌 Frontend Project for Web Development  
🔗 [GitHub Profile](https://github.com/Areeba-Ramzan1)

---

## 📝 Notes

- This is a ***frontend-only*** project.
