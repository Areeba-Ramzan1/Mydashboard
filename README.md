# 🧭 MyDashboard – User Authentication Screens

A **modern, responsive authentication dashboard** with clean UI and smooth UX.

> 📌 **Task 2 – Internship at Krytix Solutions**

---

## 🌐 Live Demo & Repo

* 🚀 **Live (Vercel):** [https://mydashboard-beta.vercel.app](https://mydashboard-beta.vercel.app)
* 📂 **GitHub:** [https://github.com/Areeba-Ramzan1/Mydashboard](https://github.com/Areeba-Ramzan1/Mydashboard)

---

## 🛠️ Tech Stack

* **HTML5** – Structure
* **CSS3** – Styling (Responsive, modern UI)
* **JavaScript (ES6)** – Client-side logic
* **Firebase Auth (Email/Password, Password Reset)**

---

## 🔑 Screens Included

* 🔓 **Login** (`index.html`)
* 📝 **Signup** (`signup.html`)
* 🔑 **Forgot Password** (`forgot_pw.html`)
* 🛠️ **Change Password** (`change_pw.html`)
* 🧭 **Dashboard** (post-login) (`dashboard.html`)
* ⚙️ **Profile Settings** (`profile_set.html`)

---

## 📁 Project Structure

```
dashboard/                # Root Project Folder
│
├── css/                  # All CSS Stylesheets
│   ├── styles.css        # Login/Index Page
│   ├── signup.css        # Signup Page
│   ├── forgot_pw.css     # Forgot Password Page
│   ├── change_pw.css     # Change Password Page
│   ├── dashboard.css     # Dashboard Page
│   └── profile.css       # Profile Settings Page
│
├── js/                   # All JavaScript Files
│   ├── script.js         # Login/Index Page
│   ├── signup.js         # Signup Page
│   ├── forgot_pw.js      # Forgot Password Page
│   ├── change_pw.js      # Change Password Page
│   ├── dashboard.js      # Dashboard Page
│   └── profile_set.js    # Profile Settings Page
│
├── images/               # Images Used in the Project
│   ├── db.jpg            # Dashboard Background
│   ├── forgot.jpg        # Forgot Password Page
│   ├── login.jpg         # Login Page
│   ├── reset.jpg         # Reset Password Page
│   ├── signup.jpg        # Signup Page
│   └── profile.jpg       # Profile Page
│
├── index.html            # Login Page
├── signup.html           # Signup Page
├── forgot_pw.html        # Forgot Password Page
├── change_pw.html        # Change Password Page
├── dashboard.html        # Dashboard (post-login)
└── profile_set.html      # Profile Settings Page
└── vercel.json           # for deploy

```

---

## 🔐 Authentication Flow

1. User **signs up** → new account created
2. User **logs in** → session is initiated
3. **Forgot password** → reset email sent via Firebase
4. **Change password** → secure update for logged-in users
5. **Profile update** → users can manage their personal info

> **Email templates:** Firebase Console → Authentication → Templates.
> Set **Sender name** to `MyDashboard` and **Reply-to** to `aribar749@gmail.com`.

---

## ▶️ Run Locally

**Option A: Open directly**

* Double-click `index.html` (works for static pages).

**Option B: VS Code – Live Server**

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.
3. Local URL will be like: `http://127.0.0.1:5500/`.
```

## 🧪 Test Credentials

* 📧 Email: `test@example.com`
* 🔑 Password: `Password@123`

> Note: These are demo credentials for UI walkthrough only.


## 👩‍💻 Developer

**Areeba Ramzan**
Frontend Developer – Internship Project
GitHub: [https://github.com/Areeba-Ramzan1]

---

## 📝 Notes

* **Frontend-only** project; ready to swap Firebase with an **external auth API** later if required (same UI, just replace API calls).
* Responsive layouts validated on desktop & mobile.
