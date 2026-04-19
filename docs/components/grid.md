# Grid

> Support level: **Supported** | Surface key: `component.grid` | Canonical: `.comp-grid`

## When to use

CSS Grid layout primitive. Flexible 2D layouts with responsive columns.

- ✓ Card layouts (3 columns, responsive)
- ✓ Dashboard grids
- ✓ Product galleries
- ✓ Responsive multi-column layouts
- ✗ Simple vertical (use stack)
- ✗ Simple horizontal (use cluster)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-grid` | CSS Grid container | n/a |
| `comp-grid-cols-2` | 2 columns | Modifier |
| `comp-grid-cols-3` | 3 columns | Modifier |
| `comp-grid-cols-4` | 4 columns | Modifier |
| `comp-grid-gap-md` | Medium gap (1rem) | Modifier |
| `comp-grid-auto` | Auto-fit responsive | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Columns shown |

## Basic usage

```html
<!-- Simple 3-column grid -->
<div class="comp-grid comp-grid-cols-3 comp-grid-gap-md" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <div class="comp-card">Card 1</div>
  <div class="comp-card">Card 2</div>
  <div class="comp-card">Card 3</div>
  <div class="comp-card">Card 4</div>
  <div class="comp-card">Card 5</div>
  <div class="comp-card">Card 6</div>
</div>

<!-- Responsive auto-fit grid -->
<div class="comp-grid comp-grid-auto comp-grid-gap-md" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
  <div class="comp-card">Item 1</div>
  <div class="comp-card">Item 2</div>
  <div class="comp-card">Item 3</div>
</div>

<!-- 2-column layout -->
<div class="comp-grid comp-grid-cols-2 comp-grid-gap-lg" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
  <section style="padding: 2rem; background: var(--color-bg-surface); border-radius: 0.5rem;">
    <h2>Main content</h2>
    <p>Primary section</p>
  </section>
  <aside style="padding: 2rem; background: var(--color-bg-surface); border-radius: 0.5rem;">
    <h3>Sidebar</h3>
    <p>Secondary section</p>
  </aside>
</div>

<!-- 4-column product grid -->
<div class="comp-grid comp-grid-cols-4 comp-grid-gap-md" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
  <div class="comp-card">
    <img src="product1.jpg" alt="Product 1" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">
    <p style="margin: 0; font-weight: 500;">Product Name</p>
  </div>
  <!-- More product cards -->
</div>
```

## With spanning

```html
<!-- Grid with cell spanning -->
<div class="comp-grid comp-grid-cols-3 comp-grid-gap-md" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <div style="grid-column: span 2; padding: 2rem; background: var(--color-bg-subtle); border-radius: 0.5rem;">Wide item</div>
  <div style="padding: 2rem; background: var(--color-bg-subtle); border-radius: 0.5rem;">Normal item</div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses CSS Grid properly
- [x] **Responsive:** Auto-fit adapts to screen size
- [x] **Reading order:** Follows natural DOM order
- [x] **Content:** Items are accessible within cells

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-*` | Grid gap | Scales with density |

## Column presets

| Class | Columns | Use case |
|-------|---------|----------|
| `comp-grid-cols-2` | 2 | Sidebar layouts |
| `comp-grid-cols-3` | 3 | Card grids (standard) |
| `comp-grid-cols-4` | 4 | Product galleries |
| `comp-grid-auto` | Responsive | Mobile-first, auto-fit |

## Gap presets

| Class | Gap | Use case |
|-------|-----|----------|
| `comp-grid-gap-md` | 1rem | Standard spacing |
| `comp-grid-gap-lg` | 1.5rem | Comfortable spacing |

## Variants

- **Fixed columns:** 2, 3, 4 column layouts
- **Auto-fit:** Responsive column count based on available space
- **With gaps:** md, lg spacing
- **Spanning:** Cells span multiple columns/rows

## AI / machine-readable notes

- **Selector pattern:** `comp-grid` with column (cols-2, cols-3, cols-4) and gap (gap-md, gap-lg) modifiers
- **Columns:** Use `grid-template-columns: repeat(N, 1fr)` for fixed, `repeat(auto-fit, minmax(...))` for responsive
- **Gap:** Use `comp-grid-gap-*` presets or `gap: <value>`
- **Spanning:** Use `grid-column: span N` for multi-column cells
- **Copy-paste use:** Update column count, gap, and content

## Related patterns

- **Stack:** Vertical layout
- **Cluster:** Horizontal wrap
- **Center:** Centered container
