# Stat Group

Birden fazla istatistik kartını otomatik yerleşimli grid'de düzenleyen layout pattern'i. `stat` bileşeni ile birlikte kullanılır.

## When to use

- Dashboard KPI kartları
- Özet metrik panelleri
- Veri raporlama ekranları

## Basic usage

```html
<div data-pattern="stat-group">
  <div class="card">
    <p class="stat-label">Total Users</p>
    <p class="stat-value">24,512</p>
    <p class="stat-meta">↑ +12% vs last month</p>
  </div>
  <div class="card">
    <p class="stat-label">Active Sessions</p>
    <p class="stat-value">1,847</p>
    <p class="stat-meta">↓ −3% vs last month</p>
  </div>
  <div class="card">
    <p class="stat-label">Revenue</p>
    <p class="stat-value">$98,450</p>
    <p class="stat-meta">↑ +8.4% vs last month</p>
  </div>
  <div class="card">
    <p class="stat-label">Churn Rate</p>
    <p class="stat-value">2.1%</p>
    <p class="stat-meta">→ No change</p>
  </div>
</div>
```

## Compact variant

```html
<div data-pattern="stat-group" data-variant="compact">
  <div class="card">
    <p class="stat-label">Issues</p>
    <p class="stat-value">42</p>
  </div>
  <div class="card">
    <p class="stat-label">Resolved</p>
    <p class="stat-value">38</p>
  </div>
  <div class="card">
    <p class="stat-label">Open</p>
    <p class="stat-value">4</p>
  </div>
</div>
```

## Divided variant

```html
<div data-pattern="stat-group" data-variant="divided" class="card">
  <div>
    <p class="stat-label">Uptime</p>
    <p class="stat-value">99.97%</p>
  </div>
  <div>
    <p class="stat-label">Latency</p>
    <p class="stat-value">42ms</p>
  </div>
  <div>
    <p class="stat-label">Errors</p>
    <p class="stat-value">0</p>
  </div>
</div>
```

## Variants

| `data-variant` | Description |
|---|---|
| *(default)* | Auto-fit grid, gap `--space-4`, min width `10rem` |
| `compact` | Tighter grid, gap `--space-2`, min width `8rem` |
| `divided` | No gap, separator borders between cards |

## CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--stat-group-gap` | `var(--space-4)` | Gap between stat items |
| `--stat-group-min` | `10rem` | Minimum column width before wrapping |

## Related components

- **Stat** — individual stat card
- **KPI Card** — richer stat card with chart area
- **Grid** — general purpose grid layout
