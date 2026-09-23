# Cinemato — Master Wireframe & Screen Specifications

This document outlines the detailed screen structures, component hierarchies, user interactions, and data fields across all four core web spaces in **Cinemato**.

---

## 1. Public Marketplace & Landing Space (`/`)

### 1.1 Home / Discovery Page (`/`)
* **Header / Navigation:**
  - Logo (`cinemato-brand-lockup.svg`)
  - Nav Links: `Explore Cinemas`, `How It Works`, `Ad Formats`, `For Cinema Halls`, `ROI Calculator`
  - Secondary Actions: `Login`, `Register (Brand / Cinema)`
* **Hero Section:**
  - High-impact headline: *"Where Brands Meet The Big Screen"*
  - Subhead: *"Book captive on-screen commercials, custom popcorn bucket branding, and cinema lobby activations with verified proof-of-performance."*
  - **Quick Search & Filter Bar:**
    - City / Metro selector (e.g. Mumbai, New York, Los Angeles, Delhi NCR)
    - Ad Type filter (All, Popcorn Buckets, Interval Ads, Lobby Standees)
    - Budget / Audience slider
    - CTA: `[Search 500+ Cinemas]`
* **Two-Sided Value Proposition:**
  - **For Brands:** Programmatic rate cards, verified proof (geotagged photos + projector logs), zero agency markups.
  - **For Cinema Halls:** Turn idle concession packaging and interval slots into recurring non-ticket profit.
* **Ad Inventory Visual Grid:**
  - Interactive cards highlighting Popcorn Sleeves, Interval 30s Videos, Lobby Standees, Seat Backrests with pricing models.
* **Interactive Campaign Estimator Widget:**
  - User selects City + Target Screen count + Ad format -> calculates estimated impressions, reach, and indicative budget.
* **Trust & Proof Bar:**
  - Badges: `100% Escrow Protection`, `Geotagged Photo Verification`, `Cinema KYC Certified`.

---

## 2. Brand / Advertiser Portal (`/brand/...`)

### 2.1 Exploration & Cinema Directory (`/brand/explore`)
* **Filter Rail (Left):**
  - Location: State, City, Mall Name / Suburb
  - Cinema Tier: Multiplex, Premium/Gold Class, Heritage Single Screen
  - Ad Inventory Available: Checkboxes (`[x] Popcorn Buckets`, `[x] Interval Video`, `[x] Pre-Show`, `[x] Standees`, `[x] Seat Backs`)
  - Monthly Footfall Range: `10,000` to `100,000+`
  - Release Ties: Target specific upcoming movie releases (e.g., Action Blockbusters, Family Animation)
* **Listing Grid / Map View (Right):**
  - Cinema Venue Card:
    - High-res photo of venue & auditoriums
    - Cinema Name + Location + Verification Badge
    - Audi count & seating capacity
    - Average monthly footfall + prime demographic badge (e.g. "Young Professionals 18-35")
    - Available Ad Formats pill tags
    - "From $XXX / week" price indicator
    - Action: `[View Rate Card & Customize]`

### 2.2 Cinema Rate-Card & Package Customizer (`/brand/cinema/:id`)
* **Venue Profile:** Address, projection tech (4K Laser / Christie, Dolby Atmos), floor map.
* **Interactive Menu Tabs:**
  1. `On-Screen Media` (Pre-show 10s slide, Interval 30s video, Mute vs Audio)
  2. `Concessions Branding` (Popcorn bucket sleeves per 1,000 units, beverage cups, tray inserts)
  3. `Lobby & Physical Activations` (Entrance standees, kiosk booth, digital kiosks)
  4. `In-Audi Ambient` (Seat backrest stickers, 3D glasses branding)
* **Cart & Schedule Drawer (Sticky Bottom or Right Side):**
  - Selected inventory line items with per-unit rates
  - Date Range Picker (e.g., Oct 2 – Oct 16)
  - Estimated Impressions tally
  - Total Subtotal + Taxes (GST/Sales Tax) + Escrow Protection
  - Action: `[Lock Dates & Upload Creatives]`

### 2.3 Campaign Checkout & Creative Asset Uploader (`/brand/campaigns/new`)
* **Step 1: Campaign Metadata** (Brand name, industry category, objective).
* **Step 2: Creative Upload Hub:**
  - Video format validator (Aspect ratio: 1.85:1 Flat or 2.39:1 Scope, Audio loudness check -24 LUFS).
  - Print format validator (High-res 300 DPI CMYK PDF with bleed margins for popcorn bucket wrappers).
  - Censor / CBFC Certificate upload field (mandatory for projection).
* **Step 3: Escrow Payment Gateway:**
  - Payment options: Credit Card, Corporate Wire, Netbanking, UPI.
  - Funds held securely in escrow until campaign is completed and verified.

### 2.4 Brand Campaign Tracker & Performance Dashboard (`/brand/dashboard`)
* **High-Level KPIs:** Active Campaigns, Total Impressions Delivered, Branded Popcorn Buckets Distributed, Escrow Under Hold.
* **Campaign Status Pipeline:** `Pending Review` -> `Accepted by Cinema` -> `Live in Theatre` -> `Proof Uploaded` -> `Completed`.
* **Proof-of-Execution Audit Hub:**
  - High-res photo gallery of popcorn buckets in concession stands and customer hands.
  - Video clip of interval ad playing in auditorium with audience visible.
  - Downloadable Verification PDF Report.

---

## 3. Cinema Hall Owner / Manager Portal (`/cinema/...`)

### 3.1 Cinema Onboarding & Hall Setup (`/cinema/onboarding`)
* **Step 1: Venue Details:** Theatre name, Chain / Independent status, Mall location, Screen count, Total seat capacity.
* **Step 2: Audience Demographics:** Monthly footfall certificate, peak day split, target audience profile.
* **Step 3: Verification & Payout Details:** Trade license, Cinema exhibitor license, Bank account details for automated payouts.

### 3.2 Dynamic Rate-Card & Inventory Switchboard (`/cinema/rate-card`)
* **Service Toggles & Pricing Fields:**
  - `Popcorn Bucket Custom Sleeves`: Toggle ON/OFF, Price per 1,000 tubs, Minimum order batch.
  - `Interval Gold-Spot (30s Video)`: Toggle ON/OFF, Price per screen / week, Max slots per show.
  - `Pre-Show Slide / Video Reel`: Toggle ON/OFF, Price per screen / week.
  - `Lobby Standee Space`: Toggle ON/OFF, Price per unit / week, Max allowed standees.
  - `Seat Backrest Stickers`: Toggle ON/OFF, Price per audi / month.
  - `Product Sampling Booth`: Toggle ON/OFF, Price per weekend day.
* **Special Event Multipliers:**
  - Optional surge multiplier (+15% to +40%) for major festival weeks and tentpole film openings.
* Action: `[Save & Update Marketplace Listing]`

### 3.3 Booking Requests & Order Inbox (`/cinema/bookings`)
* **Incoming Booking Requests:**
  - Brand identity, requested ad formats, scheduled dates, proposed payout amount.
  - Creative preview (watch the video ad or inspect popcorn bucket wrap design).
  - Actions: `[Accept Booking]`, `[Decline Request]`, `[Request Adjustment]`.
* **Active Deployments Schedule:**
  - Calendar showing what creatives need to run on Screen 1, 2, 3, and physical collateral distribution timeline.

### 3.4 Proof-of-Execution Submission Hub (`/cinema/proofs`)
* **Milestone Checklist for Active Campaigns:**
  - Upload 3 geotagged photos of branded popcorn tubs at concession counters.
  - Upload signed projectionist daily log sheet.
  - Upload entrance lobby photo showing standee deployment.
* Once uploaded and approved by Admin, the escrow funds automatically transfer to the Cinema's available balance.

### 3.5 Payouts & Earnings Dashboard (`/cinema/payouts`)
* **Metrics:** Total Revenue to Date, Escrow Held (Pending Verification), Available Balance for Withdrawal.
* **Bank Transfer Station:** Instant payout request or scheduled bi-weekly settlement.
* Downloadable invoice receipts and tax records.

---

## 4. Super Admin (Cinemato Ops) Portal (`/admin/...`)

### 4.1 Master Control Tower (`/admin/dashboard`)
* Real-time metrics: Gross Merchandise Value (GMV), Active Campaigns, Platform Take-Rate Revenue (10-15%), Onboarded Cinemas, Brand Accounts.
* Operational alert ticker: "3 creatives pending moderation", "2 proof submissions awaiting payout release".

### 4.2 Cinema Verification Queue (`/admin/cinemas`)
* Review submitted exhibitor licenses and venue details.
* Actions: `[Approve Cinema]`, `[Request Additional KYC]`, `[Suspend Cinema]`.
* Override / customize platform commission percentage per cinema partner.

### 4.3 Creative & Compliance Moderation Station (`/admin/creatives`)
* Video review player with audio loudness meter and aspect ratio inspector.
* Censor certificate validation checklist.
* Actions: `[Approve for Exhibition]` or `[Reject with Detailed Feedback to Brand]`.

### 4.4 Escrow Settlement & Proof Audit Hub (`/admin/escrow`)
* The platform's trust engine:
  - Inspect uploaded photos and projection logs from cinemas.
  - Validate against brand campaign specifications.
  - Click `[Approve Proof & Release Payout]` -> Disburses funds to cinema bank account, logs platform take-rate, notifies brand.
  - Dispute resolution workflow for damaged or missed ad runs.
