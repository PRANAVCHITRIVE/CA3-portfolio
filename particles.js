/**
 * ===================================================================
 * CYBER AURORA CONSTELLATION PARTICLE ENGINE
 * JavaScript Lab CA3 Feature - High-Performance Canvas Animation
 * ===================================================================
 * Renders an interactive 2D physics particle graph with distance
 * vectors, dynamic connection lines, and mouse cursor repulsion.
 */

class AuroraParticleNetwork {
  constructor(canvasId = "particle-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animationFrameId = null;

    // Config settings
    this.config = {
      baseParticleCount: 75,
      maxDistance: 130,
      mouseRadius: 160,
      mouseForce: 0.08,
      speedMultiplier: 0.6,
      colors: [
        { r: 139, g: 92, b: 246 },  // Violet
        { r: 6, g: 182, b: 212 },   // Cyan
        { r: 16, g: 185, b: 129 }   // Emerald
      ]
    };

    this.mouse = {
      x: null,
      y: null,
      isHovering: false
    };

    this.isPaused = false;
    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.attachEvents();
    this.animate();
  }

  resizeCanvas() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    // Scale count by screen width to stay performant on mobile
    const count = window.innerWidth < 768 ? 35 : this.config.baseParticleCount;

    for (let i = 0; i < count; i++) {
      const colorObj = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.speedMultiplier,
        vy: (Math.random() - 0.5) * this.config.speedMultiplier,
        radius: Math.random() * 2 + 1.2,
        color: colorObj,
        alpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }
  }

  attachEvents() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.createParticles();
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isHovering = true;
    });

    window.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
      this.mouse.isHovering = false;
    });

    // Touch support for tablets/mobile
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.isHovering = true;
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      this.mouse.x = null;
      this.mouse.y = null;
      this.mouse.isHovering = false;
    });

    // Pause when tab hidden to save CPU/GPU cycles
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.isPaused = true;
      } else {
        this.isPaused = false;
        this.animate();
      }
    });
  }

  animate() {
    if (this.isPaused) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const pCount = this.particles.length;

    for (let i = 0; i < pCount; i++) {
      const p = this.particles[i];

      // Pulse alpha smoothly
      p.pulseAngle += p.pulseSpeed;
      const currentAlpha = p.alpha + Math.sin(p.pulseAngle) * 0.2;

      // Mouse repulsion physics
      if (this.mouse.isHovering && this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.mouseRadius && dist > 0) {
          const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;
          const normalX = dx / dist;
          const normalY = dy / dist;
          p.x += normalX * force * 3;
          p.y += normalY * force * 3;
        }
      }

      // Position update
      p.x += p.vx;
      p.y += p.vy;

      // Boundary bouncing
      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > this.width) { p.x = this.width; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > this.height) { p.y = this.height; p.vy *= -1; }

      // Draw particle node
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.1, currentAlpha)})`;
      this.ctx.fill();

      // Connect vectors with nearby particles
      for (let j = i + 1; j < pCount; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.maxDistance) {
          const lineAlpha = (1 - dist / this.config.maxDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (this.mouse.isHovering && this.mouse.x !== null) {
        const mdx = p.x - this.mouse.x;
        const mdy = p.y - this.mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < this.config.mouseRadius) {
          const mouseLineAlpha = (1 - mdist / this.config.mouseRadius) * 0.35;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(6, 182, 212, ${mouseLineAlpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Check user preference for reduced motion
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.auroraParticles = new AuroraParticleNetwork("particle-canvas");
  }
});
