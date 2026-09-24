# Reconcile finance

## Input

A defined date range, supplied private ledger, statements/payment evidence, subscription register and prior exception list. Follow [Finance Ops](../agents/finance-ops.md) and [ledger schema](../finance/LEDGER_SCHEMA.md).

## Procedure

1. State source coverage by account, currency and dates; missing sources remain gaps, not a clean reconciliation.
2. Match source transactions to ledger IDs and amounts. Compare opening/closing balances when supplied. Investigate duplicate IDs and suspicious vendor/date/amount matches without deleting genuine repeat purchases.
3. Identify missing receipts, unclear business purposes, unknown/mixed use, owner-paid purchases missing from the ledger, and subscriptions with missing/duplicate charges or unverified renewal status.
4. Check that owner contributions, card repayments and reimbursements are transfers, not duplicated expenses or revenue. Link refunds and fees correctly. ASSETS/TRIPS/SUBSCRIPTIONS must not duplicate expense totals.
5. Propose source-backed corrections; record their evidence when applying to an authorized ledger. Preserve unresolved differences and an exception owner/next evidence needed.
6. Update last-reconciled coverage, not CPA-reviewed status. Give the Chief of Staff one concise change/exception summary; do not reissue unchanged chores or connect a bank/account.

## Output

- Period, sources, coverage and matched/unmatched totals by currency
- Corrections made versus proposed
- Missing receipts, duplicate candidates, mixed use, missing owner-paid expenses and unreconciled subscriptions
- Only new/material exceptions, with smallest next evidence needed

Run manually under the [recommended cadence](../company/AGENT_CADENCE.md). Distinguish facts, assumptions and unknowns; link evidence. Follow [root instructions](../AGENTS.md).
