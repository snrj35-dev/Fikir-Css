# Density Impact Matrix

> Canonical reference for `data-density="compact"` and `data-density="comfortable"` across supported Fikir CSS surfaces.

## Effect labels

- `tangible`: density changes spacing, padding, gaps, or layout footprint in an obvious way
- `subtle`: density mostly changes typography or icon scale, but footprint stays almost the same
- `no-op`: density does not materially change the surface on its own

## How the matrix is determined

Current `density_effect` values are derived from the shipped CSS:

- surfaces using `var(--space-*)` are marked `tangible`
- surfaces using only `var(--font-size-*)` are marked `subtle`
- surfaces using neither are marked `no-op`

This keeps the guide aligned with the bundle and with `dist/contracts/capabilities.json`.

## Tangible

`accordion`, `alert`, `app-shell`, `auth-screen`, `avatar-group`, `badge`, `breadcrumb`, `card`, `coachmark`, `command-bar`, `command-palette`, `copy-button`, `data-grid`, `data-table-toolbar`, `description-list`, `drawer`, `dropdown-menu`, `empty-search-state`, `empty-state`, `field`, `filter-bar`, `hover-card`, `input`, `input-group`, `kpi-card`, `list`, `loading-overlay`, `menu-bar`, `modal`, `navbar`, `onboarding-checklist`, `otp-input`, `page-header`, `pagination`, `password-input`, `popover`, `progress`, `result`, `search-box`, `search-result-item`, `section-block`, `segmented-control`, `select`, `sidebar-nav`, `skeleton`, `split-pane`, `stat`, `stat-group`, `stepper`, `surface`, `table`, `tabs`, `tag-chip`, `textarea`, `time-range-picker`, `timeline`, `toast`, `tooltip`, `tree-view`

## Subtle

`avatar`, `button`, `error-text`, `helper-text`, `icon-button`, `label`

## No-op

`checkbox`, `divider`, `link`, `radio`, `spinner`, `switch`, `visually-hidden`

## Practical notes

- Form layouts feel the biggest density shift on wrappers and text-entry controls such as `field`, `input`, `select`, and `textarea`.
- Native controls like `checkbox`, `radio`, and `switch` are currently intentional `no-op` surfaces under density.
- `comfortable` is the inverse direction of the same matrix: `tangible` surfaces expand noticeably, `subtle` surfaces grow slightly, and `no-op` remains effectively unchanged.

## Source of truth

- Machine-readable contract: `dist/contracts/capabilities.json` → `components.*.density_effect`
- Theme tokens: `packages/tokens/themes/compact.css`, `packages/tokens/themes/comfortable.css`
