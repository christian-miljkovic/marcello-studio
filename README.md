# Marcello

Portfolio site and business docs for Marcello — a boutique web studio building websites and applications for fashion brands, labels, and the studios around them. New York.

- **Site** — ultra-minimal one-pager (Next.js App Router, TypeScript, CSS Modules; fully static). `app/page.tsx` is the entire site.
- **`ROADMAP.md`** — working state + milestones. Read this first when picking up work.
- **`docs/`** — business plan & pricing, prospect list (+ CSV tracker), outreach templates.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Vitest + React Testing Library
npm run lint
npm run build
```

## Environment

The `/sketch` feature ("See how we think") generates live design sketches through OpenRouter:

- `OPENROUTER_API_KEY` — create at openrouter.ai **with a per-key spend cap**. Without it, the route serves curated fallback sketches (dev, tests, and prod all work keyless).
- `OPENROUTER_MODEL` — optional model override (default `z-ai/glm-4.6`), e.g. set the GLM 5.2 slug to A/B models without code changes.

Set both locally in `.env.local` and in Vercel project settings for production.
