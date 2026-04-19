# Drawer

> Support level: **Supported** | Surface key: `component.drawer` | Canonical: `.comp-drawer`

## When to use

Side panel that slides in from edge (usually left). Alternative to modal for secondary navigation, filters, or actions.

- ✓ Navigation menu (mobile-friendly)
- ✓ Filters sidebar
- ✓ Secondary actions panel
- ✓ Multi-step form (step-by-step content)
- ✗ Critical decision requiring focus (use `modal` instead)
- ✗ Content requiring full-screen attention (use `modal`)
- ✗ Simple menu (use `dropdown-menu` instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-drawer` | Drawer panel container | n/a |
| `comp-drawer-overlay` | Semi-transparent backdrop | n/a |
| `comp-drawer-header` | Header section (title + close button) | n/a |
| `comp-drawer-body` | Content area | n/a |
| `comp-drawer-footer` | Footer actions | Optional |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Hidden | Default (closed) | `<div class="comp-drawer" style="display: none;">` |
| Visible | Open state | Drawer slides in from edge |
| Focused | When open | Focus management inside drawer |
| Closing | Close animation | `aria-hidden="true"` during transition |

## Basic usage

```html
<!-- Drawer structure -->
<div class="comp-drawer" id="nav-drawer" role="dialog" aria-labelledby="drawer-title" aria-modal="true" style="display: none;">
  <div class="comp-drawer-overlay"></div>
  
  <div style="position: fixed; left: 0; top: 0; height: 100%; width: 250px; background: var(--color-bg-surface); z-index: 1000; display: flex; flex-direction: column;">
    <div class="comp-drawer-header" style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center;">
      <h2 id="drawer-title">Navigation</h2>
      <button 
        type="button" 
        class="comp-icon-button" 
        aria-label="Close navigation"
        onclick="document.getElementById('nav-drawer').style.display='none';"
      >
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <div class="comp-drawer-body" style="flex: 1; overflow: auto; padding: 1rem;">
      <nav>
        <a href="#" class="comp-link" style="display: block; margin-bottom: 0.5rem;">Home</a>
        <a href="#" class="comp-link" style="display: block; margin-bottom: 0.5rem;">Products</a>
        <a href="#" class="comp-link" style="display: block; margin-bottom: 0.5rem;">About</a>
        <a href="#" class="comp-link" style="display: block;">Contact</a>
      </nav>
    </div>
  </div>
</div>

<!-- Button to open drawer -->
<button 
  type="button" 
  class="comp-button"
  onclick="document.getElementById('nav-drawer').style.display='block';"
  aria-label="Open navigation menu"
>
  ☰ Menu
</button>
```

## Drawer with filters

```html
<!-- Filters sidebar -->
<div class="comp-drawer" id="filters-drawer" role="dialog" aria-labelledby="filters-title" aria-modal="true">
  <div class="comp-drawer-header">
    <h2 id="filters-title">Filters</h2>
    <button type="button" class="comp-icon-button" aria-label="Close filters">✕</button>
  </div>
  
  <div class="comp-drawer-body">
    <fieldset>
      <legend>Category</legend>
      <label><input type="checkbox" class="comp-checkbox"> Electronics</label>
      <label><input type="checkbox" class="comp-checkbox"> Clothing</label>
    </fieldset>
    
    <fieldset style="margin-top: 1rem;">
      <legend>Price range</legend>
      <input type="range" class="comp-range-slider" min="0" max="1000">
    </fieldset>
  </div>
  
  <div class="comp-drawer-footer" style="padding: 1rem; border-top: 1px solid var(--color-border-subtle); display: flex; gap: 0.5rem;">
    <button type="button" class="comp-button comp-button-ghost" style="flex: 1;">Reset</button>
    <button type="button" class="comp-button" style="flex: 1;">Apply</button>
  </div>
</div>
```

## Accessibility checklist

- [x] **Modal semantics:** Uses `role="dialog"` and `aria-modal="true"`
- [x] **Labeled:** Has `aria-labelledby` pointing to heading
- [x] **Closable:** Close button with clear `aria-label`
- [x] **Keyboard:** Escape key closes drawer
- [x] **Focus trap:** Focus confined to drawer when open
- [x] **Backdrop:** Click outside closes drawer (or use Escape)
- [x] **No scrolling:** Page scroll disabled while drawer open

## Keyboard behavior

| Key | Action |
|-----|--------|
| Escape | Close drawer |
| Tab | Navigate within drawer (circular) |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role` | Always | `"dialog"` |
| `aria-modal` | Always | `"true"` |
| `aria-labelledby` | Always | ID of title heading |
| `aria-hidden` | Content behind | `"true"` (page content) |

## Drawer positions

```html
<!-- Left drawer (default) -->
<!-- Right drawer -->
<!-- Top drawer -->
<!-- Bottom drawer -->
```

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Drawer background | Surface color |
| `--color-border-subtle` | Divider lines | Section separators |
| `--space-*` | Padding | Internal spacing |

## AI / machine-readable notes

- **Selector pattern:** `comp-drawer` wrapper with `comp-drawer-overlay`, `comp-drawer-header`, `comp-drawer-body`, `comp-drawer-footer`
- **State:** Shown/hidden via `display` or `transform`; use JavaScript or data-* attributes
- **Focus trap:** Use `<dialog>` element or manual focus management
- **Keyboard:** Handle Escape key to close
- **Copy-paste use:** Update heading, button labels, and content; structure unchanged

## Related patterns

- **Modal:** Center dialog for critical content
- **Popover:** Small floating panel (non-modal)
- **Dropdown-menu:** Menu alternative (typically smaller)
