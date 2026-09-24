# CPA review

This file defines the private **CPA REVIEW** tab; it is not a public queue of Christian’s financial details. Use [cpa-review.csv](templates/cpa-review.csv) and [ledger definitions](LEDGER_SCHEMA.md). No actual CPA review has been performed by creating these files.

Record one specific question per review ID, linked to the original record(s), source facts, receipt/reference, provisional label and unresolved amount/currency if known. Preserve uncertainty about mixed use, startup versus operating costs, assets/capitalization, owner funding treatment, personal items, missing documentation and revenue recognition. Do not infer a tax outcome from the category.

## Review lifecycle

1. OPEN: question recorded with original facts.
2. AWAITING_EVIDENCE: supporting documentation missing; specify the smallest missing fact once.
3. READY_FOR_CPA: evidence packet prepared; no answer implied and no automatic email sent.
4. RESOLVED: actual CPA response, date and reference retained; state which records changed and when. Keep question-level resolution here. Mark a linked expense cpa_reviewed=TRUE only when an actual CPA review covers the item and all linked questions are resolved; a partial answer leaves it FALSE. Reopen if facts change, reset the expense flag to FALSE and preserve the prior response.

## Packet for Christian and CPA

- Reporting period, currency, source coverage and reconciliation limitations.
- Concise grouped questions with record IDs and restricted evidence links.
- Full original amounts, proposed business-use allocation and basis kept distinct.
- Owner-paid purchases, cash contributions, reimbursements and asset purchases separated.
- CPA response space and unapplied follow-ups; no assumed deduction percentages or tax savings.

Christian approves sharing with the named CPA and finalizes accounting/tax decisions with them. Finance Ops prepares records; it does not file, elect an entity treatment or issue final legal/accounting advice.
