/**
 * ===================================================================
 * LIVE IN-BROWSER PROFILE CUSTOMIZER
 * JavaScript Lab CA3 Feature - Real-time DOM and localStorage Sync
 * ===================================================================
 * Allows students to instantly modify their personal credentials,
 * university, PRN, CGPA, and links directly on the webpage and
 * retain changes across sessions via the Web Storage API.
 */

class ProfileCustomizer {
  constructor() {
    this.storageKey = "portfolio_user_customizations_v1";
    this.init();
  }

  init() {
    this.loadSavedCustomizations();
    this.renderCustomizerModal();
    this.attachEvents();
    this.syncProfileToDOM();
  }

  loadSavedCustomizations() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved && window.PORTFOLIO_DATA) {
        const parsed = JSON.parse(saved);
        // Merge deep into PORTFOLIO_DATA.profile
        Object.assign(window.PORTFOLIO_DATA.profile, parsed);
        if (parsed.cgpa && window.PORTFOLIO_DATA.academicMarks) {
          window.PORTFOLIO_DATA.academicMarks.cgpa = parseFloat(parsed.cgpa);
        }
      }
    } catch (e) {
      console.warn("Could not load stored profile customizations:", e);
    }
  }

  saveCustomizations(customData) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(customData));
      Object.assign(window.PORTFOLIO_DATA.profile, customData);
      this.syncProfileToDOM();
      if (window.projectsGallery) {
        window.projectsGallery.init();
      }
      if (window.showToast) {
        window.showToast("Profile credentials updated & saved to LocalStorage!", "success");
      }
      this.closeModal();
    } catch (e) {
      console.error("Save error:", e);
      if (window.showToast) {
        window.showToast("Failed to save changes.", "error");
      }
    }
  }

  resetCustomizations() {
    localStorage.removeItem(this.storageKey);
    location.reload();
  }

  syncProfileToDOM() {
    if (!window.PORTFOLIO_DATA) return;
    const p = window.PORTFOLIO_DATA.profile;

    // Replace text in designated span/div targets
    document.querySelectorAll("[data-bind='profile-name']").forEach(el => el.textContent = p.name);
    document.querySelectorAll("[data-bind='profile-role']").forEach(el => el.textContent = p.role);
    document.querySelectorAll("[data-bind='profile-tagline']").forEach(el => el.textContent = p.tagline);
    document.querySelectorAll("[data-bind='profile-prn']").forEach(el => el.textContent = p.prn);
    document.querySelectorAll("[data-bind='profile-institution']").forEach(el => el.textContent = p.institution);
    document.querySelectorAll("[data-bind='profile-cgpa']").forEach(el => el.textContent = p.cgpa);
    document.querySelectorAll("[data-bind='profile-email']").forEach(el => {
      el.textContent = p.email;
      if (el.tagName === "A") el.href = `mailto:${p.email}`;
    });
    document.querySelectorAll("[data-bind='profile-phone']").forEach(el => el.textContent = p.phone);
    document.querySelectorAll("[data-bind='profile-status']").forEach(el => el.textContent = p.status);
    document.querySelectorAll("[data-bind='profile-bio']").forEach(el => el.textContent = p.bio);

    // Update Social links
    if (p.socials) {
      document.querySelectorAll("[data-bind='link-github']").forEach(a => a.href = p.socials.github);
      document.querySelectorAll("[data-bind='link-linkedin']").forEach(a => a.href = p.socials.linkedin);
      document.querySelectorAll("[data-bind='link-leetcode']").forEach(a => a.href = p.socials.leetcode);
      document.querySelectorAll("[data-bind='link-twitter']").forEach(a => a.href = p.socials.twitter);
    }
  }

  renderCustomizerModal() {
    const modal = document.getElementById("profile-customizer-modal");
    if (!modal) return;

    const p = window.PORTFOLIO_DATA.profile;

    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-dialog glass-card customizer-dialog">
        <div class="modal-header">
          <div class="modal-header-info">
            <span class="modal-icon">⚙️</span>
            <h3>Quick Profile Customizer</h3>
          </div>
          <button class="modal-close-btn" id="btn-close-customizer" title="Close Editor">&times;</button>
        </div>
        <div class="modal-body">
          <p class="customizer-intro">
            Change your credentials below to personalize this portfolio for your specific college submission, PRN, and links. Saved instantly via <code>localStorage</code>!
          </p>
          <form id="customizer-form" class="customizer-form-grid">
            <div class="input-field">
              <label>Full Student Name</label>
              <input type="text" id="cust-name" value="${p.name}" required />
            </div>
            <div class="input-field">
              <label>PRN / Student Roll ID</label>
              <input type="text" id="cust-prn" value="${p.prn}" required />
            </div>
            <div class="input-field full">
              <label>College / University Name</label>
              <input type="text" id="cust-inst" value="${p.institution}" required />
            </div>
            <div class="input-field">
              <label>Primary Role / Headline</label>
              <input type="text" id="cust-role" value="${p.role}" required />
            </div>
            <div class="input-field">
              <label>Overall CGPA (out of 10.0)</label>
              <input type="text" id="cust-cgpa" value="${p.cgpa}" required />
            </div>
            <div class="input-field">
              <label>Official Email Address</label>
              <input type="email" id="cust-email" value="${p.email}" required />
            </div>
            <div class="input-field">
              <label>Contact Phone</label>
              <input type="text" id="cust-phone" value="${p.phone}" required />
            </div>
            <div class="input-field full">
              <label>GitHub Profile URL</label>
              <input type="url" id="cust-github" value="${p.socials?.github || ''}" required />
            </div>
            <div class="input-field full">
              <label>LinkedIn Profile URL</label>
              <input type="url" id="cust-linkedin" value="${p.socials?.linkedin || ''}" required />
            </div>
            <div class="input-field full">
              <label>About Me Bio</label>
              <textarea id="cust-bio" rows="3">${p.bio}</textarea>
            </div>
            <div class="customizer-footer-actions">
              <button type="button" class="btn-secondary" id="btn-reset-customizer">
                ↺ Reset to Defaults
              </button>
              <button type="submit" class="btn-primary">
                💾 Save & Apply Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Open Trigger
    document.querySelectorAll("[data-action='open-customizer']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Close Trigger
    const closeBtn = document.getElementById("btn-close-customizer");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeModal());

    // Form Submission
    const form = document.getElementById("customizer-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const updated = {
          name: document.getElementById("cust-name").value.trim(),
          prn: document.getElementById("cust-prn").value.trim(),
          institution: document.getElementById("cust-inst").value.trim(),
          role: document.getElementById("cust-role").value.trim(),
          cgpa: document.getElementById("cust-cgpa").value.trim(),
          email: document.getElementById("cust-email").value.trim(),
          phone: document.getElementById("cust-phone").value.trim(),
          bio: document.getElementById("cust-bio").value.trim(),
          socials: {
            ...window.PORTFOLIO_DATA.profile.socials,
            github: document.getElementById("cust-github").value.trim(),
            linkedin: document.getElementById("cust-linkedin").value.trim()
          }
        };
        this.saveCustomizations(updated);
      });
    }

    // Reset Trigger
    const resetBtn = document.getElementById("btn-reset-customizer");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset all personal modifications back to default?")) {
          this.resetCustomizations();
        }
      });
    }
  }

  openModal() {
    const modal = document.getElementById("profile-customizer-modal");
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeModal() {
    const modal = document.getElementById("profile-customizer-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.profileCustomizer = new ProfileCustomizer();
});
