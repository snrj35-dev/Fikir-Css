# Promotion Evidence Bundle — Wave 2: Overlay Slice

> Created: 2026-04-12
> Wave: M1 Wave 2
> Status: **PROMOTED** — experimental → supported

## Surfaces Promoted

- `tooltip`
- `popover`
- `dropdown-menu`

---

## Promotion Criteria Audit (per `docs/release/experimental-to-supported-criteria.md`)

### 1. Spec baseline exists

| Surface | RFC/Spec | Status |
|---------|----------|--------|
| `tooltip` | `docs/rfcs/components/tooltip-rfc.md` | ✅ |
| `popover` | `docs/rfcs/components/popover-rfc.md` | ✅ |
| `dropdown-menu` | `docs/rfcs/components/dropdown-menu-rfc.md` | ✅ |

### 2. Implementation is canonical and stable

| Surface | Implementation | Status |
|---------|---------------|--------|
| `tooltip` | `packages/components/tooltip.css` | ✅ |
| `popover` | `packages/components/popover.css` | ✅ |
| `dropdown-menu` | `packages/components/dropdown-menu.css` | ✅ |

### 3. Test coverage exists

| Surface | Test File | Status |
|---------|-----------|--------|
| `tooltip` | `tests/build/tooltip-surface.test.mjs` | ✅ |
| `popover` | `tests/build/popover-surface.test.mjs` | ✅ |
| `dropdown-menu` | `tests/build/dropdown-menu-surface.test.mjs` | ✅ |

### 4. Accessibility expectations documented

| Surface | A11y Note | Status |
|---------|-----------|--------|
| `tooltip` | `role="tooltip"` + `aria-describedby` wiring. Must not be sole info source. See `docs/architecture/overlay-accessibility-expectations.md` | ✅ |
| `popover` | Focus management required when interactive content present. Escape key closes. See `docs/architecture/overlay-accessibility-expectations.md` | ✅ |
| `dropdown-menu` | `role="menu"` + `role="menuitem"`. Arrow key navigation. Escape closes. See `docs/architecture/overlay-accessibility-expectations.md` | ✅ |

### 5. Usage examples available

- Playground: tooltip, popover, and dropdown-menu demonstrated in `playground/index.html`
- All three surfaces have passing build tests with selector coverage

### 6. Release impact reviewed

- No selector removals.
- Overlay surfaces were already in CSS bundle; promotion is a support-level declaration only.
- No migration action required.

---

## Promotion Record

| Field | Value |
|-------|-------|
| Previous status | experimental |
| New status | supported |
| Decision date | 2026-04-12 |
| Migration impact | None — selectors unchanged |
| Release | v1.0-M1 |
