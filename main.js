/* ==========================================================================
   ZITOPY AI — Premium Interactive Scripting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBackground();
  initThemeToggle();
  initWhatsAppSimulators();
});

/* ==========================================================================
   1. INTERACTIVE BACKGROUND (Gravity-Warping Particle Grid)
   ========================================================================== */
function initInteractiveBackground() {
  const canvas = document.getElementById('interactive-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let points = [];
  let stars = [];
  const spacing = 55; // spacing between grid nodes
  const maxRepulsionDist = 180;
  const maxDisplacement = 40;

  // Mouse / Touch state
  let mouse = { x: undefined, y: undefined, targetX: undefined, targetY: undefined };

  // Smooth mouse coordinates (lerp)
  function updateMouseCoordinates(clientX, clientY) {
    mouse.targetX = clientX;
    mouse.targetY = clientY;
    if (mouse.x === undefined) {
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;
    }
  }

  // Create grid nodes and stars
  function initGrid() {
    points = [];
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing;
        const y = r * spacing;
        points.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          col: c,
          row: r
        });
      }
    }

    // Floating stars
    stars = [];
    const starCount = Math.min(60, Math.floor((width * height) / 25000));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: undefined,
        baseY: undefined,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.4 - 0.1, // slowly float upwards
        opacity: Math.random() * 0.6 + 0.2
      });
    }
  }

  initGrid();

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initGrid, 150);
  });

  // Track cursor
  window.addEventListener('mousemove', (e) => {
    updateMouseCoordinates(e.clientX, e.clientY);
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = undefined;
    mouse.targetY = undefined;
  });

  // Touch support for mobile devices
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      updateMouseCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updateMouseCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  window.addEventListener('touchend', () => {
    mouse.targetX = undefined;
    mouse.targetY = undefined;
  });

  window.addEventListener('touchcancel', () => {
    mouse.targetX = undefined;
    mouse.targetY = undefined;
  });

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smoothly interpolate mouse coordinates (lerp)
    if (mouse.targetX !== undefined) {
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
    } else {
      mouse.x = undefined;
      mouse.y = undefined;
    }

    // Determine current theme style for drawing colors (Yellow & Slate Blue styling)
    const isLightMode = document.body.classList.contains('light-mode');
    const gridLineColor = isLightMode ? 'rgba(59, 130, 246, 0.04)' : 'rgba(251, 191, 36, 0.04)';
    const gridDotColor = isLightMode ? 'rgba(59, 130, 246, 0.08)' : 'rgba(251, 191, 36, 0.08)';
    const starColor = isLightMode ? 'rgba(59, 130, 246, 0.25)' : 'rgba(251, 191, 36, 0.35)';

    // 1. Update Grid points displacement
    points.forEach((pt) => {
      let targetX = pt.baseX;
      let targetY = pt.baseY;

      if (mouse.x !== undefined) {
        const dx = pt.baseX - mouse.x;
        const dy = pt.baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < maxRepulsionDist) {
          const force = (maxRepulsionDist - dist) / maxRepulsionDist;
          // Displace away from mouse (Antigravity repulsion!)
          targetX = pt.baseX + (dx / dist) * force * maxDisplacement;
          targetY = pt.baseY + (dy / dist) * force * maxDisplacement;
        }
      }

      // Linear interpolation to current animated point
      pt.x += (targetX - pt.x) * 0.08;
      pt.y += (targetY - pt.y) * 0.08;
    });

    // 2. Draw Grid Lines
    const cols = Math.ceil(width / spacing) + 1;
    ctx.strokeStyle = gridLineColor;
    ctx.lineWidth = 1;

    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      const nextColPt = points[i + 1];
      const nextRowPt = points[i + cols];

      // Draw horizontal lines
      if (nextColPt && pt.row === nextColPt.row) {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(nextColPt.x, nextColPt.y);
        ctx.stroke();
      }

      // Draw vertical lines
      if (nextRowPt) {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(nextRowPt.x, nextRowPt.y);
        ctx.stroke();
      }
    }

    // 3. Draw Grid Dots
    ctx.fillStyle = gridDotColor;
    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Update and Draw Stars
    ctx.fillStyle = starColor;
    stars.forEach((star) => {
      // Drifting motion
      star.x += star.speedX;
      star.y += star.speedY;

      // Wrapping bounds check
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;

      // Repulsion on stars
      let renderX = star.x;
      let renderY = star.y;

      if (mouse.x !== undefined) {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < maxRepulsionDist) {
          const force = (maxRepulsionDist - dist) / maxRepulsionDist;
          renderX += (dx / dist) * force * (maxDisplacement * 0.6);
          renderY += (dy / dist) * force * (maxDisplacement * 0.6);
        }
      }

      ctx.beginPath();
      ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ==========================================================================
   2. THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Read saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const activeTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', activeTheme);
  });
}

/* ==========================================================================
   3. MULTIPLE WHATSAPP SIMULATORS (iPhone, Android, Laptop)
   ========================================================================== */
function initWhatsAppSimulators() {
  // ScentLux Perfumes (iPhone Mockup)
  const scentluxMessages = [
    { type: 'out', text: "Do you have any recommendations for a long-lasting woody fragrance?", time: '9:41 AM', delay: 1000, typeDelay: 1800 },
    { type: 'in', text: "Welcome to ScentLux! 🪵 For long-lasting woody notes, I highly recommend our *Oud Majestic* (₦24,500) and *Cedar Forest* (₦18,000). Both have a 12+ hour sillage. Would you like to check out or see other collections?", time: '9:41 AM', delay: 2000, typeDelay: 3200 },
    { type: 'out', text: "Let's go with Oud Majestic. Do you offer delivery to Ikeja?", time: '9:42 AM', delay: 2200, typeDelay: 1500 },
    { type: 'in', text: "Perfect choice! Yes, we deliver to Ikeja (Standard: ₦1,500, Express: ₦3,000). Here is your order breakdown:<br>- 1x Oud Majestic EDP (100ml): ₦24,500<br>- Delivery (Ikeja Standard): ₦1,500<br>Total: **₦26,000**", time: '9:42 AM', delay: 2000, typeDelay: 3400 },
    { type: 'in', text: "💳 Tap here to pay securely via card or bank transfer: <span class='wa-link'>pay.zitopy.com/scentlux/5092</span>", time: '9:43 AM', delay: 1200, typeDelay: 1800 },
    { type: 'in', text: "🎉 Payment received! Your order is confirmed. Our dispatch rider will contact you tomorrow morning.", time: '9:43 AM', delay: 4000, typeDelay: 2200 }
  ];

  // TrendThread Boutique (Android Mockup)
  const trendthreadMessages = [
    { type: 'out', text: "Hi, is the Velvet Slip Dress still available in size M?", time: '9:41 AM', delay: 1500, typeDelay: 1500 },
    { type: 'in', text: "Hi there! Let me check our stock... 👗 Yes! We have 3 Velvet Slip Dresses in size M (Crimson Red & Midnight Black). They are currently ₦12,500 each. Would you like me to reserve one?", time: '9:41 AM', delay: 2200, typeDelay: 3000 },
    { type: 'out', text: "Awesome! I'll take the Midnight Black one. And please add a silver pendant necklace if you have.", time: '9:42 AM', delay: 2200, typeDelay: 2000 },
    { type: 'in', text: "Added! 💎 Here is your boutique order:<br>- 1x Velvet Slip Dress (Midnight Black, M): ₦12,500<br>- 1x Minimalist Silver Pendant: ₦4,500<br>Total: **₦17,000**", time: '9:42 AM', delay: 2000, typeDelay: 3000 },
    { type: 'in', text: "💳 Generate your secure checkout link: <span class='wa-link'>pay.zitopy.com/trendthread/6102</span>", time: '9:43 AM', delay: 1200, typeDelay: 1800 },
    { type: 'in', text: "🎉 Paid! We've reserved your items and packaged them. Standard shipping leaves at 2 PM today.", time: '9:44 AM', delay: 4000, typeDelay: 2200 }
  ];

  // BiteBound Restaurant (Laptop Mockup)
  const biteboundMessages = [
    { type: 'out', text: "Hello, do you open for lunch deliveries now? I want to order a family platter.", time: '9:41 AM', delay: 2000, typeDelay: 1500, sideText: "Lunch deliveries?" },
    { type: 'in', text: "Hello from BiteBound! 🍖 Yes, we are open! Our popular *Grill Family Feast* is ₦22,000 (includes 1kg ribs, 4 chicken wings, corn, and fries). We also have the *Spicy Seafood Platter* (₦28,000). What can I get for you?", time: '9:42 AM', delay: 2500, typeDelay: 3500, sideText: "Hello from BiteBound! 🍖" },
    { type: 'out', text: "Let's do the Grill Family Feast. Add extra barbecue sauce and 2 bottles of Chapman.", time: '9:42 AM', delay: 2500, typeDelay: 2000, sideText: "Grill Family Feast..." },
    { type: 'in', text: "Got it! Barbecue sauce is free, and 2 bottles of Chapman are ₦2,000. Here's your order:<br>- 1x Grill Family Feast platter: ₦22,000<br>- 2x House Chapman: ₦2,000<br>Total: **₦24,000**", time: '9:43 AM', delay: 2500, typeDelay: 3000, sideText: "Got it! Barbecue..." },
    { type: 'in', text: "💳 Complete payment here to send directly to the kitchen: <span class='wa-link'>pay.zitopy.com/bitebound/7291</span>", time: '9:43 AM', delay: 1200, typeDelay: 1800, sideText: "💳 Complete payment..." },
    { type: 'in', text: "🎉 Payment Confirmed! 👨‍🍳 Order #7291 has been sent to the kitchen. Est. prep and delivery time: 40 minutes.", time: '9:44 AM', delay: 4000, typeDelay: 2200, sideText: "Order #7291 sent to..." }
  ];

  // Helper to scroll chats
  function scrollChat(element) {
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }

  // Create typing element
  function createTypingBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'wa-bubble typing';
    bubble.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    return bubble;
  }

  // Show typing indicator
  function showTyping(bodyElement) {
    removeTyping(bodyElement);
    const bubble = createTypingBubble();
    bodyElement.appendChild(bubble);
    scrollChat(bodyElement);
  }

  // Remove typing indicator
  function removeTyping(bodyElement) {
    const typing = bodyElement.querySelector('.wa-bubble.typing');
    if (typing) {
      typing.remove();
    }
  }

  // Add a standard message bubble with tick mark animations
  function addMessage(bodyElement, {
    type = 'in', // 'in' or 'out'
    content = '',
    time = ''
  }) {
    removeTyping(bodyElement);

    const bubble = document.createElement('div');
    bubble.className = `wa-bubble ${type}`;

    if (type === 'out') {
      bubble.innerHTML = `
        <div class="wa-msg-content">${content}</div>
        <div class="wa-bubble-meta">
          <span class="wa-msg-time">${time}</span>
          <span class="wa-receipt-tick">✓</span>
        </div>
      `;
      
      // Animate checkmark receipt delivery states
      const tick = bubble.querySelector('.wa-receipt-tick');
      if (tick) {
        setTimeout(() => {
          tick.textContent = '✓✓'; // Delivered
        }, 500);
        setTimeout(() => {
          tick.classList.add('read'); // Read (turned blue)
        }, 1000);
      }
    } else {
      bubble.innerHTML = `
        <div class="wa-msg-content">${content}</div>
        <div class="wa-bubble-meta">
          <span class="wa-msg-time">${time}</span>
        </div>
      `;
    }

    bodyElement.appendChild(bubble);
    scrollChat(bodyElement);
    return bubble;
  }

  // Character typing animation for the customer's input placeholder
  function animateTypingText(inputEl, text, speed, callback) {
    let index = 0;
    inputEl.textContent = "";
    inputEl.classList.add("typing-text");

    const interval = setInterval(() => {
      if (index < text.length) {
        inputEl.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        inputEl.classList.remove("typing-text");
        setTimeout(() => {
          inputEl.textContent = "Type a message...";
          callback();
        }, 600);
      }
    }, speed);

    return interval;
  }

  // Orchestrate single simulator chat loop
  function runChatSimulator({ chatBodyId, inputSelector, messages, sideMsgId, initialOffset = 0 }) {
    const chatBody = document.getElementById(chatBodyId);
    const inputEl = document.querySelector(inputSelector);
    const sideMsgEl = sideMsgId ? document.getElementById(sideMsgId) : null;

    if (!chatBody || !inputEl) return;

    // Resolve header status element for online/typing labels
    const chatWindow = chatBody.closest('.wa-chat-window, .wa-web-main-chat');
    const statusEl = chatWindow ? chatWindow.querySelector('.wa-profile-status, .wa-web-chat-status') : null;

    let currentTimeout = null;
    let currentInterval = null;

    function runLoop() {
      // Clear previous logs
      chatBody.innerHTML = '';
      inputEl.textContent = 'Type a message...';
      if (statusEl) {
        statusEl.textContent = 'online';
        statusEl.style.color = '';
      }
      if (sideMsgEl) {
        sideMsgEl.textContent = 'Active chat...';
        sideMsgEl.style.color = '';
      }

      let stepIndex = 0;

      function executeNextStep() {
        if (stepIndex >= messages.length) {
          // Restart after 8 seconds
          currentTimeout = setTimeout(runLoop, 8000);
          return;
        }

        const msg = messages[stepIndex];
        
        // Wait delay before beginning the step
        currentTimeout = setTimeout(() => {
          if (msg.type === 'out') {
            // Customer typing: simulate key presses in the input box first
            currentInterval = animateTypingText(inputEl, msg.text, 35, () => {
              // Add actual message bubble to chat body
              addMessage(chatBody, {
                type: 'out',
                content: msg.text,
                time: msg.time
              });
              if (sideMsgEl && msg.sideText) {
                sideMsgEl.textContent = msg.sideText;
                sideMsgEl.style.color = '';
              }
              stepIndex++;
              executeNextStep();
            });
          } else {
            // AI responding: show typing bubble indicator and update header status label
            showTyping(chatBody);
            if (statusEl) {
              statusEl.textContent = 'typing...';
              statusEl.style.color = '#00a884'; // Green typing color
            }
            if (sideMsgEl) {
              sideMsgEl.textContent = 'typing...';
              sideMsgEl.style.color = '#00a884';
            }

            currentTimeout = setTimeout(() => {
              addMessage(chatBody, {
                type: 'in',
                content: msg.text,
                time: msg.time
              });
              if (statusEl) {
                statusEl.textContent = 'online';
                statusEl.style.color = '';
              }
              if (sideMsgEl && msg.sideText) {
                sideMsgEl.textContent = msg.sideText;
                sideMsgEl.style.color = '';
              }
              stepIndex++;
              executeNextStep();
            }, msg.typeDelay);
          }
        }, msg.delay);
      }

      executeNextStep();
    }

    // Start with offset to stagger the animations naturally
    setTimeout(runLoop, initialOffset);
  }

  // Initialize and run ScentLux Perfumes on iPhone 15 Pro Max
  runChatSimulator({
    chatBodyId: 'scentlux-chat-body',
    inputSelector: '#iphone-simulator .wa-input-placeholder',
    messages: scentluxMessages,
    initialOffset: 800
  });

  // Initialize and run TrendThread Boutique on Galaxy S25 Ultra
  runChatSimulator({
    chatBodyId: 'trendthread-chat-body',
    inputSelector: '#android-simulator .wa-input-placeholder',
    messages: trendthreadMessages,
    initialOffset: 3200 // Staggered delay
  });

  // Initialize and run BiteBound Restaurant on MacBook Pro (runs after lid opening finishes at ~3s)
  runChatSimulator({
    chatBodyId: 'bitebound-chat-body',
    inputSelector: '.laptop-container .wa-web-input-bar',
    messages: biteboundMessages,
    sideMsgId: 'grill-side-msg',
    initialOffset: 4800 // Delays typing until MacBook is open
  });
}
