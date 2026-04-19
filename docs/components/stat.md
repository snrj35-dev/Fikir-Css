# Stat

> Support level: **Supported** | Surface key: `component.stat` | Canonical: `.comp-stat`

## When to use

Single metric display: number + label. Shows key performance indicator or data point.

- ✓ Dashboard metrics (revenue, users, engagement)
- ✓ KPI cards
- ✓ Summary statistics
- ✓ Performance indicators
- ✗ Detailed data (use data-grid or table)
- ✗ Comparisons (use multiple stats or chart)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-stat` | Stat container | n/a |
| `comp-stat-value` | Main number | n/a |
| `comp-stat-label` | Metric label | n/a |
| `comp-stat-change` | Optional trend (↑/↓) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Value and label shown |
| Positive trend | Value increased | Green color + ↑ |
| Negative trend | Value decreased | Red color + ↓ |

## Basic usage

```html
<!-- Simple stat -->
<div class="comp-stat" style="padding: 1.5rem; background: var(--color-bg-surface); border-radius: 0.5rem;">
  <div class="comp-stat-value" style="font-size: 2rem; font-weight: bold; color: var(--color-accent); margin-bottom: 0.5rem;">
    1,234
  </div>
  <div class="comp-stat-label" style="font-size: 0.875rem; color: var(--color-fg-muted);">
    Total users
  </div>
</div>

<!-- Stat with trend -->
<div class="comp-stat" style="padding: 1.5rem; background: var(--color-bg-surface); border-radius: 0.5rem;">
  <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
    <div class="comp-stat-value" style="font-size: 2rem; font-weight: bold;">
      $45,231
    </div>
    <div class="comp-stat-change" style="color: #10b981; font-size: 0.875rem; font-weight: 500;">
      ↑ 12% from last month
    </div>
  </div>
  <div class="comp-stat-label" style="color: var(--color-fg-muted);">
    Monthly revenue
  </div>
</div>

<!-- Negative trend -->
<div class="comp-stat">
  <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
    <div class="comp-stat-value" style="font-size: 2rem; font-weight: bold;">
      3.2%
    </div>
    <div class="comp-stat-change" style="color: #ef4444;">
      ↓ 5% from last week
    </div>
  </div>
  <div class="comp-stat-label">Bounce rate</div>
</div>

<!-- Stat grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
  <div class="comp-stat">
    <div class="comp-stat-value">42,821</div>
    <div class="comp-stat-label">Total orders</div>
  </div>
  <div class="comp-stat">
    <div class="comp-stat-value">$234K</div>
    <div class="comp-stat-label">Revenue</div>
  </div>
  <div class="comp-stat">
    <div class="comp-stat-value">98.4%</div>
    <div class="comp-stat-label">Uptime</div>
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Clear value and label text
- [x] **Readable:** Font size and color have good contrast
- [x] **Trend indicator:** Trend shown via color and symbol, not color alone

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Value color | Highlight color |
| `--color-success` | Positive trend | Green |
| `--color-danger` | Negative trend | Red |
| `--color-fg-muted` | Label color | Lighter text |

## AI / machine-readable notes

- **Selector pattern:** `comp-stat` container with `comp-stat-value`, `comp-stat-label`, `comp-stat-change` children
- **Formatting:** Use formatted numbers (1,234 not 1234)
- **Trend:** Show ↑/↓ symbol + percentage or amount
- **Copy-paste use:** Update value, label, and trend info

## Related patterns

- **KPI-card:** Stat with more context/details
- **Data-grid:** Multiple stats/rows
