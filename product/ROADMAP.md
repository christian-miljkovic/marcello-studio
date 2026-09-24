# Remote fitting validation roadmap

Updated 2026-09-22 from the [discovery record](../customers/haitch/interviews/2026-09-22-discovery-synthesis.md) and Christian's execution brief. Haitch is the founding design partner. This is an evidence-gated sequence, not a delivery promise or a complete remote-tailoring product plan.

## First 2–3 weeks — validation only

Run the smallest useful capture and workflow tests. Start with Christian as Test Subject #001; target approximately 5–10 consenting subjects after device handling and the protocol work. These are proposed activities, not completed captures or enrollment. Phases 0–4 may overlap as evidence becomes available; time passing does not satisfy a gate.

| Phase | Work | Evidence needed before advancing |
| --- | --- | --- |
| 0 — Standardized data collection | Isolated Safari/PWA capture tool; physical Capture Kit 001; Christian's repeated front/side/back/other-side photos and rotation video; record actual iPhone setup | Usable capture sequence, original paper/media preservation, same-ID fitting 1/2 records; actual iPhone persistence and full archive export/import recovery; physical print scale and camera setup checked |
| 1 — Observe full Haitch workflow | Observe MTM and bespoke from order through final fitting; prioritize fitting 2; obtain maker and correction sheets | Record see/touch/pinch/pin/chalk/change actions, how quantities are known, information sent to maker, definitions/units, alteration limits and a normal-correction baseline |
| 2 — Collect paired records | Approximately 5–10 consenting subjects; standardized images/video, professional measurements, posture observations and original sheet; link garment and fitting 2 when available | Traceable paired records, confirmed units/fields, capture conditions, consent and private backups; missing garment/fitting outcomes explicitly marked unknown |
| 3 — Benchmark existing measurement technology | Evaluate Bodygram first or equivalent after access/input verification; compare to professional reference; repeat Christian captures under varied camera placement/clothing/natural posture | Per-field absolute error, repeatability/variation, capture sensitivity, known tolerance status and consequence; report unsupported fields and uncertainty; no average-only pass |
| 4 — Identify Marcello gaps | Separate what commodity technology solves from unresolved critical measurements, judgments and potential physical aids | Evidence-backed gap list and a proceed/adapt/stop decision; no automatic authorization to train a model |

[EXP-001](../experiments/README.md) owns the protocol, benchmark and implementation records. The capture tool stores data locally in IndexedDB with full archive export/import; no accounts or cloud customer storage yet. Static deployment is separate from backup. Confirm actual iPhone Safari/Home Screen behavior and a private archive recovery process before collecting consenting-client data. See the [specification](REMOTE_FITTING_SPEC.md).

## Later, gated validation

**Phase 5 — Remote simulation:** Christian and Harry/Nate operate from separate locations once capture, recovery, and workflow gaps are understood. Record every “If I were there, I would…” as an unmet requirement. This is not evidence of a blind garment if the tailor already measured Christian.

**Phase 6 — First blind garment:** only when critical data and the normal-fitting comparison baseline are adequate, make a garment for someone Nate/Harry have never physically measured. Record actual corrections and compare with that baseline. The milestone remains unachieved until garment evidence supports it.

**Phase 7 — Remote fitting 2:** only after the first-garment workflow is sufficiently validated. Test whether visual/manual garment corrections can be captured remotely. A toile, machine-readable garment, calibrated clips, deformation analysis or adjustment tool needs a measured failure to justify it. These are research options, not features to build now.

## Commercial hypothesis, not a pricing plan

Bespoke may be the better starting wedge; MTM shipping/service overhead may be harder to absorb. Neither is established by demand or margin data. During early experiments, the working hypothesis is $0 Marcello software fees, with actual material/shipping costs paid by Haitch/test customers where appropriate. A first successful revenue-generating remote order is the likely point to discuss paid use. No billing or contract now. The [economics research index](../research/README.md) tracks the bounded logistics study.

Only after Christian's workflow and realistic logistics are validated, consider the existing PE customer as a future test subject and ask about a concrete service avoiding repeat New York trips at an extra $1k–$2k. Do not infer willingness to pay from interest in testing.

## Christian's next 3 actions

1. Test capture on himself as Test Subject #001 with the actual iPhone; verify original media, persistence, private archive export/restore, physical setup and professional reference measurements.
2. Sit with Harry/Nate for the full MTM/bespoke workflow using the [short fitting walkthrough](../customers/haitch/FITTING_WALKTHROUGH_GUIDE.md), especially fitting 2; obtain maker/correction sheets and per-field definitions.
3. Begin paired collection with consenting subjects once the protocol and data handling pass; retain originals, confirmed measurements and repeat runs, then benchmark existing technology.

## Do not work on

- Proprietary CV/model training, reinforcement learning, recursive self-improvement, or custom 3D human reconstruction.
- Final luxury packaging, broad marketing/GTM or fundraising.
- Fashion Week, fashion commerce OS/Shopify replacement, or consumer garment generator.
- Autonomous agent infrastructure or international expansion.

Preserve broader possibilities in [future opportunities](../company/FUTURE_OPPORTUNITIES.md). They do not change the current validation priority.
