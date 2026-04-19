# Container

> Support level: **Supported** | Surface key: `component.container` | Canonical: `.comp-container`

## When to use

Max-width wrapper for content. Centers and constrains content width.

- ✓ Page max-width constraint
- ✓ Content centering
- ✓ Padding/margin control
- ✗ Complex layouts (use grid instead)
- ✗ Navigation (use stack/cluster instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-container` | Width constraint wrapper | n/a |
| `comp-container-sm` | Small width (640px) | Modifier |
| `comp-container-md` | Medium width (768px) | Modifier |
| `comp-container-lg` | Large width (1024px) | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Content constrained and centered |

## Basic usage

```html
<!-- Container (medium width) -->
<div class="comp-container comp-container-md" style="max-width: 768px; margin: 0 auto; padding: 2rem; width: 100%;">
  <h1>Page Title</h1>
  <p>Content here will be centered and max-width constrained.</p>
</div>

<!-- Small container (e.g., for login page) -->
<div class="comp-container comp-container-sm" style="max-width: 640px; margin: 0 auto; padding: 2rem;">
  <form>
    <div class="comp-field" style="margin-bottom: 1.5rem;">
      <label for="email">Email</label>
      <input id="email" type="email" placeholder="Enter email">
    </div>
    <button class="comp-button">Sign in</button>
  </form>
</div>

<!-- Large container (wide content) -->
<div class="comp-container comp-container-lg" style="max-width: 1024px; margin: 0 auto; padding: 2rem;">
  <table class="comp-table"><!-- table content --></table>
</div>
```

## Nested containers

```html
<div class="comp-container comp-container-lg" style="max-width: 1024px; margin: 0 auto; padding: 2rem;">
  <div class="comp-container comp-container-sm" style="max-width: 640px; margin: 0 auto;">
    <!-- Nested smaller container -->
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<div>` or semantic tags (`<main>`, `<section>`, etc.)
- [x] **Content:** Readable line length (50-75 chars per line ideal)
- [x] **Responsive:** Padding scales appropriately

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-*` | Padding | Scales with density |

## Size presets

| Class | Max-width | Use case |
|-------|-----------|----------|
| `comp-container-sm` | 640px | Forms, login pages |
| `comp-container-md` | 768px | Blog posts, articles |
| `comp-container-lg` | 1024px | Dashboards, tables |

## Variants

- **No padding:** Remove padding for custom spacing
- **Full width:** Disable max-width for full bleed
- **Asymmetric:** Different max-widths for different sections

## AI / machine-readable notes

- **Selector pattern:** `comp-container` with size modifiers (sm/md/lg)
- **Max-width:** Use preset widths (640px, 768px, 1024px)
- **Centering:** Use `margin: 0 auto` for horizontal centering
- **Padding:** Add `padding` for internal spacing
- **Copy-paste use:** Update max-width and padding as needed

## Related patterns

- **Stack:** Vertical layout
- **Cluster:** Horizontal layout
- **Grid:** 2D layouts
