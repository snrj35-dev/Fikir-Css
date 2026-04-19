# Breadcrumb

> Support level: **Supported** | Surface key: `component.breadcrumb` | Canonical: `.comp-breadcrumb`

## When to use

Navigation trail showing current page location within site hierarchy. Helps users understand page structure and navigate up.

- ✓ Site with clear hierarchy (3+ levels)
- ✓ Show current page location
- ✓ Enable jumping to parent/ancestor pages
- ✗ Flat site structure (no benefit)
- ✗ Primary navigation (use navbar instead)
- ✗ Single-page apps (browser back button better)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-breadcrumb` | Breadcrumb list | n/a |
| `comp-breadcrumb-item` | Individual item | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Link | Not current page | Clickable link |
| Current | Current page | Non-link, bold or different styling |

## Basic usage

```html
<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol class="comp-breadcrumb" style="display: flex; align-items: center; gap: 0.5rem; list-style: none; padding: 0; margin: 0;">
    <li class="comp-breadcrumb-item">
      <a href="/" class="comp-link">Home</a>
    </li>
    <li style="color: var(--color-fg-muted);">/</li>
    <li class="comp-breadcrumb-item">
      <a href="/products" class="comp-link">Products</a>
    </li>
    <li style="color: var(--color-fg-muted);">/</li>
    <li class="comp-breadcrumb-item">
      <a href="/products/electronics" class="comp-link">Electronics</a>
    </li>
    <li style="color: var(--color-fg-muted);">/</li>
    <li class="comp-breadcrumb-item" aria-current="page">
      <span style="color: var(--color-fg-default);">Laptops</span>
    </li>
  </ol>
</nav>

<!-- Compact breadcrumb with chevron separator -->
<nav aria-label="Breadcrumb">
  <ol class="comp-breadcrumb">
    <li><a href="/" class="comp-link">Home</a></li>
    <li><span style="margin: 0 0.25rem;">›</span></li>
    <li><a href="/docs" class="comp-link">Documentation</a></li>
    <li><span style="margin: 0 0.25rem;">›</span></li>
    <li aria-current="page">API Reference</li>
  </ol>
</nav>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<nav>` with `aria-label="Breadcrumb"`
- [x] **List:** Uses `<ol>` (ordered list, implies hierarchy)
- [x] **Current page:** Uses `aria-current="page"` on current item
- [x] **Separators:** Visual separators (/, ›) are CSS-generated, not read by screen reader
- [x] **Links:** Each ancestor is clickable link
- [x] **Screen reader:** Trail is announced as ordered list

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | On nav | `"Breadcrumb"` |
| `aria-current` | Current item | `"page"` |

## Breadcrumb separators

| Separator | HTML | CSS |
|-----------|------|-----|
| Slash | `/` | `/` |
| Chevron | › | `›` |
| Dash | – | `–` |
| Arrow | → | `→` |
| Pipe | \| | `|` |

Use CSS `::after` to avoid screen reader announcement:

```css
.comp-breadcrumb li:not(:last-child)::after {
  content: " / ";
  color: var(--color-fg-muted);
}
```

## Responsive breadcrumb

```html
<!-- Hide ancestor items on mobile, show only recent 2 -->
<nav aria-label="Breadcrumb" style="overflow-x: auto;">
  <ol class="comp-breadcrumb">
    <li class="comp-breadcrumb-item" style="display: none;"><!-- hidden on mobile --></li>
    <li style="display: none;">›</li>
    <li class="comp-breadcrumb-item"><a href="/products" class="comp-link">Products</a></li>
    <li>›</li>
    <li class="comp-breadcrumb-item" aria-current="page">Current page</li>
  </ol>
</nav>
```

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-primary` | Link color | Brand color |
| `--color-fg-muted` | Separator color | Lighter |
| `--font-size-sm` | Text size | Smaller than body |

## AI / machine-readable notes

- **Selector pattern:** `comp-breadcrumb` list with `comp-breadcrumb-item` list items
- **Separators:** Use CSS `::after` for non-screen-reader announcement
- **Current:** Mark with `aria-current="page"`, not link
- **Structure:** Each level is ancestor link or current page
- **Copy-paste use:** Update href and link text for your site structure

## Related patterns

- **Navbar:** Primary navigation (different purpose)
- **Pagination:** Page-by-page navigation (different)
