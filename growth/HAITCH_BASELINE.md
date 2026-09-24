# HAITCH baseline

**As of 2026-09-24:** structural baseline only. No analytics export, Search Console report, inbox counts, sales ledger or press census was supplied for this operating-system update. UNKNOWN means not measured here, not zero. Refresh source access before each review; installed instrumentation does not prove complete collection.

| Measure | Current value | Intended evidence / gap |
| --- | --- | --- |
| Website sessions | UNKNOWN | Vercel Analytics export; preserve its exact visitor/pageview definitions, do not relabel them as sessions |
| Geography | UNKNOWN | Analytics country coverage to verify; approximate country/region/city captured on enquiry/request server paths, not an all-visitor state report |
| Traffic sources | UNKNOWN | Analytics referrer/source export; campaign-level coverage unverified |
| Appointment enquiries | UNKNOWN | HAITCH Shopify enquiry records; email is notification, not a second enquiry |
| Confirmed appointments | UNKNOWN | Tailor confirmation evidence; enquiry submissions alone do not establish bookings |
| Fitting preference | UNKNOWN | New form values available; legacy requests may be unrecorded |
| Remote Atelier access requests | UNKNOWN | Existing Marcello Web3Forms delivery; source marker and timestamp included; no shared client/order join |
| Search visibility | UNKNOWN | Search Console dated query/page/country report; not connected here |
| AI-answer visibility | UNKNOWN | Repeatable manual query sample with engine/date/location and citations; no automated monitoring or claimed share of all answers |
| Press coverage | UNKNOWN | Verified article URLs/dates; no coverage implied by a prospect list |
| Attributed revenue | UNKNOWN | Confirmed commission/order records plus evidenced source relationship and currency |

## Existing implementation evidence

Source inspection on 2026-09-24: adjacent HAITCH repository `components/AppointmentForm.tsx`, `lib/fitting-preference.ts`, `lib/appointment-location.ts`, `app/api/appointment/route.ts`; Marcello [intake component](../apps/web/components/PilotInterest.tsx) and [API](../apps/web/app/api/pilot-interest/route.ts). These establish code paths, not observed usage or verified live inbox delivery.

- HAITCH appointment success emits `appointment_preference_submitted` with preference, after Shopify recording succeeds. Studio email is best-effort. Inspect raw record storage before deciding whether repeated enquiries can be counted independently; do not assume a customer count equals enquiry count.
- Reporting mapping: `new_york` → IN_NEW_YORK; `remote` → REMOTE; `flexible` → FLEXIBLE; `unrecorded`/missing → UNKNOWN. Preserve raw values and count unknowns separately; geography cannot determine preference.
- Remote Atelier emits `remote_atelier_request_access_clicked` and `remote_atelier_access_requested`. The server prepares email, submitted_at, source=marcello_haitch_remote_atelier and approximate IP geography where available; the browser submits directly to Web3Forms. Preparation HTTP 200 is not a delivered request. Metadata is browser-transported and not authenticated evidence. No email/PII is added to these analytics events.
- Custom-event reporting availability depends on the Vercel plan/access; no upgrade or new connection is approved here. Browser analytics may undercount due to blockers or delivery failure. Use confirmed operational records for submission counts when accessible.
- HAITCH metadata/canonical/sitemap/schema work was deployed and verified on 2026-09-24. This is technical readiness, not proof of indexing, rankings or demand. Production-origin claims still need Harry/Nate confirmation; do not amplify unresolved claims.

## Observation log template

Append only when evidence is available. Record: period_start, period_end, timezone, metric, value, unit/definition, source_reference, collected_at, filters, coverage/gaps, comparison_period, interpretation. Use the same denominator and time window for rates; otherwise report counts and the limitation. Keep small samples visible. Separate confirmed zero from unavailable data.

No metric observations recorded yet.
