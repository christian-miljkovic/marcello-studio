# Decisions

Append-only log. Add a dated entry to supersede a decision; preserve the original and explain the change. These entries record the current direction supplied by Christian on 2026-09-21.

## 2026-09-21 — Marcello Studio remains the master public brand

Decision:
Keep Marcello Studio as the simple public master identity.

Why:
A single identity preserves clarity and brand desirability.

Implications:
Use the canonical Client Work / Marcello Work framing; no additional official public divisions.

## 2026-09-21 — Creative technology for fashion

Decision:
Use “Creative technology for fashion” as canonical positioning.

Why:
Fashion-native creative quality defines the studio.

Implications:
Align company context and concept reviews with this framing; avoid generic SaaS/AI positioning.

## 2026-09-21 — Remote fitting is the current Marcello Work priority

Decision:
Prioritize remote fitting for premium made-to-measure and bespoke clothing.

Why:
The blind-garment milestone gives research a concrete validation target.

Implications:
Keep the roadmap sparse and broader ideas in future opportunities.

## 2026-09-21 — Haitch is the initial design partner

Decision:
Use Haitch as the initial design partner and test environment.

Why:
The tailoring workflow provides the starting context for validation.

Implications:
Interview Nate, record evidence, and leave unknown requirements TBD.

## 2026-09-21 — Defer always-on autonomous agent infrastructure

Decision:
Do not build always-on autonomous agent infrastructure yet.

Why:
It does not establish whether remote fitting works.

Implications:
Keep agent roles and skills as lightweight instruction files; add no agent runtime.

## 2026-09-21 — Use Codex manually

Decision:
Use Codex manually from the existing development environment until manual orchestration becomes a bottleneck.

Why:
Manual operation is sufficient for the current stage.

Implications:
Christian selects roles and procedures per task; require evidence of a bottleneck before reconsidering orchestration.

## 2026-09-21 — Start with one monorepo

Decision:
Keep company context, research, experiments, and product code in one monorepo initially.

Why:
Shared context should remain available to agents and engineers.

Implications:
Keep the website in apps/web and organize knowledge by purpose; add future apps or shared packages only when needed.

## 2026-09-22 — Discovery now informs validation, not another blank interview

Decision:
Use the [source-backed discovery synthesis](../customers/haitch/interviews/2026-09-22-discovery-synthesis.md) and updated spec as current knowledge. This supersedes the pre-interview implication of the 2026-09-21 design-partner entry; the original entry remains historical.

Why:
Christian supplied a meeting summary and written answers establishing the measurement list, posture observations, correction risks and remote blockers. These are reported findings, not a verbatim transcript or observed outcomes.

Implications:
EXP-001 can now be defined around standardized capture and an existing-model benchmark. Observe the remaining workflow directly, especially fitting 2; obtain maker definitions and per-field tolerances rather than treating all requirements as unanswered. Reported pain is not quantified demand. The approximately ¼–⅜ inch working scale is not a universal tolerance. Source: synthesis S1/S2; B1 Tasks 1–3.

## 2026-09-22 — First 2–3 weeks are validation only

Decision:
Collect paired records, observe Haitch's complete workflow, benchmark existing technology and identify precise gaps before proprietary CV. Christian is the planned internal Test Subject #001; approximately 5–10 consenting subjects is the initial cohort target.

Why:
The unknown is what Marcello needs to invent, not whether it can build a larger platform.

Implications:
Use Bodygram as the first evaluation candidate subject to access, input and field-mapping verification. No model training, proprietary reconstruction, final packaging, broad GTM, Fashion Week, commerce OS, international rollout, fundraising or agent infrastructure. Simulation, blind garment and remote fitting 2 remain later evidence gates. No physical results are implied. Source: B1 strategy, Tasks 3–7 and founder priorities.

## 2026-09-22 — Internal capture preserves the paper workflow and paired outcomes

Decision:
Use anonymous IDs to connect fitting 1, garment context, fitting 2 and final outcomes as available. Preserve original media and paper measurement/correction sheets; structured observations and human-confirmed values supplement them.

Why:
The valuable research connects body, tailor judgment, actual garment, corrections and final outcome. Fitting 2 reveals information absent from circumference alone.

Implications:
Harry/Nate are the initial app users; no customer self-measuring or required age/weight fields. Upload-first is sufficient; automatic extraction is follow-up if simple and must not silently become confirmed data. Capture setup aids are research prototypes; no body stickers or claim that a calibration card improves Bodygram. Source: S2 Q4/Q8; B1 data principle and Tasks 4–7.

## 2026-09-22 — Isolated static capture app with local storage and private archives

Decision:
Implement the internal mobile Safari/PWA tool separately at `experiments/EXP-001-standardized-capture/app`, using local IndexedDB for original blobs and records, plus full archive export/import. No accounts or cloud customer storage yet. A separate static Vercel deployment may be used if feasible; deployment completion is not asserted here.

Why:
Christian's documentation assignment selects the smallest isolated implementation for the experiment without changing the production website.

Implications:
Make local-device storage explicit. Static hosting is not data backup. Validate the real iPhone native picker, persistence, large media and full archive recovery, including Safari/Home Screen behavior, before client use. Keep verified backups private, outside Git/public assets; establish consent, access, retention and deletion. Engineering owns technical test/deployment evidence. Source: B2 assignment; B1 Task 5 storage/privacy.

## 2026-09-22 — Commercial direction remains a hypothesis

Decision:
Record bespoke as a possible first wedge, not a proven choice. Record $0 Marcello software fees during experimentation, appropriate actual material/shipping cost-sharing, and the first successful revenue-generating remote order as a likely paid-use discussion trigger, all as working business hypotheses.

Why:
The sources report inconvenience and possible convenience value but no quantified demand, margin validation or willingness to pay.

Implications:
Do not build billing or formalize pricing/contracts. Keep the PE customer as future research after Christian's workflow and realistic logistics; then ask about a specific service avoiding repeat NYC trips for an extra $1k–$2k. This is not a customer commitment. Source: S1 Economics; S2 Q10; B1 commercial hypothesis and PE customer test.

## 2026-09-23 — Optional sheet extraction with preserved human corrections

Decision:
Christian explicitly requested trying measurement extraction from physical tailor notes to learn from corrections, and approved use of the existing OpenRouter account with a shared studio access code. Use the isolated capture app's server function to transcribe a selected sheet through OpenAI GPT-4.1 via OpenRouter on explicit request.

Why:
Pairing the source sheet, machine suggestion and tailor's reviewed value exposes transcription errors, missing information and useful requirements. A tailor must check suggested values and units before confirmation.

Implications:
Preserve source snapshots, original suggestions, linked edits/removals and manually added values in local records and backups. No automatic model training, body-photo measurement inference or centralized customer database. Disclose sheet transmission in the UI; send no other fitting notes or body photos. Server API key stays private; the shared studio code controls the reading endpoint. Real handwriting and actual iPhone workflows still require validation. Source: Christian's explicit request and account approval in this task on 2026-09-23.


## 2026-09-24 — Manual Finance Ops and Growth & Distribution specialists

Decision:
Add Finance Ops and Growth & Distribution as internal role definitions, repeatable manual skills and lightweight records. Keep the Chief of Staff as top-level prioritization and remote-fitting validation as the primary Marcello Work milestone. HAITCH is the first laboratory for a secondary brand-respecting growth/distribution Client Work capability.

Why:
Christian requested disciplined bookkeeping and qualified-demand research that remove labor rather than generate more founder chores.

Implications:
The intended canonical finance ledger is a private Google Sheet owned by christian@marcello.studio; this update creates only its specification and blank templates, not a Sheet or connection. Finance preserves facts and uncertainty; Christian and a licensed CPA finalize tax/accounting decisions. Growth may research, draft and analyze internally; outreach, publishing, spending, public claims and production changes require Christian’s approval. Both report to the Chief of Staff. Recommended manual cadences do not enable schedules. No runtime, workers, services or integrations are added. Public Client Work / Marcello Work framing and the product roadmap remain unchanged. Source: Christian’s operating-system brief supplied 2026-09-24.


## 2026-09-24 — Canonical GitHub context for scheduled recommendations

Decision:
Use `christian-miljkovic/marcello-studio`, branch `launch-site` (the existing GitHub default), as the canonical shared operating context for ChatGPT tasks. Publish role definitions, skills, planning records, blank finance templates and a portable experiment status; retain private financial/customer/source records outside this public repository.

Why:
Christian explicitly requested that scheduled tasks read current repository context rather than depend on conversation memory.

Implications:
Read AGENTS.md, the relevant role/skill, current roadmap/backlog/decisions and experiments before recommendations. This publication does not create schedules, a runtime, external connections or authority to email, publish, spend or modify production. Chief of Staff consolidates priorities and remote fitting remains primary. Website source migration and production deployments remain separate. This supplements the manual-operation decision without authorizing autonomous execution.
