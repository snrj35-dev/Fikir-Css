# From Bootstrap to Fikir CSS

> Created: 2026-04-12
> Scope: M3 migration quickstart

## Key Differences

| Concept | Bootstrap | Fikir CSS |
|---------|-----------|-----------|
| Selector style | `btn`, `btn-primary` | `btn`, `btn-primary` (similar!) |
| Grid | `.container .row .col-*` | Layout primitives (`grid`, `switcher`) |
| Theming | Sass variables + maps | CSS custom properties |
| JS behavior | jQuery/Popper bundled | Zero JS — headless contract |
| Components | Rendered HTML pattern | CSS-only, JS is consumer responsibility |

## Class Name Mapping

### Buttons

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `btn btn-primary` | `btn btn-primary` |
| `btn btn-secondary` | `btn` |
| `btn btn-danger` | `btn btn-danger` |
| `btn btn-sm` | `btn btn-sm` |
| `btn btn-lg` | `btn btn-lg` |

### Forms

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `form-control` | `input` |
| `form-select` | `select` |
| `form-check-input` | `checkbox` / `radio` |
| `form-label` | `label` |
| `form-text` | `helper-text` |
| `invalid-feedback` | `error-text` |
| `mb-3` (form group) | `field` |

### Alerts

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `alert alert-primary` | `alert` |
| `alert alert-danger` | `alert alert-danger` |
| `alert-heading` | `alert-title` |

### Cards

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `card` | `card` |
| `card-header` | `card-header` |
| `card-body` | `card-body` |
| `card-footer` | `card-footer` |
| `card-title` | Use semantic heading inside |

### Navigation

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `nav nav-tabs` | `tabs` + `tabs-trigger` |
| `nav-item nav-link` | `tabs-trigger` with `role="tab"` |
| `tab-content tab-pane` | `tabs-panel` |
| `navbar navbar-expand-lg` | `navbar` |
| `breadcrumb breadcrumb-item` | `breadcrumb` + `breadcrumb-item` |

## Behavior Migration

Bootstrap bundles JavaScript for dropdowns, modals, tooltips, etc. Fikir CSS is behavior-free — you supply or wrap a headless library.

```html
<!-- Bootstrap modal (Bootstrap JS opens/closes it) -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">...

<!-- Fikir CSS modal (your JS sets data-open) -->
<div class="modal" data-open="false" role="dialog" aria-modal="true">
  <div class="modal-dialog">...
```

For behavior, see `docs/architecture/headless-examples.md`.

## Grid Migration

```html
<!-- Bootstrap grid -->
<div class="container">
  <div class="row">
    <div class="col-md-4">...</div>
    <div class="col-md-8">...</div>
  </div>
</div>

<!-- Fikir CSS — use layout primitives or CSS grid directly -->
<div class="container">
  <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-4);">
    <div>...</div>
    <div>...</div>
  </div>
</div>
```
