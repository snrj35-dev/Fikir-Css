# Fikir CSS — Accessibility Matrix

> Created: 2026-04-16  
> Scope: v1.0 supported interactive surfaces

This matrix defines the minimum accessibility evidence expected before a surface can be treated as v1.0-ready.

## Coverage matrix

| Surface family | Keyboard | Focus management | Semantic / SR | Cross-mode checks |
|----------------|----------|------------------|---------------|-------------------|
| Forms (`input`, `select`, `checkbox`, `radio`, `switch`, `textarea`) | Required | Required | Required | Light / dark / high-contrast |
| Overlay (`modal`, `drawer`, `popover`, `dropdown-menu`, `tooltip`) | Required | Required | Required | Reduced motion + forced colors |
| Navigation (`tabs`, `accordion`, `menu-bar`, `tree-view`, `pagination`) | Required | Required | Required | Light / dark / high-contrast |
| Feedback (`toast`, `progress`, `loading-overlay`, `result`) | Required where interactive | Required where interactive | Required | Reduced motion |
| Data (`table`, `data-grid`) | Required | Required | Required | Density + contrast |

## Required evidence per supported surface

- Browser-level test for the primary interaction path
- Documented ARIA or semantic HTML expectations
- Focus-visible behavior verified
- Reduced-motion behavior reviewed if motion exists
- High-contrast or forced-colors behavior reviewed when the surface relies on color state

## Supporting checklists

- [`manual-accessibility-qa-checklist.md`](./manual-accessibility-qa-checklist.md)
- [`overlay-focus-management-test-plan.md`](./overlay-focus-management-test-plan.md)
- [`theme-regression-checklist.md`](./theme-regression-checklist.md)
- [`a11y-ci-scope.md`](./a11y-ci-scope.md)

## Exit criterion

No supported interactive surface reaches v1.0 without at least one documented keyboard path and one browser-level assertion.
