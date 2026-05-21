# Zitopy AI — Turn WhatsApp Chats into Sales on Autopilot

Zitopy AI is a premium, high-fidelity dark-themed landing page representing an AI-powered retail commerce assistant. Built specifically for SMEs, it automates product inquiries, processes orders, manages stock levels, and generates secure payment links directly within WhatsApp.

This project features three parallel **WhatsApp AI Simulators** demonstrating conversational commerce across different business sectors (iPhone, Android, and Laptop mockups) and an interactive **gravity-warping particle canvas background**.

---

## 🎨 Immersive Design & Interactive Features

### 1. Interactive Gravity-Warping Grid (`#interactive-bg`)
- Renders a full-screen dynamic mesh grid of particles and floating stars on an HTML5 `<canvas>`.
- **Repulsion/Antigravity Effect**: Detects cursor hover (`mousemove`) and touch events (`touchmove`/`touchstart`) on all devices. Nearby particles and grid lines bend, warp, and push away from the cursor in a smooth fluid motion.
- **Constant Animation**: Uses `requestAnimationFrame` to maintain a steady, high-performance drifting sway in the background. Uses yellow and white colors on a dark navy theme to align with Zitopy's brand identity.

### 2. Multi-Device Simulators (Hero & Laptop Grid)
Instead of a generic staff-customer portal, this simulates how the **Zitopy AI agent** responds automatically on different device interfaces:
- **iPhone Mockup (ScentLux Perfumes)**: Automatically handles a customer query searching for a woody fragrance, recommending Oud Majestic, capturing order details, and generating a payment checkout link.
- **Android Mockup (TrendThread Boutique)**: Handles clothing inquiries, sizing checks for Velvet Slip Dress, adds accessories, totals the cart, and provides a direct payment link.
- **Laptop Mockup (BiteBound Restaurant - WhatsApp Web)**: Simulates a restaurant food ordering conversation on WhatsApp Web, sending the platter order straight to the kitchen.
- **Dynamic Character Typing & Indicators**: Simulates character-by-character typing for customers and typing bubble indicators for the AI. Staggered start times keep the mockup animations natural and organic.

### 3. Conic Rotating Glow Border (Ring Light Effect)
- All CTA buttons features a rotating "ring light" border effect using a `conic-gradient` mask and a custom `@keyframes` spin.
- On mouse hover or screen touch, the buttons expand (scaling by `1.03`), translate upward by `-4px`, and the border rotation speed increases (from `5s` down to `2.2s`) to highlight user focus.

### 4. Light & Dark Theme Toggle
- A navigation bar toggle enables switching between default dark navy mode and light mode, dynamically shifting colors using CSS variables.

---

## 🏗️ Codebase Structure

```text
ZITOPY AI
│
├── index.html       # Landing page structure (Hero, Desktop Demo, Features, Steps, Pricing, Footer)
├── style.css        # Responsive stylesheet, custom fonts (Outfit/Plus Jakarta), device frames & iOS bubbles
├── main.js          # Interactive physics canvas grid & async WhatsApp triple timeline engines
├── .gitignore       # Git exclusion configurations
└── README.md        # Documented architecture, features, and setup
```

---

## 🛠️ Technology Stack
- **Structure**: Semantic HTML5 markup
- **Styling**: Vanilla CSS3 Custom Properties (no external libraries or framework dependencies)
- **Animations**: CSS Keyframe spin/float loops and Canvas 2D Physics rendering
- **Logic**: ES6+ JavaScript Event listeners, dynamic DOM bubble insertion, coordinate interpolation (lerp), and staggered loop sequencers.

---

## 🚀 Setup & Local Viewing

Since the root page is written in pure vanilla HTML, CSS, and JS, there is no compile or build script required!

1. **Direct Run**: Open `index.html` in any web browser.
2. **Local Web Server (Recommended)**: To avoid potential CORS or local asset path warnings on some systems, run a simple local server:
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000`.
   - Using Node.js (via `serve` or similar):
     ```bash
     npx serve
     ```
     Then navigate to `http://localhost:3000`.