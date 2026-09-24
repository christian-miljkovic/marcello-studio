# Monthly finance close

## Input

Month, private ledger and source evidence, latest reconciliation, funding movements and asset/subscription registers. Follow [Finance Ops](../agents/finance-ops.md).

## Procedure

1. Run [reconcile-finance](reconcile-finance.md) for the period. State unavailable accounts/dates; mark the close PROVISIONAL if coverage or material exceptions prevent closure.
2. Summarize revenue evidence: gross customer cash receipts, refunds and net receipts by currency. Label these as cash-based; do not assert recognized revenue or final tax treatment without CPA guidance.
3. Summarize gross purchases/refunds and separately provisional business allocation and unknown allocation. Distinguish ordinary spending, linked asset acquisitions and uncertain asset items; never add asset-register amounts twice.
4. Show owner-paid purchases, business-paid purchases, actual owner contributions and reimbursements as distinct figures. Link reimbursements before describing any unreimbursed balance. No transfer is a second expense.
5. List assets acquired and recurring subscriptions, renewal commitments separately from paid charges, CPA review questions and missing documentation. Preserve currency; no unsupported FX conversion.
6. Prepare a dated private summary/snapshot with source references and unresolved items. Preserve original rows and amendments; do not lock access, pay bills or file anything. Send the concise summary to the Chief of Staff.

## Output

- Month, basis, coverage, currency and PROVISIONAL / RECONCILED status
- Customer receipts/revenue evidence, expenses, owner-funded and business-paid breakdowns
- Asset acquisitions, subscriptions and renewal commitments
- CPA questions, missing documents and reconciliation exceptions

Run manually under the [recommended cadence](../company/AGENT_CADENCE.md). Distinguish facts, assumptions and unknowns; link evidence. Follow [root instructions](../AGENTS.md).
