# Finance

A lightweight founder bookkeeping specification, not an accounting ERP or tax advice. [Finance Ops](../agents/finance-ops.md) prepares clean evidence for Christian and a licensed CPA.

## Canonical record

The intended canonical ledger is one private Google Sheet owned by **christian@marcello.studio**. It has not been created or connected by this task. Until available, use a private local workbook or import-ready draft supplied to Christian; record its location privately and migrate once, rather than maintain two ledgers. These repository files contain definitions and blank templates only.

See [LEDGER_SCHEMA.md](LEDGER_SCHEMA.md) for tabs, fields and bookkeeping rules; [CPA_REVIEW.md](CPA_REVIEW.md) for the review queue. Header-only [templates](templates/) are suitable for Google Sheets import. Do not populate repository templates with real transactions, personal details, receipts, bank/card numbers or private access links. Keep source evidence in restricted storage accessible to Christian and the eventual CPA.

## Manual use today

Ask Codex: “Use agents/finance-ops.md and skills/record-expense.md with this receipt. Prepare the row and flag missing facts.” Supply only relevant evidence. Codex may prepare drafts without a connection; it must say whether an item is drafted, recorded or reconciled. No receipt means a documentation gap, not permission to invent a value.

For revenue, preserve invoice/payment evidence, date, payer reference, gross receipts, fees/refunds and currency using INCOME. For actual cash owner contributions or reimbursements, use FUNDING; paying a business expense personally belongs in EXPENSES, not a duplicate funding deposit. For equipment, create a linked ASSETS reference as well. See the schema before totaling.

Finance reports flow through the [Chief of Staff](../agents/chief-of-staff.md). The [cadence](../company/AGENT_CADENCE.md) is a manual recommendation, not enabled automation. No Sheets, Gmail, bank, receipt-storage or accounting integrations are implemented.
