/* ==========================================================================
   PLUGTOCART — Premium Interactive Scripting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveBackground();
  initThemeToggle();
  initWhatsAppSimulator();
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

    // Determine current theme style for drawing colors
    const isLightMode = document.body.classList.contains('light-mode');
    const gridLineColor = isLightMode ? 'rgba(37, 99, 235, 0.04)' : 'rgba(255, 255, 255, 0.02)';
    const gridDotColor = isLightMode ? 'rgba(37, 99, 235, 0.08)' : 'rgba(255, 255, 255, 0.04)';
    const starColor = isLightMode ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.35)';

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
   3. WHATSAPP CHAT FLOW SIMULATOR
   ========================================================================== */
function initWhatsAppSimulator() {
  const customerBody = document.getElementById('customer-chat-body');
  const staffBody = document.getElementById('staff-chat-body');
  const restartBtn = document.getElementById('restart-simulator-btn');
  const customerInput = document.getElementById('customer-input-box');

  if (!customerBody || !staffBody) return;

  let simTimeline = [];
  let timeouts = [];
  let isWaitingForAccept = false;
  let autoAcceptTimeout = null;

  // Clear all pending timeouts
  function clearAllTimers() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
    if (autoAcceptTimeout) {
      clearTimeout(autoAcceptTimeout);
      autoAcceptTimeout = null;
    }
  }

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

  // Add a standard message bubble
  function addMessage({
    phone = 'customer',
    type = 'in', // 'in' or 'out'
    content = '',
    time = '',
    customClass = '',
    customHtml = null
  }) {
    const bodyElement = phone === 'customer' ? customerBody : staffBody;
    removeTyping(bodyElement);

    const bubble = document.createElement('div');
    bubble.className = `wa-bubble ${type} ${customClass}`;

    if (customHtml) {
      bubble.innerHTML = customHtml;
    } else {
      bubble.innerHTML = `
        <div class="wa-msg-content">${content}</div>
        <div class="wa-bubble-meta">
          <span class="wa-msg-time">${time}</span>
          ${type === 'out' ? `<span class="wa-receipt-tick">✓✓</span>` : ''}
        </div>
      `;
    }

    bodyElement.appendChild(bubble);
    scrollChat(bodyElement);
  }

  // Main simulator flow definition
  function runSimulator() {
    clearAllTimers();
    isWaitingForAccept = false;

    // Reset UI contents
    customerBody.innerHTML = '';
    staffBody.innerHTML = '';
    customerInput.textContent = 'Type a message...';

    // Step 1: Customer messages interest in chickens & eggs
    scheduleStep(500, () => {
      showTyping(customerBody);
      customerInput.textContent = 'Writing: "Hi I need 1 full chicken..."';
    });

    scheduleStep(2200, () => {
      customerInput.textContent = 'Type a message...';
      addMessage({
        phone: 'customer',
        type: 'out',
        content: 'Hi I need 1 full chicken and a crate of eggs please',
        time: '9:12 AM'
      });
    });

    // Step 2: Bot responds with prices
    scheduleStep(3200, () => {
      showTyping(customerBody);
    });

    scheduleStep(5200, () => {
      addMessage({
        phone: 'customer',
        type: 'in',
        content: 'Hello Chioma! 🐓 Here\'s what I found:<br>🍗 Whole Chicken (1.5kg) — ₦5,200<br>🥚 Crate of Eggs (30pcs) — ₦4,800<br><br>Anything else or checkout?',
        time: '9:12 AM'
      });
    });

    // Step 3: Customer adds turkey wings
    scheduleStep(6500, () => {
      showTyping(customerBody);
      customerInput.textContent = 'Writing: "Add 1kg of turkey wings"';
    });

    scheduleStep(8000, () => {
      customerInput.textContent = 'Type a message...';
      addMessage({
        phone: 'customer',
        type: 'out',
        content: 'Add 1kg of turkey wings',
        time: '9:13 AM'
      });
    });

    // Step 4: Bot compiles order
    scheduleStep(9000, () => {
      showTyping(customerBody);
    });

    scheduleStep(11000, () => {
      addMessage({
        phone: 'customer',
        type: 'in',
        content: 'Done! Your order:<br>1x Whole Chicken — ₦5,200<br>1x Crate of Eggs — ₦4,800<br>1x Turkey Wings — ₦3,500<br><br>Total: <b>₦13,500</b>',
        time: '9:13 AM'
      });
    });

    // Step 5: Bot sends payment link AND notifies staff
    scheduleStep(12200, () => {
      showTyping(customerBody);
    });

    scheduleStep(13500, () => {
      addMessage({
        phone: 'customer',
        type: 'in',
        content: '💳 Pay securely here: <span class="wa-link">pay.plugtocart.com/ord/2887</span>',
        time: '9:14 AM'
      });

      // Render staff incoming order notification card
      const orderHtml = `
        <div class="staff-order-header">⚠️ New Order #2887</div>
        <div class="staff-order-body">
          1x Whole Chicken (1.5kg)<br>
          1x Crate of Eggs (30pcs)<br>
          1x Turkey Wings (1kg)<br>
          Customer: Chioma C.
        </div>
        <button class="btn-accept-order" id="accept-order-btn">Accept order</button>
        <div class="wa-bubble-meta">
          <span class="wa-msg-time" style="color: rgba(255,255,255,0.4)">9:14 AM</span>
        </div>
      `;

      addMessage({
        phone: 'staff',
        type: 'in',
        customClass: 'staff-order-bubble',
        customHtml: orderHtml
      });

      // Wait for user interaction
      isWaitingForAccept = true;
      
      // Auto-trigger confirmation if user doesn't click after 9s to keep demo running
      autoAcceptTimeout = setTimeout(() => {
        const acceptBtn = document.getElementById('accept-order-btn');
        if (acceptBtn) {
          triggerOrderConfirmation(acceptBtn);
        }
      }, 9000);
    });
  }

  // Schedule timeline helper
  function scheduleStep(delay, callback) {
    const t = setTimeout(callback, delay);
    timeouts.push(t);
  }

  // Handle Order Accept Action
  function triggerOrderConfirmation(buttonEl) {
    if (!isWaitingForAccept) return;
    isWaitingForAccept = false;

    if (autoAcceptTimeout) {
      clearTimeout(autoAcceptTimeout);
      autoAcceptTimeout = null;
    }

    // Animate button state
    buttonEl.textContent = '✓ Order Accepted';
    buttonEl.classList.add('clicked');
    buttonEl.disabled = true;

    // Staff dashboard logs output
    scheduleStep(600, () => {
      addMessage({
        phone: 'staff',
        type: 'out',
        content: 'Order #2887 confirmed. Payment link sent to Chioma.',
        time: '9:15 AM'
      });
    });

    // Notify customer phone dashboard has received confirmation
    scheduleStep(1200, () => {
      addMessage({
        phone: 'customer',
        type: 'in',
        content: '💬 Order accepted by merchant staff. Awaiting payment checkout...',
        time: '9:15 AM'
      });
    });

    // Step 7: Payment Received card on Staff View
    scheduleStep(4200, () => {
      const paymentHtml = `
        <div class="staff-order-header" style="color: #10b981;">🟢 Payment Received</div>
        <div class="staff-order-body">
          Order #2887 — ₦13,500<br>
          Ready for dispatch
        </div>
        <div class="wa-bubble-meta">
          <span class="wa-msg-time" style="color: rgba(255,255,255,0.4)">9:22 AM</span>
        </div>
      `;

      addMessage({
        phone: 'staff',
        type: 'in',
        customClass: 'staff-order-bubble',
        customHtml: paymentHtml
      });
    });

    // Step 8: Stock Warning on Staff View
    scheduleStep(6200, () => {
      const alertHtml = `
        <div class="staff-order-header" style="color: #f59e0b;">⚠️ Stock Alert</div>
        <div class="staff-order-body">
          Turkey Wings — 3 left
        </div>
        <div class="wa-bubble-meta">
          <span class="wa-msg-time" style="color: rgba(255,255,255,0.4)">9:23 AM</span>
        </div>
      `;

      addMessage({
        phone: 'staff',
        type: 'in',
        customClass: 'staff-order-bubble alert-bubble',
        customHtml: alertHtml
      });
    });

    // Restart Timeline loop
    scheduleStep(15000, () => {
      runSimulator();
    });
  }

  // Click delegation for Accept Order Button
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'accept-order-btn') {
      triggerOrderConfirmation(e.target);
    }
  });

  // Manual restart click handler
  restartBtn.addEventListener('click', () => {
    runSimulator();
  });

  // Initial trigger
  runSimulator();
}
