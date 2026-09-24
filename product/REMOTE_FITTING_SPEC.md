# Remote Fitting Spec v1 — discovery-backed validation

Updated 2026-09-22. Evidence: [Haitch discovery synthesis](../customers/haitch/interviews/2026-09-22-discovery-synthesis.md) (S1 meeting summary; S2 written Q&A; B1 execution brief; B2 storage decision). The meeting date is unverified; source messages are not a verbatim transcript. Findings below are reported workflow evidence unless explicitly marked proposed, hypothesis, or unresolved.

## Objective and product principles

For the first 2–3 weeks: collect high-quality paired data, observe the complete workflow, benchmark existing measurement technology, and identify specific gaps. The eventual milestone is a garment for someone Nate/Harry have never physically measured, requiring no more corrections than a normal first fitting. Define that comparison baseline with Haitch before attempting the milestone. Christian's measured internal trial is preparation, not proof of a blind garment.

**Technology backstage. Craftsmanship frontstage.** The human tailor controls the fitting. No customer self-measuring or locating anatomical tape landmarks. The long-term service should feel like a private tailor appointment wherever the customer is, with convenience as an upgrade. Internal capture by Harry/Nate is a research workflow, not the final customer journey. Bespoke as the initial commercial wedge remains a hypothesis. [S1 Context/Economics; B1 mission/principles]

## Fitting 1

Purpose: capture body dimensions plus posture and shape information sufficient to make the first garment. Professional reference measurement remains the comparator; a model estimate is not ground truth. [S2 Q1–Q3; B1]

### Measurements and provisional priority

Retain the supplied names and paper sheet; the table does not supply missing values, definitions, or numeric tolerances. “Important/adjustable” below is a provisional interpretation of S2's “everything else, close enough” statement, to be checked by the tailor. [S2 Q1, Q3, Q6, Q8]

| Supplied field | Provisional consequence class | Definition or limit to resolve |
| --- | --- | --- |
| Chest | Important / potentially adjustable | Circumference alone misses depth distribution; confirm landmark and ease distinction |
| Jacket waist | Important / potentially adjustable; may overlap critical half waist | Confirm whether/when this is the half-waist field; never silently equate them |
| Seat | Important / potentially adjustable | Confirm jacket/body seat meaning and largest-part landmark |
| Overarm | Important / potentially adjustable | Confirm method and maker use |
| Back length | Critical if it determines jacket length | Confirm back length versus finished jacket length and endpoints |
| Sleeve length | Relatively forgiving when alteration reserve exists | Too short without reserve can be irreversible |
| Shoulders | Critical / remake risk, especially too small | Confirm width/slope definitions, direction and alteration limits |
| Trouser waist | Potentially adjustable | Taking in may be easier; remote let-out amount is unresolved |
| Trouser seat | Important / potentially adjustable | S2 repeats “seat”; brief identifies this as trouser seat; confirm on sheet |
| Outseam | Relatively forgiving length if reserve permits | Confirm endpoints; shortness may be irreversible |
| Inseam | Relatively forgiving length if reserve permits | Confirm endpoints; shortness may be irreversible |
| Knee | Important / potentially adjustable | Confirm width/circumference and alteration reserve |
| Bottom hem | Important / potentially adjustable | Confirm width/circumference; do not confuse hem opening with trouser length |

Additional **critical variables** from the risk answers: jacket length, button stance/button position, half waist, and trouser rise. These are not all separately present in the measurement list. Obtain their actual maker fields rather than inventing measurements. Anything too short to lengthen can cause a remake. [S2 Q3, Q6; S1 Tolerances]

### Visual observations and tailor judgment

Record shoulder slope, square shoulders, dropped left/right shoulder, head forward, hollow back, prominent shoulder blades, prominent chest, prominent seat, hips forward/backward, legs open/closed, arms forward/backward and sleeve pitch. Record freeform explanations and asymmetry. Circumference does not determine where a customer carries depth. [S2 Q2, Q4]

### Manual/tactile information and positioning

Reported blockers: an untrained client may miss the largest chest/seat location or length endpoints; almost all self-measures require a helper. The exact touch, landmark selection, stance checks, and pattern adjustments used in person remain to be observed, not reconstructed from the summary. [S2 Q8]

**Proposed capture standard, not a validated measurement method:** front, side, back, other side, then about 10–15 seconds of rotation video; natural posture, no artificial “stand straight”; fitted clothing where practical; iPhone 1×, no portrait mode or digital zoom; full body and feet visible; camera approximately level and framing consistent. Determine distance using the actual iPhone and full-body framing, then record it. No invented fixed distance. The [experiment index](../experiments/README.md) points to the owned protocol and physical setup. [B1 Task 4]

### Tolerances and irreversible mistakes

The summary's approximately **¼–⅜ inch** is a reported working scale, not an approved tolerance for any individual field. Per-field allowable error remains unresolved and may be asymmetric. Judge errors by remake risk, difficult correction, normal alteration, or forgiving adjustment; do not declare success from average error alone. [S1 Tolerances; S2 Q3, Q6]

Too-small shoulders, problematic button stance, raising trouser rise, and anything too short without lengthening reserve are specifically reported as irreversible/remake risks. Sleeve/trouser length and perhaps taking in waist are easier conditional cases, not guarantees. Exact costs, limits, and frequency are unknown. [S2 Q6, Q8]

## Fitting 2 — garment on body

This is the first time the actual garment is worn. Harry/Nate assess how fabric made up, whether initial visual judgments held, body depth versus the pattern, and where the garment must come in or go out. Balance, fit, and garment-specific corrections are required observation topics from the brief. These cannot all be inferred from a tape circumference. [S2 Q4; B1 Fitting 2]

The exact pinch/pin/pull/chalk sequence, correction quantities, and transfer to the maker remain unobserved. For each action record what was noticed, what changed, **how they knew how much**, whether it was recorded/sent, and whether remote instruction or a physical tool could reproduce it. Use the [short walkthrough guide](../customers/haitch/FITTING_WALKTHROUGH_GUIDE.md).

Retain standardized garment-on-body photos/video, the original correction sheet, confirmed structured corrections where available, and notes under the same anonymous Client ID as fitting 1. Link fabric, construction, order/maker information when available; absence is explicitly unknown. Do not require duplicate manual transcription of their whole paper workflow. [B1 data principle, Task 5]

Remote blocker: exact take-in/let-out is hard to judge without seeing the garment in person; letting out was described as especially difficult. No remote correction method has been validated. [S2 Q8]

## Fitting 3 and final outcome

Reported expectation: minor final tweaks, with a third fitting rarely needed if earlier work went well. No observed frequency or MTM/bespoke breakdown is available. Keep final alterations and tailor assessment linked to the garment and earlier fittings; final outcome is not equivalent to measurement accuracy. [S2 Q5; B1 data principle]

## Maker handoff

A screenshot of maker information was promised, but its receipt/content is not evidenced here. Obtain the real order/measurement and correction sheets, definitions, units, pattern changes, and transmission method. Establish which posture judgments reach the maker and which remain tacit. Do not label a generic measurement table as Haitch's validated factory schema. [S2 Q7]

## Internal capture tool and data handling

**Selected implementation scope (B2):** an isolated static mobile Safari web app/PWA at `experiments/EXP-001-standardized-capture/app`, intended for Harry/Nate. Native iPhone photo/video picker; anonymous Client ID and fitting 1/2; large guided capture steps with replacement; original measurement/correction-sheet uploads; structured posture observations and notes; editable human-confirmed measurement/correction records. No accounts, cloud customer storage, customer age/weight fields, custom camera engineering, billing, or model training.

**Local device storage:** IndexedDB retains original media blobs plus metadata, fitting number, timestamps, observations, confirmed measurements and corrections. A full export/import archive is the transfer and backup mechanism; a metadata-only export is insufficient. The deployment serves static app files; hosting on Vercel does not mean captured records are backed up to Vercel. Deployment and actual implemented feature status are tracked by the engineering owner, not certified by this specification.

Before consenting-client use, validate on the actual iPhone: Safari and Home Screen picker behavior, image/video and sheet originals, reopen persistence, large-media handling, full archive export and restore on a clean target, and fitting 1/2 linkage. Do not assume Safari and an installed web app share a store. Changing devices, browser context or deployment origin may require archive import. Clearing site data/device loss can lose records; local storage is not a backup. Keep a verified private backup after sessions and before changing browser/origin/device. Never put client images, measurement archives, or consent records into the repo or public deployment. The current archive format is unencrypted; local deletion does not remove previously exported copies. Agree private backup location, access, consent, retention and deletion with Haitch; see the [engineering storage record](../experiments/EXP-001-standardized-capture/app/STORAGE.md). Anonymous IDs do not make body images non-sensitive. [B1 privacy/storage; B2]

Paper-sheet upload must preserve originals first. As authorized on 2026-09-23, optional sheet transcription is available through an isolated OpenRouter/OpenAI function; any proposed value must remain unconfirmed until a human checks it. Record units and source and retain edits/confirmed values alongside the original sheet. A blank field is unknown, not zero. Do not block capture on extraction. The approved data-handling decision sends only the selected sheet to OpenRouter/OpenAI on explicit request with studio access code; preserve local source snapshots, machine suggestions and linked human corrections. Other body media and notes are not sent. [B1 digitization]

## Technical and physical research opportunities

Benchmark Bodygram or an equivalent before proprietary vision. First verify access, required inputs, consent, and measurement definitions; evaluate any vendor-specific age/weight requirements only with consenting internal subjects, outside the core Marcello experience. Compare professional reference values with model estimates, absolute errors, repeat-run variation, tolerance status and tailoring consequence. Record unsupported/unmapped outputs; never substitute unlike body and garment measurements. No arbitrary mathematical weights or per-field numeric tolerances. [B1 strategy, benchmark, privacy]

Physical Capture Kit 001 is a research aid: simple floor/camera markers and a real dimensioned fiducial, printed at 100%, ruler-checked and mounted rigidly. Position/distance must be tested. No body stickers yet; no claim that the marker improves Bodygram. Toiles, calibrated garments and manual-correction tools remain hypotheses until observed failures justify them. Physical assets, benchmark details and results belong to the experiment owner. [B1 Tasks 6–7]

## Remaining decision gates

Resolve maker definitions/units, per-field and directional tolerances, normal-correction baseline, actual tactile operations, reference-measurement repeatability, device recovery, and consent/private backup practices. Quantify commercial pain and logistics separately. Follow the [validation roadmap](ROADMAP.md); no physical or accuracy results are implied by this spec.
