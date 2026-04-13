# Promotion Evidence Bundle — Wave 4: Shell and Layout Slice

> Created: 2026-04-12
> Wave: M1 Wave 4
> Status: **PROMOTED** — experimental → supported

## Surfaces Promoted

- `stepper`
- `page-header`
- `section-block`
- `app-shell`
- `split-pane`

---

## Promotion Criteria Audit (per `docs/release/experimental-to-supported-criteria.md`)

### 1. Spec baseline exists

| Surface | RFC/Spec | Status |
|---------|----------|--------|
| `stepper` | `docs/rfcs/components/stepper-rfc.md` | ✅ |
| `page-header` | `docs/rfcs/components/page-header-rfc.md` | ✅ |
| `section-block` | `docs/rfcs/components/section-rfc.md` | ✅ |
| `app-shell` | `docs/rfcs/components/app-shell-rfc.md` | ✅ |
| `split-pane` | `docs/rfcs/components/split-pane-rfc.md` | ✅ |

### 2. Implementation is canonical and stable

| Surface | Implementation | Status |
|---------|---------------|--------|
| `stepper` | `packages/components/stepper.css` | ✅ |
| `page-header` | `packages/components/page-header.css` | ✅ |
| `section-block` | `packages/components/section-block.css` | ✅ |
| `app-shell` | `packages/components/app-shell.css` | ✅ |
| `split-pane` | `packages/components/split-pane.css` | ✅ |

### 3. Test coverage exists

| Surface | Test File | Status |
|---------|-----------|--------|
| `stepper` | `tests/build/stepper-surface.test.mjs` | ✅ |
| `page-header` | `tests/build/page-header-surface.test.mjs` | ✅ |
| `section-block` | `tests/build/section-block-surface.test.mjs` | ✅ |
| `app-shell` | `tests/build/app-shell-surface.test.mjs` | ✅ |
| `split-pane` | `tests/build/split-pane-surface.test.mjs` | ✅ |

### 4. Accessibility expectations documented

| Surface | A11y Note | Status |
|---------|-----------|--------|
| `stepper` | `aria-current="step"` on active step; completed steps accessible via list semantics. See `docs/architecture/core-accessibility-expectations.md` | ✅ |
| `page-header` | Heading hierarchy must be correct (`h1` or appropriate level). No interactive a11y burden. | ✅ |
| `section-block` | Structural grouping; use with appropriate heading. No interactive a11y requirements. | ✅ |
| `app-shell` | `<main>` landmark for content area; `<nav>` for sidebar. Skip link to `<main>` recommended. See `docs/architecture/core-accessibility-expectations.md` | ✅ |
| `split-pane` | Resizable split pane: resize affordance must be keyboard-accessible (`role="separator"` with `aria-valuenow`). | ✅ |

### 5. Usage examples available

- Playground: app-shell and section-block demonstrated in `playground/index.html`
- All surfaces have passing build tests

### 6. Release impact reviewed

- No selector removals.
- All surfaces were already in CSS bundle.
- No migration action required.
- `app-shell` is a layout-composition surface; consumers using it in production should note the `app-shell`/`app-sidebar`/`app-main` selector contract is now stable.

---

## Promotion Record

| Field | Value |
|-------|-------|
| Previous status | experimental |
| New status | supported |
| Decision date | 2026-04-12 |
| Migration impact | None — selectors unchanged |
| Release | v1.0-M1 |
