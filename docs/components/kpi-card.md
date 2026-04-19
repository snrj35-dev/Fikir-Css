# KPI Card

> Support level: **Supported** | Surface key: `component.kpiCard` | Canonical: `.comp-kpi-card`

## When to use

Larger, richer stat display. Card container with metric, trend, and optional icon/chart.

- ✓ Dashboard metrics with trend visualization
- ✓ Business KPI presentation
- ✓ Metric card with context
- ✓ Responsive card layout
- ✗ Simple single metric (use stat instead)
- ✗ Detailed data (use data-grid or table)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-kpi-card` | KPI card container | n/a |
| `comp-kpi-card-header` | Card title/header | n/a |
| `comp-kpi-card-metric` | Main metric value | n/a |
| `comp-kpi-card-chart` | Mini chart area | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Card displays metric + trend |
| Loading | Data fetching | Skeleton or spinner |

## Basic usage

```html
<!-- KPI card with trend and icon -->
<div class="comp-kpi-card" style="background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; padding: 1.5rem;">
  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
    <div class="comp-kpi-card-header">
      <h3 style="margin: 0; font-size: 0.875rem; color: var(--color-fg-muted); text-transform: uppercase;">
        Monthly Revenue
      </h3>
    </div>
    <div style="font-size: 1.5rem;">💰</div>
  </div>
  
  <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1rem;">
    <div class="comp-kpi-card-metric" style="font-size: 2rem; font-weight: bold;">
      $45,231
    </div>
    <div style="color: #10b981; font-size: 0.875rem;">
      ↑ 12% from last month
    </div>
  </div>
  
  <div style="font-size: 0.75rem; color: var(--color-fg-muted);">
    Updated just now
  </div>
</div>

<!-- KPI card with mini chart -->
<div class="comp-kpi-card" style="padding: 1.5rem; background: var(--color-bg-surface); border-radius: 0.5rem;">
  <div style="display: flex; justify-content: space-between; align-items: start;">
    <div>
      <h3 style="margin: 0; font-size: 0.875rem; color: var(--color-fg-muted); text-transform: uppercase; margin-bottom: 0.5rem;">
        Active Users
      </h3>
      <div class="comp-kpi-card-metric" style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">
        3,482
      </div>
      <div style="color: #10b981; font-size: 0.875rem;">
        ↑ 8% this week
      </div>
    </div>
    
    <div class="comp-kpi-card-chart" style="width: 80px; height: 60px; background: var(--color-bg-default); border-radius: 0.25rem;">
      <!-- Mini chart visualization (SVG) -->
      <svg viewBox="0 0 80 60" style="width: 100%; height: 100%;">
        <polyline points="0,50 20,40 40,30 60,45 80,20" fill="none" stroke="var(--color-accent)" stroke-width="2"/>
      </svg>
    </div>
  </div>
</div>

<!-- KPI card grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
  <div class="comp-kpi-card"><!-- Card 1 --></div>
  <div class="comp-kpi-card"><!-- Card 2 --></div>
  <div class="comp-kpi-card"><!-- Card 3 --></div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<h3>` for metric title
- [x] **Label:** Metric purpose clear from heading
- [x] **Trend:** Shown via color + symbol, not color alone
- [x] **Chart alt:** If chart present, provide text summary
- [x] **Contrast:** Good color contrast for readability

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Card background | Surface color |
| `--color-accent` | Metric color | Highlight |
| `--color-success` | Positive trend | Green |
| `--color-danger` | Negative trend | Red |
| `--space-*` | Padding | Card spacing |

## Mini chart options

- **Line chart:** Trend over time
- **Bar chart:** Category comparison
- **Sparkline:** Simple inline trend
- **Progress:** Percentage to goal

## AI / machine-readable notes

- **Selector pattern:** `comp-kpi-card` with `comp-kpi-card-header`, `comp-kpi-card-metric`, `comp-kpi-card-chart` children
- **Metric:** Display formatted value (1,234 not 1234)
- **Trend:** Show direction (↑/↓) and percentage
- **Chart:** Include text summary for accessibility
- **Copy-paste use:** Update title, value, trend, and chart data

## Related patterns

- **Stat:** Simple single metric
- **Data-grid:** Multiple metrics/rows
- **Dashboard:** Collection of KPI cards
