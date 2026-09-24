# Attribution

Question: **Which Marcello/HAITCH activities actually create commissions?**

Desired evidence chain:

```text
DISCOVERY SOURCE
  → CAMPAIGN / CONTENT / PRESS / REFERRAL
  → VISIT
  → APPOINTMENT
  → GEOGRAPHY
  → FITTING PREFERENCE
  → GARMENT
  → REVENUE
```

Geography and preference are dimensions attached to a request/customer, not sequential conversion events. Cross-site visits are not automatically joined. Do not infer a person’s location or identity from aggregate traffic.

## Minimal future record

A private attribution record may include: attribution_id, client_or_project, discovery_source, source_detail, campaign_reference, content_or_press_url, referral_reference, visit_reference, enquiry_reference, appointment_reference, enquiry_date, appointment_status, country, region, city, geography_source, fitting_preference_raw, fitting_preference_normalized, garment_or_order_reference, order_date, gross_amount, refunds, currency, net_amount, attribution_basis, confidence, evidence_reference, observed_at and gaps. Unknown fields stay blank/UNKNOWN; no required fabrication to complete a chain. Use stable private references instead of names/emails in repository reports.

## Present coverage and gaps

| Link | Evidence available in implementation | Missing / requires validation |
| --- | --- | --- |
| Discovery → campaign | Analytics/referrer reporting may help | No verified campaign registry or first/last-touch capture on intake |
| Campaign → visit | Website analytics installed | No checked export, session definition or campaign-level completeness |
| Visit → enquiry | Appointment success event and Shopify record path | No verified visitor-to-enquiry join; ad blockers and repeated requests complicate totals |
| Enquiry → confirmed appointment | Enquiry captured | Tailor confirmation/status not established by a submission |
| Enquiry → geography/preference | Server approximate IP geography and form preference | Legacy/absent fields; geography is not residence or desired fitting location |
| Remote Atelier → HAITCH appointment | Separate request delivery and events | No cross-site identity or shared request-to-appointment link |
| Appointment → garment/revenue | Potential tailor/order evidence | No connected commission IDs, refunds, payment reconciliation or source allocation |

Use [baseline mappings](HAITCH_BASELINE.md); do not modify instrumentation as part of these documents.

## Attribution rules

- Mark basis: VERIFIED_LINK (traceable matching records), SELF_REPORTED (customer statement with source), AGGREGATE_ASSOCIATION (hypothesis only), or UNKNOWN. Confidence is HIGH/MEDIUM/LOW/UNKNOWN with rationale; never upgrade association into a deterministic attribution.
- Preserve competing touchpoints. If an order has multiple sources, report assisted touches and one unique order total rather than credit its entire revenue to every channel. No invented fractional weights.
- Count distinct source records after investigating duplicates. Keep enquiries, booked appointments, orders and paid commissions separate; cancellations/refunds remain visible.
- Revenue must have verified amount, currency and reporting basis. Summarize by currency; distinguish bookings from cash received and net from gross. Reconcile with Finance Ops before claiming a commercial result.
- Do not use IP geography for identity matching, fingerprint visitors, join people by guesswork or put PII in analytics. Any new capture/join requires separate approval and an appropriate private data location.
- Without a defensible join, report “source unknown” and the smallest evidence gap. Do not attribute revenue merely because a press story and a sale occurred in the same week.

Review manually using [attribution-review](../skills/attribution-review.md). No attribution integration exists by virtue of this specification.
