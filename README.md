# PlugToCart — Turn WhatsApp Chats into Sales on Autopilot

PlugToCart is a premium, high-fidelity dark-themed landing page representing an AI-powered retail commerce assistant. Built specifically for African SMEs, it automates product inquiries, processes orders, manages stock levels, and generates secure payment links directly within WhatsApp.

This project features a state-of-the-art interactive **WhatsApp Order Simulator** (visualizing Customer and Staff interactions side-by-side) and a custom **interactive physics background grid**.

---

## 🎨 Immersive Design & Interactive Features

### 1. Interactive Gravity-Warping Grid (`#interactive-bg`)
- Renders a full-screen dynamic mesh grid of particles and floating stars on an HTML5 `<canvas>`.
- **Repulsion/Antigravity Effect**: Detects cursor hover (`mousemove`) and touch events (`touchmove`/`touchstart`) on all devices. Nearby particles and grid lines bend, warp, and push away from the cursor in a smooth fluid motion.
- **Constant Animation**: Uses `requestAnimationFrame` to maintain a steady, high-performance drifting sway in the background.

### 2. Dual-Phone WhatsApp Simulator (Hero Grid)
- **Customer View (Left Phone)**: Animates a conversation between a buyer ("Chioma") and the "Fresh Poultry" AI bot. It displays typing indicators, compiles items (whole chicken, eggs, turkey wings), and outputs the computed totals with a secure payment link.
- **Staff View (Right Phone)**: Displays incoming order alerts, real-time dispatch details, and low stock warnings.
- **Interactive "Accept Order" Flow**: Users can hover and click the **"Accept order"** button inside the Staff phone mockup. Clicking it updates the states of both simulated chats in real-time. If not clicked, the simulation automatically runs a fallback trigger after 9 seconds to remain self-running.
- **Restart Control**: A floating restart overlay allows visitors to replay the ordering animation sequence at any time.

### 3. Light & Dark Theme Toggle
- A navigation bar action toggles between the default futuristic dark-mode theme and a high-contrast premium light-mode style using CSS Custom Properties.

---

## 🏗️ Codebase Structure

```text
ZITOPY AI / PlugToCart
│
├── index.html       # Landing page structure (Hero, Features, Steps, Pricing, Footer)
├── style.css        # Responsive stylesheet, custom fonts (Outfit/Plus Jakarta), & iOS bubbles
├── main.js          # Interactive physics canvas grid & async WhatsApp timeline engine
├── .gitignore       # Git exclusion configurations
└── README.md        # Documented architecture, features, and setup
```

---

## 🛠️ Technology Stack
- **Structure**: Semantic HTML5 markup
- **Styling**: Vanilla CSS3 Custom Properties (no heavy external library dependencies or framework bundles)
- **Animations**: CSS Keyframe float loops and Canvas 2D Physics rendering
- **Logic**: ES6+ JavaScript Event listeners, dynamic DOM bubble insertion, and coordinate interpolation (lerp)

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