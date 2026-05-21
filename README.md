# ZITOPY AI — Interactive Property Intelligence Platform

Welcome to the **ZITOPY AI** (Verifind Marketplace) codebase. This platform is designed to connect buyers, renters, and agents through AI-powered property matching, immersive video tours, and verified real estate listings.

The project is structured in two parts: a high-fidelity **Vanilla Landing Page** (in the root directory) and a modern **React Sub-Application** (in the `app/` directory).

---

## 🏗️ Project Architecture & Structure

```text
ZITOPY AI/
│
├── index.html               # Main Landing Page HTML
├── main.js                  # Landing Page interactive scripts & scroll-reveal
├── style.css                # Landing Page design system & global style sheet
├── product.html             # Detailed Product view page
├── product.js               # Product detail scripts
├── product.css              # Product detail styling
├── .gitignore               # Root-level Git ignores (keeps node_modules/dist safe)
│
└── app/                     # React Sub-Application
    ├── package.json         # React dependencies (React 19, Vite 8)
    ├── vite.config.js       # Vite build configurations
    ├── SocialActionLinks.jsx # Floating action dock (Canvas Antigravity + Spring animations)
    ├── SocialActionLinks.css # Dock glassmorphic style & hover accents
    │
    └── src/
        ├── main.jsx         # App mounting point
        ├── App.jsx          # Layout container & routing assembly
        ├── index.css        # Global CSS variables & styling tokens
        ├── App.css          # Core layouts
        │
        └── components/      # Reusable UI Components
            ├── Navbar.jsx       # Glassmorphic header navigation
            ├── Navbar.css
            ├── Hero.jsx         # Hero section with animated counter stats
            ├── Hero.css
            ├── PropertyFeed.jsx # Interactive property list with match indicators
            ├── PropertyFeed.css
            ├── VideoFeed.jsx    # Immersive horizontal video card slider
            ├── VideoFeed.css
            └── BookingModal.jsx # Verification booking calendar interface
            └── BookingModal.css
```

---

## ✨ Features & Interactive Details

### 1. Interactive Landing Page (Root)
- **Ambient Glow Trail**: A custom GPU-accelerated cursor-tracking glow trail follows the mouse cursor around the screen for a highly premium, futuristic layout feel.
- **Scroll Reveal Animations**: Sections and cards (features, testimonials, pricing) animate smoothly into view as the user scrolls, utilizing staggered delay multipliers.
- **Dynamic Stats Counters**: Statistics in the hero bar count up from zero with custom ease-out cubic mathematics.

### 2. React Sub-Application (`app/`)
- **Interactive Action Dock (`SocialActionLinks`)**:
  - **Antigravity Particle Background**: An HTML5 `<canvas>` background rendering rising particles that sway and float upwards.
  - **Repulsion Wave Force Field**: Detects cursor hover (`mousemove`) and finger touch (`touchmove`) on mobile devices, pushing particles away in a smooth physical wave.
  - **Bouncy Spring Animations**: Buttons expand from circular bubbles (`56px`) into pills (`176px`) using a custom spring curves transition: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`.
  - **Vibrant Accents**: Hovering triggers custom gradients tailored for each button (e.g. WhatsApp green, Agent violet, Verify cyan, Saved pink) with accompanying glow dropshadows.
- **Filterable Property Feed**: Users can browse listings with dynamic category filters and matching percentages.
- **Virtual Video Tours**: A custom slider allows visitors to watch cinematic property videos with active scroll controls.
- **Booking Scheduler Modal**: A modular popup allowing users to book in-person property verification tours.

---

## 🛠️ Technology Stack
- **Landing Page Core**: HTML5, CSS3, ES6 Vanilla JS.
- **Sub-App Framework**: React 19, Vite 8.
- **Styling Architecture**: Vanilla CSS and CSS Variables (no external tailwind bundle dependencies, fully customized, high-performance styling).
- **Animations**: CSS transitions (using custom cubic-beziers), CSS keyframe keying, and HTML5 Canvas API.

---

## 🚀 Setup & Local Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Running the Sub-App Locally
To run the React sub-application in development mode:

1. Navigate to the `app` directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   Open the printed URL (typically `http://localhost:5173`) in your browser.

### Building for Production
To build a production-ready bundle of the React app:
```bash
cd app
npm run build
```
The compiled, optimized files will be output to `app/dist/`.