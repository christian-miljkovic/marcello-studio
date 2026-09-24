# Prepare CPA review

## Input

Private ledger, reconciliation/close summaries, receipts, [CPA review queue](../finance/CPA_REVIEW.md), known CPA meeting date and prior responses if supplied.

## Procedure

1. Group open questions by mixed use, startup/operating, assets, funding, income/recognition and missing evidence; retain source record IDs.
2. Preserve original facts, amounts/currencies and uncertainty. Do not suggest a final deduction, election or tax saving as established.
3. Build a compact private packet with source coverage, evidence references and a clear question for each item. Mark missing evidence rather than inventing it; avoid duplicate questions already answered on unchanged facts.
4. Provide the finished packet to Christian for review. Do not email/share it or connect Gmail/Drive without explicit approval for the recipient and data.
5. When an actual CPA response is supplied, record response/date/reference and apply supported changes to the authorized ledger. Resolve only the questions actually addressed. Set a transaction’s cpa_reviewed flag TRUE only when the CPA review covers the item and all linked questions are resolved; partial answers leave it FALSE. Retain previous answers; reopen and reset the flag if facts change.

## Output

- Private CPA-ready packet and open questions
- Missing supporting evidence
- Responses applied versus pending, with review references
- Concise handoff to Chief of Staff; final tax/accounting decisions remain with Christian and the CPA

Run manually under the [recommended cadence](../company/AGENT_CADENCE.md). Distinguish facts, assumptions and unknowns; link evidence. Follow [root instructions](../AGENTS.md).
