# Scheduled task context

Canonical repository: **christian-miljkovic/marcello-studio**, branch **launch-site** (GitHub default). Use this branch explicitly; do not substitute `main`, an older checkout or remembered conversation context. This document enables shared reading context, not a scheduler or agent runtime. Cadence recommendations alone do not create ChatGPT tasks.

## Read in order on every run

1. [AGENTS.md](../AGENTS.md) first.
2. The relevant role under `agents/`, followed by its skill below.
3. Current [roadmap](../product/ROADMAP.md), [backlog](../product/BACKLOG.md), [decisions](DECISIONS.md), [experiment index](../experiments/README.md) and [current experiment status](../experiments/EXP-001-standardized-capture/CURRENT_STATUS.md), before recommendations. Use the latest dated evidence, not elapsed time, to infer progress.
4. [Vision](VISION.md), [Brand](BRAND.md), [Organization](ORGANIZATION.md), [cadence](AGENT_CADENCE.md), then the task-specific records below. Chief of Staff remains the prioritization function; remote-fitting validation remains the primary milestone.

## Task reading lists

| Task | Role / skills | Additional records |
| --- | --- | --- |
| Growth Radar | `agents/growth-distribution.md`; `skills/growth-opportunity-radar.md`; `skills/pr-research.md` for shortlisted stories | `growth/README.md`, `growth/HAITCH_BASELINE.md`, `growth/OPPORTUNITIES.md`, `growth/PRESS_RADAR.md`, `growth/CONTACTS.md`, `growth/EXPERIMENTS.md`, `growth/ATTRIBUTION.md` |
| Weekly Founder Review | `agents/chief-of-staff.md`; `skills/weekly-review.md`; `skills/daily-priorities.md` | `company/INBOX.md`, `product/REMOTE_FITTING_SPEC.md`, `growth/HAITCH_BASELINE.md`, `growth/OPPORTUNITIES.md`, `growth/EXPERIMENTS.md`, `finance/README.md`, `finance/CPA_REVIEW.md`; latest authorized private finance summary if supplied |
| Finance Check | `agents/finance-ops.md`; `skills/reconcile-finance.md`; `skills/monthly-finance-close.md` at month-end; `skills/prepare-cpa-review.md` when relevant | `finance/README.md`, `finance/LEDGER_SCHEMA.md`, `finance/CPA_REVIEW.md`, `finance/templates/*.csv`; authorized private ledger/receipts if separately available |

Read every common file above plus the relevant row. Repository templates are definitions, not populated financial records. The proposed private Google Sheet is not connected. Missing financial or analytics access means unavailable evidence, never zero activity or a completed reconciliation. GitHub access does not grant Gmail, Sheets, analytics or customer-record access.

## Output and authority

- Cite repository paths and the branch/commit or retrieval date actually read. Separate facts, hypotheses, stale evidence and unavailable sources. If repository retrieval fails, report that limitation; do not pretend remembered context is fresh.
- Growth submits at most three actions total, or `NO ACTION REQUIRED TODAY.` Weekly Founder Review consolidates all roles into at most three priorities and one next-week objective. Finance reports only material changes, exceptions and CPA questions. Avoid repeated unchanged chores.
- Never directly publish, email, contact prospects, spend money or modify production systems without Christian’s explicit approval of the concrete action. A scheduled-task prompt, role definition or Chief of Staff recommendation does not itself authorize those actions. Do not push repository changes as part of these reading/recommendation tasks without explicit authorization.
- No final tax determinations, filings or entity elections: Christian finalizes accounting/tax decisions with a licensed CPA.
- This repository is public. Do not add private ledgers, receipts, credentials, personal contact lists, client media or private interview-source links. Such evidence stays in separately authorized restricted storage.

## Scope and freshness

This context publication includes operating documents and a portable EXP-001 status summary. Some detailed local implementation, interview and research references are not published in this commit; report them as unavailable if needed, and do not infer their contents. Local absolute paths cannot be opened by a GitHub-connected task. Use CURRENT_STATUS for the bounded experiment handoff.

The root legacy `ROADMAP.md`, historical `docs/` business strategy and old website-development README do not override `AGENTS.md`, `product/ROADMAP.md` or newer dated decisions. Website source migration/deployment is separate from this documentation commit; GitHub context and live production are different states.
