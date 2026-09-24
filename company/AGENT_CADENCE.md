# Agent cadence

**Proposed manual cadence, 2026-09-24.** These are recommendations, not enabled schedules or commitments. The brief did not prescribe intervals. Christian invokes a role/skill in Codex; nothing runs in the background. No YAML runtime, cron, queues, workers or external connections are needed.

The Chief of Staff remains the top-level prioritization function. Finance and Growth submit useful evidence to it; Christian receives one consolidated set of at most three priorities, not competing specialist chore lists. Remote fitting validation is the primary milestone. Skip unchanged monitoring and batch missing-information requests. Urgent factual deadlines may be flagged immediately to the Chief of Staff; never invent statutory due dates.

| Trigger / suggested interval | Role and skill | Output / limit |
| --- | --- | --- |
| Receipt, expense or owner payment supplied | Finance Ops · [record-expense](../skills/record-expense.md) | Evidence-backed row or private draft; one batched clarification for material unknowns |
| Revenue receipt / owner cash movement supplied | Finance Ops · [ledger procedure](../finance/LEDGER_SCHEMA.md) | INCOME or FUNDING record; not a new expense |
| Weekly, before company review | Finance Ops · [reconcile-finance](../skills/reconcile-finance.md) | Reconciliation exceptions and documentation gaps; no repeated unchanged reminders |
| After month-end source records are available | Finance Ops · [monthly-finance-close](../skills/monthly-finance-close.md) | Currency-separated cash summary and provisional/complete status based on coverage |
| Before CPA meeting or a material unresolved accounting question | Finance Ops · [prepare-cpa-review](../skills/prepare-cpa-review.md) | Private packet for Christian; no automatic transmission |
| First available export, then monthly or meaningful instrumentation change | Growth · [growth-baseline](../skills/growth-baseline.md) | Comparable baseline, actual coverage and missing fields |
| Weekly, or a credible time-sensitive opportunity | Growth · [growth-opportunity-radar](../skills/growth-opportunity-radar.md) | At most three actions total, or NO ACTION REQUIRED TODAY |
| A relevant story/relationship is shortlisted | Growth · [pr-research](../skills/pr-research.md) | Verified research and draft angle; no outreach |
| Chief of Staff selects a test | Growth · [growth-experiment](../skills/growth-experiment.md) | Small experiment proposal; separate Christian approval before external execution |
| Weekly, combined with existing review | Growth · [growth-weekly-review](../skills/growth-weekly-review.md) | One concise evidence/change summary; reuse radar output rather than duplicate research |
| Monthly, or a commission closes / meaningful campaign ends | Growth + Finance · [attribution-review](../skills/attribution-review.md) | Verified commercial links, unknown sources and smallest useful measurement gap |
| When deciding the next work session | Chief of Staff · [daily-priorities](../skills/daily-priorities.md) | At most three priorities across the company; no mandatory daily status ritual |
| Weekly | Chief of Staff · [weekly-review](../skills/weekly-review.md) | One next-week objective; batch specialist inputs and inbox triage |

Suggested weekly sequence: Finance reconciles supplied sources → Growth reviews only new evidence → Chief of Staff consolidates priorities. Reuse existing artifacts; do not create a report just to prove activity. Suggested manual invocation: “Use agents/chief-of-staff.md and skills/weekly-review.md with the latest finance and growth summaries. Prioritize the fitting milestone.”

## Future automation gate

Only revisit automation when manual repetition is a demonstrated bottleneck. Define a specific data source, owner, permission scope, private storage, output destination, deduplication and failure behavior first, then obtain Christian’s approval. This document grants no authorization to connect accounts, spend, contact anyone, publish, change websites or enable schedules.


## ChatGPT reading context

An explicitly configured ChatGPT scheduled task can use the same role/skill instructions under [SCHEDULED_TASK_CONTEXT.md](SCHEDULED_TASK_CONTEXT.md), reading canonical `launch-site` context each run. This is a separate invocation option, not an enabled scheduler. Existing approval boundaries and the Chief of Staff’s prioritization remain unchanged.
