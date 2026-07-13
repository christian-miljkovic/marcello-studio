# Noridoc: marcello

Path: @/

### Overview

- Portfolio site for the Marcello studio (founder Christian Marcello Miljkovic), a boutique web studio targeting fashion brands, plus the studio's business documents.
- Two pages: the landing page at `/` (@/app/page.tsx, static markup over a background video) and the interactive "See how we think" demo at `/sketch` (@/app/sketch/page.tsx), which generates a live design sketch from three answers via the repo's only API route, @/app/api/sketch/route.ts.
- Built with Next.js 16 App Router + TypeScript + CSS Modules; LLM generation uses the Vercel AI SDK (`ai` + `@openrouter/ai-sdk-provider`) with zod schemas; behavior tests use Vitest + React Testing Library.
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
app/sketch/page.tsx (server, metadata + shell)
  └─ components/SketchFlow.tsx ('use client': 3 questions → fetch)
       └─ POST /api/sketch (app/api/sketch/route.ts)
            ├─ validate body with answersSchema (lib/sketch.ts)
            ├─ lib/generate-sketch.ts → OpenRouter generateObject(sketchSchema)
            └─ on missing key or any error → lib/fallback-sketches.ts
       └─ components/SketchPreview.tsx renders the Sketch tokens
```

- @/lib/sketch.ts is the shared vocabulary: curated `palettes` and `typefaces` maps plus two zod schemas — `answersSchema` (brand/craft/mood, trimmed with length bounds) and `sketchSchema` (palette/typeface/casing enums, hero + sub copy with length caps, exactly four name/price products).
- @/lib/generate-sketch.ts calls `generateObject` against OpenRouter (model from `OPENROUTER_MODEL`, default `z-ai/glm-4.6`) with a taste-rules system prompt; if `OPENROUTER_API_KEY` is unset it returns a fallback immediately. @/lib/fallback-sketches.ts picks one of the canned sketches deterministically from the answer lengths.
- @/app/api/sketch/route.ts returns 400 for unparseable or schema-invalid bodies, catches any generation error by serving a fallback sketch, and sets `maxDuration = 30`. It is the repo's only server-side code.
- @/components/SketchPreview.tsx maps the token names to concrete values via the @/lib/sketch.ts maps and injects them as CSS custom properties (`--sketch-bg` etc.) — the model output never contains markup, colors, or font stacks, only token names and short copy.
- @/app/layout.tsx holds metadata (title MARCELLO, marcello.studio base URL) and loads @/app/globals.css (reset + Helvetica Neue base typography).
- @/app/page.module.css does the landing layout (vertically centered narrow column), uppercase tracked labels, hover underline + ↗ reveal micro-interactions, and a page fade-in that is disabled under `prefers-reduced-motion`.
- Tests in @/tests test behavior, not markup: landing copy/links/mailto (page.test.tsx), the question flow including the error state (sketch-flow.test.tsx), the preview render (sketch-preview.test.tsx), and API validation + fallback behavior (api-sketch.test.ts).

### Things to Know

- The old "fully static" invariant has narrowed: the home page markup is still static but now layers the background video; `/sketch` is client-interactive (@/components/SketchFlow.tsx); `/api/sketch` runs as a serverless function.
- The sketch model is constrained by construction: `generateObject` with `sketchSchema` means the LLM only ever returns schema-validated design tokens and copy, never HTML/CSS. Rendering decisions live entirely in @/components/SketchPreview.tsx.
- Without `OPENROUTER_API_KEY` the entire `/sketch` feature works on the curated fallbacks in @/lib/fallback-sketches.ts — the tests rely on this, so no key or network is needed to run the suite.
- The contact email and domain (`contact@marcello.studio`) are placeholders until the domain purchase (tracked in @/ROADMAP.md week 1). Changing them touches @/app/page.tsx, @/components/SketchFlow.tsx (error and CTA copy), the metadata in @/app/layout.tsx, and @/tests together.
- HAITCH is named on the site but written permission to name them publicly is still pending (tracked in @/ROADMAP.md).

Created and maintained by Nori.
