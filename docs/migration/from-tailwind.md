# Migrating from Tailwind CSS to Fikir CSS

> M12 — Tailwind → Fikir CSS migration guide

## Philosophy shift

| Tailwind CSS | Fikir CSS |
|-------------|-----------|
| Utility-first — compose everything from atomic classes | Contract-first — semantic classes backed by design tokens |
| HTML becomes verbose (`class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md"`) | HTML stays clean (`class="btn btn-primary"`) |
| Design tokens via `tailwind.config.js` | Design tokens via CSS custom properties (`--color-accent`, `--space-3`, etc.) |
| Dark mode via `dark:` variant + JS | Dark mode via `data-theme="dark"` attribute — zero JS |
| No component opinions | Opinionated component API with aria semantics built in |
| ~30 KB gzip (purged) | ~10.5 KB gzip (no purge needed) |

## When to keep Tailwind

Fikir CSS focuses on UI components and tokens. If you need layout utilities (`grid`, `flex`, responsive spacing), using both together is valid:

```html
<!-- Tailwind for layout, Fikir CSS for components -->
<div class="flex gap-4 items-center p-6">
  <button class="btn btn-primary">Save</button>
  <span class="badge badge-success">Active</span>
</div>
```

## Common patterns

### Button

```html
<!-- Tailwind -->
<button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Save
</button>

<!-- Fikir CSS -->
<button class="btn btn-primary btn-sm">Save</button>
```

### Alert / Banner

```html
<!-- Tailwind -->
<div class="rounded-md bg-red-50 p-4 border border-red-200">
  <p class="text-sm font-medium text-red-800">Error occurred</p>
  <p class="text-sm text-red-700">Please try again later.</p>
</div>

<!-- Fikir CSS -->
<div class="alert alert-danger" role="alert">
  <p class="alert-title">Error occurred</p>
  <p class="alert-description">Please try again later.</p>
</div>
```

### Badge / Pill

```html
<!-- Tailwind -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Active
</span>

<!-- Fikir CSS -->
<span class="badge badge-success">Active</span>
```

### Input

```html
<!-- Tailwind -->
<input type="text" class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" />

<!-- Fikir CSS -->
<input type="text" class="input" />
```

### Card

```html
<!-- Tailwind -->
<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
  <h3 class="text-base font-semibold text-gray-900">Card title</h3>
  <p class="mt-2 text-sm text-gray-600">Card content</p>
</div>

<!-- Fikir CSS -->
<div class="card">
  <div class="card-header"><h3 class="card-title">Card title</h3></div>
  <div class="card-body"><p>Card content</p></div>
</div>
```

### Modal

```html
<!-- Tailwind (typically needs headlessui or similar) -->
<div class="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
  <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">...</div>
</div>

<!-- Fikir CSS -->
<div class="modal-backdrop" data-open="true" role="dialog" aria-modal="true">
  <div class="modal">
    <header class="modal-header"><h2 class="modal-title">Title</h2></header>
    <div class="modal-body">...</div>
  </div>
</div>
```

## Token mapping

Tailwind's design scale maps directly to Fikir CSS tokens:

### Colors

| Tailwind | Fikir CSS token |
|----------|-----------------|
| `text-gray-900` | `color: var(--color-fg-default)` |
| `text-gray-500` | `color: var(--color-fg-muted)` |
| `bg-white` / `bg-gray-50` | `background: var(--color-bg-default)` |
| `bg-gray-100` | `background: var(--color-bg-surface)` |
| `border-gray-200` | `border-color: var(--color-border-subtle)` |
| `text-blue-600` | `color: var(--color-accent)` |
| `text-red-600` | `color: var(--color-danger)` |
| `text-green-600` | `color: var(--color-success)` |
| `text-yellow-600` | `color: var(--color-warning)` |

### Spacing

| Tailwind | Fikir CSS token | Value |
|----------|-----------------|-------|
| `space-1` (0.25rem) | `--space-1` | 0.25rem |
| `space-2` (0.5rem) | `--space-2` | 0.5rem |
| `space-3` (0.75rem) | `--space-3` | 0.75rem |
| `space-4` (1rem) | `--space-4` | 1rem |
| `space-6` (1.5rem) | `--space-6` | 1.5rem |
| `space-8` (2rem) | `--space-8` | 2rem |

### Typography

| Tailwind | Fikir CSS token |
|----------|-----------------|
| `text-xs` | `font-size: var(--font-size-xs)` |
| `text-sm` | `font-size: var(--font-size-sm)` |
| `text-base` | `font-size: var(--font-size-md)` |
| `text-lg` | `font-size: var(--font-size-lg)` |

### Border radius

| Tailwind | Fikir CSS token |
|----------|-----------------|
| `rounded-sm` | `border-radius: var(--radius-sm)` |
| `rounded-md` | `border-radius: var(--radius-md)` |
| `rounded-lg` | `border-radius: var(--radius-lg)` |
| `rounded-full` | `border-radius: 9999px` |

## Dark mode migration

```html
<!-- Tailwind -->
<html class="dark">
<!-- Components use dark: variants: class="bg-white dark:bg-gray-900" -->

<!-- Fikir CSS -->
<html data-theme="dark">
<!-- Components automatically adapt — no class changes needed -->
```

## Step-by-step migration

1. **Keep or remove Tailwind** — Fikir CSS and Tailwind can coexist
2. **Install Fikir CSS** — `npm install fikir-css@beta`
3. **Import** — `import 'fikir-css/css'`
4. **Replace component classes** — use mapping tables above
5. **Replace dark mode** — swap `class="dark"` for `data-theme="dark"` on `<html>`
6. **Remove inline utility classes** from components — rely on Fikir CSS tokens
7. **Keep Tailwind for layout** — `flex`, `grid`, `gap-*` etc. still work alongside Fikir CSS
