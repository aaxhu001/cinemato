# Cinemato — Cinema Advertising Marketplace

> **"Where Brands Meet The Big Screen"**  
> An automated, escrow-protected advertising exchange connecting Cinema Hall Owners/Managers with Brand Advertisers.

---

## 📁 Project Architecture & Planning Deliverables

```
cinemato/
├── branding/
│   ├── BRAND_GUIDELINES.md             # Complete brand identity bible & design system
│   ├── cinemato-logo-aperture.svg       # Master vector emblem (The Golden Projector Aperture)
│   └── cinemato-brand-lockup.svg       # Horizontal brand mark with typography
│
├── wireframes/
│   ├── WIREFRAMES.md                   # Screen-by-screen UX specifications for all 4 spaces
│   ├── INVENTORY_SPECIFICATIONS.md     # Popcorn bucket die-lines, video aspect ratios, & audio specs
│   ├── PLATFORM_WORKFLOWS.md           # Escrow trust lifecycle, state machine, and DB models
│   └── interactive_prototype.html      # Self-contained visualizer & clickable prototype
│
└── README.md                           # Master project guide
```

---

## 🚀 Interactive Wireframe & Brand Prototype

You can immediately open and preview the complete interactive prototype by launching `wireframes/interactive_prototype.html` in your web browser:

- **🎨 Brand Identity & Logo Showcase:** Visual colors, logo explorations, taglines, and brand voice.
- **🏢 Brand / Advertiser Portal:** Cinema search, dynamic ad-space configurator, cart, and proof tracker.
- **🍿 Cinema Hall Owner Portal:** Service switchboard, rate-card builder, booking requests, and proof uploader.
- **⚡ Super Admin Control Tower:** GMV analytics, creative moderation queue, and escrow payouts.
- **🌐 Public Landing Page:** High-converting hero search, format showroom, and value propositions.

---

## 🛠 Next Phase: Production Implementation
Once the branding and wireframe specifications are aligned, the tech stack roadmap:
* **Frontend:** Next.js (App Router), Tailwind CSS, Lucide Icons, Framer Motion
* **Backend / Database:** Supabase / PostgreSQL (Prisma ORM)
* **Storage:** S3-compatible cloud storage for heavy video DCPs & high-res print PDFs
* **Auth & Permissions:** Multi-role RBAC (Super Admin, Cinema Manager, Brand Advertiser)
