# 🗣️ JavaScript Lab CA3 — Viva Voce Preparation Guide (2.0 Marks)
### Symbiosis Institute of Technology (SIT), Nagpur
**Subject:** JavaScript Lab (Course Code: T-3013)  
**Student Name:** Pranav Chitrive (PRN: `24070521084`)  
**Evaluator:** Dr. Sachin Harne

---

## 🎯 Purpose of This Document
The technical Viva Voce carries **2.0 Marks (40% of CA3 total marks)**. This guide provides comprehensive, technically precise answers to the most common questions external and internal faculty evaluators ask regarding this project's architecture, JavaScript mechanics, and Web APIs.

---

## 📌 Section 1: Architecture & Project Overview

### Q1: Can you give a quick 1-minute overview of your portfolio website?
**Answer:**
> *"Sir/Ma'am, this website is my digital professional identity built entirely using semantic HTML5, modern vanilla CSS3, and ES6+ JavaScript with zero heavyweight dependencies. It encompasses all required sections: personal bio, education timeline, semester-wise SGPA progress gauges, technical skills with animated progress bars, filterable projects with 3D tilt effects, professional certificates with a lightbox viewer, extracurricular achievements, an activities photo gallery, an interactive contact form with regex validation, and a downloadable ATS-friendly resume.*  
> *Additionally, I built two flagship features: a **Visitor IP & Network Inspector** that fetches real-time telemetry (public IP, ISP, geolocation, and round-trip ping) with multi-API fallback, and an **In-Browser Profile Customizer** that allows live updates via LocalStorage."*

---

## 📌 Section 2: Visitor IP & Network Telemetry Feature

### Q2: How did you implement the button that displays the visitor's IP address?
**Answer:**
> *"The feature is implemented in `js/ip-inspector.js` using the modern ES6 `Fetch API` inside an `async/await` function. When the user loads the page or clicks 'Inspect Visitor IP':*
> 1. *It queries a public geolocation JSON endpoint (`https://ipwho.is/`).*
> 2. *To guarantee fault tolerance, if the primary API fails (due to adblockers or network restrictions), it automatically cascades to a secondary API (`https://ipapi.co/json/`), then to `api.ipify.org`, and finally to a simulated offline fallback.*
> 3. *It also measures client-to-server round-trip latency (ping) in milliseconds using the high-resolution `performance.now()` Web API before and after fetching a lightweight resource.*
> 4. *It parses the visitor's `navigator.userAgent` to detect browser type, OS, and screen resolution, presenting everything inside a cyber terminal UI modal with a one-click clipboard copy feature."*

### Q3: What is the difference between `fetch()` and `XMLHttpRequest`?
**Answer:**
> - *`XMLHttpRequest` is callback-based, cumbersome to write, and prone to 'callback hell'.*
> - *`fetch()` is Promise-based, natively supports cleaner chaining with `.then()` or `async/await`, offers simpler request/response streaming options, and provides a cleaner syntax for handling JSON data via `res.json()`.*

### Q4: Why did you use `async/await` instead of raw Promise chaining with `.then()`?
**Answer:**
> *"`async/await` is syntactic sugar over native Promises. It allows asynchronous code to be written and read like synchronous code, making debugging easier, avoiding nested indentation, and allowing the use of standard `try...catch` blocks for robust error handling."*

---

## 📌 Section 3: Asynchronous JavaScript & The Event Loop

### Q5: How does the JavaScript Event Loop work?
**Answer:**
> *"JavaScript is single-threaded and has a single Call Stack. When an asynchronous operation (like `fetch()`, `setTimeout()`, or `requestAnimationFrame()`) is called:*
> 1. *The operation is handed off to browser Web APIs.*
> 2. *The Call Stack continues executing synchronous code without blocking.*
> 3. *When the asynchronous task completes, its callback is placed in either the **Microtask Queue** (for Promises, `MutationObserver`) or the **Macrotask/Callback Queue** (for `setTimeout`, DOM events).*
> 4. *The Event Loop constantly checks: if the Call Stack is empty, it flushes all microtasks first, and then picks the next task from the macrotask queue."*

---

## 📌 Section 4: HTML5 Canvas & Animations

### Q6: How does the particle constellation canvas in the background operate without causing UI lag?
**Answer:**
> *"The particle network in `js/particles.js` uses an HTML5 2D Canvas context. Each frame:*
> 1. *`ctx.clearRect()` clears the viewport.*
> 2. *Each particle's position is updated by velocity vectors (`vx`, `vy`).*
> 3. *Using the Pythagorean distance formula `Math.sqrt(dx*dx + dy*dy)`, if two particles are closer than 130px, a semi-transparent line is drawn between them.*
> 4. *When the mouse moves over the screen, proximity repulsion pushes particles away within a 160px radius.*
> 5. *Crucially, we use `window.requestAnimationFrame()` instead of `setInterval()`. It syncs rendering with the monitor's refresh rate (60Hz/120Hz) and automatically halts execution when the tab is inactive (`document.hidden`), preserving CPU and GPU battery life."*

---

## 📌 Section 5: Web Storage API (LocalStorage vs SessionStorage)

### Q7: Where and why did you use `localStorage` in this project?
**Answer:**
> *"We use `localStorage` in two key areas:*
> 1. *Theme Persistence (`'portfolio_theme'`): Stores whether the visitor prefers Dark Aurora, Cyber Neon, or Light mode, so the choice persists upon page refresh.*
> 2. *Profile Customizer (`'portfolio_user_customizations_v1'`): Persists custom student details (PRN, Name, CGPA) edited via the live in-browser modal.*
> 3. *In Lab Experiment 9, we have an interactive LocalStorage manager allowing key-value insertion, table inspection, and single-key deletion."*

### Q8: What is the difference between `localStorage`, `sessionStorage`, and `cookies`?
**Answer:**
> | Feature | `localStorage` | `sessionStorage` | Cookies |
> | :--- | :--- | :--- | :--- |
> | **Capacity** | ~5MB to 10MB | ~5MB | ~4KB |
> | **Lifetime** | Persistent until explicitly deleted | Expires when tab/window closes | Configurable via `Expires` / `Max-Age` |
> | **Server Transmission** | Never sent to server (Client-only) | Never sent to server (Client-only) | Automatically sent in HTTP headers |

---

## 📌 Section 6: DOM Manipulation & Event Handling

### Q9: What is Event Delegation and did you use it?
**Answer:**
> *"Event Delegation is a design pattern where instead of attaching event listeners to dozens of individual child elements, a single listener is attached to their common parent. It utilizes **event bubbling** (where events propagate upwards through the DOM tree). In `js/projects-gallery.js`, we use event delegation for modal backdrop clicks and filter button toggles to minimize memory footprint."*

### Q10: How does the 3D card tilt effect work on mouse movement?
**Answer:**
> *"When the visitor hovers over a project or certificate card:*
> 1. *`card.getBoundingClientRect()` gives the card's exact position and dimensions.*
> 2. *We compute the mouse offset relative to the card center `(x - centerX, y - centerY)`.*
> 3. *We calculate rotation angles and apply a CSS 3D transform: `perspective(1000px) rotateX(...) rotateY(...)`.*
> 4. *On `mouseleave`, the transform resets smoothly to `rotateX(0deg) rotateY(0deg)`."*

---

## 📌 Section 7: Form Validation & Regular Expressions

### Q11: How is the contact form validated?
**Answer:**
> *"We perform client-side input validation before any submission:*
> 1. *Email validation uses an RFC 5322 compliant regex: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`.*
> 2. *String length boundary checks ensure the name and message are not empty or too short.*
> 3. *Instead of browser `alert()` dialogs, we dispatch custom animated glassmorphism toast notifications with auto-dismiss timers."*

---

## 📌 Section 8: CSS3 & Modern Design Architecture

### Q12: What is Glassmorphism and how is it styled?
**Answer:**
> *"Glassmorphism creates a frosted-glass translucent effect using three CSS properties:*
> 1. *`background: rgba(15, 23, 42, 0.72)` (semi-transparent dark background)*
> 2. *`backdrop-filter: blur(16px)` (blurs the content beneath the card)*
> 3. *`border: 1px solid rgba(255, 255, 255, 0.08)` (subtle highlight border)*
> 4. *`box-shadow` (diffused neon shadow for elevation)"*

### Q13: What are CSS Custom Properties (Variables) and why are they advantageous?
**Answer:**
> *"CSS variables (e.g. `--bg-primary`, `--accent-cyan`) defined on `:root` allow centralized theming. Switching from Dark Aurora to Cyber Neon or Light mode requires only modifying root token values on `[data-theme='light']`, allowing instant site-wide restyling with zero redundant CSS classes."*

---

## 📌 Rapid Fire Viva Voce Checklist
- [x] **Single-Page Architecture:** Semantic HTML5 (`header`, `main`, `section`, `aside`, `footer`)
- [x] **No External Bloat:** Pure Vanilla JavaScript ES6+
- [x] **Web Audio API:** Synthesized sine wave chimes for micro-interactions
- [x] **Canvas 2D Engine:** High-FPS particle graph with physics
- [x] **Network Telemetry:** Live IP resolution with fallback chaining
- [x] **Print Media Query:** `@media print` CSS for ATS resume generation

Good luck with your presentation! 🌟
