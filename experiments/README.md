# Experiments

Choose the smallest decisive test for the [remote-fitting validation roadmap](../product/ROADMAP.md). The [2026-09-22 discovery](../customers/haitch/interviews/2026-09-22-discovery-synthesis.md) now supplies enough reported workflow evidence to define EXP-001. Per-field tolerances, maker definitions and the normal-correction baseline still need direct work with Haitch.

For GitHub-connected task reading, start with the [portable current status](EXP-001-standardized-capture/CURRENT_STATUS.md). Detailed local implementation and private evidence referenced elsewhere are not all published in this operating-context commit.

## Current — EXP-001 standardized capture and measurement benchmark

Directory: [EXP-001-standardized-capture](EXP-001-standardized-capture/). The experiment owner maintains protocol, physical-kit assets, data/benchmark structure and result status there; the engineering owner maintains the isolated `app/`. Their records determine what is implemented or verified. This index establishes no completed physical tests, device tests, accuracy results or garment outcomes.

Christian is planned Test Subject #001. Standardize front, side, back, other side and a short rotation video; preserve paper originals and tailor observations. Establish professional reference measurements, repeat capture with controlled changes, then compare Bodygram/equivalent per-field error and consequence. Determine actual camera distance experimentally; do not apply a blanket ¼–⅜ inch threshold or invented weights. Start paired collection with approximately 5–10 consenting subjects after initial capture and data-recovery checks.

The selected app storage is local device IndexedDB retaining original blobs and records with full archive export/import. No accounts/cloud customer data yet. Static hosting is not backup. Actual iPhone Safari/Home Screen capture, persistence, archive recovery and private backups need validation before client collection. See the [spec](../product/REMOTE_FITTING_SPEC.md) and [Haitch handling guidance](../customers/haitch/README.md).

## Historical — EXP-000 discovery prototype

[EXP-000](EXP-000-fitting-capture/README.md) preserves the early speculative interaction for context. Its unvalidated poses and original questions are historical hypotheses. Use EXP-001 and the current spec for active capture work; do not conflate prototype verification with fitting validation.

## Record conventions

An experiment overview states purpose, status and evidence. A plan records question, hypothesis, procedure, inputs, measurements and predeclared criteria, identifying any unresolved thresholds. Results record actual observations, limitations and next action; an unrun test is not a result. Keep sensitive media and archives private, not in tracked assets.

Use [plan-experiment](../skills/plan-experiment.md) and [experiment-postmortem](../skills/experiment-postmortem.md). Do not build a runtime or platform to organize experiments.
