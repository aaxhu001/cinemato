# 🎬 Cinemato — Cinema Advertising Marketplace

> **"Where Brands Meet The Big Screen"**  
> An automated, escrow-protected advertising exchange connecting **Cinema Hall Owners/Managers** with **Brand Advertisers & Local Businesses**.

---

## 🌐 Live Demo & Instant Access

- **Public Live URL (Active Tunnel):** [https://d2b625d76311ad.lhr.life](https://d2b625d76311ad.lhr.life)
- **One-Click Deploy to Vercel:**  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aaxhu001/cinemato)

---

## 🏛 The Three Sides of the Platform

### 1. Public Marketplace & Face of Cinemato (`/`)
- **Direct Link:** [https://d2b625d76311ad.lhr.life/](https://d2b625d76311ad.lhr.life/)
- **Features:** 
  - Dynamic hero search by city (Mumbai, Delhi, Bengaluru, etc.) and cinema format (IMAX, 4DX, Dolby Atmos).
  - Interactive **Reach & ROI Calculator** showing estimated footfall and CPM comparisons.
  - Ad format showroom (Popcorn Tubs, On-screen 30s Intervals, Lobby Standees, Washroom Mirrors).
  - Quick role switchers to enter as a Cinema Owner or Brand Advertiser.

### 2. Cinema Owners' & Managers' Portal (`/cinema`)
- **Dashboard:** [https://d2b625d76311ad.lhr.life/cinema/dashboard](https://d2b625d76311ad.lhr.life/cinema/dashboard)
- **Rate-Card Switchboard:** [https://d2b625d76311ad.lhr.life/cinema/rate-card](https://d2b625d76311ad.lhr.life/cinema/rate-card)
  - Configure per-tub popcorn bucket pricing (e.g. ₹18 / 1k tubs).
  - On-screen interval video rates (e.g. ₹45,000 / week).
  - Enable weekend surge pricing multiplier (+25%).
- **Booking Intake & Creative Approvals:** [https://d2b625d76311ad.lhr.life/cinema/bookings](https://d2b625d76311ad.lhr.life/cinema/bookings)
- **Proof-of-Execution Station:** [https://d2b625d76311ad.lhr.life/cinema/proofs](https://d2b625d76311ad.lhr.life/cinema/proofs)
  - Upload geotagged/timestamped photos of popcorn tubs and projection logs to release escrow funds.
- **Payouts & Escrow Balance:** [https://d2b625d76311ad.lhr.life/cinema/payouts](https://d2b625d76311ad.lhr.life/cinema/payouts)

### 3. Business & Brand Owners' Portal (`/brand`)
- **Campaign Dashboard:** [https://d2b625d76311ad.lhr.life/brand/dashboard](https://d2b625d76311ad.lhr.life/brand/dashboard)
- **Cinema Discovery Marketplace:** [https://d2b625d76311ad.lhr.life/brand/explore](https://d2b625d76311ad.lhr.life/brand/explore)
  - Real-time rate cards reflecting cinema owner configurations.
- **Custom Package Configurator & Escrow Checkout:** [https://d2b625d76311ad.lhr.life/brand/checkout](https://d2b625d76311ad.lhr.life/brand/checkout)
  - 100% upfront escrow locking simulation.
- **Verified Campaign Audit Gallery:** [https://d2b625d76311ad.lhr.life/brand/audit](https://d2b625d76311ad.lhr.life/brand/audit)
  - Review photo evidence and projection certificates before final clearance.

---

## 🎨 Official Branding System

- **Official Brand Mark:** Hand-drawn sketch typography faithfully digitized in high-contrast **Black on White** (`#0A0E1A` on `#FFFFFF`).
  - Custom filmstrip perforations in the letter **`I`**.
  - Continuous unspooling 35mm film ribbon flowing underneath the logotype.
  - Vintage cinematic 6-spoke projector reel for the letter **`O`**.
- Vector source files:
  - [`branding/cinemato-logo-black-on-white.svg`](branding/cinemato-logo-black-on-white.svg)
  - [`branding/cinemato-reel-symbol.svg`](branding/cinemato-reel-symbol.svg)
  - [`branding/CLAUDE_BRAND_GUIDELINES.md`](branding/CLAUDE_BRAND_GUIDELINES.md)
  - [`wireframes/CLAUDE_WEBSITE_WIREFRAME_GUIDELINES.md`](wireframes/CLAUDE_WEBSITE_WIREFRAME_GUIDELINES.md)

---

## 💻 Tech Stack & Local Setup

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **State Management:** Reactive React Context (`MarketplaceContext`) keeping Cinema Owner inventory and Brand bookings in sync in real time.

### Run Locally:
```bash
git clone https://github.com/aaxhu001/cinemato.git
cd cinemato
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
