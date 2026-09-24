# Attribution review

## Input

Defined period, supplied analytics/campaign evidence, enquiry/appointment records and private garment/order/payment references. Use [ATTRIBUTION](../growth/ATTRIBUTION.md).

## Procedure

1. Map evidence from discovery/campaign/press/referral through visits, enquiries, confirmed appointments, geography, preference, garment and revenue. Record missing links explicitly.
2. Use only verified stable references or clearly labeled customer self-report. Never infer identity from IP geography, aggregate timing or name similarity; no new tracking or connections.
3. Deduplicate operational records; keep enquiry, booked appointment, order and payment distinct. Preserve raw/normalized preference and unknown geography. Do not merge separate sites’ funnels without evidence.
4. Label each link VERIFIED_LINK, SELF_REPORTED, AGGREGATE_ASSOCIATION or UNKNOWN, with confidence rationale. Retain assisted touchpoints but count each order’s revenue once in totals.
5. Check amounts, currency, refunds and revenue basis with Finance Ops. Do not claim causation from correlation or combine unlike currencies.
6. Update aggregate internal records. Send the Chief of Staff meaningful findings and the smallest useful evidence gap; any proposed new tracking/production change needs separate Christian approval.

## Output

- Attributed and unknown-source outcomes, period and source coverage
- Verified versus self-reported versus associative links
- Unique revenue totals by currency and reporting basis
- Instrumentation gaps and no more than three prioritized proposals

Run manually under the [recommended cadence](../company/AGENT_CADENCE.md). Distinguish facts, assumptions and unknowns; link evidence. Follow [root instructions](../AGENTS.md).
