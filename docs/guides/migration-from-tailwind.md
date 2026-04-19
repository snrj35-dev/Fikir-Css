# From Tailwind CSS to Fikir CSS

> Updated: M18 — v0.6.0

## Key Differences

| Concept | Tailwind | Fikir CSS |
|---------|----------|-----------|
| Styling approach | Utility-first | Utility + semantic components |
| Class generation | JIT / purge | Static CSS bundle |
| Component patterns | Headless UI / Radix | Built-in semantic components |
| Token system | `tailwind.config.js` | CSS custom properties |
| Dark mode | `dark:` prefix | `prefers-color-scheme` + `data-theme` |
| Layer order | `base < components < utilities` | `reset < base < layouts < recipes < components < utilities` |

## Class Name Mapping

### Layout

| Tailwind | Fikir CSS |
|----------|-----------|
| `flex` | `flex` (utility) or `cluster` (semantic) |
| `flex-col` + `gap-4` | `stack` (semantic) |
| `grid grid-cols-3 gap-4` | `grid` (layout primitive) |
| `container mx-auto` | `container` (layout primitive) |
| `items-center` | `items-center` (utility) |
| `justify-between` | `justify-between` (utility) |

### Spacing

| Tailwind | Fikir CSS |
|----------|-----------|
| `p-4` | `p-4` (utility) |
| `px-4 py-2` | `px-4 py-2` (utility) |
| `mt-0` | `mt-0` (utility) |
| `gap-2` | `gap-2` (utility) |

### Typography

| Tailwind | Fikir CSS |
|----------|-----------|
| `text-sm` | `text-sm` (utility) |
| `font-semibold` | `font-semibold` (utility) |
| `text-gray-500` | `text-fg-muted` (semantic) |

### Components

Instead of composing Tailwind utilities for every component, use Fikir CSS semantic components:

```html
<!-- Tailwind -->
<button class="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
  Save
</button>

<!-- Fikir CSS -->
<button class="btn btn-primary">Save</button>
```

```html
<!-- Tailwind card -->
<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
  <h3 class="text-base font-semibold text-gray-900">Card title</h3>
</div>

<!-- Fikir CSS -->
<div class="card card-elevated card-p-md">
  <h3>Card title</h3>
</div>
```

## Configuration Migration

**Tailwind config → Fikir CSS tokens:**

```css
/* fikir-brand-theme.css */
@layer base {
  :root {
    --color-accent: oklch(58% 0.22 250);   /* was: colors.blue.600 */
    --radius-md: 0.375rem;                  /* was: borderRadius.md */
  }
}
```

## Dark Mode Migration

```html
<!-- Tailwind dark mode -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

<!-- Fikir CSS (automatic via CSS custom properties) -->
<div class="surface">
  <!-- tokens switch automatically with prefers-color-scheme -->
</div>
```
