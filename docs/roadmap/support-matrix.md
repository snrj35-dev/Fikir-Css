# Fikir CSS — Support Matrix

> Version: v1.0 preparation  
> Baseline: v0.6.0  
> Last updated: 2026-04-19 (M21.1 — support matrix final freeze)

Stability levels are defined in [`docs/governance/semver-policy.md`](../governance/semver-policy.md).

| Level | Semver protection | Production use |
|-------|------------------|----------------|
| supported | Breaking changes require MAJOR bump | ✅ Yes |
| beta | Breaking changes allowed in MINOR; documented in CHANGELOG | ⚠️ With caution |
| experimental | No semver guarantee; may change or be removed at any time | ❌ Not recommended |
| deprecated | Will be removed in next MAJOR; migration note provided | ❌ Migrate away |

**Surface count (v1.0 freeze):** 69 supported · 22 beta · 10 experimental surfaces + 2 experimental patterns · 0 deprecated

> **M21.1 FREEZE:** The `supported` list is final. No new surfaces will be added to `supported` without a MAJOR version bump.

---

## Supported Surfaces

Selector contracts are frozen. Changes require a MAJOR version bump.

### Core / Foundation

| Surface | CSS file | Docs | Demo |
|---------|----------|------|------|
| `button` | `button.css` | ✅ | ✅ |
| `icon-button` | `icon-button.css` | ✅ | ✅ |
| `link` | `link.css` | ✅ | ✅ |
| `badge` | `badge.css` | ✅ | ✅ |
| `alert` | `alert.css` | ✅ | ✅ |
| `card` | `card.css` | ✅ | ✅ |
| `surface` | `surface.css` | ✅ | ✅ |
| `divider` | `divider.css` | ✅ | ✅ |
| `skeleton` | `skeleton.css` | ✅ | ✅ |
| `spinner` | `spinner.css` | ✅ | ✅ |
| `visually-hidden` | `visually-hidden.css` | ✅ | — |

### Form / Input

| Surface | CSS file | Docs | Demo |
|---------|----------|------|------|
| `field` | `field.css` | ✅ | ✅ |
| `label` | `label.css` | ✅ | ✅ |
| `helper-text` | `helper-text.css` | ✅ | ✅ |
| `error-text` | `error-text.css` | ✅ | ✅ |
| `input` | `input.css` | ✅ | ✅ |
| `textarea` | `textarea.css` | ✅ | ✅ |
| `select` | `select.css` | ✅ | ✅ |
| `checkbox` | `checkbox.css` | ✅ | ✅ |
| `radio` | `radio.css` | ✅ | ✅ |
| `switch` | `switch.css` | ✅ | ✅ |
| `input-group` | `input-group.css` | ✅ | ✅ |
| `number-input` | `number-input.css` | ✅ | ✅ |
| `range-slider` | `range-slider.css` | ✅ | ✅ |
| `segmented-control` | `segmented-control.css` | ✅ | ✅ |
| `otp-input` | `otp-input.css` | ✅ | ✅ |
| `search-box` | `search-box.css` | ✅ | ✅ |

### Overlay / Feedback

| Surface | CSS file | Docs | Demo |
|---------|----------|------|------|
| `modal` | `modal.css` | ✅ | ✅ |
| `drawer` | `drawer.css` | ✅ | ✅ |
| `popover` | `popover.css` | ✅ | ✅ |
| `tooltip` | `tooltip.css` | ✅ | ✅ |
| `dropdown-menu` | `dropdown-menu.css` | ✅ | ✅ |
| `toast` | `toast.css` | ✅ | ✅ |
| `progress` | `progress.css` | ✅ | ✅ |
| `loading-overlay` | `loading-overlay.css` | ✅ | ✅ |
| `hover-card` | `hover-card.css` | ✅ | ✅ |
| `result` | `result.css` | ✅ | ✅ |

### Navigation

| Surface | CSS file | Docs | Demo |
|---------|----------|------|------|
| `tabs` | `tabs.css` | ✅ | ✅ |
| `accordion` | `accordion.css` | ✅ | ✅ |
| `breadcrumb` | `breadcrumb.css` | ✅ | ✅ |
| `pagination` | `pagination.css` | ✅ | ✅ |
| `navbar` | `navbar.css` | ✅ | ✅ |
| `menu-bar` | `menu-bar.css` | ✅ | ✅ |
| `sidebar-nav` | `sidebar-nav.css` | ✅ | ✅ |
| `stepper` | `stepper.css` | ✅ | ✅ |
| `command-palette` | `command-palette.css` | ✅ | ✅ |
| `tree-view` | `tree-view.css` | ✅ | ✅ |

### Data / Display

| Surface | CSS file | Docs | Demo |
|---------|----------|------|------|
| `table` | `table.css` | ✅ | ✅ |
| `data-grid` | `data-grid.css` | ✅ | ✅ |
| `list` | `list.css` | ✅ | ✅ |
| `description-list` | `description-list.css` | ✅ | ✅ |
| `avatar` | `avatar.css` | ✅ | ✅ |
| `avatar-group` | `avatar-group.css` | ✅ | ✅ |
| `stat` | `stat.css` | ✅ | ✅ |
| `kpi-card` | `kpi-card.css` | ✅ | ✅ |
| `empty-state` | `empty-state.css` | ✅ | ✅ |
| `timeline` | `timeline.css` | ✅ | ✅ |
| `tag-chip` | `tag-chip.css` | ✅ | ✅ |

### Layout / Shell

| Surface | CSS file | Docs | Demo |
|---------|----------|------|------|
| `stack` | _(layout primitives)_ | ✅ | ✅ |
| `cluster` | _(layout primitives)_ | ✅ | ✅ |
| `container` | _(layout primitives)_ | ✅ | ✅ |
| `center` | _(layout primitives)_ | ✅ | ✅ |
| `grid` | _(layout primitives)_ | ✅ | ✅ |
| `switcher` | _(layout primitives)_ | ✅ | ✅ |
| `sidebar` | _(layout primitives)_ | ✅ | ✅ |
| `page-header` | `page-header.css` | ✅ | ✅ |
| `section-block` | `section-block.css` | ✅ | ✅ |
| `app-shell` | `app-shell.css` | ✅ | ✅ |
| `split-pane` | `split-pane.css` | ✅ | ✅ |

---

## Beta Surfaces

Implemented and usable. Selector contracts are mostly stable but additive changes may occur in MINOR releases. Documented in CHANGELOG when changed.

| Surface | CSS file | Reason for beta |
|---------|----------|-----------------|
| `autocomplete` | `autocomplete.css` | Keyboard interaction API may be extended |
| `combobox` | `combobox.css` | Keyboard interaction API may be extended |
| `context-menu` | `context-menu.css` | Trigger/positioning contract still evolving |
| `date-picker` | `date-picker.css` | Locale and format contract not yet frozen |
| `date-range-picker` | `date-range-picker.css` | Locale and format contract not yet frozen |
| `date-time-picker` | `date-time-picker.css` | Combined date+time contract; locale not frozen |
| `time-picker` | `time-picker.css` | Format/step contract not yet frozen |
| `calendar` | `calendar.css` | Navigation/selection API may be extended |
| `editable-field` | `editable-field.css` | Save/cancel/edit state names may change |
| `file-upload` | `file-upload.css` | Drag state and progress integration pending |
| `dropzone` | `dropzone.css` | Active/reject state names may change |
| `tags-input` | `tags-input.css` | Tag management interaction API evolving |
| `rating` | `rating.css` | Half-star and keyboard contract pending |
| `settings-panel` | `settings-panel.css` | Layout contract may be extended |
| `split-button` | `split-button.css` | Button recipe + dropdown disclosure composition; keyboard/menu contract may expand |
| `inline-notice` | `inline-notice.css` | Semantic distinction from alert/callout not fully resolved |
| `command-bar` | `command-bar.css` | Slot contract and action grouping API may evolve |
| `tree-table` | `tree-table.css` | Row expand/collapse and keyboard contract pending |
| `copy-button` | `copy-button.css` | Clipboard API integration pattern may be extended |
| `password-input` | `password-input.css` | Reveal/hide toggle and validation state pending |
| `stat-group` | `stat-group.css` | Layout and responsive contract not frozen |
| `empty-search-state` | `empty-search-state.css` | Pattern-based (data-pattern attr); variant contract may grow |

---

## Experimental Surfaces

No semver guarantee. May change or be removed without notice. Not recommended for production use.

| Surface | CSS file | Notes |
|---------|----------|-------|
| `heading` | `heading.css` | Single `.heading` class; size/weight variants not normalized yet |
| `text` | `text.css` | Utility text surface; contract not finalized |
| `callout` | `callout.css` | Semantic distinction from `alert` not resolved |
| `code` | `code.css` | Inline code only; theming contract pending |
| `code-block` | `code-block.css` | Syntax highlight integration not defined |
| `quote` | `quote.css` | Typographic surface; not in product-ready state |
| `kbd` | `kbd.css` | Utility surface; token mapping minimal |
| `markdown-surface` | `markdown-surface.css` | Opinionated reset; may conflict with custom prose |
| `coachmark` | `coachmark.css` | Tour/step sequencing API not defined; positioning JS-dependent |
| `auth-screen` | `auth-screen.css` | Opinionated full-page layout; token/slot contract not frozen |

### Experimental Patterns

| Pattern | Selector | Notes |
|---------|----------|-------|
| `filter-bar` | `data-pattern="filter-bar"` | Attribute-styled pattern with documented data-slot contract for search / filters / reset / chips workflows (M16.4) |
| `data-table-toolbar` | `data-pattern="data-table-toolbar"` | Attribute-styled pattern with column-visibility, density, export, summary, and controlled-surface slots (M16.5) |

---

## Deprecated Surfaces

None at v0.6.0.

---

## Docs coverage

As of v1.0 freeze, supported surface docs are **69 / 69**.

All supported surfaces listed in the matrix above have a corresponding document under `docs/components/`. Beta surfaces have implementation docs; experimental surfaces have stub docs only.

All previously "not yet implemented" surfaces (M16.2–M16.11) are now implemented and classified as beta or experimental above.

## Evidence sources

- Implementation: `packages/components/*.css`
- Demo coverage: `playground/index.html`, `site/index.html`
- Test coverage: `tests/source/*.test.mjs`, `tests/build/*.test.mjs`
- Semver rules: `docs/governance/semver-policy.md`
- Roadmap: `docs/roadmap/plan.md §6`, `docs/roadmap/tasklist.md §M13–M15`
