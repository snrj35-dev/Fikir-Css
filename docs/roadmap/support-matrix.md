# Fikir CSS — Support Matrix (v0.5.0)

> Baseline audit date: 2026-04-11
> Last reviewed: 2026-04-12 (M2 Wave 6 applied; API stability badges added)

This matrix classifies the currently public surface into support levels.

Support levels:
- `supported`: committed for the current supportable foundation slice
- `experimental`: implemented, documented, and demoed but not yet in the supported commitment set
- `rfc-only`: documented/spec'd but not implemented as a canonical surface
- `planned`: intentionally deferred to future roadmap scope

## API Stability Badges

Each supported surface carries a stability badge:

| Badge | Meaning |
|-------|---------|
| ![stable](https://img.shields.io/badge/stability-stable-green) | Selector contract is frozen. Changes require major version bump. |
| ![beta](https://img.shields.io/badge/stability-beta-yellow) | Surface is complete but may receive additive changes in minor versions. |
| ![experimental](https://img.shields.io/badge/stability-experimental-orange) | API may change without deprecation notice. Not for production use. |

Badge key used inline below: `[stable]` · `[beta]` · `[exp]`

## Supported Surface (v0.5.0)

### Core and foundation `[stable]`
- `button` · `input` · `textarea` · `select` · `checkbox` · `radio` · `switch`
- `card` · `badge` · `alert` · `label` · `helper-text` · `error-text` · `field`

### Layout primitives `[stable]`
- `container` · `stack` · `cluster` · `sidebar` · `switcher` · `center` · `grid`

### Overlay (M1 baseline) `[stable]`
- `modal` · `toast`

### Navigation (M1 baseline) `[stable]`
- `tabs` · `pagination`

### Data/display (M1 baseline) `[stable]`
- `table` · `empty-state`

### Foundation extensions (Wave 1 — 2026-04-12) `[stable]`
- `icon-button` · `link` · `divider` · `surface` · `visually-hidden` · `skeleton` · `spinner`

### Overlay slice (Wave 2 — 2026-04-12) `[stable]`
- `tooltip` · `popover` · `dropdown-menu`

### Navigation slice (Wave 3 — 2026-04-12) `[stable]`
- `accordion` · `breadcrumb` · `navbar` · `menu-bar` · `sidebar-nav`

### Shell and layout slice (Wave 4 — 2026-04-12) `[stable]`
- `stepper` · `page-header` · `section-block` · `app-shell` · `split-pane`

### Data and display slice (Wave 5 — 2026-04-12) `[stable]`
- `data-grid` · `result` · `stat` · `list` · `description-list`

### Input augmentation slice (Wave 6 — 2026-04-12) `[beta]`
- `combobox` · `search-box` · `autocomplete` · `command-palette`

> Wave 6 surfaces are `[beta]`: selector contracts are locked but keyboard interaction helpers may be additive in the next minor.

## Experimental Surface (Implemented)

### Forms and input extensions
- `range-slider`
- `number-input`
- `rating`
- `tags-input`
- `otp-input`
- `input-group`

### Overlay and interaction (extended)
- `context-menu`
- `progress`
- `loading-overlay`
- `drawer`
- `hover-card`

### Navigation (extended)
- `tree-view`

### Data and display (extended)
- `avatar`
- `avatar-group`
- `tag-chip`
- `timeline`
- `kpi-card`

### Search/productivity and advanced surfaces
- `date-picker`
- `date-range-picker`
- `calendar`
- `file-upload`
- `dropzone`
- `editable-field`

### Content/rich UI
- `text`
- `heading`
- `code`
- `code-block`
- `callout`
- `quote`
- `kbd`
- `markdown-surface`

### Product patterns (implemented as pattern compositions)
- `command-bar` pattern (`data-pattern="command-bar"`)
- `filter-bar` pattern (`data-pattern="filter-bar"`)
- `data-table-toolbar` pattern (`data-pattern="data-table-toolbar"`)
- `settings-panel` pattern (`data-pattern="settings-panel"`) `[exp]`

## RFC-only Surface

> No surfaces are currently rfc-only. `settings-panel` was promoted to experimental (see below).

## Planned Surface

- No additional public component surface is declared as planned-only in the current baseline.
- Roadmap future scope is tracked in `docs/roadmap/plan.md` and `docs/roadmap/tasklist.md`.

## Evidence Sources

- Implementation surface: `packages/components/*.css`
- RFC surface: `docs/rfcs/components/*.md`
- Demo/public exposure: `playground/index.html`, `README.md`
- Build/test coverage: `tests/build/*.test.mjs`, `.github/workflows/ci.yml`
