# Marcello Studio

New York. **Creative technology for fashion.**

## Current objective

Validate remote fitting for premium made-to-measure and bespoke clothing. Haitch is the initial design partner and test environment.

**Current milestone:** Produce a garment for a customer whom Nate/Harry have never physically measured, with corrections no greater than those expected during a normal first fitting.

## Operating principles

1. Evidence before speculative development.
2. Prefer the smallest decisive experiment.
3. Do not prematurely productionize.
4. Do not let future Marcello ideas distract from the current milestone.
5. Preserve Marcello's fashion-forward creative quality.
6. Avoid generic SaaS and generic AI aesthetics.
7. Human craftspeople remain central to the experience.
8. Clearly distinguish facts, assumptions, and hypotheses; retain explicit unknowns for missing evidence; do not revert established reported answers to blanket `TBD`.
9. Record meaningful decisions in the appropriate repository document; company decisions go in the append-only log.
10. Do not modify the production website unnecessarily when working on company/product research tasks.

Use Codex manually from the existing development environment. Role and skill files are instructions, not an execution platform. Do not build always-on autonomous agent infrastructure yet. The source-backed discovery now supports EXP-001 standardized capture and an existing-model benchmark. The first 2–3 weeks are validation only: Christian as Test Subject #001, workflow observation, paired data and technical gap identification. No physical outcomes or per-field numeric tolerances are established by the interview. Do not turn historical strategy into current commitments.

## Repository navigation

- Temporary capture: [company inbox](company/INBOX.md). Treat unprocessed entries as unverified, never as commitments; triage into durable documents before acting on them.
- Company: [vision](company/VISION.md), [brand](company/BRAND.md), [canonical organization](company/ORGANIZATION.md), [decisions](company/DECISIONS.md), [future opportunities](company/FUTURE_OPPORTUNITIES.md).
- Active product work: [roadmap](product/ROADMAP.md), [backlog](product/BACKLOG.md), [specification](product/REMOTE_FITTING_SPEC.md).
- Customer evidence: [Haitch](customers/haitch/README.md), [discovery synthesis](customers/haitch/interviews/2026-09-22-discovery-synthesis.md), [short fitting walkthrough](customers/haitch/FITTING_WALKTHROUGH_GUIDE.md); retain source references and avoid committing sensitive customer information without explicit appropriateness.
- Research: [index](research/README.md); distinguish observed evidence from vendor claims and inference.
- Experiments: [conventions](experiments/README.md).
- Agent roles: `agents/`; operating procedures: `skills/`. Christian references these manually for each task.
- Website source and deployment: [apps/web](apps/web/README.md).
- Historical strategy: `archive/legacy-roadmap/`; superseded by the current company/product documents.

## Current capture and evidence boundaries

The isolated internal Safari/PWA capture app lives at `experiments/EXP-001-standardized-capture/app`. The selected storage is local device IndexedDB with original blobs and full archive export/import; no accounts or cloud customer data yet. Static deployment is separate from data backup. Actual iPhone Safari/Home Screen behavior, persistence and private archive recovery require device validation before client use. Keep sensitive media, sheets and backups out of Git/public assets.

Preserve the paper workflow and human-confirmed values; no client self-measuring, required age/weight fields, proprietary CV training or billing. Bodygram is an evaluation candidate, not a proven measurement solution. Reported pain is not quantified demand, the meeting summary is not a verbatim transcript, ¼–⅜ inch is not a per-field tolerance, and bespoke as the starting wedge is a hypothesis.

EXP-000 is historical discovery work; EXP-001 and the current spec govern active validation. In parallel work, respect assigned file ownership and preserve other contributors’ uncommitted changes.

## Optional sheet extraction (2026-09-23)

Christian explicitly authorized sheet transcription through the existing OpenRouter account, using OpenAI GPT-4.1, followed by tailor correction. EXP-001 now has one isolated server function protected by a shared studio access code. Only the selected sheet is sent on an explicit click; records remain local. Preserve original sheet snapshots, unconfirmed suggestions and linked human corrections in exports. This is transcription research, not body measurement/CV or automatic model training. Secrets remain server-side. No cloud record database was added.


## Internal finance and growth operations

The [internal roster](company/ORGANIZATION.md#internal-operating-roles) includes [Finance Ops](agents/finance-ops.md) and [Growth & Distribution](agents/growth-distribution.md). They report to the Chief of Staff; remote-fitting validation remains the primary milestone. Use [finance definitions and blank templates](finance/README.md), [growth records](growth/README.md) and the [recommended manual cadence](company/AGENT_CADENCE.md). Role/skill files are manually invoked instructions, not installed autonomous agents.

Keep live financial records, receipts, private contact details and customer data out of Git/public assets. The intended private Google Sheet owner is christian@marcello.studio; no new account connections are established by these documents. Finance prepares records for a licensed CPA, not final tax decisions. Growth may research/draft/analyze internally; Christian approves outreach, publication, spending, public claims and production changes. Specialist recommendations must reduce labor, not generate additional founder chores.


## GitHub shared context

For ChatGPT scheduled-task recommendations, use `christian-miljkovic/marcello-studio` on **launch-site**. Read this file first, then [SCHEDULED_TASK_CONTEXT.md](company/SCHEDULED_TASK_CONTEXT.md) for exact role/skill inputs, current evidence and approval boundaries. The public GitHub context includes a [portable EXP-001 status](experiments/EXP-001-standardized-capture/CURRENT_STATUS.md); some local implementation/research links are not published. Missing source access must be reported, not filled from memory. No schedules or external actions are authorized merely by publishing these instructions.
