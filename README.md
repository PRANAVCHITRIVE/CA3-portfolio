# ⚡ Creative & Professional Personal Portfolio Website
### JavaScript Lab (Course Code: T-3013) — CA3 Mini Project
**Symbiosis Institute of Technology (SIT), Nagpur**  
*Constituent of Symbiosis International (Deemed University)*

---

## 👨‍🎓 Student Credentials & Academic Information
- **Student Name:** Pranav Chitrive
- **Permanent Registration Number (PRN):** `24070521084`
- **Department:** Department of Computer Science & Engineering (CSE)
- **Batch & Term:** 2024–2028 | 3rd Year (Semester V)
- **Course Teacher & Evaluator:** Dr. Sachin Harne (Assistant Professor, SIT Nagpur)
- **Evaluation Weightage (5 Marks Total):**
  - 🌐 **Webpage / Portfolio Structure & Aesthetics:** `2.5 Marks`
  - 🗣️ **Technical Viva Voce:** `2.0 Marks`
  - 🔗 **GitHub Repository & Clean Code Standards:** `0.5 Marks`

---

## 🎯 Project Overview & Objective
This portfolio website serves as my digital professional identity, engineered to demonstrate mastery of core web technologies (HTML5, modern CSS3, and vanilla ES6+ JavaScript) without relying on heavyweight external frameworks.

Designed specifically to address the core question:
> *"If a recruiter, faculty evaluator, or tech lead visits my website, can they instantly understand who I am, what I have built, and what I can do?"*

---

## 🌟 Key Features & Architectural Highlights

### 1. 🔍 Visitor IP Address & Network Telemetry Inspector (Special Feature)
- Dedicated interactive button in both the header and hero section: **"Inspect Visitor IP"**.
- Fetches and displays real-time network telemetry:
  - **Public IPv4 / IPv6 Address** with one-click clipboard copy
  - **ISP / Organization Name** (e.g. Reliance Jio, Airtel, ACT, Campus Wi-Fi)
  - **Geolocation** (City, Region, Country with flag emoji 🇮🇳)
  - **Round-Trip Latency Ping** in milliseconds using `performance.now()`
  - **Client Diagnostics** (Browser Engine, Operating System, Screen Resolution, Connection Type)
  - **Multi-API Fallback Engine** (`ipwho.is` → `ipapi.co` → `ipify` → client simulated mock) ensures 100% resilience even on offline or restricted campus firewalls.

### 2. 🌌 Modern Glassmorphism & Cyber Aurora Aesthetics
- **Dark & Light Mode Switcher:** Smooth real-time color transitions with persistent user preference stored via `localStorage`.
- **HTML5 Canvas Particle Constellation:** Interactive 2D physics network rendering drifting nodes and connection vectors with mouse repulsion physics.
- **Glassmorphism Design System:** Custom CSS tokens, backdrop filters (`backdrop-filter: blur(16px)`), luminous gradient accents, and responsive layout grids.
- **Top Reading Scroll Progress:** Real-time top progress bar indicator and active navigation link tracking via `IntersectionObserver`.
- **Card 3D Tilt Effect:** Smooth mouse coordinate tracking on project and achievement cards.

### 3. ⚙️ In-Browser Live Profile Customizer
- Floating **"⚙️ Edit Profile"** widget allowing anyone to test and customize the student's Name, PRN, College, CGPA, and links directly on the page.
- Changes are instantly synchronized across DOM elements and persisted in `localStorage`.

### 4. 🔬 JavaScript Lab Live Practicals Playground
Embedded live interactive execution suite demonstrating university lab practicals:
- **Exp 4 & 6:** String Manipulation, Regex Tokenizer & Palindrome Evaluator.
- **Exp 2 & 5:** Array Destructuring, Cart & Billing Invoice Generator with GST and Discounts.
- **Exp 9:** Direct `localStorage` key-value inspector with live write and delete triggers.
- **Exp 10:** Dynamic JSON table data loader simulation with Promises and `async/await`.

### 5. 🗣️ Built-in Viva Voce Cheat Sheet Drawer
- Quick accessible drawer containing questions and answers on internal JavaScript mechanics (DOM manipulation, Event Loop, Closures, Storage API, Canvas rendering) for the 2.0 Marks evaluation.

### 6. 📄 Downloadable & Print-Ready Resume / CV
- Modal preview of Curriculum Vitae with `@media print` optimization for direct PDF export or physical printing.

---

## 📁 Directory Structure

```text
d:/CA3 JAVASCRIPT/
├── index.html                   # Core semantic HTML5 document
├── css/
│   ├── style.css                # Custom properties, glassmorphism, responsive queries
│   ├── components.css           # Modals, terminal inspector, customizer, lightbox, toasts
│   └── animations.css           # Keyframe animations, shimmer, pulse, and @media print
├── js/
│   ├── data.js                  # Centralized student profile & academic data model
│   ├── ip-inspector.js          # Visitor IP & network telemetry inspector module
│   ├── particles.js             # High-performance HTML5 Canvas particle constellation
│   ├── projects-gallery.js      # Filterable projects, 3D tilt, certificates & lightbox
│   ├── profile-customizer.js    # In-browser live profile editor with localStorage sync
│   └── main.js                  # App coordinator (theme, audio synth, validation, tabs)
├── assets/
│   └── images/                  # Profile photo, project mockups, certificates, gallery
├── VIVA_PREPARATION_GUIDE.md    # Complete Q&A guide for 2.0 Marks Viva evaluation
└── README.md                    # Project documentation & GitHub Pages guide (0.5 Marks)
```

---

## 🚀 Quick Start & Local Execution

No build step, bundler, or `npm install` is required. The website runs natively in any modern web browser.

### Option 1: Direct File Launch
Double click `index.html` to open it directly in Chrome, Firefox, Edge, or Brave.

### Option 2: Live Server (VS Code / Python)
Run a local lightweight HTTP server:
```bash
# Using Python built-in server:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 How to Deploy to GitHub Pages (For 0.5 Mark Submission)

1. **Initialize Git Repository:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete S-tier personal portfolio for CA3 JS Lab"
   ```

2. **Link to GitHub & Push:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/ca3-portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub.
   - Click on **Pages** in the left sidebar.
   - Under **Build and deployment**, select `Deploy from a branch` -> `main` -> `/(root)`.
   - Click **Save**. Your portfolio will be live at `https://<your-username>.github.io/ca3-portfolio/`!

---

## 👥 Student & Course Declaration
This project is submitted in partial fulfillment of the continuous assessment requirements for **JavaScript Lab (Course Code: T-3013)** for the degree of Bachelor of Technology in Computer Science & Engineering at **Symbiosis Institute of Technology (SIT), Nagpur**.

© 2026 **Pranav Chitrive** (PRN: 24070521084). All rights reserved.
