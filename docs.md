# Noridoc: marcello

Path: @/

### Overview

- Portfolio site for the Marcello studio (founder Christian Marcello Miljkovic), a boutique web studio targeting fashion brands, plus the studio's business documents. Live at marcello.studio.
- Two pages: the landing page at `/` (@/app/page.tsx, static markup over a background video) and "See how we think" at `/sketch` (@/app/sketch/page.tsx) — a multi-section design-concept generator that doubles as the studio's lead-capture funnel. Server code is two API routes: sketch generation (@/app/api/sketch/route.ts) and dynamic OG cards (@/app/api/og/route.tsx).
- Built with Next.js 16 App Router + TypeScript + CSS Modules; LLM generation uses the Vercel AI SDK (`ai` + `@openrouter/ai-sdk-provider`) with zod schemas; leads/notifications go through Web3Forms; pageviews/events through `@vercel/analytics`; behavior tests use Vitest + React Testing Library.
- The repo carries two distinct concerns: the site itself under @/app, @/components, @/lib, and @/tests, and the business operation (plan, prospects, outreach, lead scoring) under @/docs and @/ROADMAP.md.

### How it fits into the larger codebase

- This is a standalone repo — there is no larger application. The split to understand is site code vs. business documents: @/docs and @/ROADMAP.md are never rendered by the site.
- @/ROADMAP.md is the session-continuity file: agents read it first, do the next unchecked item, and update its "Current state" section before finishing. It is the single source of truth for where the business stands.
- The toolchain deliberately mirrors `~/fun/haitch` (Next 16, Vitest 4, eslint-config-next flat config); the HAITCH rebuild in that repo is the studio's anchor case study and one of the two client links on this site.
- Business documents in @/docs cover positioning and pricing (business-plan.md), the outreach tracker (prospects.md + prospects.csv), the lead-scoring rubric for future agents (lead-criteria.md + lead-scoring-examples.csv), and outreach templates/drafts.

### Core Implementation

- The landing page is @/app/page.tsx: wordmark, positioning line, a Selected Clients list, a mailto contact link, and a "See how we think" link to `/sketch`. The client list is the `clients` array at the top of that file (HAITCH → haitch-usa.com, NON GRATA → magazinenongrata.com); client links open in new tabs with `rel="noopener noreferrer"`.
- The landing page layers a black-and-white background video behind the content: @/public/background.mp4 (~10s grayscale loop, no audio, ~389KB) with @/public/background-poster.jpg as the poster, in an `aria-hidden` fixed wrapper (`.video` in @/app/page.module.css) whose `::after` applies an 82% white veil so text keeps contrast. The whole video layer is `display: none` under `prefers-reduced-motion`.
- The `/sketch` flow, end to end:

```
app/sketch/page.tsx (async server component)
  ├─ ?s= share param → lib/share.ts decodeShare
  │    ├─ valid → render the shared sketch immediately ("Start your own")
  │    │          + generateMetadata points og:image at /api/og?s=...
  │    └─ invalid/absent → fresh question flow
  └─ components/SketchFlow.tsx ('use client': 3 text questions
       + "What should we sketch?" artifact chooser)
       ├─ POST /api/sketch (app/api/sketch/route.ts)
       │    ├─ validate answers + artifact (+ optional revision) with zod
       │    ├─ lib/generate-sketch.ts → OpenRouter generateObject(sketchSchema)
       │    ├─ quota error (lib/errors.ts) → { limited: true }
       │    ├─ any other error → lib/fallback-sketches.ts (or the unchanged
       │    │    sketch, if this was a revision)
       │    ├─ server stamps sketch.artifact = visitor's choice
       │    └─ fires a Web3Forms notification raced against a 2s timer
       ├─ components/SketchPreview.tsx renders the multi-section concept page
       └─ done-state footer: revision notes (lib/revise.ts local resolution,
            else POST with revision), "Copy link" (lib/share.ts encodeShare),
            and components/LeadCapture.tsx (email → Web3Forms)
```

- @/lib/sketch.ts is the shared vocabulary: curated `palettes` (each with bg/ink/muted/`accent`), `typefaces`, and `artifacts` (display labels for storefront/landing/press) maps, plus two zod schemas — `answersSchema` (brand/craft/mood, trimmed with length bounds) and `sketchSchema` (palette/typeface/casing/`layout`/`artifact` enums, hero + sub + `aboutLine` copy with length caps, exactly four name/price products).
- @/lib/generate-sketch.ts calls `generateObject` against OpenRouter (model from `OPENROUTER_MODEL`, default `z-ai/glm-4.6`) with a taste-rules system prompt that includes the chosen artifact; if `OPENROUTER_API_KEY` is unset it returns a fallback (or the unchanged sketch for revisions) immediately. Each of its two attempts is bounded by a 10s `AbortController` timeout so the route always answers inside Vercel's `maxDuration = 30` — previously a slow model ate the whole budget and the platform killed the function before the fallback path could run (visitors saw "The pencil broke"). @/lib/fallback-sketches.ts picks one of the canned sketches deterministically from the answer lengths.
- Revision notes: after a sketch renders, "Ask for a change" accepts a short note (3 revisions max, tracked in @/components/SketchFlow.tsx). @/lib/revise.ts first tries to resolve purely token-level notes locally with regex tables — palette words ("warmer" → blush), typeface, casing, and layout words ("centered"/"split"/"poster") — and only sends the note to the model (as `revision: { sketch, note }`) when unmatched words remain. A failed model revision degrades to the unchanged sketch, never a reset.
- Share links have zero storage infrastructure: @/lib/share.ts base64url-encodes the whole `{answers, sketch}` JSON into `/sketch?s=...` — the URL is the storage. `decodeShare` returns null (never throws) for anything invalid or tampered, which falls back to the question flow. @/app/api/og/route.tsx renders the link-preview card with `ImageResponse` in the sketch's palette.
- Lead capture is two-pronged: @/components/LeadCapture.tsx is an in-page email form in the done-state footer that POSTs the brief + share URL to Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY`); success promises a hand-made take within 48 hours, and a missing key or failure degrades to the mailto CTA. Server-side, @/app/api/sketch/route.ts sends a Web3Forms notification per generation (`WEB3FORMS_KEY`, skipped for revisions) raced against a 2s timer so it can never delay or block the visitor's sketch.
- @/components/SketchPreview.tsx renders a scrolling multi-section page: nav bar → full-viewport hero (composition varies by the `layout` token) → collection section that varies by `artifact` (storefront: product grid with prices; landing: teaser tiles without prices + faux "Notify me" signup; press: numbered "Available to preview" list + personalized press office block) → editorial strip (`aboutLine` on an accent band) → concept footer. It maps token names to concrete values via the @/lib/sketch.ts maps and injects them as CSS custom properties (`--sketch-bg` etc.); tile swatches use accent-keyed gradients layered with an inline SVG-noise grain in @/components/SketchPreview.module.css. Model output never contains markup, colors, or font stacks — only token names and short copy.
- @/app/layout.tsx holds metadata (marcello.studio base URL), loads @/app/globals.css (reset + Helvetica Neue base typography), and mounts `<Analytics/>` from `@vercel/analytics` for pageviews; @/components/SketchFlow.tsx and @/components/LeadCapture.tsx fire `track('sketch_generated')` / `track('lead_submitted')` custom events.
- @/app/page.module.css does the landing layout (vertically centered narrow column), uppercase tracked labels, hover underline + ↗ reveal micro-interactions, and a page fade-in that is disabled under `prefers-reduced-motion`.
- Tests in @/tests test behavior, not markup: the landing page, the question flow (including artifact chooser, revisions, copy link, and error/limited states), the preview per artifact/layout, API validation + fallback + artifact stamping + notification behavior, share encode/decode round-trips, the shared-link server page, and lead capture. Shared sketch fixtures live in @/tests/fixtures.ts; the whole suite runs keyless with no network.

### Things to Know

- The old "fully static" invariant has narrowed: the home page markup is still static but now layers the background video; `/sketch` is client-interactive (@/components/SketchFlow.tsx); `/api/sketch` runs as a serverless function.
- The sketch model is constrained by construction: `generateObject` with `sketchSchema` means the LLM only ever returns schema-validated design tokens and copy, never HTML/CSS. Rendering decisions live entirely in @/components/SketchPreview.tsx.
- Without `OPENROUTER_API_KEY` the entire `/sketch` feature works on the curated fallbacks in @/lib/fallback-sketches.ts — the tests rely on this, so no key or network is needed to run the suite. The same keyless-degradation rule holds for Web3Forms: no `NEXT_PUBLIC_WEB3FORMS_KEY` means the lead form renders as a mailto link, and no `WEB3FORMS_KEY` means no notification is attempted.
- The `?s=` share param is attacker-controllable input: `decodeShare` size-caps it, try/catches the decode, and zod-validates every field (enums + length caps), and decoded strings are only ever rendered as React/satori text nodes. Keep it that way — never interpolate decoded values into markup, URLs, or headers.
- The visitor's page-type choice is authoritative: @/app/api/sketch/route.ts stamps `artifact` over the model's output on every response, so prompt drift can't flip a shopping page into a press page mid-revision.
- The site is live at **marcello.studio** and `contact@marcello.studio` is the real contact address. Changing it touches @/app/page.tsx, @/components/SketchFlow.tsx and @/components/LeadCapture.tsx (error/CTA copy), the metadata in @/app/layout.tsx, and @/tests together.
- HAITCH is named on the site but written permission to name them publicly is still pending (tracked in @/ROADMAP.md).

Created and maintained by Nori.
