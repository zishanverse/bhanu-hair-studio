# DESIGN DECISIONS & UX AUDIT
**Project:** Bhanu's The Hair Studio (Indore, India)  
**Branch:** `design/uiux-pro-max-pass`  
**Date:** October 2026  
**Skill:** UI UX Pro Max (`.agents/skills/ui-ux-pro-max/`)

---

## 1. Skill Feature Assessment

The UI UX Pro Max skill was initialized and verified with Python 3.14.6 (`python .agents/skills/ui-ux-pro-max/scripts/search.py`). The following features are available and were used in this pass:

| Skill Feature | Status | Application in this Pass |
|---|---|---|
| **Design-System Generator** (`--design-system`, `-ds`) | **Active** | Generated persisted design systems for luxury editorial queries. |
| **Persistence Engine** (`--persist`, `-p`, `-o`, `--page`) | **Active** | Persisted global master system to `design-system/bhanu-s-the-hair-studio/MASTER.md`. |
| **Design Dials** (`--variance`, `--motion`, `--density`) | **Active** | Configured `--variance 3` (minimal editorial), `--motion 6` (scroll-driven 3D pin), `--density 4` (spacious luxury). |
| **Domain Search: Typography** | **Active** | Queried serif + sans pairings for luxury editorial and bilingual readiness. |
| **Domain Search: Color** | **Active** | Queried dark luxury obsidian + gold accent palettes. |
| **Domain Search: Style** | **Active** | Queried Swiss minimalism, liquid glass, and editorial dark styling. |
| **Domain Search: UX & Accessibility** | **Active** | Queried form labels, smooth scrolling, touch target sizing, focus indicators, and reduced-motion states. |
| **Domain Search: Landing Patterns** | **Active** | Queried hero-to-CTA flow, social proof, pricing transparency, and local service conversion. |
| **Stack Search: Next.js & Tailwind** | **Active** | Queried `next/font` zero-CLS optimization, `@theme` semantic tokens, and image container sizing. |
| **Pre-Delivery Checklist** | **Active** | Verified against visual quality, interaction feedback, light/dark contrast, layout safe areas, and a11y criteria. |

---

## 2. Skill Run Outputs & Decision Matrix

### Run A: Query 1 — "luxury hair salon beauty premium editorial dark"
- **Pattern:** *Scroll-Triggered Storytelling* (intro hook > 3 chapters > climax CTA; respect reduced motion).
- **Style:** *Liquid Glass* & Editorial Dark (dark backdrop, subtle translucency, high contrast).
- **Colors:** Primary `#1C1917`, Accent `#A16207`, Background `#050505`.

### Run B: Query 2 — "unisex haute coiffure atelier cinematic"
- **Pattern:** *Hero + Features + CTA* with deep conversion focus.
- **Style:** *Minimalism & Swiss Style* (grid-based, spacious typography, essential elements only, no decorative clutter).
- **Effects:** 150–250ms subtle transitions, high contrast, clean type scale.

### Recommendations Decision Log

| # | Skill Recommendation | Decision | One-Line Rationale |
|---|---|---|---|
| 1 | **Scroll-Triggered Storytelling** for showcase | **ADOPTED** | Perfectly aligns with replacing tab-clicked Signature Experience with pinned scroll chapters. |
| 2 | **Minimalism & Swiss Grid** layout discipline | **ADOPTED** | Brings structure, rhythm, and clear typography hierarchy to replace clutter and reel-fatigue. |
| 3 | **Accent color `#A16207`** from generic palette | **ADAPTED** | Tuned to signature brand metallic champagne gold (`#C8A252` / `#D4AF37`) to honor brand anchor. |
| 4 | **Background `#FAFAF9`** (light mode default) | **REJECTED** | Preserved core brand anchor obsidian black (`#050505` / `#0C0A09`) with deep charcoal glass layers. |
| 5 | **Typography: Playfair Display + Inter** | **ADAPTED** | Chosen display serif `Cinzel` + `Cormorant Garamond` with `Plus Jakarta Sans` for bespoke editorial luxury. |
| 6 | **Form validation with error summary & labels** | **ADOPTED** | Critical fix for booking form: real labels, inline validation, honeypot, honest WhatsApp handoff. |
| 7 | **Mobile action bar with safe-area clearance** | **ADOPTED** | Adds persistent Call · WhatsApp · Book bottom bar on mobile (<768px), auto-hiding at booking section. |
| 8 | **Touch targets ≥44x44px and spacing ≥8px** | **ADOPTED** | Enforced across all buttons, filter chips, lightbox controls, and mobile navigation items. |
| 9 | **Vertical scannable treatment directory** | **ADOPTED** | Replaces 30-item horizontal reel with sticky category filter, search, pricing transparency ("from ₹"). |
| 10 | **Preload above-the-fold display font only** | **ADOPTED** | Cuts font bloat from 4 families to 3 streamlined families with `display: swap` and Devanagari fallback. |

---

## 3. Brand Identity & Typography Resolution

### A. Brand Display Name Consolidation
- **Decision:** Standardize display name universally to **"Bhanu's The Hair Studio"** (with branch sub-label *"Palsikar Colony · Saket Nagar · Vijay Nagar, Indore"* where context requires).
- **Eliminated:** Inconsistent references to "Bhanu Hair Studio", "Bhanu's Unisex Salon", and "Bhanu's Atelier".

### B. Font Stack Streamlining (4 Families → 3 Families Maximum)
Previous build loaded 4 font families: `Cinzel`, `Cormorant Garamond`, `Plus Jakarta Sans`, and `Space Grotesk`. Space Grotesk was inappropriately used as a monospace face.

| Family Role | Font Family | Weights Loaded | Fallback Stack | Usage |
|---|---|---|---|---|
| **Display Serif** | `Cinzel` | 600, 700 (Variable) | `serif` | Main hero title, logo wordmark, major section numbers |
| **Editorial Serif** | `Cormorant Garamond` | 400, 600, 700 (Variable) | `serif` | Editorial headings, chapter titles, pull quotes |
| **Clean Body Sans** | `Plus Jakarta Sans` | 300, 400, 500, 600, 700 | `'Noto Sans Devanagari', -apple-system, sans-serif` | All body copy, service rows, form inputs, buttons, micro-labels |

- **Monospace Font:** Removed `Space Grotesk`. Micro-labels use `Plus Jakarta Sans` uppercase with tracking `0.15em` to `0.25em`.
- **Bilingual Readiness:** Added `'Noto Sans Devanagari'` as primary sans fallback ensuring Hindi names and local addresses render without tofu boxes or glyph collisions.
- **Font Preloading:** Only `Cinzel` (above-the-fold display face) is preloaded. All fonts use `display: swap`.

---

## 4. Audit Table: Known Issues & Fix Specifications

| # | Known Issue / Area | Severity | Root Cause in Previous Pass | Approved Design & Technical Fix |
|---|---|---|---|---|
| **01** | **Visual & Performance Verification Gap** | **CRITICAL** | Previous pass only ran `tsc` and Node fetch without visual or Lighthouse checks. | Capture before & after screenshots at 375, 768, 1024, 1440; run Lighthouse audit (target 85+ mobile, 95+ desktop); test keyboard, reduced motion, and WebGL-disabled fallbacks. |
| **02** | **Signature Experience Click-Driven Tabs** | **HIGH** | Tab/button clicking drove chapter transitions; 3D shears exploded state was disconnected from scroll. | Rebuild as scroll-driven pinned scene: scroll advances chapters (01 Precision, 02 Transformation, 03 Rejuvenation), binds `stageState.explode` (0.0 to 1.0) and shear rotation to scroll scrub. Secondary tab clicks scroll to chapter. Reduced motion displays static cards without pin. |
| **03** | **Treatment Directory 30-Service Horizontal Reel** | **HIGH** | Forcing 30+ services into a horizontal scroll reel made scanning, category switching, and pricing comparison arduous. | Redesign as vertical scannable list: sticky category pills + search input + category counters; clean 2-column or list rows with Service Name, Duration, "from ₹" price, concise description, and Reserve CTA. Horizontal reel retained ONLY for curated 5-item "Signature Rituals" teaser. |
| **04** | **Unwanted Shears Snip on Service Card Click** | **MEDIUM** | Card click and Reserve button triggered `stageState.snip()`, causing unexpected canvas audio/motion while browsing prices. | Remove `stageState.snip()` from service cards and reserve buttons. Click opens appointment prefill directly. Snip action reserved strictly for explicit 3D interactive affordances in Signature section and canvas clicks. |
| **05** | **Gallery Captions & Keyboard Slider Missing** | **HIGH** | Work cards lost captions and service tags; before/after image slider had no keyboard arrow navigation or ARIA roles; lightbox lacked focus trap. | Restore minimal elegant captions (look title + service tag); add `role="slider"`, `aria-valuenow`, and Left/Right Arrow key support to before/after slider; add focus trap, Esc key listener, and touch swipe to full lightbox. |
| **06** | **Dishonest "Request Dispatched" Booking Flow** | **CRITICAL** | Booking form displayed "Request Dispatched" as if an API received the lead, but simply constructed a WhatsApp URI. | Replace copy with honest status: *"Opening WhatsApp with your appointment details…"* and fallback *"Tap here if WhatsApp did not open automatically"*. Add studio location selector (Palsikar Colony, Saket Nagar, Vijay Nagar), native date/time inputs, real floating/visible labels, error text, and honeypot field. |
| **07** | **Font Family Overload (4 Families Loaded)** | **MEDIUM** | Loaded Cinzel, Cormorant Garamond, Plus Jakarta Sans, and Space Grotesk (which is not monospace). | Consolidate to 3 families: Cinzel (display), Cormorant Garamond (editorial), Plus Jakarta Sans (body + micro-labels) + Devanagari fallback. Remove Space Grotesk. |
| **08** | **"Snip! 3D Shears Actuated" Gimmicky Badge** | **MEDIUM** | MobileHero3D rendered a developer-sounding floating badge upon tapping the shears. | Remove the gimmicky badge completely. Provide subtle physical tactile feedback via `navigator.vibrate?.([15])` and smooth scissor close/open animation. |
| **09** | **Hardcoded & Unverified JSON-LD Schema** | **MEDIUM** | `layout.tsx` hardcoded Schema.org values and included placeholder reviews without verification. | Dynamically generate `HairSalon` / `LocalBusiness` JSON-LD from `SALON_CONFIG`. Remove unverified `aggregateRating` and fake review items until verified live data is provided. |
| **10** | **Hero Stat Claims & Trust Strip** | **MEDIUM** | Stats like "4.9 rating", "500+ verified clients", "30+ rituals", "3 studios" were mixed across hardcoded files. | Centralize all stat counters directly into `SALON_CONFIG.theStudio.stats`. Mark unverified claims as "Needs Owner Confirmation" in documentation. |
| **11** | **Mobile Bottom Action Bar & Concierge Collision** | **MEDIUM** | Floating concierge button collided with mobile screen real estate and navigation. | Implement dedicated persistent Mobile Bottom Bar (`Call` · `WhatsApp` · `Book`) with iOS safe-area support (`env(safe-area-inset-bottom)`), automatically hidden when `#book` section is in viewport. Restrict `FloatingConcierge` to desktop (`md:block`). |
| **12** | **Studio Outlets Section Missing on Home Page** | **HIGH** | Visitors decide by location, but the 3 Indore studios (Palsikar Colony, Saket Nagar, Vijay Nagar) were buried in the footer. | Create dedicated "Our Studios" section before booking with interactive studio tabs: address, opening hours (10 AM - 10 PM), direct call, and Google Maps directions for all 3 outlets. |
| **13** | **Hair Academy Home Entry Point** | **MEDIUM** | `/bhanushairacademy` was only accessible via navbar dropdown, missing discovery for salon visitors interested in courses. | Add a high-converting, elegant editorial banner card on the homepage introducing Bhanu's Hair Academy with course highlights and direct link to `/bhanushairacademy`. |
| **14** | **WebGL & Reduced Motion Accessibility Fallback** | **HIGH** | Users with WebGL disabled or prefers-reduced-motion experienced broken 3D canvas or jarring scrubs. | When WebGL is unavailable or prefers-reduced-motion is true, render static studio photography posters and disable GSAP scrub pins. All content remains 100% readable with JavaScript disabled. |

---

## 5. Needs Owner Confirmation List

The following items are flagged in accordance with the zero-fabrication rule and require owner confirmation:

1. **Google Review Rating & Count:** Currently displaying 4.9★ / 500+ clients. Need Google Business Profile URL and verified rating count.
2. **Studio Contact Numbers:**
   - Palsikar Colony: Currently configured as `+91 98765 43210` (placeholder). Needs real landline/mobile number.
   - Saket Nagar: Needs verified phone number.
   - Vijay Nagar: Needs verified phone number.
3. **Exact Coordinates:** Coordinates for Saket Nagar and Vijay Nagar need verification for Google Maps links.
4. **Service Starting Prices:** Verified price ranges (e.g., Haircut from ₹500, Keratin from ₹3,500, Bridal from ₹8,000) for the 30 services.
5. **Stylist Roster:** Confirmation if stylist profiles (Bhanu + senior team) should be featured on the homepage.

---

## 6. Persisted Design System Reference

The generated design system tokens from UI UX Pro Max are persisted in:
- `design-system/bhanu-s-the-hair-studio/MASTER.md`

All Phase 2–6 component redesigns will import and strictly enforce these tokens via Tailwind CSS utilities and CSS custom properties.
