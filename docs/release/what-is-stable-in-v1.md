# What's Stable in Fikir CSS v1.0?

> Published: 2026-04-19  
> Version: 1.0.0  
> See also: [`docs/roadmap/support-matrix.md`](../roadmap/support-matrix.md) · [`docs/governance/semver-policy.md`](../governance/semver-policy.md)

This page answers the question: **"Can I use this in production?"**

---

## TL;DR

| Tier | Count | Production use | Semver protection |
|------|-------|---------------|-------------------|
| **Supported** | 69 surfaces | ✅ Yes | Breaking changes → MAJOR bump |
| **Beta** | 22 surfaces | ⚠️ With caution | Additive changes in MINOR, documented |
| **Experimental** | 10 surfaces + 2 patterns | ❌ Not recommended | No guarantee |
| **Deprecated** | 0 | — | — |

---

## Supported Surfaces (Production-Ready)

These 69 surfaces have **frozen selector contracts**. No class name, token binding, or structural change will be made without a MAJOR version bump.

### Core / Foundation (11)

| Surface | Import | Resolver |
|---------|--------|---------|
| `button` | `fikir-css` | `buttonRecipe()` |
| `icon-button` | `fikir-css` | — |
| `link` | `fikir-css` | — |
| `badge` | `fikir-css` | `badgeRecipe()` |
| `alert` | `fikir-css` | `alertRecipe()` |
| `card` | `fikir-css` | `cardRecipe()` |
| `surface` | `fikir-css` | — |
| `divider` | `fikir-css` | — |
| `skeleton` | `fikir-css` | — |
| `spinner` | `fikir-css` | — |
| `visually-hidden` | `fikir-css` | — |

### Form / Input (15)

`field`, `label`, `helper-text`, `error-text`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `input-group`, `number-input`, `range-slider`, `segmented-control`, `otp-input`, `search-box`

### Overlay / Feedback (10)

`modal`, `drawer`, `popover`, `tooltip`, `dropdown-menu`, `toast`, `progress`, `loading-overlay`, `hover-card`, `result`

### Navigation (10)

`tabs`, `accordion`, `breadcrumb`, `pagination`, `navbar`, `menu-bar`, `sidebar-nav`, `stepper`, `command-palette`, `tree-view`

### Data / Display (11)

`table`, `data-grid`, `list`, `description-list`, `avatar`, `avatar-group`, `stat`, `kpi-card`, `empty-state`, `timeline`, `tag-chip`

### Layout / Shell (11)

`stack`, `cluster`, `container`, `center`, `grid`, `switcher`, `sidebar` _(layout primitives)_,  
`page-header`, `section-block`, `app-shell`, `split-pane`

---

## Beta Surfaces (Usable with Caution)

Implemented and tested. Selector contracts are **mostly stable** but additive changes may occur in MINOR releases and will be documented in CHANGELOG.

**When to use:** Internal tooling, dashboards, non-critical paths. Pin to `~1.x` instead of `^1.x` for safer upgrades.

| Surface | Reason for beta |
|---------|-----------------|
| `autocomplete` | Keyboard interaction API may be extended |
| `combobox` | Keyboard interaction API may be extended |
| `context-menu` | Trigger/positioning contract still evolving |
| `date-picker` | Locale and format contract not yet frozen |
| `date-range-picker` | Locale and format contract not yet frozen |
| `date-time-picker` | Combined date+time contract; locale not frozen |
| `time-picker` | Format/step contract not yet frozen |
| `calendar` | Navigation/selection API may be extended |
| `editable-field` | Save/cancel/edit state names may change |
| `file-upload` | Drag state and progress integration pending |
| `dropzone` | Active/reject state names may change |
| `tags-input` | Tag management interaction API evolving |
| `rating` | Half-star and keyboard contract pending |
| `settings-panel` | Layout contract may be extended |
| `split-button` | Keyboard/menu contract may expand |
| `inline-notice` | Semantic distinction from alert/callout pending |
| `command-bar` | Slot contract and action grouping may evolve |
| `tree-table` | Row expand/collapse keyboard contract pending |
| `copy-button` | Clipboard API integration pattern may extend |
| `password-input` | Reveal/hide toggle and validation state pending |
| `stat-group` | Responsive contract not frozen |
| `empty-search-state` | Pattern-based; variant contract may grow |

---

## Experimental Surfaces (Not Recommended for Production)

No semver guarantee. May change or be removed at any time. Pin to an **exact version** if you must use these.

**Surfaces:** `heading`, `text`, `callout`, `code`, `code-block`, `quote`, `kbd`, `markdown-surface`, `coachmark`, `auth-screen`

**Patterns:** `filter-bar` (`data-pattern="filter-bar"`), `data-table-toolbar` (`data-pattern="data-table-toolbar"`)

---

## What "stable" means in practice

### Selector stability

The class names listed in `dist/contracts/selectors.json` for supported surfaces will not change in v1.x. Example:

```html
<!-- Safe in all v1.x versions -->
<button class="btn btn-primary btn-solid btn-md">Save</button>
```

### Token stability

CSS custom properties used by supported surfaces (`--color-primary`, `--space-4`, etc.) will not be renamed or removed in v1.x. Values may shift slightly in minor releases for visual improvements, but semantic meaning is preserved.

### data-* attribute stability

`data-open`, `data-active`, `data-row-selected`, and other interaction markers listed in `dist/contracts/selectors.json` are stable for supported surfaces.

**Key rule that will not change:**
```js
// Show
element.setAttribute("data-open", "true");
// Hide — always remove, never set to "false"
element.removeAttribute("data-open");
```

### Resolver stability

Resolver function signatures for supported surfaces are frozen:

```js
import { buttonRecipe } from "fikir-css/tooling";
buttonRecipe({ tone: "primary", variant: "solid", size: "md" });
// → "btn btn-primary btn-solid btn-md"  — stable in all v1.x
```

---

## Machine-readable stability contracts

v1.0.0 ships six JSON manifests for AI and tooling consumption:

```
dist/contracts/selectors.json    — 417 selectors + data-* markers
dist/contracts/anatomy.json      — 60 component HTML structures
dist/contracts/capabilities.json — 60 component does/does_not tables
dist/contracts/variants.json     — canonical tones, styles, sizes
dist/contracts/tokens.json       — 59 design tokens with px values
dist/contracts/primitives.json   — 7 layout primitive defaults
```

All manifests carry `"schema_version": "1.0"`. The schema is stable for v1.x.

---

## Promotion criteria

A beta surface can be promoted to `supported` in a future MINOR release if it passes the criteria in [`docs/release/experimental-to-supported-criteria.md`](../release/experimental-to-supported-criteria.md). Promotions are **additive** and never breaking.

An experimental surface is promoted to `beta` or `supported` via the same process. See [`docs/maintainer/how-to-move-rfc-to-supported.md`](../maintainer/how-to-move-rfc-to-supported.md).
