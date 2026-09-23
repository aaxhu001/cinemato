# Cinemato — Platform Workflows & Architecture Blueprint

This document details the operational mechanics, data models, state machines, and financial escrow flows of the Cinemato marketplace.

---

## 1. The Escrow Trust & Verification Lifecycle

```
[Brand Creates Booking]
        │
        ▼
[Brand Locks Funds in Escrow] ─── (Payment Gateway Hold)
        │
        ▼
[Admin Moderates Creative] ──── (Pass: Censor + QC Specs)
        │
        ▼
[Cinema Accepts Booking Request]
        │
        ▼
[Campaign Goes Live in Theatre] ── (Screens / Popcorn Tubs Active)
        │
        ▼
[Cinema Uploads Proof-of-Execution] ── (Photos + Geotag + Projector Log)
        │
        ▼
[Admin & Brand Audit Verification]
        │
        ▼
[Escrow Funds Disbursed]
   ├── 85% - 90% ──> Cinema Bank Account (Net Payout)
   └── 10% - 15% ──> Cinemato Platform Account (Marketplace Fee)
```

---

## 2. Booking State Machine Transitions

| State | Trigger | Next State | Responsible Party |
| :--- | :--- | :--- | :--- |
| `DRAFT` | Brand selects items in cart | `AWAITING_PAYMENT` | Brand |
| `AWAITING_PAYMENT` | Brand clicks Checkout | `ESCROW_LOCKED` | Brand / Payment Gateway |
| `ESCROW_LOCKED` | Payment captured in Escrow | `CREATIVE_REVIEW` | System |
| `CREATIVE_REVIEW` | Admin checks video/print specs | `PENDING_CINEMA_ACCEPTANCE` (or `CREATIVE_REJECTED`) | Admin |
| `PENDING_CINEMA_ACCEPTANCE` | Notified to Cinema Manager | `SCHEDULED` (or `DECLINED_BY_CINEMA`) | Cinema Manager |
| `SCHEDULED` | Start date reached | `IN_PROGRESS` | System |
| `IN_PROGRESS` | Collateral distributed / Reel run | `PROOF_PENDING` | Cinema Manager |
| `PROOF_PENDING` | Cinema uploads photos & logs | `PROOF_UNDER_AUDIT` | Cinema Manager |
| `PROOF_UNDER_AUDIT` | Admin approves proof quality | `SETTLED` (Payout released) | Admin |
| `DISPUTED` | Proof rejected or ad missed | `ARBITRATION` -> `REFUNDED` or `RESCHEDULED` | Admin |

---

## 3. Core Database Entities & Relationships

### 3.1 `Users` & `Auth`
- `id` (UUID, Primary Key)
- `email`, `hashed_password`
- `role` (ENUM: `SUPER_ADMIN`, `BRAND_ADVERTISER`, `CINEMA_MANAGER`)
- `company_name`, `phone`, `kyc_status` (`PENDING`, `VERIFIED`, `REJECTED`)
- `created_at`, `updated_at`

### 3.2 `Cinemas` & `Auditoriums`
- `id` (UUID, Primary Key)
- `manager_user_id` (FK -> `Users.id`)
- `cinema_name`, `chain_name` (e.g. PVR, Inox, or Independent)
- `address`, `city`, `state`, `postal_code`, `latitude`, `longitude`
- `total_screens`, `total_capacity`, `monthly_footfall`
- `demographics_summary` (JSON: age split, prime genres)
- `verification_status` (`PENDING_KYC`, `ACTIVE`, `SUSPENDED`)
- `bank_payout_details` (JSON: account number, routing/IFSC code)

### 3.3 `CinemaRateCards`
- `id` (UUID, Primary Key)
- `cinema_id` (FK -> `Cinemas.id`)
- `inventory_category` (ENUM: `ON_SCREEN_INTERVAL`, `ON_SCREEN_PRESHOW`, `POPCORN_BUCKET`, `BEVERAGE_CUP`, `LOBBY_STANDEE`, `SEAT_BACKREST`)
- `is_active` (Boolean)
- `unit_price` (Decimal, e.g. $250.00)
- `pricing_unit` (ENUM: `PER_1000_UNITS`, `PER_SCREEN_PER_WEEK`, `PER_UNIT_PER_WEEK`, `PER_AUDI_PER_MONTH`)
- `minimum_order_qty` (Integer, e.g. 3,000 for popcorn tubs)
- `surge_multiplier` (Decimal, default 1.0, e.g. 1.25 for blockbusters)

### 3.4 `Campaigns` & `Bookings`
- `id` (UUID, Primary Key)
- `brand_user_id` (FK -> `Users.id`)
- `cinema_id` (FK -> `Cinemas.id`)
- `campaign_title`, `brand_name`, `industry`
- `start_date`, `end_date`
- `status` (ENUM matching state machine)
- `subtotal_amount`, `tax_amount`, `platform_fee`, `total_escrow_held`
- `payout_amount` (Amount payable to cinema upon proof clearance)

### 3.5 `CampaignCreatives`
- `id` (UUID, Primary Key)
- `campaign_id` (FK -> `Campaigns.id`)
- `asset_type` (ENUM: `VIDEO_INTERVAL`, `PRINT_POPCORN_BUCKET`, `PRINT_STANDEE`)
- `file_url`, `file_size_bytes`, `resolution`, `aspect_ratio`, `duration_seconds`
- `cbfc_certificate_url` (Censor clearance)
- `approval_status` (`PENDING`, `APPROVED`, `REJECTED`)
- `admin_notes` (Text feedback if rejected)

### 3.6 `ProofOfExecution`
- `id` (UUID, Primary Key)
- `campaign_id` (FK -> `Campaigns.id`)
- `uploaded_by` (FK -> `Users.id`)
- `proof_type` (ENUM: `POPCORN_COUNTER_PHOTO`, `INTERVAL_VIDEO_CLIP`, `PROJECTION_LOG_SHEET`, `LOBBY_PHOTO`)
- `media_url`
- `geotag_latitude`, `geotag_longitude`
- `captured_timestamp`
- `admin_verification_status` (`PENDING`, `APPROVED`, `REJECTED`)

---

## 4. Revenue & Monetization Model

1. **Marketplace Commission (Take-Rate):**
   - Standard Rate: 12.5% deducted from the booking payout.
   - For a $1,000 booking:
     - Cinema receives: $875.00
     - Cinemato earns: $125.00
2. **Centralized Printing & Fulfillment Add-On (Optional):**
   - For brands that don't have local printing setups for popcorn bucket wraps, Cinemato offers turnkey printing & delivery to the cinema. Margin: 25% on printing cost.
3. **DCP Mastering & Conversion:**
   - Automatic or assisted conversion of MP4 / ProRes brand videos to unencrypted Digital Cinema Packages (DCI Compliant). Fee: $75 per creative.
