# Record expense

## Input

Receipt/statement or other source facts, payment source, business purpose, and the private ledger or a private draft destination. Follow [Finance Ops](../agents/finance-ops.md) and [ledger schema](../finance/LEDGER_SCHEMA.md).

## Procedure

1. Extract date, vendor, full amount, currency and source reference without inventing missing facts. Check existing IDs/source references for duplication before adding a row.
2. Identify who actually paid and from which source; distinguish a personally paid purchase from a cash owner contribution or later reimbursement. Route actual cash movements to FUNDING, customer receipts to INCOME.
3. Capture the specific business purpose and project. Link the receipt privately; if absent, retain the source reference and flag missing documentation.
4. Assign a provisional category. Ask whether personal use exists; preserve full cost, allocation basis and an evidenced percentage, or leave percentage unknown. Never default to 100%.
5. Flag potential equipment/assets and startup-versus-operating uncertainty; create linked ASSETS/CPA REVIEW references where appropriate. Use review labels rather than certainty about deductions.
6. Return a private import-ready row, or update the authorized canonical ledger when available. Preserve timestamps and change notes. State drafted versus recorded; do not claim a Sheet was updated without access.
7. Batch only material missing facts for the Chief of Staff; never make final tax claims, file taxes or initiate reimbursement.

## Output

- Row(s), stable IDs and receipt/source reference
- Provisional category, allocation and unresolved treatment
- Missing evidence / CPA review links
- Storage status: DRAFT or RECORDED, with destination stated privately

Run manually under the [recommended cadence](../company/AGENT_CADENCE.md). Distinguish facts, assumptions and unknowns; link evidence. Follow [root instructions](../AGENTS.md).
