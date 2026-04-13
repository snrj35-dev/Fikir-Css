# Promotion Evidence Bundle — Wave 1: Foundation Extensions

> Created: 2026-04-12
> Wave: M1 Wave 1
> Status: **PROMOTED** — experimental → supported

## Surfaces Promoted

- `icon-button`
- `link`
- `divider`
- `surface`
- `visually-hidden`
- `skeleton`
- `spinner`

---

## Promotion Criteria Audit (per `docs/release/experimental-to-supported-criteria.md`)

### 1. Spec baseline exists

| Surface | RFC/Spec | Status |
|---------|----------|--------|
| `icon-button` | `docs/rfcs/components/icon-button-rfc.md` | ✅ |
| `link` | `docs/rfcs/components/link-rfc.md` | ✅ |
| `divider` | `docs/rfcs/components/divider-rfc.md` | ✅ |
| `surface` | `docs/rfcs/components/surface-rfc.md` | ✅ |
| `visually-hidden` | `docs/rfcs/components/visually-hidden-rfc.md` | ✅ |
| `skeleton` | *(inline with core-foundation-extensions tests)* | ✅ |
| `spinner` | *(inline with core-foundation-extensions tests)* | ✅ |

### 2. Implementation is canonical and stable

| Surface | Implementation | Status |
|---------|---------------|--------|
| `icon-button` | `packages/components/icon-button.css` | ✅ |
| `link` | `packages/components/link.css` | ✅ |
| `divider` | `packages/components/divider.css` | ✅ |
| `surface` | `packages/components/surface.css` | ✅ |
| `visually-hidden` | `packages/components/visually-hidden.css` | ✅ |
| `skeleton` | `packages/components/skeleton.css` | ✅ |
| `spinner` | `packages/components/spinner.css` | ✅ |

### 3. Test coverage exists

| Surface | Test File | Status |
|---------|-----------|--------|
| `icon-button` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |
| `link` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |
| `divider` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |
| `surface` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |
| `visually-hidden` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |
| `skeleton` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |
| `spinner` | `tests/build/core-foundation-extensions-surface.test.mjs` | ✅ |

### 4. Accessibility expectations documented

| Surface | A11y Note | Status |
|---------|-----------|--------|
| `icon-button` | Requires `aria-label`; no visible text. See `docs/architecture/icon-only-surface-guidance.md` | ✅ |
| `link` | Requires meaningful link text; underline visual affordance. See `docs/architecture/core-accessibility-expectations.md` | ✅ |
| `divider` | Decorative `role="separator"` or `aria-hidden`. See `docs/architecture/core-accessibility-expectations.md` | ✅ |
| `surface` | Structural container; no interactive a11y requirements | ✅ |
| `visually-hidden` | Screen-reader-only content; must not be focusable. See `docs/rfcs/components/visually-hidden-rfc.md` | ✅ |
| `skeleton` | `aria-busy="true"` pattern; live region where applicable | ✅ |
| `spinner` | `role="status"` with visually-hidden text label | ✅ |

### 5. Usage examples available

- Playground: all surfaces demonstrated in `playground/index.html`
- README: foundation extensions listed in component surface section

### 6. Release impact reviewed

- No selector removals in this wave.
- All surfaces are additive promotions from experimental.
- No migration action required for consumers (selectors unchanged).
- Bundle size impact: minimal (all surfaces were already in `dist/fikir.css`).

---

## Promotion Record

| Field | Value |
|-------|-------|
| Previous status | experimental |
| New status | supported |
| Decision date | 2026-04-12 |
| Migration impact | None — selectors unchanged |
| Release | v1.0-M1 |
