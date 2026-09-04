# Patty's Pup Cuts — website

A fast, static marketing site for **Patty's Pup Cuts** — a home-based, mother-and-daughter
dog grooming salon in **Morrisville, PA** — built with [Astro](https://astro.build) +
[Tailwind CSS](https://tailwindcss.com) and deployed to SiteGround via GitHub Actions (SFTP).

This project replaces the previous WordPress site at `pupcutspa.com`.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

Requires Node 20+.

---

## Where to edit content

**Almost everything a non-developer would change lives in one file:**

### `src/consts.ts`
Business name, both phone numbers, email, address, service areas, the full **pricing
tiers**, **à la carte services**, **testimonials**, **FAQ**, gallery list, navigation, and
SEO defaults. Edit this file and the pages, header, footer, and JSON-LD schema all update
automatically.

### Pages (`src/pages/`)
- `index.astro` — Home
- `services.astro` — Services & pricing (+ à la carte + FAQ teaser)
- `about.astro` — Our story (Patty & Crystal, women-owned, Morrisville/Bucks County)
- `reviews.astro` — Reviews + happy-clients gallery
- `faq.astro` — FAQ (with `FAQPage` structured data)
- `contact.astro` — Contact details + message form
- `404.astro` — Not-found page

### Components (`src/components/`)
`SEO.astro`, `Header.astro`, `Footer.astro`, `Logo.astro`, `Hero.astro`, `PageHeader.astro`,
`ServicesGrid.astro`, `ServiceCard.astro`, `ServiceIcon.astro`, `Pricing.astro`,
`Testimonials.astro`, `Gallery.astro`, `Faq.astro`, `CTA.astro`.

---

## ⚠️ Please verify before go-live

The copy, pricing, and the five testimonials were migrated **verbatim** from the live site.
A few items are reasonable defaults and are flagged in code — confirm or correct them:

| Item | Where | Notes |
| --- | --- | --- |
| **Pricing** | `consts.ts → PRICING` | Small $50 / Med $60 / Large $80 / X-Large $100+ — ✅ confirmed correct by the owner (Sept 2026). |
| **FAQ assumptions** | `consts.ts → FAQS` | Answers about **vaccination policy, appointment length, and payment methods** are marked `ASSUMPTION:` in comments. These internal notes are auto-stripped from the public page — update the answers with your real policies. |
| **Map coordinates** | `consts.ts → SITE.geo` | Approximate; marked `VERIFY`. Refine the exact pin if desired. |
| **Hours** | `consts.ts → SITE.appointmentOnly` | Currently presented as **"By appointment only"** with no set hours (and no `openingHours` in the schema). To publish set hours, flip `appointmentOnly` to `false` and fill the `hours` array. |
| **À la carte prices** | `consts.ts → SERVICES` | Individual services say "Ask when you book" because the old site listed no numbers. Add prices when ready. |

---

## Booking & the contact form

Booking today happens mostly through **Facebook**, and the site keeps Facebook as the primary
call-to-action throughout (per the current workflow). The **Contact page** also has a working
message form.

- The form is **mailto-based**: on submit it opens the visitor's email app pre-filled with their
  details and sends to `pattyapurvis@gmail.com`. No third-party service or backend required.
- **To upgrade to a hosted form** (submissions arrive by email without opening the visitor's mail
  app): create a free [Formspree](https://formspree.io) form and point the `<form>` in
  `src/pages/contact.astro` at `action="https://formspree.io/f/XXXX"` with `method="POST"`, then
  remove the inline mailto `<script>`. (Web3Forms works the same way.)

---

## Images

Real photos and the logo were migrated from the old site into `src/assets/` and are served
through Astro's `<Image />` component for automatic resizing, WebP conversion, and lazy loading.

**Flagged for better photos (recycled from the old site — worth replacing when you can):**

- **No photo of Patty & Crystal exists** in the old assets. A real photo of the two of you would
  be the single biggest upgrade to the About page.
- The **gallery collages** (`gallery-*.jpg`) are authentic phone photos stitched into grids, shot
  in the home studio — charming, but a few clean, well-lit single before/after shots would look
  more professional.
- `papillon-blue-bandana.png` is small (471×582) with a busy background.

**Skipped filler** from the old site (per the migration brief): Google-Maps screenshots,
"visit us on Facebook" badges, paw-print divider images, old favicons, and Jetpack/plugin
graphics. Paw-print dividers are recreated in CSS (`.paw-divider`) instead.

The **Women-Owned certification badge** was kept and is featured on the About page.

### Logo & favicon
- **Logo:** `src/components/Logo.astro` (color + white variants in `src/assets/`).
- **Favicon:** `public/favicon.svg` (pink paw mark).
- **Social share image:** `public/og-image.png` — regenerate via `node scripts/generate-og.mjs`.
- **Brand colors:** `src/styles/global.css` → the `@theme` block.

---

## SEO

- **`src/components/SEO.astro`** — imported by every page via `BaseLayout`. Handles the unique
  `<title>` + meta description, Open Graph + Twitter tags, canonical URL, and **JSON-LD
  `LocalBusiness` schema** (name, address, phone, geo, area served, and a services offer catalog).
  Hours are intentionally omitted while the salon is appointment-only.
- **FAQ page** additionally emits `FAQPage` structured data.
- **Sitemap** — `@astrojs/sitemap` auto-generates `sitemap-index.xml` on every build.
- **`public/robots.txt`** — allows crawling and points to the sitemap.

---

## Deployment (GitHub Actions → SiteGround)

`.github/workflows/deploy.yml` runs on every push to **`main`**:
checkout → install → `npm run build` → upload `dist/` to SiteGround over **SFTP**.

### Required repository secrets

Add these under **GitHub → Settings → Secrets and variables → Actions → New repository secret**:

| Secret name | Value |
| --- | --- |
| `SFTP_HOST` | Your SiteGround SFTP hostname or server IP (from Site Tools → Devs → FTP/SFTP, e.g. `giga123.siteground.biz`) |
| `SFTP_USERNAME` | The SFTP account username |
| `SFTP_PASSWORD` | That SFTP account's password |
| `SFTP_REMOTE_PATH` | Absolute path to the web root to publish into (e.g. `/home/customer/www/pupcutspa.com/public_html`) |
| `SFTP_PORT` | *(optional)* Only add this if port `22` doesn't work — some SiteGround accounts use `18765` |

Nothing sensitive is committed — the workflow reads only from these secrets.

### First deploy & the WordPress transition

Because the current web root still contains WordPress files:

1. WordPress's `index.php` can take priority over `index.html`. The included `public/.htaccess`
   sets `DirectoryIndex index.html` to prefer the new static homepage, but the cleanest result is
   to **remove the old WordPress files** from the web root (back them up first) or deploy into a
   clean directory.
2. To have the deploy mirror `dist/` exactly (deleting stale files on the server), set
   `delete_remote_files: true` in the workflow — do this only after you've confirmed
   `SFTP_REMOTE_PATH` points at the right folder, as it is destructive.

---

## Project structure

```
├─ .github/workflows/deploy.yml   # CI/CD: build + SFTP deploy to SiteGround
├─ public/                        # copied as-is to the site root
│  ├─ robots.txt
│  ├─ favicon.svg
│  ├─ og-image.png
│  └─ .htaccess
├─ scripts/generate-og.mjs        # regenerates the social share image
├─ src/
│  ├─ consts.ts                   # ← all business content lives here
│  ├─ styles/global.css           # Tailwind theme + base styles
│  ├─ layouts/BaseLayout.astro
│  ├─ assets/                     # optimized images (logo, photos, badge)
│  ├─ components/
│  └─ pages/
├─ astro.config.mjs
└─ package.json
```
