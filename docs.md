# Noridoc: marcello

Path: @/

### Overview

- One-page static portfolio site for the Marcello studio (founder Christian Marcello Miljkovic), a boutique web studio targeting fashion brands, plus the studio's business documents.
- Built with Next.js 16 App Router + TypeScript + CSS Modules; behavior tests use Vitest + React Testing Library.
- The repo carries two distinct concerns: the site itself under @/app and @/tests, and the business operation (plan, prospects, outreach, lead scoring) under @/docs and @/ROADMAP.md.

### How it fits into the larger codebase

- This is a standalone repo — there is no larger application. The split to understand is site code vs. business documents: @/docs and @/ROADMAP.md are never rendered by the site.
- @/ROADMAP.md is the session-continuity file: agents read it first, do the next unchecked item, and update its "Current state" section before finishing. It is the single source of truth for where the business stands.
- The toolchain deliberately mirrors `~/fun/haitch` (Next 16, Vitest 4, eslint-config-next flat config); the HAITCH rebuild in that repo is the studio's anchor case study and one of the two client links on this site.
- Business documents in @/docs cover positioning and pricing (business-plan.md), the outreach tracker (prospects.md + prospects.csv), the lead-scoring rubric for future agents (lead-criteria.md + lead-scoring-examples.csv), and outreach templates/drafts.

### Core Implementation

- The entire site is @/app/page.tsx: wordmark, positioning line, a Selected Clients list, and a mailto contact link. The client list is the `clients` array at the top of that file (HAITCH → haitch-usa.com, NON GRATA → magazinenongrata.com); client links open in new tabs with `rel="noopener noreferrer"`.
- @/app/layout.tsx holds metadata (title MARCELLO, marcello.studio base URL) and loads @/app/globals.css (reset + Helvetica Neue base typography).
- @/app/page.module.css does the layout (vertically centered narrow column), uppercase tracked labels, hover underline + ↗ reveal micro-interactions, and a page fade-in that is disabled under `prefers-reduced-motion`.
- @/tests/page.test.tsx tests behavior, not markup: visible copy, client link destinations, new-tab safety (`noopener`), and a working mailto.

### Things to Know

- The site must stay fully static: no images, no client JS beyond CSS transitions. `next build` prerenders `/`.
- The contact email and domain (`contact@marcello.studio`) are placeholders until the domain purchase (tracked in @/ROADMAP.md week 1). Changing them touches @/app/page.tsx, the metadata in @/app/layout.tsx, and @/tests/page.test.tsx together.
- HAITCH is named on the site but written permission to name them publicly is still pending (tracked in @/ROADMAP.md).

Created and maintained by Nori.
