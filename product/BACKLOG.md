# Validation backlog

Updated 2026-09-22. Authority: [discovery synthesis](../customers/haitch/interviews/2026-09-22-discovery-synthesis.md), [spec](REMOTE_FITTING_SPEC.md), and [roadmap](ROADMAP.md). Checkmarks record the specific delivered work or verification stated below, not proof of measurement accuracy, physical fitting success, iPhone acceptance or deployment. Delivery/test status was confirmed in the 2026-09-22 task handoff; See [implementation verification](../experiments/EXP-001-standardized-capture/VERIFICATION.md) for completed checks and remaining device/deployment work.

## NOW — first 2–3 weeks, validation only

- [x] Ingest Christian's meeting summary and written answers with source locations; separate reported facts, assumptions, hypotheses and open questions.
- [x] Replace pre-interview spec/roadmap placeholders with supported findings and actual unresolved questions.
- [x] Prepare a short observation guide for full MTM/bespoke workflow, especially fitting 2.
- [x] Deliver EXP-001 protocol, benchmark structure and reconciled app/research schema; experiment records distinguish completed preparation from unrun physical/measurement trials.
- [x] Deliver Capture Kit 001 and digital PDF verification: four kit/PDF tests confirmed passing; see [kit verification](../experiments/EXP-001-standardized-capture/kit/verification.txt). Physical print/ruler and iPhone capture checks remain open.
- [x] Deliver company/product documentation, decisions, future opportunities, fitting walkthrough, navigation updates, EXP-000 historical-status clarification and EXP-001/app Noridocs. See the [task changed-files inventory](../experiments/EXP-001-standardized-capture/CHANGED_FILES.md).
- [x] Deliver the isolated internal Safari/PWA capture implementation for Harry/Nate: anonymous IDs, fitting 1/2, originals, paper-sheet preservation, observations, corrections and confirmed values. Seventeen automated app tests confirmed passing in the task handoff; no production website code changes in this task.
- [x] Complete local browser checks for captures, replacements, notes, separate fittings, persistence, archive fixture import, duplicate/malformed rejection, responsive layout and offline reopening. Full iPhone export-to-Files/restore and induced quota failure remain unverified; see the verification report.
- [x] Deploy the separately approved [capture app](https://marcello-capture.vercel.app) to `marcello-capture`; [deployment details](../experiments/EXP-001-standardized-capture/DEPLOYMENT.md). No existing website project was changed.
- [ ] Test real iPhone camera/photo/video picker, retakes, reopen persistence and full archive export/import recovery. Confirm a private backup location, consent and retention/deletion process before client sessions. Local IndexedDB is not cloud backup.
- [ ] Run Christian as Test Subject #001; determine actual framing/distance, check physical print dimensions and repeat captures. Record failures; no pre-filled results.
- [ ] Observe full Haitch MTM/bespoke workflows; collect maker/order/correction sheet examples privately and map definitions/units, body versus garment values, alteration reserves and normal-correction baseline.
- [ ] Begin approximately 5–10 consenting paired records after initial capture/recovery checks: media, professional reference measurements, posture notes, sheet originals; link garment/fitting 2/final outcomes when available.
- [ ] Verify Bodygram/equivalent access, input requirements and field mapping; evaluate with consenting internal subjects where extra attributes are required, without adding age/weight to the core capture experience.
- [ ] Benchmark per-field error, repeatability and condition sensitivity; obtain tailor-approved tolerances and consequence classes. Unknown tolerance remains unknown, never an automatic pass.
- [x] Deliver the [bounded domestic logistics/economics study](../research/remote-fitting-economics.md): MTM plus bespoke 2/3/4/5 fitting-cycle scenarios and explicit convenience-premium assumptions. These are planning estimates, not exact carrier quotes, validated margins or proven willingness to pay.
- [ ] Review evidence and identify commodity-tech coverage, critical gaps and next smallest test. No proprietary model work authorized by this item.

## Immediate follow-up — only if it does not block capture

- [x] Optional paper-sheet transcription and linked human corrections are implemented and synthetic-sheet tested (2026-09-23). Actual handwriting and iPhone acceptance remain open; see [current experiment status](../experiments/EXP-001-standardized-capture/CURRENT_STATUS.md).
- Resolve workflow and device defects found during Christian's session before broader collection.

## LATER — gated, not active builds

- Remote simulation at separate locations; record “If I were there, I would…” and evaluate manual judgment gaps.
- First blind garment only after critical-input and baseline gates; then validate remote fitting 2.
- PE customer research only after Christian's workflow and realistic logistics: present an actual remote proposition and ask whether avoiding repeat NYC trips is worth an extra $1k–$2k.
- Revisit paid use after the first successful revenue-generating remote order. Early $0 software/actual cost-sharing is a hypothesis, not an agreed contract or implemented billing.
- Broader studio possibilities remain in [future opportunities](../company/FUTURE_OPPORTUNITIES.md).

## Questions blocking interpretation

- How do maker fields map to shoulders, back/jacket length, jacket/half waist, the two seat entries, button stance and rise?
- Which directional per-field tolerances and alteration reserves apply, and what is the normal-fitting baseline?
- How does the tailor determine exact take-in/let-out and transmit it to the maker?
- Which measurements are repeatable between professional readings, captures and model runs?
- What actually persists/restores on Harry/Nate's iPhones, and who owns private backups/deletion?
- What are actual demand frequency, costs and customer response to a concrete convenience premium?

Do not work on model training, final luxury packaging, broad marketing, Fashion Week, commerce OS, autonomous agents, international expansion or fundraising. See the [roadmap](ROADMAP.md) for full exclusions.
