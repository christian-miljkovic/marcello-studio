# EXP-001 — current shared status

Reviewed 2026-09-24 for the GitHub operating-context handoff. This is a portable summary of local implementation/verification records, not a new experiment result. Follow the [roadmap](../../product/ROADMAP.md), [backlog](../../product/BACKLOG.md) and [specification](../../product/REMOTE_FITTING_SPEC.md).

## Implemented and observed in software

- The separate internal capture app is deployed at https://marcello-capture.vercel.app. Harry/Nate enter a client name; the app assigns an internal ID and requires an explicit choice when continuing a matching saved client. Names are not silently merged.
- Captures, paper-sheet originals, tailor notes and human-confirmed measurements remain local to the device, with private archive export/import. No shared client database or cloud record backup is established.
- Optional sheet transcription through OpenRouter/OpenAI was approved by Christian and tested with a synthetic printed sheet. The tailor reviews suggestions and corrections; this is transcription, not body-measurement computer vision. Original suggestions and linked human corrections are retained.
- Numbered tailor workflow, archive/restore and stale-release fixes have software/browser verification. The latest recorded capture software check has 37 automated tests passing (2026-09-23). That count is historical verification, not evidence of a new test run today or actual iPhone acceptance.

## Not established

No actual paired research cohort, Bodygram accuracy benchmark, per-field numerical tolerance approval, successful blind garment, customer willingness to pay, or validated economics is recorded. Actual iPhone capture/persistence/backup recovery and handwritten-sheet accuracy remain acceptance work. Do not turn deployment or an email enquiry into proof of fitting feasibility or demand.

## Next evidence gates

1. Validate actual iPhone collection and recoverable private backups with Christian as Test Subject #001 before broader client collection.
2. Observe the complete Haitch MTM/bespoke workflow, especially fitting 2; obtain maker definitions, units, directional tolerances, alteration reserves and a normal-fitting correction baseline.
3. Collect approximately 5–10 consenting paired records only after initial handling checks. Preserve originals, professional reference values and condition changes.
4. Benchmark existing measurement technology against independent references; identify critical unsupported fields and consequences before considering proprietary development.

EXP-000 is historical discovery, not the active plan. The blind-garment milestone remains unachieved without actual garment evidence. Private source notes, participant records and detailed local implementation artifacts are intentionally outside this public context publication. Missing access does not establish completion or failure.
