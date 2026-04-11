# Playground Visual Regression Plan

> Last reviewed: 2026-04-11

This plan defines how playground UI changes are tracked with screenshot baselines during M2 productization.

## Scope
- Target surface: `playground/index.html`
- Themes: light (default) and dark (`data-theme="dark"`)
- Baseline files:
  - `playground/screenshots/playground-light.png`
  - `playground/screenshots/playground-dark.png`
  - `playground/screenshots/sections/*.png` (supported-slice baselines)

## Screenshot Baseline Strategy
1. Baseline source of truth
- Keep one canonical screenshot per theme under `playground/screenshots/`.
- Baselines must be generated from current `dist/fikir.css` after `npm run build`.

2. Capture rules
- Capture at consistent desktop viewport and stable zoom.
- Ensure no local debug CSS/JS patches are active.
- Use the same page state (top of page, no transient overlays forced open).

3. Update policy
- Update baselines only when visual change is intentional.
- In the same change set, update:
  - screenshot files
  - release notes (if supported surface is affected)
  - migration notes (if compatibility/expectation changes)

4. Review policy
- Every baseline change requires before/after reviewer check for:
  - support-label consistency
  - dark mode readability
  - no demo-only override leakage into framework selectors

## Visual Regression Workflow (Current)
1. Build and verify artifacts
- `npm run build`

2. Capture deterministic screenshots
- `npm run capture:playground`

3. Validate baseline assets exist
- `npm run validate:playground-baseline`

4. Run source checks
- `npm run test:source`

5. Manual visual review
- Compare updated screenshots against previous commit in PR diff.
- Confirm major supported sections remain visually stable.

## CI Integration (M2 Baseline)
- Baseline presence/health is enforced by:
  - `scripts/validate-playground-baseline.mjs`
  - `tests/source/playground-visual-regression-plan.test.mjs`
- Full pixel diff automation is deferred; this plan establishes stable baseline governance first.

## Supported-Slice Baseline Set
- `supported-foundation`: `playground/getting-started.html`
- `supported-forms`: `playground/settings-workflow-example.html`
- `supported-toast`: `playground/toast-example.html`
- `supported-pagination-table`: `playground/tree-table-workflow-example.html`
- `supported-data-display`: `playground/data-display-example.html`

## Exit Criteria for Automation Upgrade
- Add threshold-based pixel diff report in CI.
