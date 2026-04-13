# Promotion Evidence Bundle — Wave 3: Navigation Slice

> Created: 2026-04-12
> Wave: M1 Wave 3
> Status: **PROMOTED** — experimental → supported

## Surfaces Promoted

- `accordion`
- `breadcrumb`
- `navbar`
- `menu-bar`
- `sidebar-nav`

---

## Promotion Criteria Audit (per `docs/release/experimental-to-supported-criteria.md`)

### 1. Spec baseline exists

| Surface | RFC/Spec | Status |
|---------|----------|--------|
| `accordion` | `docs/rfcs/components/accordion-rfc.md` | ✅ |
| `breadcrumb` | `docs/rfcs/components/breadcrumb-rfc.md` | ✅ |
| `navbar` | `docs/rfcs/components/navbar-rfc.md` | ✅ |
| `menu-bar` | `docs/rfcs/components/menu-bar-rfc.md` | ✅ |
| `sidebar-nav` | `docs/rfcs/components/sidebar-rfc.md` | ✅ |

### 2. Implementation is canonical and stable

| Surface | Implementation | Status |
|---------|---------------|--------|
| `accordion` | `packages/components/accordion.css` | ✅ |
| `breadcrumb` | `packages/components/breadcrumb.css` | ✅ |
| `navbar` | `packages/components/navbar.css` | ✅ |
| `menu-bar` | `packages/components/menu-bar.css` | ✅ |
| `sidebar-nav` | `packages/components/sidebar-nav.css` | ✅ |

### 3. Test coverage exists

| Surface | Test File | Status |
|---------|-----------|--------|
| `accordion` | `tests/build/accordion-surface.test.mjs` | ✅ |
| `breadcrumb` | `tests/build/breadcrumb-surface.test.mjs` | ✅ |
| `navbar` | `tests/build/navbar-surface.test.mjs` | ✅ |
| `menu-bar` | `tests/build/menu-bar-surface.test.mjs` | ✅ |
| `sidebar-nav` | `tests/build/sidebar-nav-surface.test.mjs` | ✅ |

### 4. Accessibility expectations documented

| Surface | A11y Note | Status |
|---------|-----------|--------|
| `accordion` | `aria-expanded` on trigger; `aria-controls` wiring. Keyboard: Enter/Space toggles. See `docs/architecture/navigation-accessibility-notes.md` | ✅ |
| `breadcrumb` | `<nav aria-label="Breadcrumb">` wrapper; `aria-current="page"` on last item. See `docs/architecture/navigation-accessibility-notes.md` | ✅ |
| `navbar` | `<nav>` landmark; skip-link target. Keyboard traversal via Tab. See `docs/architecture/navigation-accessibility-notes.md` | ✅ |
| `menu-bar` | `role="menubar"` + `role="menuitem"`. Arrow key navigation across items. See `docs/architecture/navigation-accessibility-notes.md` | ✅ |
| `sidebar-nav` | `<nav>` landmark; `aria-current="page"` on active link. See `docs/architecture/navigation-accessibility-notes.md` | ✅ |

### 5. Usage examples available

- Playground: all navigation surfaces demonstrated in `playground/index.html`
- All surfaces have passing build tests with selector coverage

### 6. Release impact reviewed

- No selector removals.
- Navigation surfaces were already in CSS bundle.
- No migration action required for existing consumers.

---

## Promotion Record

| Field | Value |
|-------|-------|
| Previous status | experimental |
| New status | supported |
| Decision date | 2026-04-12 |
| Migration impact | None — selectors unchanged |
| Release | v1.0-M1 |
