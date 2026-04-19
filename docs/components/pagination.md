# Pagination

> Support level: **Supported** | Surface key: `component.pagination` | Canonical: `.comp-pagination`

## When to use

Navigation between pages of results. Previous/next and numbered page links.

- ✓ Search results / data display across pages
- ✓ Blog post archives
- ✓ Table with page view
- ✓ Large lists split into pages
- ✗ Infinite scroll (use loading pattern)
- ✗ Single page content (no pagination needed)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-pagination` | Pagination wrapper | n/a |
| `comp-pagination-prev` | Previous page button | n/a |
| `comp-pagination-item` | Page number link | n/a |
| `comp-pagination-item-current` | Current page indicator | Modifier |
| `comp-pagination-next` | Next page button | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | Any page | All buttons active |
| First page | Page 1 | Prev button disabled |
| Last page | Last page | Next button disabled |
| Current | Active page | Number highlighted |

## Basic usage

```html
<!-- Basic pagination -->
<nav class="comp-pagination" aria-label="Pagination" style="display: flex; gap: 0.5rem; align-items: center;">
  <button class="comp-pagination-prev" style="padding: 0.5rem 1rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem; background: white; cursor: pointer;">← Previous</button>
  
  <ul style="display: flex; gap: 0.5rem; list-style: none; padding: 0; margin: 0;">
    <li>
      <a class="comp-pagination-item comp-pagination-item-current" href="#" aria-current="page" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-accent); background: var(--color-accent); color: white; border-radius: 0.25rem; text-decoration: none; font-weight: 500;">1</a>
    </li>
    <li>
      <a class="comp-pagination-item" href="?page=2" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border-subtle); background: white; border-radius: 0.25rem; text-decoration: none; color: var(--color-fg-base);">2</a>
    </li>
    <li>
      <a class="comp-pagination-item" href="?page=3" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border-subtle); background: white; border-radius: 0.25rem; text-decoration: none; color: var(--color-fg-base);">3</a>
    </li>
    <li style="display: flex; align-items: center; padding: 0 0.5rem;">…</li>
    <li>
      <a class="comp-pagination-item" href="?page=10" style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border: 1px solid var(--color-border-subtle); background: white; border-radius: 0.25rem; text-decoration: none; color: var(--color-fg-base);">10</a>
    </li>
  </ul>
  
  <button class="comp-pagination-next" style="padding: 0.5rem 1rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem; background: white; cursor: pointer;">Next →</button>
</nav>

<!-- With page info -->
<nav class="comp-pagination" aria-label="Pagination" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem;">
  <span style="color: var(--color-fg-muted); font-size: 0.875rem;">Showing 1–20 of 150 results</span>
  
  <div style="display: flex; gap: 0.5rem; align-items: center;">
    <button class="comp-pagination-prev" style="padding: 0.5rem 1rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem; background: white;">Previous</button>
    
    <ul style="display: flex; gap: 0.25rem; list-style: none; padding: 0; margin: 0;">
      <li><a class="comp-pagination-item comp-pagination-item-current" aria-current="page" href="#" style="display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; background: var(--color-accent); color: white; border-radius: 0.25rem; text-decoration: none;">1</a></li>
      <li><a class="comp-pagination-item" href="?page=2" style="display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border: 1px solid var(--color-border-subtle); background: white; border-radius: 0.25rem; text-decoration: none; color: var(--color-fg-base);">2</a></li>
      <li><a class="comp-pagination-item" href="?page=3" style="display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border: 1px solid var(--color-border-subtle); background: white; border-radius: 0.25rem; text-decoration: none; color: var(--color-fg-base);">3</a></li>
    </ul>
    
    <button class="comp-pagination-next" style="padding: 0.5rem 1rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem; background: white;">Next</button>
  </div>
</nav>

<!-- Compact pagination (mobile) -->
<nav class="comp-pagination" aria-label="Pagination" style="display: flex; justify-content: center; gap: 1rem; align-items: center; padding: 1rem;">
  <button class="comp-pagination-prev" style="padding: 0.5rem 1rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem; background: white;">← Prev</button>
  <span style="color: var(--color-fg-muted); font-size: 0.875rem;">Page <strong>1</strong> of <strong>10</strong></span>
  <button class="comp-pagination-next" style="padding: 0.5rem 1rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem; background: white;">Next →</button>
</nav>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<nav>` with aria-label
- [x] **Current page:** Marked with aria-current="page"
- [x] **Disabled:** Previous/next disabled when unavailable
- [x] **Keyboard:** Tab navigates links/buttons
- [x] **Focus:** Visible focus on all interactive items
- [x] **Links:** Page numbers are links (not buttons)
- [x] **Screen reader:** Navigation purpose announced

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Navigate pagination controls |
| `Enter` (link) | Navigate to page |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<nav aria-label="Pagination">` | Navigation | Semantic landmark |
| `aria-current="page"` | Current page | On current page link |
| `disabled` (button) | Unavailable | First/last page |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Button border | Normal state |
| `--color-accent` | Current page | Highlight color |
| `--space-*` | Padding/gap | Scales with density |

## Ellipsis pattern

```html
<!-- Show first few, gap, last few -->
<ul style="display: flex; gap: 0.5rem; list-style: none;">
  <li><a href="?page=1">1</a></li>
  <li><a href="?page=2">2</a></li>
  <li><a href="?page=3">3</a></li>
  <li style="padding: 0 0.25rem;">…</li>
  <li><a href="?page=8">8</a></li>
  <li><a href="?page=9">9</a></li>
  <li><a href="?page=10" aria-current="page">10</a></li>
</ul>
```

## Variants

- **Numbered links:** Show all pages or with ellipsis
- **Previous/next only:** For large result sets
- **With info:** "Page 3 of 10" or "Results 21-40 of 100"
- **Compact:** Mobile-friendly (less space)
- **Sizes:** sm, md, lg pagination items

## Page count display

```html
<!-- Different page info styles -->
<span>Page 1 of 10</span>
<span>Showing 1–20 of 150</span>
<span>1–20 of 150</span>
```

## AI / machine-readable notes

- **Selector pattern:** `comp-pagination` nav with `comp-pagination-prev`, `comp-pagination-item`, `comp-pagination-next` children
- **Current page:** Marked with `aria-current="page"`
- **Links:** Page numbers are `<a>` elements with query parameters (e.g., `?page=2`)
- **Buttons:** Prev/next can be `<button>` elements, disabled on edges
- **Ellipsis:** Use `…` or `⋯` between page groups
- **Copy-paste use:** Update page count, current page, and links

## Related patterns

- **Result:** Display results on page
- **Data-grid:** Large dataset with pagination
- **List:** Single page of results
