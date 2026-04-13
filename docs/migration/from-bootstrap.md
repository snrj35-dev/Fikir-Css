# Migrating from Bootstrap 5 to Fikir CSS

> M12 — Bootstrap → Fikir CSS class mapping guide

## Key differences

| Concept | Bootstrap 5 | Fikir CSS |
|---------|-------------|-----------|
| Theme activation | JS + `data-bs-theme` | `data-theme` attribute, zero JS |
| Component state | JS-driven class toggling | `data-*` attribute selectors |
| Spacing scale | `mb-3`, `px-4` utilities | `--space-*` CSS tokens |
| Color palette | `text-primary`, `bg-success` | `--color-accent`, `--color-success` tokens |
| Bundle size | ~22 KB gzip (CSS only) | ~10.5 KB gzip |
| JS dependency | Required for dropdowns, modals | Zero JS — CSS-only state |

## Class mapping

### Buttons

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `btn btn-primary` | `btn btn-primary` |
| `btn btn-secondary` | `btn btn-neutral` |
| `btn btn-danger` | `btn btn-danger` |
| `btn btn-outline-primary` | `btn btn-outline btn-primary` |
| `btn btn-sm` | `btn btn-sm` |
| `btn btn-lg` | `btn btn-lg` |
| `btn disabled` | `btn` + `disabled` attribute |

### Alerts

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `alert alert-primary` | `alert alert-info` |
| `alert alert-danger` | `alert alert-danger` |
| `alert alert-success` | `alert alert-success` |
| `alert alert-warning` | `alert alert-warning` |
| `alert-heading` | `alert-title` |

### Badges

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `badge bg-primary` | `badge badge-primary` |
| `badge bg-secondary` | `badge badge-neutral` |
| `badge bg-success` | `badge badge-success` |
| `badge bg-danger` | `badge badge-danger` |
| `badge bg-warning` | `badge badge-warning` |
| `rounded-pill` (on badge) | `badge` (pills by default) |

### Form controls

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `form-control` | `input` |
| `form-select` | `select` |
| `form-label` | `label` |
| `form-check-input` (type=checkbox) | `checkbox` |
| `form-check-input` (type=radio) | `radio` |
| `form-check-label` | `label` |
| `form-switch .form-check-input` | `switch` (input[type=checkbox]) |
| `form-text` | `helper-text` |
| `is-invalid` | `input[aria-invalid="true"]` |

### Cards

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `card` | `card` |
| `card-header` | `card-header` |
| `card-body` | `card-body` |
| `card-footer` | `card-footer` |
| `card-title` | `card-title` |
| `card-text` | — (use `text-muted` or plain `p`) |

### Navigation

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `nav nav-tabs .nav-link` | `tab-list` + `tab` (button[role=tab]) |
| `tab-pane` | `tab-panel` |
| `breadcrumb-item` | `breadcrumb-item` |
| `pagination .page-item .page-link` | `pagination` + `page-item` + `page-link` |

### Modals

Bootstrap requires JS. Fikir CSS uses `data-open` attribute:

```html
<!-- Bootstrap -->
<div class="modal fade" id="myModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Content</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Fikir CSS -->
<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" data-open="false">
  <div class="modal">
    <header class="modal-header">
      <h2 id="modal-title" class="modal-title">Title</h2>
      <button type="button" class="icon-button" aria-label="Close">✕</button>
    </header>
    <div class="modal-body">Content</div>
    <footer class="modal-footer">
      <button type="button" class="btn btn-primary btn-sm">Close</button>
    </footer>
  </div>
</div>
```

Toggle with: `element.setAttribute('data-open', 'true')` — or use the `bindOverlayKeyboard` helper from `fikir-css/helpers`.

### Dropdowns

| Bootstrap | Fikir CSS |
|-----------|-----------|
| `dropdown` | `dropdown` |
| `dropdown-menu show` | `dropdown-menu` + `data-open="true"` |
| `dropdown-item` | `dropdown-item` (a or button) |
| `dropdown-divider` | `divider` |

## Spacing migration

Bootstrap's utility classes map to Fikir CSS CSS tokens:

| Bootstrap | Fikir CSS token | Value |
|-----------|-----------------|-------|
| `mb-1` | `--space-1` | 0.25rem |
| `mb-2` | `--space-2` | 0.5rem |
| `mb-3` | `--space-3` | 0.75rem |
| `mb-4` | `--space-4` | 1rem |
| `mb-5` | `--space-6` | 1.5rem |

## Dark mode migration

```html
<!-- Bootstrap 5 -->
<html data-bs-theme="dark">

<!-- Fikir CSS -->
<html data-theme="dark">
```

No JS required. Activate with the `data-theme` attribute directly.

## Step-by-step migration

1. **Remove Bootstrap** — uninstall `bootstrap` package
2. **Install Fikir CSS** — `npm install fikir-css@beta`
3. **Import CSS** — replace `import 'bootstrap/dist/css/bootstrap.min.css'` with `import 'fikir-css/css'`
4. **Replace class names** — use the mapping table above
5. **Remove Bootstrap JS** — replace modal/dropdown JS with `data-open` attribute toggling
6. **Import themes** — add `import 'fikir-css/themes/dark'` if needed
7. **Test** — run your test suite; check dark mode, forms, and overlays
