# KPI Card

> Support level: **Supported** | Surface key: `component.kpiCard` | Canonical root: `.kpi-card`

## When to use

Dashboard metric widget with value, context label, and optional trend indicator. Richer than `stat` — adds slots for header, meta and trend; includes its own card chrome (background, border, padding).

- ✓ Dashboard metrics with trend visualization
- ✓ Business KPI presentation
- ✓ Metric card with supporting context (period, delta)
- ✗ Simple inline metric (use `stat`)
- ✗ Tabular data (use `table` or `data-grid`)

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `kpi-card` | Root container | `article` or `div` |
| `kpi-card-header` | Heading / label row | `div` or `h3` |
| `kpi-card-value` | Main metric value | `p` or `strong` |
| `kpi-card-meta` | Secondary label (period, comparison) | `p` |
| `kpi-card-trend` | Trend pill (↑/↓ + %) | `span` |

The root provides card chrome (`background`, `border`, `border-radius`, `padding`, `gap`) — **do not re-add inline styles for those**.

## Basic usage

```html
<article class="kpi-card">
  <div class="kpi-card-header">Monthly Revenue</div>
  <p class="kpi-card-value">$45,231</p>
  <p class="kpi-card-meta">vs last month</p>
  <span class="kpi-card-trend" data-trend="up">↑ 12%</span>
</article>
```

## KPI grid (4-up dashboard row)

Use the `grid` layout primitive — it auto-fits cards into columns and collapses responsively. No inline grid styles needed.

```html
<div class="grid" style="--grid-min: 14rem">
  <article class="kpi-card">
    <div class="kpi-card-header">Revenue</div>
    <p class="kpi-card-value">$45,231</p>
    <p class="kpi-card-meta">vs last month</p>
    <span class="kpi-card-trend">↑ 12%</span>
  </article>
  <article class="kpi-card">
    <div class="kpi-card-header">Active Users</div>
    <p class="kpi-card-value">3,482</p>
    <p class="kpi-card-meta">last 7 days</p>
    <span class="kpi-card-trend">↑ 8%</span>
  </article>
  <article class="kpi-card">
    <div class="kpi-card-header">Churn</div>
    <p class="kpi-card-value">1.8%</p>
    <p class="kpi-card-meta">monthly</p>
    <span class="kpi-card-trend">↓ 0.3%</span>
  </article>
  <article class="kpi-card">
    <div class="kpi-card-header">NPS</div>
    <p class="kpi-card-value">72</p>
    <p class="kpi-card-meta">Q2 survey</p>
    <span class="kpi-card-trend">↑ 6</span>
  </article>
</div>
```

## With trailing chart

Embed a small SVG (or canvas) after the meta row. Use the `--color-accent` token for the stroke so it reacts to theme overrides.

```html
<article class="kpi-card">
  <div class="kpi-card-header">Active Users</div>
  <p class="kpi-card-value">3,482</p>
  <p class="kpi-card-meta">last 7 days</p>
  <svg viewBox="0 0 80 24" width="100%" height="24" aria-hidden="true">
    <polyline points="0,20 20,16 40,12 60,17 80,8"
              fill="none" stroke="var(--color-accent)" stroke-width="2" />
  </svg>
  <span class="kpi-card-trend">↑ 8%</span>
</article>
```

For non-decorative charts, provide a text summary in `kpi-card-meta` or a visually-hidden paragraph.

## Loading state

```html
<article class="kpi-card" aria-busy="true">
  <div class="kpi-card-header">
    <span class="skeleton skeleton-text" style="inline-size: 8rem"></span>
  </div>
  <p class="kpi-card-value">
    <span class="skeleton skeleton-text" style="inline-size: 6rem; block-size: 1.5rem"></span>
  </p>
</article>
```

## Accessibility checklist

- Use a `<p>`/`<strong>` or appropriate heading for the value so assistive tech reads it as emphasized content.
- If using `<h3>` in `kpi-card-header`, keep heading order consistent with the page outline.
- Trend direction must not rely on color alone — ship a glyph (↑/↓) or text ("up 12%").
- For charts, provide a text summary (in `kpi-card-meta` or visually-hidden text).

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Card background |
| `--color-border-subtle` | Card border |
| `--color-fg-default` | Value color |
| `--color-fg-muted` | Header & meta color |
| `--space-2` / `--space-3` | Internal gap & padding |
| `--radius-md` | Card corners |

## AI / machine-readable notes

- Canonical slots: `kpi-card-header`, `kpi-card-value`, `kpi-card-meta`, `kpi-card-trend`.
- **Do not** invent `kpi-card-metric` or `kpi-card-chart` — those class names are not in the surface.
- Root already has grid layout + padding + border; do not override with inline styles.
- See `dist/contracts/anatomy.json` → `components.kpi-card.minimal_html` for the canonical skeleton.

## Related

- **`stat`** — single inline metric without card chrome
- **`stat-group`** pattern — responsive grid wrapper for multiple stats
- **`grid`** layout primitive — use for 2/3/4-up KPI rows (see `dist/contracts/primitives.json`)
