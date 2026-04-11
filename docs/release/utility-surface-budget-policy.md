# Utility Surface Budget Policy (v0.4)

> Last reviewed: 2026-04-11

This policy controls utility-class growth so the framework does not expand without clear product value.

## Scope
- Naming source: `contracts/naming.contract.mjs`
- Effective output: `dist/contracts/selectors.json`
- Utility layer source: `packages/utilities/*.css`

## Current Baseline
- Utility keys are intentionally narrow (`p0`, `p2`, `p4`, `px4`, `py2`, `gap2`, `gap4`, `mt0`, `forceMt0`, text/font/bg helpers).
- Utility additions are allowed only with explicit roadmap justification.

## Budget Rules
1. Utility selector growth must be deliberate, not convenience-driven.
2. Utility surface should grow in small batches tied to milestone outcomes.
3. `force-*` utilities are escape hatches and must remain minimal.
4. No utility addition without documenting why semantic or token-first usage is insufficient.

## P1/P2 Budget Targets
- P1 target: keep utility selector count under `40`.
- P2 target: increase only with milestone evidence and release-note justification.
- Single change guardrail: avoid adding more than `6` utility selectors in one PR unless approved in release-impact review.

## Change Process
When adding/changing utility selectors:
1. Update `contracts/naming.contract.mjs`.
2. Update `packages/utilities/*.css`.
3. Add/adjust tests that validate canonical utility surface behavior.
4. Include reason in release impact review (`docs/release/release-impact-review.md`).
5. Mention impact in release notes if budget targets shift.

## Non-goals
- This policy does not require JIT generation.
- This policy does not ban utilities; it enforces controlled growth.

## Review Cadence
- Review utility budget at each milestone freeze.
- If repeated exceptions occur, open a policy revision task in roadmap.
