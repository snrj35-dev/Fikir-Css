# Headless Contract Spec

> Created: 2026-04-12
> Status: Accepted (M2)
> Scope: Defines the state, ARIA, and data-attribute contract for headless usage of Fikir CSS components

## Purpose

Fikir CSS components carry CSS styles only. Behavior (open/close, focus management, keyboard handling) is the consumer's responsibility. This document defines the **observable contract** that CSS rules rely on — the states, ARIA attributes, and `data-*` attributes that drive CSS state styling.

## Contract Principles

1. **CSS drives appearance; attributes drive state.** No JavaScript class toggling for style states. State is expressed via HTML attributes.
2. **Data attributes are the primary state mechanism.** `data-open`, `data-active`, `data-disabled` are preferred over ARIA attributes for styling hooks — ARIA attributes serve accessibility only.
3. **Attribute contracts are stable.** Once a component is `supported`, its attribute contract must follow the selector deprecation policy before removal.

---

## State Attribute Contract

### `data-open`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"true"` | Component is open/visible/expanded | `modal`, `popover`, `tooltip`, `dropdown-menu`, `split-button`, `accordion`, `menu-bar-item`, `menu-bar-submenu` |
| `"false"` (or absent) | Closed/hidden | (default state) |

### `data-active`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"true"` | Item is the currently active/selected item | `settings-panel-nav-item`, `sidebar-nav` |

### `data-disabled`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"true"` | Item is disabled | Pattern override; native `disabled` preferred for form elements |

### `data-loading`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"true"` | Surface is in a loading state | `table`, `data-grid` |

### `data-tone`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"success"` | Positive feedback | `toast`, `alert` |
| `"info"` | Informational | `toast`, `alert` |
| `"warn"` | Warning | `toast`, `alert` |
| `"error"` | Error/destructive | `toast`, `alert` |
| `"danger"` | Destructive action | `toast`, `alert`, `badge` |

### `data-row-selected`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"true"` | Table row is selected | `table-row`, `data-grid` row |

### `data-pattern`

| Value | Meaning | Used by |
|-------|---------|---------|
| `"command-bar"` | Marks a command bar composition | Pattern surfaces |
| `"filter-bar"` | Marks a filter bar composition | Pattern surfaces |
| `"data-table-toolbar"` | Marks a data table toolbar | Pattern surfaces |

### `data-slot`

Structural `data-slot` values are used only inside pattern wrappers. They are not state markers.

| Value | Meaning | Used by |
|-------|---------|---------|
| `"controls"` | Primary controls row | `filter-bar`, `data-table-toolbar` |
| `"search"` | Search area | `filter-bar`, `data-table-toolbar` |
| `"filters"` | Filter control group | `filter-bar`, `data-table-toolbar` |
| `"reset"` | Clear/reset action group | `filter-bar` |
| `"actions"` | Non-reset action group | `filter-bar`, `data-table-toolbar` |
| `"summary"` | Secondary summary row | `filter-bar`, `data-table-toolbar` |
| `"chips"` | Active filter chip group | `filter-bar` |
| `"meta"` | Result/meta summary text | `filter-bar` |
| `"column-visibility"` | Column visibility controls | `data-table-toolbar` |
| `"density"` | Density controls | `data-table-toolbar` |
| `"export"` | Export controls | `data-table-toolbar` |
| `"active-filters"` | Active filter summary group | `data-table-toolbar` |
| `"selection-summary"` | Selected row count/meta | `data-table-toolbar` |
| `"surface"` | Controlled table or data-grid area | `data-table-toolbar` |

---

## ARIA Attributes Used by CSS

The following ARIA attributes directly trigger CSS rules (via attribute selectors):

| Attribute | Value | Effect |
|-----------|-------|--------|
| `aria-current="page"` | page | Active nav item highlight |
| `aria-current="step"` | step | Active stepper step |
| `aria-expanded` | `"true"` | Accordion panel open styling |
| `aria-invalid` | `"true"` | Ring-danger on invalid inputs |
| `aria-selected` | `"true"` | Tab active state |

---

## CSS vs JS Responsibility Boundary

Fikir CSS deliberately splits responsibility at the **attribute boundary**.

| Layer | Handled by | Mechanism |
|-------|-----------|-----------|
| Visual appearance (colors, spacing, typography) | Fikir CSS | CSS class names |
| Open / closed state styling | Fikir CSS | `data-open="true"` attribute selector |
| Invalid / loading state styling | Fikir CSS | `aria-invalid`, `data-loading` attribute selectors |
| Active nav item highlight | Fikir CSS | `aria-current="page"` attribute selector |
| **Focus trap** (Tab/Shift+Tab containment) | `fikir-css/helpers` | `createFocusTrap()` |
| **Escape + backdrop dismiss** | `fikir-css/helpers` | `bindOverlayKeyboard()` |
| **Arrow-key navigation** (tabs, menus) | `fikir-css/helpers` | `createRovingTabindex()` |
| `aria-expanded`, `aria-selected` updates | **Consumer** | Framework or vanilla JS |
| `data-open` toggling | **Consumer** | Framework or vanilla JS |
| Screen reader announcements (`aria-live`) | **Consumer** | Framework or vanilla JS |

### When to use `fikir-css/helpers`

Use the helpers when you **do not** have a headless component library (Radix, Headless UI, Ark, etc.) already wiring these behaviors. If you do, skip the helpers and let your headless library handle them — Fikir CSS will respond to the same `data-*` attributes either way.

```
Your headless library → sets data-open="true" → Fikir CSS shows the modal
fikir-css/helpers    → sets data-open="true" → Fikir CSS shows the modal
Your own vanilla JS  → sets data-open="true" → Fikir CSS shows the modal
```

**All three paths produce identical visual results.** The helpers are opt-in convenience, not a requirement.

---

## Headless Examples Reference

See `docs/architecture/headless-examples.md` for concrete usage patterns for each component.
See `docs/guides/overlay-js-helpers.md` for the `fikir-css/helpers` API reference.

---

## Versioning

This contract is versioned in `docs/contracts/contract-compatibility-matrix.md`. Breaking changes (removing or renaming a `data-*` attribute) require a deprecation cycle per `docs/contracts/selector-deprecation-window-policy.md`.
