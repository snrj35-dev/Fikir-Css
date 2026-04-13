# Promotion Evidence Bundle — Wave 5: Data and Display Slice

> Created: 2026-04-12
> Wave: M1 Wave 5
> Status: **PROMOTED** — experimental → supported

## Surfaces Promoted

- `data-grid`
- `result`
- `stat`
- `list`
- `description-list`

---

## Promotion Criteria Audit (per `docs/release/experimental-to-supported-criteria.md`)

### 1. Spec baseline exists

| Surface | RFC/Spec | Status |
|---------|----------|--------|
| `data-grid` | `docs/rfcs/components/data-grid-rfc.md` | ✅ |
| `result` | `docs/rfcs/components/result-rfc.md` | ✅ |
| `stat` | `docs/rfcs/components/stat-rfc.md` | ✅ |
| `list` | `docs/rfcs/components/list-rfc.md` | ✅ |
| `description-list` | `docs/rfcs/components/description-list-rfc.md` | ✅ |

### 2. Implementation is canonical and stable

| Surface | Implementation | Status |
|---------|---------------|--------|
| `data-grid` | `packages/components/data-grid.css` | ✅ |
| `result` | `packages/components/result.css` | ✅ |
| `stat` | `packages/components/stat.css` | ✅ |
| `list` | `packages/components/list.css` | ✅ |
| `description-list` | `packages/components/description-list.css` | ✅ |

### 3. Test coverage exists

| Surface | Test File | Status |
|---------|-----------|--------|
| `data-grid` | `tests/build/data-grid-surface.test.mjs` | ✅ |
| `result` | `tests/build/result-surface.test.mjs` | ✅ |
| `stat` | `tests/build/stat-surface.test.mjs` | ✅ |
| `list` | `tests/build/list-surface.test.mjs` | ✅ |
| `description-list` | `tests/build/description-list-surface.test.mjs` | ✅ |

### 4. Accessibility expectations documented

| Surface | A11y Note | Status |
|---------|-----------|--------|
| `data-grid` | `role="grid"` or native `<table>` with scope headers. Column sort accessible via `aria-sort`. See `docs/architecture/data-grid-research-note.md` | ✅ |
| `result` | Status/feedback surface; use `role="status"` or `role="alert"` based on urgency. See `docs/architecture/core-accessibility-expectations.md` | ✅ |
| `stat` | Numeric display; heading or `<dt>/<dd>` semantics recommended. No interactive a11y burden. | ✅ |
| `list` | Semantic `<ul>/<ol>` or `role="list"`. List item count communicated to screen readers. | ✅ |
| `description-list` | Native `<dl>/<dt>/<dd>` semantics; term-value pairs. See `docs/rfcs/components/description-list-rfc.md` | ✅ |

### 5. Usage examples available

- Playground: data-grid, stat, list, and description-list demonstrated
- All surfaces have passing build tests with selector coverage

### 6. Release impact reviewed

- No selector removals.
- All surfaces were already in CSS bundle.
- No migration action required.
- `data-grid` consumers should note the `data-grid` + `data-grid-cell` + `data-grid-header` selector contract is now stable.

---

## Promotion Record

| Field | Value |
|-------|-------|
| Previous status | experimental |
| New status | supported |
| Decision date | 2026-04-12 |
| Migration impact | None — selectors unchanged |
| Release | v1.0-M1 |
