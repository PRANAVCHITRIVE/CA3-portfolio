/**
 * ===================================================================
 * CORE APPLICATION CONTROLLER
 * JavaScript Lab CA3 Mini Project - Symbiosis Institute of Technology
 * ===================================================================
 */

class PortfolioApp {
  constructor() {
    this.audioEnabled = false;
    this.audioCtx = null;
    this.currentTheme = localStorage.getItem("portfolio_theme") || "dark";
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupScrollProgress();
    this.setupNavbarScrollSpy();
    this.setupHeroTypingEffect();
    this.setupInteractiveCounters();
    this.setupContactFormValidation();
    this.setupToastSystem();
    this.setupAudioSynthesizer();
    this.setupJsLabPlayground();
    this.setupVivaDrawer();
    this.setupResumeModal();
  }

  /* ----------------------------------------------------
   * 1. THEME SWITCHER (Dark Aurora / Cyber / Light)
   * ---------------------------------------------------- */
  setupTheme() {
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (!themeBtn) return;

    this.updateThemeButtonIcon(themeBtn);

    themeBtn.addEventListener("click", () => {
      this.playChime(640);
      const themes = ["dark", "cyber", "light"];
      const nextIdx = (themes.indexOf(this.currentTheme) + 1) % themes.length;
      this.currentTheme = themes[nextIdx];
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      localStorage.setItem("portfolio_theme", this.currentTheme);
      this.updateThemeButtonIcon(themeBtn);
      if (window.showToast) {
        window.showToast(`Theme switched to: ${this.currentTheme.toUpperCase()}`, "info");
      }
    });
  }

  updateThemeButtonIcon(btn) {
    if (this.currentTheme === "dark") {
      btn.innerHTML = `<span>🌙</span> <span class="btn-text">Aurora</span>`;
    } else if (this.currentTheme === "cyber") {
      btn.innerHTML = `<span>⚡</span> <span class="btn-text">Cyber</span>`;
    } else {
      btn.innerHTML = `<span>☀️</span> <span class="btn-text">Light</span>`;
    }
  }

  /* ----------------------------------------------------
   * 2. SCROLL PROGRESS BAR
   * ---------------------------------------------------- */
  setupScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }

  /* ----------------------------------------------------
   * 3. NAVBAR SCROLL SPY & MOBILE MENU
   * ---------------------------------------------------- */
  setupNavbarScrollSpy() {
    const navbar = document.getElementById("main-navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    // Glass navbar shadow on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    }, { passive: true });

    // IntersectionObserver for active section highlighting
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -70% 0px"
    });

    sections.forEach(sec => observer.observe(sec));

    // Smooth scroll navigation links
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            this.playChime(520);
            // Close mobile menu if open
            document.getElementById("nav-links-menu")?.classList.remove("open");
            document.getElementById("mobile-menu-btn")?.classList.remove("active");
          }
        }
      });
    });

    // Mobile Hamburger
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("nav-links-menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtn.classList.toggle("active");
      });
    }
  }

  /* ----------------------------------------------------
   * 4. HERO HEADLINE TYPING EFFECT
   * ---------------------------------------------------- */
  setupHeroTypingEffect() {
    const target = document.getElementById("hero-typed-text");
    if (!target) return;

    const phrases = [
      "Full-Stack Software Engineer",
      "AI & Deep Learning Enthusiast",
      "Competitive Programmer (LeetCode Knight)",
      "Open Source Contributor & GDSC Lead"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 70;
    const eraseSpeed = 35;
    const holdTime = 2000;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        target.textContent = currentPhrase.substring(0, charIdx);
      } else {
        charIdx++;
        target.textContent = currentPhrase.substring(0, charIdx);
      }

      if (!isDeleting && charIdx === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, holdTime);
        return;
      }

      if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }

      setTimeout(typeLoop, isDeleting ? eraseSpeed : typeSpeed);
    };

    setTimeout(typeLoop, 800);
  }

  /* ----------------------------------------------------
   * 5. INTERACTIVE NUMBER COUNTERS
   * ---------------------------------------------------- */
  setupInteractiveCounters() {
    const counters = document.querySelectorAll(".stat-number");
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const isFloat = counter.getAttribute("data-float") === "true";
            const duration = 1600;
            const startTime = performance.now();

            const update = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // EaseOutQuad
              const ease = 1 - (1 - progress) * (1 - progress);
              const current = target * ease;

              counter.textContent = isFloat ? current.toFixed(2) : Math.floor(current);

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                counter.textContent = isFloat ? target.toFixed(2) : target;
              }
            };
            requestAnimationFrame(update);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSec = document.getElementById("stats-strip");
    if (statsSec) observer.observe(statsSec);
  }

  /* ----------------------------------------------------
   * 6. WEB AUDIO API SYNTHESIZER FEEDBACK
   * ---------------------------------------------------- */
  setupAudioSynthesizer() {
    const audioBtn = document.getElementById("audio-toggle-btn");
    if (!audioBtn) return;

    audioBtn.addEventListener("click", () => {
      this.audioEnabled = !this.audioEnabled;
      if (this.audioEnabled && !this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      audioBtn.innerHTML = this.audioEnabled ? `<span>🔊</span> Audio On` : `<span>🔇</span> Audio Muted`;
      audioBtn.classList.toggle("active", this.audioEnabled);
      if (this.audioEnabled) {
        this.playChime(780);
        if (window.showToast) window.showToast("Interactive sound effects enabled!", "info");
      }
    });

    // Attach click chime to primary buttons
    document.querySelectorAll(".btn-primary, .btn-secondary, .filter-btn").forEach(btn => {
      btn.addEventListener("click", () => this.playChime(580));
    });
  }

  playChime(freq = 520) {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio context silently ignored if autoplay policy restricts
    }
  }

  /* ----------------------------------------------------
   * 7. CONTACT FORM VALIDATION & DISPATCH
   * ---------------------------------------------------- */
  setupContactFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const emailInput = document.getElementById("contact-email");
    const nameInput = document.getElementById("contact-name");
    const messageInput = document.getElementById("contact-message");
    const charCounter = document.getElementById("message-char-count");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Character counter
    if (messageInput && charCounter) {
      messageInput.addEventListener("input", () => {
        charCounter.textContent = `${messageInput.value.length} / 500`;
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name) {
        if (window.showToast) window.showToast("Please enter your name.", "warning");
        nameInput.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        if (window.showToast) window.showToast("Please enter a valid email address.", "warning");
        emailInput.focus();
        return;
      }

      if (message.length < 10) {
        if (window.showToast) window.showToast("Message must be at least 10 characters.", "warning");
        messageInput.focus();
        return;
      }

      // Simulated Async Submit
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>⏳</span> Sending Dispatch...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>✓</span> Message Sent!`;
        this.playChime(880);
        if (window.showToast) {
          window.showToast(`Thank you ${name}! Your inquiry has been dispatched to Pranav Chitrive.`, "success");
        }
        form.reset();
        if (charCounter) charCounter.textContent = "0 / 500";
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });

    // Copy Email to Clipboard Button
    const copyEmailBtn = document.getElementById("btn-copy-email");
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener("click", () => {
        const email = window.PORTFOLIO_DATA?.profile?.email || "pranav.chitrive.btech2024@sitnagpur.siu.edu.in";
        navigator.clipboard.writeText(email).then(() => {
          this.playChime(600);
          copyEmailBtn.textContent = "✓ Copied Email!";
          if (window.showToast) window.showToast("Email address copied to clipboard!", "success");
          setTimeout(() => {
            copyEmailBtn.textContent = "📋 Copy Email";
          }, 2000);
        });
      });
    }
  }

  /* ----------------------------------------------------
   * 8. TOAST NOTIFICATION ENGINE
   * ---------------------------------------------------- */
  setupToastSystem() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    window.showToast = (msg, type = "info") => {
      const toast = document.createElement("div");
      toast.className = `toast-card toast-${type}`;
      const icons = { success: "✅", error: "❌", warning: "⚠️", info: "💡" };

      toast.innerHTML = `
        <span class="toast-icon">${icons[type] || "💬"}</span>
        <span class="toast-msg">${msg}</span>
        <button class="toast-close" title="Dismiss">&times;</button>
      `;

      container.appendChild(toast);

      // Trigger entrance
      requestAnimationFrame(() => toast.classList.add("visible"));

      const dismiss = () => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 300);
      };

      toast.querySelector(".toast-close").addEventListener("click", dismiss);
      setTimeout(dismiss, 4200);
    };
  }

  /* ----------------------------------------------------
   * 9. JS LAB INTERACTIVE EXPERIMENTS PLAYGROUND
   * ---------------------------------------------------- */
  setupJsLabPlayground() {
    // Tab switching in the JS Lab section
    const tabs = document.querySelectorAll(".lab-tab-btn");
    const contents = document.querySelectorAll(".lab-tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        const targetId = tab.getAttribute("data-tab");
        document.getElementById(targetId)?.classList.add("active");
      });
    });

    // Experiment 4 & 6: Palindrome & Regex Evaluator
    const palInput = document.getElementById("lab-palindrome-input");
    const palBtn = document.getElementById("lab-palindrome-btn");
    const palOutput = document.getElementById("lab-palindrome-result");

    if (palBtn && palInput && palOutput) {
      palBtn.addEventListener("click", () => {
        const raw = palInput.value.trim();
        if (!raw) {
          palOutput.innerHTML = `<span class="res-err">⚠️ Please enter a string to evaluate!</span>`;
          return;
        }
        // Normalize: remove non-alphanumeric and lowercase
        const clean = raw.toLowerCase().replace(/[^a-z0-9]/g, "");
        const reversed = clean.split("").reverse().join("");
        const isPal = clean.length > 0 && clean === reversed;

        palOutput.innerHTML = `
          <div class="eval-box ${isPal ? 'success' : 'fail'}">
            <div class="eval-badge">${isPal ? '✅ PALINDROME DETECTED' : '❌ NOT A PALINDROME'}</div>
            <div class="eval-row"><span>Original:</span> <code>"${raw}"</code></div>
            <div class="eval-row"><span>Sanitized Regex (/[^a-z0-9]/g):</span> <code>"${clean}"</code></div>
            <div class="eval-row"><span>Reversed String:</span> <code>"${reversed}"</code></div>
            <div class="eval-row"><span>Character Length:</span> <strong>${raw.length}</strong></div>
          </div>
        `;
      });
    }

    // Experiment 2 & 5: Cart & Invoice Calculator with GST
    const cartBtn = document.getElementById("lab-calc-cart-btn");
    const cartOutput = document.getElementById("lab-cart-result");

    if (cartBtn && cartOutput) {
      cartBtn.addEventListener("click", () => {
        const p1 = parseFloat(document.getElementById("item1-price")?.value || 0);
        const q1 = parseInt(document.getElementById("item1-qty")?.value || 0, 10);
        const p2 = parseFloat(document.getElementById("item2-price")?.value || 0);
        const q2 = parseInt(document.getElementById("item2-qty")?.value || 0, 10);
        const discountPct = parseFloat(document.getElementById("cart-discount")?.value || 0);
        const gstRate = 0.18; // 18% GST

        const subtotal = (p1 * q1) + (p2 * q2);
        const discountAmount = subtotal * (discountPct / 100);
        const taxableAmount = subtotal - discountAmount;
        const gstAmount = taxableAmount * gstRate;
        const grandTotal = taxableAmount + gstAmount;

        cartOutput.innerHTML = `
          <div class="invoice-box">
            <div class="inv-header">🧾 Tax Invoice / Lab Exp 2 & 5</div>
            <div class="inv-row"><span>Subtotal (Items 1 + 2):</span> <strong>₹${subtotal.toFixed(2)}</strong></div>
            <div class="inv-row"><span>Discount Applied (${discountPct}%):</span> <strong class="discount">- ₹${discountAmount.toFixed(2)}</strong></div>
            <div class="inv-row"><span>Taxable Value:</span> <strong>₹${taxableAmount.toFixed(2)}</strong></div>
            <div class="inv-row"><span>GST @ 18% (CGST 9% + SGGS 9%):</span> <strong>+ ₹${gstAmount.toFixed(2)}</strong></div>
            <div class="inv-row total"><span>Grand Invoice Total:</span> <strong class="highlight">₹${grandTotal.toFixed(2)}</strong></div>
          </div>
        `;
      });
    }

    // Experiment 9: Web Storage / LocalStorage Explorer
    const storageKey = document.getElementById("lab-storage-key");
    const storageVal = document.getElementById("lab-storage-val");
    const storageSaveBtn = document.getElementById("lab-storage-save");
    const storageClearBtn = document.getElementById("lab-storage-clear");
    const storageViewer = document.getElementById("lab-storage-display");

    const refreshStorageViewer = () => {
      if (!storageViewer) return;
      if (localStorage.length === 0) {
        storageViewer.innerHTML = `<span class="empty-note">LocalStorage is currently empty.</span>`;
        return;
      }
      let html = `<table class="storage-table"><thead><tr><th>Key</th><th>Stored Value</th><th>Action</th></tr></thead><tbody>`;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        const v = localStorage.getItem(k);
        html += `
          <tr>
            <td><code>${k}</code></td>
            <td><span class="storage-val-text">${v}</span></td>
            <td><button class="btn-del-key" data-k="${k}">Delete</button></td>
          </tr>
        `;
      }
      html += `</tbody></table>`;
      storageViewer.innerHTML = html;

      storageViewer.querySelectorAll(".btn-del-key").forEach(btn => {
        btn.addEventListener("click", () => {
          localStorage.removeItem(btn.getAttribute("data-k"));
          refreshStorageViewer();
        });
      });
    };

    if (storageSaveBtn) {
      storageSaveBtn.addEventListener("click", () => {
        const k = storageKey.value.trim();
        const v = storageVal.value.trim();
        if (!k) return;
        localStorage.setItem(k, v);
        storageKey.value = "";
        storageVal.value = "";
        refreshStorageViewer();
        if (window.showToast) window.showToast(`Saved key "${k}" to LocalStorage!`, "success");
      });
    }

    if (storageClearBtn) {
      storageClearBtn.addEventListener("click", () => {
        localStorage.clear();
        refreshStorageViewer();
        if (window.showToast) window.showToast("All LocalStorage keys cleared!", "info");
      });
    }

    refreshStorageViewer();

    // Experiment 10: Dynamic JSON Loader Simulation
    const loadJsonBtn = document.getElementById("lab-json-load-btn");
    const jsonOutput = document.getElementById("lab-json-table-output");

    if (loadJsonBtn && jsonOutput) {
      loadJsonBtn.addEventListener("click", async () => {
        jsonOutput.innerHTML = `<div class="loading-state">⏳ Resolving async Promise & loading JSON records...</div>`;
        loadJsonBtn.disabled = true;

        // Simulated API fetch promise
        const mockFetch = () => new Promise(resolve => {
          setTimeout(() => {
            resolve([
              { id: 101, name: "Pranav Chitrive", role: "Full-Stack Dev", status: "Active", score: 98 },
              { id: 102, name: "Aditi Sharma", role: "AI Research Lead", status: "Active", score: 94 },
              { id: 103, name: "Rohan Kulkarni", role: "Cloud Architect", status: "Pending", score: 91 },
              { id: 104, name: "Sneha Patel", role: "UI/UX Specialist", status: "Active", score: 96 }
            ]);
          }, 900);
        });

        const data = await mockFetch();
        loadJsonBtn.disabled = false;

        jsonOutput.innerHTML = `
          <table class="dynamic-json-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate Name</th>
                <th>Designated Role</th>
                <th>Lab Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  <td><code>#${row.id}</code></td>
                  <td><strong>${row.name}</strong></td>
                  <td>${row.role}</td>
                  <td><span class="badge-score">${row.score}%</span></td>
                  <td><span class="status-pill ${row.status.toLowerCase()}">${row.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `;
      });
    }
  }

  /* ----------------------------------------------------
   * 10. VIVA VOCE EVALUATION CHEAT SHEET DRAWER
   * ---------------------------------------------------- */
  setupVivaDrawer() {
    const trigger = document.getElementById("btn-open-viva-drawer");
    const drawer = document.getElementById("viva-drawer");
    const closeBtn = document.getElementById("btn-close-viva-drawer");

    if (!drawer) return;

    if (trigger) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        drawer.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    drawer.addEventListener("click", (e) => {
      if (e.target === drawer || e.target.classList.contains("drawer-backdrop")) {
        drawer.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  /* ----------------------------------------------------
   * 11. DOWNLOADABLE / PRINTABLE RESUME PREVIEW
   * ---------------------------------------------------- */
  setupResumeModal() {
    const openBtn = document.querySelectorAll("[data-action='open-resume']");
    const modal = document.getElementById("resume-modal");
    const closeBtn = document.getElementById("btn-close-resume");
    const printBtn = document.getElementById("btn-print-resume");

    openBtn.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new PortfolioApp();
});
