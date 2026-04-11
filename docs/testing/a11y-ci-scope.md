# A11y Testing Scope in CI (M2)

> Last reviewed: 2026-04-11

This document defines what accessibility checks are currently enforced in CI and what remains manual.

## Automated in CI (Current Baseline)
- Source/build test gates run via `npm run test:ci`.
- Accessibility-related coverage is enforced through:
  - semantic markup expectations in `tests/build/*-surface.test.mjs`
  - overlay keyboard/escape/focus wiring checks in interactive surface tests
  - docs/criteria consistency checks in `tests/source/*.test.mjs`
  - workflow example semantics checks in `tests/source/a11y-expanded-ci-scope.test.mjs`

## Explicitly Covered Categories
- Form semantics and relationships (`field`, `label`, `helper-text`, `error-text`).
- Overlay interaction expectations (modal/popover/dropdown/drawer wiring).
- Icon-only naming expectations in docs + playground examples.
- Workflow-level validation semantics (`aria-invalid`, status/error copy linkage).
- Tree/table semantics for data explorer workflows (`role="tree"`, `aria-expanded`, labeled tables).
- Result/toast status messaging semantics (`role="status"`, `aria-live`).
- Dark mode readability checks as manual QA requirement with documented checklist.

## Not Fully Automated Yet
- Full screen-reader behavior validation.
- Pixel-level contrast computation across all states.
- End-to-end axe-style runtime audits for every playground section.

## CI Decision
- Keep deterministic source/build tests as mandatory baseline.
- Keep manual accessibility checklist mandatory before release.
- Defer full E2E a11y automation to a later milestone once snapshot/e2e harness is stabilized.

## Commands
- `npm run test:source`
- `npm run test:build`
- `npm run test:ci`

## Related Docs
- `docs/testing/manual-accessibility-qa-checklist.md`
- `docs/architecture/core-accessibility-expectations.md`
- `docs/architecture/overlay-accessibility-expectations.md`
