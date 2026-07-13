# Marcello — Roadmap & Working State

> **How to use this file (humans and agents):** this is the single source of truth for where the business stands. Any agent picking up work should read this first, do the next unchecked item in the nearest horizon, and update the **Current state** section + checkboxes before finishing. Keep dates absolute.

**Goal: $100,000/year revenue run-rate.**
*(= "base" scenario in `docs/business-plan.md`. Christian: adjust this number if your target differs — everything else scales from it.)*

---

## Current state (update every session)

*Last updated: 2026-07-13 by Claude (evening)*

- **/sketch is now the site's centerpiece**: full-viewport generated storefront concept (GLM 5.2 via OpenRouter, low reasoning effort — critical, reasoning models otherwise time out), atelier build-sequence loading state, 3-revision "Ask for a change" notes (palette/type/casing resolve locally, rest via model), honest quota-limit message, mobile-safe footer. OG link-preview image at /opengraph-image.

- Studio identity chosen: **Marcello Studio** (Christian Marcello Miljkovic). Positioning: "a creative technology and design studio for fashion" — high touch, for brands + PR studios.
- Portfolio site built at `~/fun/marcello/` (branch `launch-site`): tests green, lint clean, static build passing. Left-aligned layout; tagline "High touch, from the first conversation to the final creation."; contact is `contact@marcello.studio` — **domain not yet purchased, email not yet set up**.
- Domain shortlist: **marcello.studio ($21.99/yr, recommended)**, marcellostudio.co ($29.99), marcello-studio.com / themarcellostudio.com / studio-marcello.com ($11.25). marcello.com and marcellostudio.com are taken. (Availability checked 2026-07-13 — recheck at purchase.)
- Research done (2026-07-13): pricing benchmarks (in `docs/business-plan.md` §4), 29-prospect outreach list (`docs/prospects.md` + `.csv`, all `status=none`), outreach templates (`docs/outreach-templates.md`).
- Gmail drafts for top prospects: created 2026-07-13 in Christian's Gmail (unsent, must be re-sent from studio address once it exists).
- HAITCH rebuild (`~/fun/haitch`) is the anchor case study — **not yet shipped; no written permission yet to name them publicly**.
- Code on GitHub: `christian-miljkovic/marcello-studio` (branches `main` + `launch-site`), connected to Vercel project `marcello` — **pushes to `main` auto-deploy to production; other branches get preview URLs**. Stable URL `marcello-christianmiljkovics-projects.vercel.app` — **currently behind Vercel Authentication (default)**; not publicly viewable until protection is disabled in project settings or the custom domain is attached (custom domains are always public). Note `marcello.vercel.app` belongs to someone else.
- Gmail connector token expired mid-session, so the 5 wave-1 emails live as text in `docs/outreach-drafts.md` instead of Gmail drafts.
- Blockers: domain purchase + studio email (Christian, manual); Vercel deployment-protection toggle (Christian, manual — Settings → Deployment Protection); Slang employment-agreement moonlighting review (Christian, manual).

## Week 1 (by 2026-07-20)

- [ ] Christian: buy domain (recommend marcello.studio) and set up studio email (e.g. Google Workspace or iCloud+ custom domain)
- [ ] Christian: review Slang employment agreement for moonlighting/IP clauses
- [ ] Update site + templates if chosen domain/email differ from `contact@marcello.studio` (one-line changes: `app/page.tsx`, `docs/outreach-templates.md`)
- [ ] Attach domain to Vercel project `marcello`; site live on real domain (this also makes it public — until then, optionally disable Vercel Authentication in project settings to share the .vercel.app URL)
- [ ] Create OpenRouter API key **with a spend cap** and add `OPENROUTER_API_KEY` (+ optional `OPENROUTER_MODEL`, e.g. GLM 5.2 slug) to Vercel env — until then /sketch serves curated fallback sketches
- [ ] Ask HAITCH founders for written OK to name them (site + outreach) — ideally a quote too

## Month 1 (by 2026-08-13)

- [ ] Ship HAITCH rebuild to production
- [ ] Manually verify Tier 1 + Tier 2 prospect sites still have the flagged weaknesses; update `prospects.csv`
- [ ] Send outreach wave 1: all Tier 1 (7) + top Tier 2 (Aubero, Anthony Brooks) — from studio email, personalized
- [ ] IG-DM the no-email prospects (Archie, Max Esmail, Monday Blues, Don't Let Disco, Sofia Bib, The Archives)
- [ ] 2+ discovery calls booked
- [ ] Define the paid discovery-sprint one-pager ($1.5k–$2.5k, credits toward build)

## Quarter 1 (by 2026-10-13)

- [ ] All 29 prospects contacted; funnel data in `prospects.csv` (replies/calls/discoveries)
- [ ] 1 paid discovery sprint completed
- [ ] **First signed build ($6k+) — the business is real when this checks**
- [ ] HAITCH case study live on site (with permission); "Selected clients" grows to 3+ names
- [ ] Ask every call for one introduction; log referrals
- [ ] Revisit pricing against actual close rate (raise floors if closing >50%)

## Year 1 (by 2027-07-13) — the $100k run-rate

- [ ] ~4 brand/PR sites shipped ($6k–$12k each)
- [ ] 1+ custom storefront build ($18k–$35k)
- [ ] 3 active retainers ($2k–$4k/mo) ← this is the run-rate engine; attach one to every build
- [ ] Referral flywheel: ≥2 projects sourced from PR-firm introductions
- [ ] Quarterly: re-run prospect research (new NYFW/CFDA/Fashionista cohorts each season)
- [ ] Decide: stay solo boutique vs. first contractor (only if base scenario hit 2 quarters straight — see business plan §8)

## Parking lot (explicitly not now)

Productized subscription tier · non-fashion clients · subcontractors · paid ads/SEO services · blog/content marketing
