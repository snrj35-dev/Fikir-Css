# Chart Frame

> Support level: **Supported** | Component key: `component.chartFrame` | Canonical: `.chart-frame`

## When to use

Minimal layout wrapper for an embedded chart (SVG, Canvas, or third-party libraries like Chart.js). Manages aspect ratio, responsive sizing, and positioning of the title and legend.

- ✓ You want a chart that reacts to container width and theme tokens
- ✓ You want a consistent title/legend shell across different chart libraries
- ✓ You need an accessible `<figure>` wrapper with canonical a11y markup
- ✗ You need a data-grid or a sparkline inside a `kpi-card` (use raw SVG directly)
- ✗ You need a charting engine (Fikir CSS does not render the chart itself)

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `.chart-frame` | Root grid container | `<figure>` |
| `.chart-frame-title` | Chart heading | `<figcaption>` |
| `.chart-frame-body` | Aspect-ratio wrapper | `<div>` |
| `.chart-frame-legend` | Horizontal legend list | `<ul>` |
| `.chart-frame-legend-item` | Legend swatch + label | `<li>` |

## Basic usage

```html
<figure class="chart-frame" aria-labelledby="revenue-title">
  <figcaption class="chart-frame-title" id="revenue-title">Monthly Revenue</figcaption>

  <div class="chart-frame-body" role="img" aria-label="Bar chart, revenue Jan–Dec 2025. Growth of 12%.">
    <svg viewBox="0 0 400 180" style="inline-size: 100%; block-size: 100%">
      <polyline fill="none" stroke="var(--color-chart-1)" stroke-width="2"
                points="0,120 40,100 80,110 120,80 160,70 200,60 240,75 280,55 320,40 360,35 400,20" />
    </svg>
  </div>

  <ul class="chart-frame-legend">
    <li class="chart-frame-legend-item" style="--legend-color: var(--color-chart-1)">Revenue</li>
  </ul>
</figure>
```

## Accessibility checklist

- [x] **Semantic container:** Use `<figure>` and `<figcaption>` for programmatic association
- [x] **Image role:** `chart-frame-body` should have `role="img"` and a descriptive `aria-label`
- [x] **Data fallback:** For complex charts, provide a hidden table or a `<details>` view below
- [x] **Color reliance:** Do not encode data by color alone; use dashes, markers, or labels
- [x] **Contrast:** Axis/tick text should use `--color-fg-muted` and meet contrast requirements

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-chart-1..8` | Series colors | Theme-reactive colors |
| `--color-fg-default` | Title text color | High contrast |
| `--color-fg-muted` | Legend/Axis text | Secondary emphasis |
| `--color-border-subtle` | Gridlines/Borders | Subtle separators |
| `--space-3` | Internal gap | Spacing between slots |

## AI / machine-readable notes

- **Selector pattern:** `.chart-frame` root; uses CSS Grid for slot positioning
- **Aspect ratio:** Controlled via `--chart-frame-ratio` (default `16 / 9`) on the root
- **Legend swatch:** Set swatch color via `--legend-color` custom property on `.chart-frame-legend-item`
- **Sizing:** `chart-frame-body` uses `min-inline-size: 0` to prevent grid blowout
- **Rendering:** This component is a wrapper only; it does not render the chart graphics
- **Palette:** Always use `var(--color-chart-1)` through `var(--color-chart-8)` for data series

## Related

- **`card`** — standard container for wrapping charts
- **`kpi-card`** — for small sparklines and high-level metrics
- **`grid`** — for creating dashboard layouts with multiple charts
