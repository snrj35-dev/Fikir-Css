# Stat Group

> Support level: **Supported** | Pattern key: `pattern.statGroup` | Canonical: `data-pattern="stat-group"`

## When to use

Layout pattern for organizing multiple KPI cards or metric summaries into an auto-responsive grid. Typically used with `card` components.

- ✓ Dashboard KPI panels
- ✓ Summary metric sections
- ✓ Data reporting screens
- ✗ Large complex data tables (use `table` or `data-grid`)
- ✗ General layout grids without metrics (use `grid` or `stack`)

## Canonical anatomy

| Attribute | Role | Values |
|-----------|------|--------|
| `data-pattern` | Root container | `"stat-group"` |
| `data-variant` | Layout style | `"compact" \| "divided"` |
| `data-slot="item"` | Optional item wrapper | Usually `.card` |

## Basic usage

```html
<div data-pattern="stat-group">
  <article class="card card-elevated card-p-md">
    <p class="stat-label">Total Users</p>
    <p class="stat-value">24,512</p>
    <p class="stat-meta">↑ +12% vs last month</p>
  </article>
  <article class="card card-elevated card-p-md">
    <p class="stat-label">Active Sessions</p>
    <p class="stat-value">1,847</p>
    <p class="stat-meta">↓ −3% vs last month</p>
  </article>
  <article class="card card-elevated card-p-md">
    <p class="stat-label">Revenue</p>
    <p class="stat-value">$98,450</p>
    <p class="stat-meta">↑ +8.4% vs last month</p>
  </article>
</div>
```

## Variants

### Compact
Tighter grid spacing and smaller minimum widths for dense dashboards.
```html
<div data-pattern="stat-group" data-variant="compact">
  <div class="card card-subtle card-p-sm">
    <p class="stat-label">Issues</p>
    <p class="stat-value">42</p>
  </div>
  <div class="card card-subtle card-p-sm">
    <p class="stat-label">Resolved</p>
    <p class="stat-value">38</p>
  </div>
</div>
```

### Divided
Removes gaps and adds internal separator borders. Often used inside a parent card.
```html
<div class="card card-elevated">
  <div data-pattern="stat-group" data-variant="divided">
    <div class="card-p-md">
      <p class="stat-label">Uptime</p>
      <p class="stat-value">99.97%</p>
    </div>
    <div class="card-p-md">
      <p class="stat-label">Latency</p>
      <p class="stat-value">42ms</p>
    </div>
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic markup:** Uses `<article>` or `<li>` for individual metric units
- [x] **Heading hierarchy:** If the group has a title, use an appropriate `<h3>`-`<h4>` level
- [x] **Color contrast:** Ensure `stat-meta` indicators (up/down) maintain contrast
- [x] **Screen readers:** Use `aria-label` or `sr-only` text for trend indicators if using only arrows

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-4`, `--space-6` | Grid gap | Scales with density |
| `--color-border-subtle` | Separator color | For `divided` variant |
| `--radius-md`, `--radius-lg` | Card corners | Pattern usually contains cards |
| `--font-size-2xl` | Value text size | Emphasized metric font |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="stat-group"`
- **Layout engine:** uses CSS Grid with `auto-fit` for responsive column counts
- **Variant:** `data-variant="compact"` reduces gaps; `data-variant="divided"` removes gaps and adds borders
- **Customization:** override `--stat-group-gap` and `--stat-group-min` (min-width) for custom densities
- **Internal components:** expects `card` (or elements with `stat-label`, `stat-value` classes)

## Related

- **`card`** — the base container for individual stats
- **`grid`** — general purpose grid layout component
- **`kpi-card`** — specialized stat card with charts
- **`badge`** — often used in `stat-meta` for trend indicators
