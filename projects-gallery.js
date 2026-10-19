/**
 * ===================================================================
 * PROJECTS, CERTIFICATES & GALLERY CONTROLLER
 * JavaScript Lab CA3 Feature - Filtering, Modals & 3D Tilt
 * ===================================================================
 */

class ProjectsGalleryController {
  constructor() {
    this.currentProjectFilter = "All";
    this.currentGalleryFilter = "All";
    this.activeModal = null;
    this.init();
  }

  init() {
    this.renderProjects();
    this.renderSkills();
    this.renderEducationTimeline();
    this.renderAcademicMarks();
    this.renderCertificates();
    this.renderAchievements();
    this.renderContributions();
    this.renderGallery();
    this.renderCareerInterests();
    this.setupFilterButtons();
    this.setupTiltEffect();
    this.setupModals();
  }

  /* ----------------------------------------------------
   * 1. RENDER SKILLS SECTION
   * ---------------------------------------------------- */
  renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container || !window.PORTFOLIO_DATA) return;

    const data = window.PORTFOLIO_DATA.skills;
    container.innerHTML = data.map((cat, idx) => `
      <div class="glass-card skill-category-card" data-aos="fade-up" style="animation-delay: ${idx * 0.1}s">
        <div class="skill-cat-header">
          <span class="skill-cat-icon">${cat.icon}</span>
          <h3 class="skill-cat-title">${cat.category}</h3>
        </div>
        <div class="skill-items-list">
          ${cat.items.map(item => `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">
                  <span class="item-icon">${item.icon}</span>
                  ${item.name}
                </span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-progress-track">
                <div class="skill-progress-bar" style="--skill-target: ${item.level}%" data-level="${item.level}"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------
   * 2. RENDER EDUCATION TIMELINE
   * ---------------------------------------------------- */
  renderEducationTimeline() {
    const container = document.getElementById("education-timeline");
    if (!container || !window.PORTFOLIO_DATA) return;

    const education = window.PORTFOLIO_DATA.education;
    container.innerHTML = education.map((edu, idx) => `
      <div class="timeline-item" data-aos="fade-up" style="animation-delay: ${idx * 0.15}s">
        <div class="timeline-dot-wrapper">
          <div class="timeline-dot"></div>
          <div class="timeline-line"></div>
        </div>
        <div class="glass-card timeline-card">
          <div class="timeline-card-header">
            <span class="timeline-badge">${edu.badge}</span>
            <span class="timeline-period">📅 ${edu.period}</span>
          </div>
          <h3 class="timeline-degree">${edu.degree}</h3>
          <h4 class="timeline-institution">🏛️ ${edu.institution}</h4>
          <div class="timeline-score">
            <span class="score-pill">⭐ ${edu.score}</span>
            <span class="board-pill">${edu.university}</span>
          </div>
          <p class="timeline-desc">${edu.description}</p>
        </div>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------
   * 3. RENDER ACADEMIC MARKS & SEMESTERS
   * ---------------------------------------------------- */
  renderAcademicMarks() {
    const marksData = window.PORTFOLIO_DATA.academicMarks;
    const container = document.getElementById("academic-semesters-grid");
    if (!container || !marksData) return;

    // Render semester breakdown cards
    container.innerHTML = marksData.semesters.map(sem => `
      <div class="glass-card semester-card">
        <div class="sem-top">
          <span class="sem-title">${sem.sem}</span>
          <span class="sem-status ${sem.status === 'Ongoing' ? 'ongoing' : 'cleared'}">${sem.status}</span>
        </div>
        <div class="sem-sgpa-radial" data-sgpa="${sem.sgpa}">
          <svg class="radial-svg" viewBox="0 0 100 100">
            <circle class="radial-bg" cx="50" cy="50" r="40" />
            <circle class="radial-progress" cx="50" cy="50" r="40" style="stroke-dashoffset: ${251.2 - (251.2 * (sem.sgpa / 10))}" />
          </svg>
          <div class="radial-text">
            <span class="radial-num">${sem.sgpa}</span>
            <span class="radial-label">SGPA</span>
          </div>
        </div>
        <div class="sem-credits">Credits: <strong>${sem.credits}</strong></div>
      </div>
    `).join("");

    // Render Subject Highlights
    const highlightsContainer = document.getElementById("academic-highlights-list");
    if (highlightsContainer && marksData.highlights) {
      highlightsContainer.innerHTML = marksData.highlights.map(h => `
        <div class="glass-card subject-highlight-card">
          <div class="subj-info">
            <div class="subj-name">📘 ${h.subject}</div>
            <div class="subj-grade">${h.grade}</div>
          </div>
          <div class="subj-score-badge">${h.score}</div>
        </div>
      `).join("");
    }
  }

  /* ----------------------------------------------------
   * 4. RENDER PROJECTS (FILTERABLE)
   * ---------------------------------------------------- */
  renderProjects() {
    const container = document.getElementById("projects-grid");
    if (!container || !window.PORTFOLIO_DATA) return;

    const allProjects = window.PORTFOLIO_DATA.projects;
    const filtered = this.currentProjectFilter === "All"
      ? allProjects
      : allProjects.filter(p => p.category.toLowerCase().includes(this.currentProjectFilter.toLowerCase()));

    container.innerHTML = filtered.map(proj => `
      <div class="glass-card project-card tilt-target" data-project-id="${proj.id}">
        <div class="project-img-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-thumbnail" loading="lazy" />
          <div class="project-overlay-tag">${proj.tag}</div>
          <div class="project-category-pill">${proj.category}</div>
        </div>
        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-summary">${proj.summary}</p>
          <div class="project-metrics">
            <span class="metric-icon">📈</span>
            <span class="metric-text">${proj.metrics}</span>
          </div>
          <div class="project-tech-stack">
            ${proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>
        <div class="project-card-footer">
          <button class="btn-card-action primary btn-open-project" data-id="${proj.id}">
            <span>🔍 Deep Dive</span>
          </button>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action secondary" title="View Source on GitHub">
            <span>🐙 GitHub</span>
          </a>
        </div>
      </div>
    `).join("");

    // Reattach listeners to new buttons
    container.querySelectorAll(".btn-open-project").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.openProjectModal(id);
      });
    });

    this.setupTiltEffect();
  }

  openProjectModal(id) {
    const project = window.PORTFOLIO_DATA.projects.find(p => p.id === id);
    if (!project) return;

    const modal = document.getElementById("project-modal");
    const body = document.getElementById("project-modal-body");
    if (!modal || !body) return;

    body.innerHTML = `
      <div class="modal-project-content">
        <div class="modal-project-banner">
          <img src="${project.image}" alt="${project.title}" class="modal-img" />
          <div class="modal-badge-float">${project.category}</div>
        </div>
        <div class="modal-project-details">
          <h2 class="modal-project-title">${project.title}</h2>
          <div class="modal-project-metrics-bar">
            <span>⚡ ${project.metrics}</span>
          </div>
          <div class="modal-section-title">Architectural Breakdown & Problem Solved</div>
          <p class="modal-project-desc">${project.description}</p>
          
          <div class="modal-section-title">Technologies & Tools Employed</div>
          <div class="modal-tech-list">
            ${project.techStack.map(t => `<span class="tech-tag large">${t}</span>`).join("")}
          </div>

          <div class="modal-actions-row">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
              <span>🐙 View GitHub Repository</span>
            </a>
            ${project.liveUrl.startsWith("http") ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
                <span>🌐 Open Live Demo</span>
              </a>
            ` : `
              <a href="#jslab-demo" class="btn-secondary" onclick="document.getElementById('project-modal').classList.remove('active');">
                <span>🔬 View Lab Experiments</span>
              </a>
            `}
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /* ----------------------------------------------------
   * 5. RENDER CERTIFICATES & LIGHTBOX
   * ---------------------------------------------------- */
  renderCertificates() {
    const container = document.getElementById("certificates-grid");
    if (!container || !window.PORTFOLIO_DATA) return;

    const certs = window.PORTFOLIO_DATA.certificates;
    container.innerHTML = certs.map((c, idx) => `
      <div class="glass-card certificate-card tilt-target">
        <div class="cert-img-container">
          <img src="${c.image}" alt="${c.title}" class="cert-thumb" />
          <div class="cert-watermark">VERIFIED</div>
        </div>
        <div class="cert-info">
          <div class="cert-meta">
            <span class="cert-issuer">🏛️ ${c.issuer}</span>
            <span class="cert-date">📅 ${c.date}</span>
          </div>
          <h3 class="cert-title">${c.title}</h3>
          <p class="cert-desc">${c.description}</p>
          <div class="cert-id-tag">ID: <code>${c.id}</code></div>
          <div class="cert-footer-row">
            <button class="btn-cert-view" data-cert-idx="${idx}">
              <span>🔍 View Credential</span>
            </button>
            <a href="${c.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn-cert-link" title="Verify Online">
              <span>↗ Verify</span>
            </a>
          </div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-cert-view").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-cert-idx"), 10);
        this.openCertModal(certs[idx]);
      });
    });
  }

  openCertModal(cert) {
    const modal = document.getElementById("lightbox-modal");
    const body = document.getElementById("lightbox-body");
    if (!modal || !body || !cert) return;

    body.innerHTML = `
      <div class="lightbox-cert-wrapper">
        <div class="lightbox-cert-header">
          <h3>${cert.title}</h3>
          <p>Issued by ${cert.issuer} • ${cert.date}</p>
        </div>
        <div class="lightbox-image-box">
          <img src="${cert.image}" alt="${cert.title}" class="lightbox-full-img" />
        </div>
        <div class="lightbox-cert-footer">
          <div class="cred-info">Credential ID: <strong>${cert.id}</strong></div>
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <span>🛡️ Verify Official Issuer Record</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /* ----------------------------------------------------
   * 6. RENDER ACHIEVEMENTS
   * ---------------------------------------------------- */
  renderAchievements() {
    const container = document.getElementById("achievements-grid");
    if (!container || !window.PORTFOLIO_DATA) return;

    const achs = window.PORTFOLIO_DATA.achievements;
    container.innerHTML = achs.map(ach => `
      <div class="glass-card achievement-card tilt-target">
        <div class="ach-top">
          <span class="ach-icon">${ach.icon}</span>
          <span class="ach-date">${ach.date}</span>
        </div>
        <h3 class="ach-title">${ach.title}</h3>
        <h4 class="ach-org">🏢 ${ach.organization}</h4>
        <div class="ach-highlight-pill">${ach.highlight}</div>
        <p class="ach-detail">${ach.detail}</p>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------
   * 7. RENDER CONTRIBUTIONS & CLUBS
   * ---------------------------------------------------- */
  renderContributions() {
    const container = document.getElementById("contributions-grid");
    if (!container || !window.PORTFOLIO_DATA) return;

    const conts = window.PORTFOLIO_DATA.contributions;
    container.innerHTML = conts.map(c => `
      <div class="glass-card contribution-card">
        <div class="cont-header">
          <span class="cont-icon">${c.icon}</span>
          <div>
            <h3 class="cont-role">${c.role}</h3>
            <h4 class="cont-org">${c.organization}</h4>
          </div>
        </div>
        <span class="cont-period">🕒 ${c.period}</span>
        <p class="cont-desc">${c.description}</p>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------
   * 8. RENDER PHOTO GALLERY (LIGHTBOX)
   * ---------------------------------------------------- */
  renderGallery() {
    const container = document.getElementById("gallery-grid");
    if (!container || !window.PORTFOLIO_DATA) return;

    const allItems = window.PORTFOLIO_DATA.gallery;
    const filtered = this.currentGalleryFilter === "All"
      ? allItems
      : allItems.filter(g => g.category.toLowerCase() === this.currentGalleryFilter.toLowerCase());

    container.innerHTML = filtered.map(item => `
      <div class="gallery-item-card glass-card tilt-target" data-category="${item.category}">
        <div class="gallery-img-box">
          <img src="${item.image}" alt="${item.title}" class="gallery-photo" loading="lazy" />
          <div class="gallery-hover-overlay">
            <span class="gallery-zoom-icon">🔍</span>
            <span class="gallery-tag">${item.tag}</span>
          </div>
        </div>
        <div class="gallery-caption">
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-sub">${item.subtitle}</p>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".gallery-item-card").forEach((card, idx) => {
      card.addEventListener("click", () => {
        this.openGalleryLightbox(filtered[idx]);
      });
    });
  }

  openGalleryLightbox(item) {
    const modal = document.getElementById("lightbox-modal");
    const body = document.getElementById("lightbox-body");
    if (!modal || !body || !item) return;

    body.innerHTML = `
      <div class="lightbox-gallery-wrapper">
        <div class="lightbox-image-box">
          <img src="${item.image}" alt="${item.title}" class="lightbox-full-img" />
        </div>
        <div class="lightbox-caption-box">
          <span class="lightbox-pill">${item.category} • ${item.tag}</span>
          <h3 class="lightbox-title">${item.title}</h3>
          <p class="lightbox-desc">${item.subtitle}</p>
        </div>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  /* ----------------------------------------------------
   * 9. RENDER CAREER INTERESTS
   * ---------------------------------------------------- */
  renderCareerInterests() {
    const container = document.getElementById("career-interests-grid");
    if (!container || !window.PORTFOLIO_DATA) return;

    const roles = window.PORTFOLIO_DATA.careerInterests;
    container.innerHTML = roles.map(r => `
      <div class="glass-card career-role-card tilt-target">
        <div class="career-icon">${r.icon}</div>
        <h3 class="career-title">${r.role}</h3>
        <p class="career-desc">${r.description}</p>
        <div class="career-targets">
          <span class="target-label">Target Segments:</span>
          <span class="target-val">${r.targetCompanies}</span>
        </div>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------
   * 10. SETUP FILTER BUTTONS
   * ---------------------------------------------------- */
  setupFilterButtons() {
    // Project filters
    document.querySelectorAll(".proj-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".proj-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentProjectFilter = btn.getAttribute("data-filter");
        this.renderProjects();
      });
    });

    // Gallery filters
    document.querySelectorAll(".gallery-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".gallery-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentGalleryFilter = btn.getAttribute("data-filter");
        this.renderGallery();
      });
    });
  }

  /* ----------------------------------------------------
   * 11. 3D TILT EFFECT ON CARDS
   * ---------------------------------------------------- */
  setupTiltEffect() {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Skip touch screens

    document.querySelectorAll(".tilt-target").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  /* ----------------------------------------------------
   * 12. SETUP MODALS CLOSE
   * ---------------------------------------------------- */
  setupModals() {
    // Close modal on close button or backdrop click
    document.querySelectorAll(".modal-container").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("modal-backdrop") || e.target.closest(".modal-close-btn")) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-container.active").forEach(m => {
          m.classList.remove("active");
        });
        document.body.style.overflow = "";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.projectsGallery = new ProjectsGalleryController();
});
