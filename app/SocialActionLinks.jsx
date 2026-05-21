import React, { useEffect, useRef } from "react";
import "./SocialActionLinks.css";

// ─── SVG Icon Components ───────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const AgentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
  </svg>
);

const DashboardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <path d="M7 7v0M17 7v0M17 17v0M7 17v0"/>
  </svg>
);

const SavedIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const CallIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.18-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

// ─── Action Items Config ───────────────────────────────────────────────────────
const ACTION_ITEMS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: WhatsAppIcon,
    href: "https://wa.me/1234567890",
  },
  {
    id: "agent",
    label: "Agent Profile",
    icon: AgentIcon,
    href: "#agent-profile",
  },
  {
    id: "dashboard",
    label: "Verify",
    icon: DashboardIcon,
    href: "#verification",
  },
  {
    id: "saved",
    label: "Saved",
    icon: SavedIcon,
    href: "#saved-properties",
  },
  {
    id: "share",
    label: "Share",
    icon: ShareIcon,
    href: "#share",
  },
  {
    id: "call",
    label: "Call Agent",
    icon: CallIcon,
    href: "tel:+1234567890",
  },
];

// ─── Particle Animation Helper ──────────────────────────────────────────────────

class Particle {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, isStart = false) {
    this.x = Math.random() * w;
    this.y = isStart ? Math.random() * h : h + 10;
    this.radius = Math.random() * 2 + 1; // 1px to 3px
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = -0.3 - Math.random() * 0.5; // rising velocity (antigravity)
    
    // Brand colors
    const colors = [
      { r: 37, g: 99, b: 235 },   // Blue
      { r: 251, g: 191, b: 36 },  // Yellow
      { r: 139, g: 92, b: 246 },  // Purple
      { r: 248, g: 250, b: 252 }, // White
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.opacity = Math.random() * 0.35 + 0.1; // 0.1 to 0.45 opacity
    this.waveSpeed = Math.random() * 0.02 + 0.01;
    this.waveOffset = Math.random() * Math.PI * 2;
  }

  update(w, h, mouse) {
    // Basic rising motion
    this.y += this.vy;
    
    // Gentle sway
    this.waveOffset += this.waveSpeed;
    this.x += Math.sin(this.waveOffset) * 0.15 + this.vx;

    // Interactive repulsion if cursor/touch is recognized
    if (mouse && mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const limit = 65; // radius of effect
      
      if (dist < limit) {
        const force = (limit - dist) / limit;
        // Apply acceleration away from cursor
        this.vx += (dx / dist) * force * 0.6;
        this.vy += (dy / dist) * force * 0.6;
      }
    }

    // Apply fluid resistance
    this.vx *= 0.94;
    this.vy *= 0.94;

    // Keep vertical velocity moving upwards
    if (this.vy > -0.2) {
      this.vy -= 0.05;
    }

    // Wrap or reset when leaving viewport bounds
    if (this.y < -5 || this.x < -10 || this.x > w + 10) {
      this.reset(w, h);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
    ctx.fill();
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SocialActionLinks() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = container.clientWidth;
    let h = container.clientHeight;
    
    // Scale for high DPI devices
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const particles = [];
    const maxParticles = 25; // Good density for the small floating dock
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle(w, h));
    }

    let animationFrameId;
    
    const animate = () => {
      // Monitor container size changes (e.g. during hover width transitions)
      const currentW = container.clientWidth;
      const currentH = container.clientHeight;
      
      if (currentW !== w || currentH !== h) {
        w = currentW;
        h = currentH;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // Render/update particles
      particles.forEach((p) => {
        p.update(w, h, mouseRef.current);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse events
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Touch events
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: null, y: null };
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <nav 
      ref={containerRef} 
      className="social-action-dock" 
      aria-label="Quick contact and links navigation"
    >
      {/* Particle Canvas Background */}
      <canvas ref={canvasRef} className="social-action-canvas" />

      <ul className="social-action-list" role="menubar">
        {ACTION_ITEMS.map((item) => {
          const IconComponent = item.icon;

          return (
            <li key={item.id} role="none">
              <a
                href={item.href}
                className={`social-action-item item-${item.id}`}
                role="menuitem"
                aria-label={item.label}
              >
                {/* Icon wrapper — stays centered collapsed, slides left on hover */}
                <span className="social-icon-wrapper">
                  <IconComponent />
                </span>

                {/* Label — hidden-overflow sliding in */}
                <span className="social-action-label">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
