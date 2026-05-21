/* ====================================================
   ZITOPY AutoChat — Product Page JS
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---- HAMBURGER / MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ---- CHAT DEMO ANIMATION ----
  const chatMessages = document.getElementById('chat-messages');
  let demoRunning = false;

  function runChatDemo() {
    if (demoRunning) return;
    demoRunning = true;

    const msg2 = document.getElementById('msg2');
    // Typing indicator for 2s, then replace with AI reply
    setTimeout(() => {
      msg2.classList.remove('typing');
      msg2.innerHTML = `<span>Great choice! 🎉 We have 3 amazing options starting at just $29. I can also unlock a <strong>15% discount</strong> for you right now — want me to grab that?</span><span class="msg-time">Just now</span>`;

      // Add follow-up user message
      setTimeout(() => {
        const newIn = document.createElement('div');
        newIn.className = 'msg msg-in';
        newIn.style.opacity = '0';
        newIn.style.transform = 'translateY(10px)';
        newIn.innerHTML = `<span>Yes please!! 🙌</span><span class="msg-time">Just now</span>`;
        chatMessages.appendChild(newIn);

        requestAnimationFrame(() => {
          newIn.style.transition = 'all 0.4s ease';
          newIn.style.opacity = '1';
          newIn.style.transform = 'translateY(0)';
        });

        // Then AI reply again
        setTimeout(() => {
          const newOut = document.createElement('div');
          newOut.className = 'msg msg-out';
          newOut.style.opacity = '0';
          newOut.style.transform = 'translateY(10px)';
          newOut.innerHTML = `<span>Done! ✅ Your 15% discount code is ZITOPY15. Here's the link → shop.zitopy.ai 🔗</span><span class="msg-time">Just now</span>`;
          chatMessages.appendChild(newOut);

          requestAnimationFrame(() => {
            newOut.style.transition = 'all 0.4s ease';
            newOut.style.opacity = '1';
            newOut.style.transform = 'translateY(0)';
          });
        }, 1800);
      }, 1200);
    }, 2000);
  }

  // Trigger chat demo when hero comes into view
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(runChatDemo, 1000);
      heroObserver.disconnect();
    }
  }, { threshold: 0.3 });
  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);

  // ---- QUICK REPLY BUTTONS ----
  window.triggerReply = function () {
    const btn = event.target;
    btn.style.background = 'rgba(139,92,246,0.25)';
    btn.style.borderColor = 'rgba(139,92,246,0.5)';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 600);
  };

  // ---- COUNTER ANIMATION ----
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = el.dataset.float === 'true';
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;
      el.textContent = isFloat
        ? current.toFixed(1) + suffix
        : Math.floor(current).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number[data-target]').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll(
    '.bento-card, .step-card, .testi-card, .price-card, .faq-item, .stat-block, .uc-panel'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'revealUp 0.6s ease forwards';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  // Add initial hidden state
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    @keyframes revealUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(revealStyle);

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });

  // ---- USE CASE TABS ----
  const tabs = document.querySelectorAll('.uc-tab');
  const panels = document.querySelectorAll('.uc-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.classList.add('active');
        panel.style.animation = 'revealUp 0.4s ease forwards';
      }
    });
  });

  // ---- FAQ ACCORDION ----
  window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  };

  // ---- BILLING TOGGLE ----
  window.setBilling = function(type) {
    const monthly = document.getElementById('bill-monthly');
    const annual = document.getElementById('bill-annual');
    if (type === 'monthly') {
      monthly.classList.add('active');
      annual.classList.remove('active');
    } else {
      annual.classList.add('active');
      monthly.classList.remove('active');
    }
    // Update prices
    document.querySelectorAll('.price-val').forEach(el => {
      const val = type === 'monthly' ? el.dataset.monthly : el.dataset.annual;
      if (val !== undefined) {
        // Animate price change
        el.style.transition = 'opacity 0.2s';
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = val;
          el.style.opacity = '1';
        }, 200);
      }
    });
  };

  // ---- HERO BADGE CLICK ANIMATION ----
  const heroPill = document.getElementById('hero-pill');
  if (heroPill) {
    heroPill.addEventListener('click', () => {
      heroPill.style.animation = 'none';
      heroPill.style.transform = 'scale(0.96)';
      setTimeout(() => {
        heroPill.style.transform = '';
        heroPill.style.animation = '';
      }, 150);
    });
  }

  // ---- SMOOTH ACTIVE NAV ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-nav');
        link.style.color = '#c084fc';
        link.style.background = 'rgba(139,92,246,0.08)';
      } else {
        link.style.color = '';
        link.style.background = '';
      }
    });
  }, { passive: true });

  // ---- PLATFORM PILLS HOVER GLOW ----
  document.querySelectorAll('.platform-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.boxShadow = '0 0 20px rgba(139,92,246,0.2)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.boxShadow = '';
    });
  });

  // ---- PERSONA CHIPS ANIMATION ----
  const chips = document.querySelectorAll('.persona-chip');
  chips.forEach((chip, i) => {
    chip.style.animationDelay = `${i * 0.15}s`;
    chip.style.animation = 'none';
    setTimeout(() => {
      chip.style.transition = 'all 0.3s';
    }, 100);
  });

  // ---- CTA BUTTONS RIPPLE EFFECT ----
  document.querySelectorAll('.cta-primary, .price-btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        width: 20px; height: 20px;
        left: ${e.clientX - rect.left - 10}px;
        top: ${e.clientY - rect.top - 10}px;
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
      `;
      if (!this.style.position) this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(16); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  console.log('%c⚡ ZITOPY AutoChat', 'font-size: 18px; font-weight: bold; background: linear-gradient(135deg, #8b5cf6, #ec4899); -webkit-background-clip: text; color: transparent;');
  console.log('%cPowered by ZITOPY AI', 'color: #8b5cf6;');
});
