# Fikir CSS — Support Matrix (Baseline)

> Baseline audit date: 2026-04-11
> Last reviewed: 2026-04-11

This matrix classifies the currently public surface into support levels.

Support levels:
- `supported`: committed for the current supportable foundation slice
- `experimental`: implemented, documented, and demoed but not yet in the supported commitment set
- `rfc-only`: documented/spec'd but not implemented as a canonical surface
- `planned`: intentionally deferred to future roadmap scope

## Supported Surface (Current Baseline)

### Core and foundation
- `button`
- `input`
- `textarea`
- `select`
- `checkbox`
- `radio`
- `switch`
- `card`
- `badge`
- `alert`
- `label`
- `helper-text`
- `error-text`
- `field`

### Layout primitives
- `container`
- `stack`
- `cluster`
- `sidebar`
- `switcher`
- `center`
- `grid`

### M1 chosen slices
- Overlay: `modal`, `toast`
- Navigation: `tabs`, `pagination`
- Data/display: `table`, `empty-state`

## Experimental Surface (Implemented)

### Foundation extensions and utilities-facing components
- `icon-button`
- `link`
- `divider`
- `surface`
- `visually-hidden`
- `skeleton`
- `spinner`

### Forms and input extensions
- `range-slider`
- `number-input`
- `rating`
- `tags-input`
- `otp-input`
- `input-group`

### Overlay and interaction
- `tooltip`
- `popover`
- `dropdown-menu`
- `context-menu`
- `progress`
- `loading-overlay`
- `drawer`
- `hover-card`

### Navigation and shell
- `accordion`
- `breadcrumb`
- `navbar`
- `menu-bar`
- `sidebar-nav`
- `tree-view`
- `stepper`
- `page-header`
- `section-block`
- `app-shell`
- `split-pane`

### Data and display
- `data-grid`
- `result`
- `avatar`
- `avatar-group`
- `tag-chip`
- `stat`
- `timeline`
- `kpi-card`
- `list`
- `description-list`

### Search/productivity and advanced surfaces
- `combobox`
- `search-box`
- `autocomplete`
- `command-palette`
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

## RFC-only Surface

- `settings-panel` pattern spec (no canonical implemented component surface)

## Planned Surface

- No additional public component surface is declared as planned-only in the current baseline.
- Roadmap future scope is tracked in `docs/roadmap/plan.md` and `docs/roadmap/tasklist.md`.

## Evidence Sources

- Implementation surface: `packages/components/*.css`
- RFC surface: `docs/rfcs/components/*.md`
- Demo/public exposure: `playground/index.html`, `README.md`
- Build/test coverage: `tests/build/*.test.mjs`, `.github/workflows/ci.yml`
