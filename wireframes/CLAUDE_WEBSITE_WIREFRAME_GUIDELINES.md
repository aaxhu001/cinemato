# Cinemato — Website Wireframe & Information Architecture Guidelines
> Source Artifact Reference: `https://claude.ai/artifact/ErY6HvRUyAVLvFamEXMq6e`

---

## 1. Multi-Sided Marketplace Topology
The Cinemato platform is structured into **three interconnected web environments**, joined by a shared real-time marketplace state:

```
                          ┌───────────────────────────┐
                          │   PUBLIC FACE / LANDING   │
                          │   - Hero Search & Filters │
                          │   - ROI / Reach Estimator │
                          │   - Ad Formats Showcase   │
                          └─────────────┬─────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
  ┌─────────────────────────────┐               ┌─────────────────────────────┐
  │   CINEMA OWNERS' PORTAL     │               │   BUSINESS OWNERS' PORTAL   │
  │   - Dynamic Rate-Card       │◄─────────────►│   - Explore Cinemas & Malls │
  │   - Screen Specs & Profile  │   Real-time   │   - Modular Cart Config     │
  │   - Booking Requests Intake │   Data Sync   │   - Escrow Payment Checkout │
  │   - Proof Photo Uploader    │   (Escrow &   │   - Verified Proof Audit    │
  │   - Bank Payouts Station    │     Proof)    │   - Performance Analytics   │
  └─────────────────────────────┘               └─────────────────────────────┘
```

---

## 2. Public Face / Consumer-Brand Discovery (`/`)
* **Global Navigation:**
  - Black-on-White Cinemato Brand Logo.
  - Links: `Explore Cinemas`, `How It Works`, `Ad Formats`, `ROI Estimator`, `For Cinema Owners`.
  - Action CTAs: `Launch Cinema Portal` & `Launch Business Portal`.
* **Hero Search Widget:**
  - Live filtering: Metro City + Ad Format Category + Budget Range.
  - Direct 1-click transition into the cinema booking engine.
* **Interactive Campaign Reach Estimator:**
  - Sliders for Number of Target Screens, Branded Popcorn Tubs count, and Campaign Duration (Weeks).
  - Calculates dynamic estimated footfall impressions, recall rate (94%), and estimated investment.
* **Format Showroom:**
  - Dedicated interactive tabs for:
    1. **Popcorn Bucket Custom Wraps** (tactile 120-minute engagement).
    2. **Interval Gold-Spot Videos** (captive on-screen attention).
    3. **Pre-Show Digital Slides & Reels**.
    4. **Lobby Standees & Digital Kiosks**.
    5. **Seat Backrest Decals & Sampling Booths**.

---

## 3. Cinema Owners' Portal (`/cinema/...`)
* **Dashboard (`/cinema/dashboard`):** Real-time venue analytics, active campaigns running, available bank balance, pending proof alerts.
* **Dynamic Rate-Card Switchboard (`/cinema/rate-card`):**
  - Instant toggle switches for every ad format.
  - Custom base prices (per 1,000 tubs, per screen/week, per unit/week).
  - Minimum order batch thresholds.
  - Blockbuster & Festival +25% Surge Pricing multiplier.
  - **Live Sync Guarantee:** Changes save and publish immediately to the advertiser marketplace.
* **Bookings Intake (`/cinema/bookings`):** Review brand offers, preview video commercials and popcorn bucket print die-lines, accept or decline bookings.
* **Proof-of-Execution Submission (`/cinema/proofs`):** Upload geotagged photos of branded popcorn tubs at concession counters and signed projectionist logs to release escrow funds.
* **Earnings & Payouts (`/cinema/payouts`):** Track available balances vs. locked escrow, simulate instant bank wire transfers with transaction confirmation codes.
* **Auditorium Specs (`/cinema/venue`):** Manage screens (IMAX Laser, Dolby Atmos, Gold Class) and demographic profiles.

---

## 4. Business Owners' / Brand Portal (`/brand/...`)
* **Campaign Dashboard (`/brand/dashboard`):** High-level metrics: total impressions delivered, branded popcorn tubs in hands, active campaigns, escrow held.
* **Cinema Directory Marketplace (`/brand/explore`):** Filter 500+ cinema screens by city, mall location, footfall tiers, and ad format availability with direct exhibitor rate tags.
* **Venue Detail & Package Customizer (`/brand/cinema/[id]`):** Combine popcorn tubs (3,000 / 5,000 / 10,000 units) with screen interval slots and lobby standees. Live subtotal calculation.
* **Escrow Checkout (`/brand/checkout`):** Set campaign schedules, upload creative specs (4K DCP, CMYK 300 DPI PDF), provide CBFC censor numbers, and lock budget in escrow.
* **Audit Gallery (`/brand/audit`):** Inspect high-resolution timestamped photos of popcorn tubs and signed projectionist logs before payment disbursement.

---

## 5. Escrow Trust & Verification Rules
1. **No advance payment to cinemas without verified proof:** Escrow holds 100% of brand payment until photo/log proof is approved.
2. **Standard Take-Rate:** Cinemato retains a transparent 12.5% platform fee from each transaction.
3. **Audit Trail:** Every campaign generates a permanent, downloadable compliance certificate with geotags and timestamps.
