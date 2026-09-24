# Finance ledger schema

**Status:** proposed Google Sheets specification; no live ledger or integration. Owner: christian@marcello.studio. All tax treatment remains provisional until reviewed by a licensed CPA. This is an operational cash record, not a determination of an accounting method or tax return.

## Tabs and imports

| Tab | Template | Purpose |
| --- | --- | --- |
| EXPENSES | [expenses.csv](templates/expenses.csv) | Purchase/payment facts and linked refunds |
| INCOME | [income.csv](templates/income.csv) | Customer receipts, refunds and invoice references |
| FUNDING | [funding.csv](templates/funding.csv) | Actual owner cash contributions, reimbursements, withdrawals and transfers; never revenue |
| ASSETS | [assets.csv](templates/assets.csv) | Equipment reference register linked to expense rows |
| TRIPS | [trips.csv](templates/trips.csv) | Trip purpose and allocation evidence; related expense IDs |
| SUBSCRIPTIONS | [subscriptions.csv](templates/subscriptions.csv) | Recurring commitments and reconciliation, not additional spending |
| CPA REVIEW | [cpa-review.csv](templates/cpa-review.csv) | Unresolved questions and documented CPA responses |

One header row, one record per row, no merged cells. Import into separate tabs. IDs are stable text (e.g. EXP-000001, INC-000001, FND-000001, AST-000001); check uniqueness before assigning. Dates are `YYYY-MM-DD`; timestamps ISO 8601 with timezone. Amounts are decimal numbers without currency symbols; currencies are ISO three-letter codes. Boolean fields use TRUE/FALSE; blank means unknown where stated. Do not turn unknown money into zero. Protect headers and use validation lists when the Sheet is eventually created; that setup is not performed now.

## EXPENSES

| Field | Definition / allowed values |
| --- | --- |
| transaction_id | Unique expense ID; never regenerated on re-import |
| date | Actual payment date; preserve source transaction date in notes if different |
| vendor | Vendor shown in evidence |
| amount | Full original amount; positive purchase, negative linked refund; never silently net mixed use |
| currency | Original currency; required for any total |
| category | Provisional category from list below |
| description | What was purchased |
| business_purpose | Specific business reason; blank if unconfirmed, then flag |
| paid_from | PERSONAL_CARD, MARCELLO_CARD, MARCELLO_BANK, PERSONAL_BANK, OTHER, UNKNOWN; no account numbers |
| funding_treatment | OWNER_PAID_BUSINESS_EXPENSE, BUSINESS_FUNDS, UNKNOWN; OWNER_CONTRIBUTION is reserved for FUNDING cash movements |
| business_use_percent | 0–100 only with supporting basis; blank if unknown |
| receipt_url | Private receipt/reference link; missing receipt flagged, never fabricated |
| client_or_project | Stable project/client reference, or STUDIO_GENERAL if supported |
| startup_vs_operating | STARTUP_REVIEW, OPERATING_PROVISIONAL, UNKNOWN, CPA_CONFIRMED_STARTUP, CPA_CONFIRMED_OPERATING |
| asset_flag | TRUE/FALSE, or blank pending review; potential asset is not immediate tax expensing |
| tax_review_status | One primary provisional label below; retain additional issues in CPA REVIEW |
| notes | Source facts, uncertainty and changes; no tax certainty |
| cpa_reviewed | FALSE until an actual CPA review covers the item and all linked questions are resolved; TRUE only with linked evidence; reopen resets FALSE |
| created_at / updated_at | Record timestamps; keep original created_at |
| transaction_kind | PURCHASE or REFUND |
| related_transaction_id | Original expense ID for refund; blank for purchase |
| source_reference | Private statement/invoice/receipt reference for deduplication and reconciliation |
| allocation_basis | Evidence for business-use percentage; unknown stays unknown |
| reconciliation_status | UNRECONCILED, MATCHED, EXCEPTION; matching evidence is not CPA approval |
| cpa_review_id | Linked CPA REVIEW ID when applicable |

Categories: SOFTWARE, HOSTING, ADVERTISING, RESEARCH_AND_DEVELOPMENT, PROTOTYPE_MATERIALS, TRAVEL, PROFESSIONAL_SERVICES, CONTRACTORS, EQUIPMENT, CLIENT_EXPENSES, SHIPPING_AND_LOGISTICS, PHOTOGRAPHY_AND_PRODUCTION, PR_AND_MEDIA, OTHER.

Tax review labels: LIKELY BUSINESS; MIXED USE; ASSET / CAPITAL ITEM; STARTUP COST REVIEW; CPA REVIEW REQUIRED; NON-BUSINESS / DO NOT CLAIM. These labels do not establish deductibility. Category names such as RESEARCH_AND_DEVELOPMENT do not determine statutory tax treatment. Set the most decision-relevant primary label and retain every unresolved issue in CPA REVIEW. CPA conclusions are recorded there with source/date, not inferred from a label.

## Other tab fields

The CSV headers are the import contract. Shared fields use the EXPENSES definitions unless clarified here.

- **INCOME:** transaction_id, date, payer_reference, amount, currency, transaction_kind (`CUSTOMER_RECEIPT` / `CUSTOMER_REFUND`), description, client_or_project, invoice_reference, received_into, related_transaction_id, source_reference, reconciliation_status, notes, created_at, updated_at. Amount is gross received, with linked refunds negative. Record processor fees once as expense rows; reconcile gross minus fees to net deposit. An invoice not yet paid is not received income. Do not infer earned/taxable revenue from cash receipts; CPA reviews deposits and recognition questions.
- **FUNDING:** transaction_id, date, amount, currency, transaction_kind (`OWNER_CONTRIBUTION`, `OWNER_REIMBURSEMENT`, `OWNER_WITHDRAWAL`, `ACCOUNT_TRANSFER`, `CARD_REPAYMENT`, `REVIEW_REQUIRED`), from_source, to_source, funding_treatment, related_transaction_id, source_reference, cpa_review_id, notes, created_at, updated_at. Amount is positive magnitude; from/to define direction. Contributions use OWNER_CONTRIBUTION; reimbursement/transfer use BUSINESS_FUNDS if evidenced; unknown stays UNKNOWN. For reimbursement, each row links one expense ID and its allocated amount; split a multi-expense transfer into unique funding rows sharing its source_reference, with allocations summing exactly to the actual transfer. Record the approved reimbursement basis (full purchase or specified business portion) and amount in notes; do not infer it from provisional business use. Unknown allocations/basis remain exceptions and cannot support per-expense balances. This records observed movement, not a final equity-versus-loan classification.
- **ASSETS:** asset_id, expense_transaction_ids, description, acquisition_date, placed_in_service_date, cost_basis_review, currency, business_use_percent, location_reference, receipt_url, disposition_date, cpa_review_id, notes, created_at, updated_at. Cost basis and depreciation treatment are CPA questions; leave unconfirmed cost_basis_review blank. Acquisition cost comes from expense links. No depreciation election or schedule generated automatically.
- **TRIPS:** trip_id, start_date, end_date, destination, business_purpose, client_or_project, expense_transaction_ids, personal_component, allocation_basis, evidence_url, cpa_review_id, notes, created_at, updated_at. `personal_component`: YES/NO/UNKNOWN. Link original expenses; no second expense amount.
- **SUBSCRIPTIONS:** subscription_id, vendor, service, amount_per_cycle, currency, billing_frequency, paid_from, business_purpose, client_or_project, business_use_percent, next_renewal_date, status, expense_transaction_ids, last_reconciled_at, source_reference, notes, created_at, updated_at. Frequency: MONTHLY/ANNUAL/OTHER/UNKNOWN; status: ACTIVE/CANCELLED/PAUSED/UNKNOWN. Renewal commitments are not paid expenses. No cancellation or new purchase is authorized by this register.
- **CPA REVIEW:** review_id, source_tab, source_record_id, question, source_facts, provisional_label, evidence_url, amount_at_issue, currency, status, cpa_response, cpa_reference, cpa_reviewed_at, resolution_applied_at, notes, created_at, updated_at. Status: OPEN/AWAITING_EVIDENCE/READY_FOR_CPA/RESOLVED. See [review guidance](CPA_REVIEW.md).

Multiple references within a cell use semicolons. Split mixed-category purchases only if useful; each split gets its own ID, links the common source and split basis, and split amounts must sum to the original. Do not retain both the full expense and its splits in totals.

## Totals and reconciliation rules

1. Expenses are signed EXPENSES rows only. Report gross cash spending separately from provisional business allocation (`amount × business_use_percent / 100` where known). Show unknown allocations separately, not as zero or 100%; neither subtotal is a tax deduction calculation.
2. Cash receipts come from INCOME only, with refunds linked and signed. Report this cash-based measure explicitly; CPA-confirmed recognized revenue may differ. Owner contributions are not income. Never count a deposit twice as a customer receipt and a bank transfer.
3. A personally paid $100 purchase and later $100 reimbursement remain one $100 expense plus a linked FUNDING movement. A $500 owner deposit followed by a $100 business purchase is $500 contributed and $100 spent—not $600 of expense. Card repayments are transfers, not a second purchase.
4. Report owner-paid purchases and business-paid purchases separately; show actual owner cash contributions and reimbursements as separate measures. Do not add contributions to owner-paid spending and call the result expenses. Net unreimbursed owner-paid amount uses the documented approved reimbursement basis minus matched allocated reimbursement rows; unknown basis, unmatched movements and over-reimbursement stay exceptions. Report gross owner-paid spending separately from this balance.
5. ASSETS, TRIPS and SUBSCRIPTIONS annotate transactions; never add their amounts again to cash totals. Show asset purchases separately from ordinary spending, with unknown asset status flagged. No automatic capitalization, depreciation or tax treatment.
6. Summarize each currency separately. If conversion is later needed, preserve the original and add reporting_currency, exchange_rate, exchange_rate_date, exchange_rate_source and reporting_amount. No silent FX conversion or sum of unlike currencies.
7. Deduplicate by stable ID and source reference, then investigate matching vendor/date/amount/currency; two genuine identical purchases may exist. Do not delete a suspected duplicate without evidence. Preserve corrections and reversals with notes/source links.
8. Reconcile supplied statements to transactions and opening/closing balances when available, separately by account and currency. State missing statement periods; a close may be provisional. Reconciliation does not mean CPA review or deductible status.
