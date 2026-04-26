# Chart Embedding Pattern

> Updated: 2026-04-20 (M22) — `--color-chart-1..8` palette tokens and `chart-frame` wrapper added.
> Scope: how to embed charts inside Fikir CSS surfaces with correct token consumption, accessibility wiring, and responsive behavior.

Fikir CSS does **not** ship chart rendering. Chart libraries (Recharts, Chart.js, Visx, Observable Plot, D3, ECharts, etc.) own the pixels. Fikir provides:

1. **Chart palette tokens** (`--color-chart-1` … `--color-chart-8`) — perceptually-distinct series colors with light and dark theme mappings.
2. **`chart-frame` component** — a minimal layout wrapper (title + aspect-ratio body + legend). Zero drawing logic.
3. **Guidance** for accessibility, responsiveness, and theme reactivity.

## Quick start

```html
<figure class="chart-frame" aria-labelledby="revenue-title">
  <figcaption class="chart-frame-title" id="revenue-title">Monthly Revenue</figcaption>
  <div class="chart-frame-body" role="img"
       aria-label="Bar chart, monthly revenue Jan–Dec 2025. Peak in Q4.">
    <svg viewBox="0 0 400 180">
      <!-- draw here, or mount a chart library on this element -->
    </svg>
  </div>
  <ul class="chart-frame-legend">
    <li class="chart-frame-legend-item" style="--legend-color: var(--color-chart-1)">Revenue</li>
    <li class="chart-frame-legend-item" style="--legend-color: var(--color-chart-2)">Target</li>
  </ul>
</figure>
```

Key decisions baked into this markup:
- `<figure>` + `<figcaption>` gives the chart a programmatic accessible name.
- `chart-frame-body` owns aspect-ratio + responsive sizing; the SVG/canvas child fills it automatically.
- Legend swatch color is set via `--legend-color` CSS variable per item — not hard-coded.

## Chart palette tokens

| Token | Light mode | Dark mode | Suggested role |
|-------|-----------|-----------|----------------|
| `--color-chart-1` | blue | brighter blue | primary series |
| `--color-chart-2` | teal | brighter teal | secondary series / comparison |
| `--color-chart-3` | orange | lighter orange | tertiary / alert |
| `--color-chart-4` | pink/magenta | lighter pink | quaternary |
| `--color-chart-5` | purple | lighter purple | fifth series |
| `--color-chart-6` | yellow | light yellow | highlight |
| `--color-chart-7` | red | lighter red | negative / loss |
| `--color-chart-8` | cyan | lighter cyan | eighth series |

Values live in `packages/tokens/semantic.css` and `packages/tokens/themes/dark.css`. They use OKLCH for perceptual uniformity — each swatch sits at roughly the same chroma so series don't accidentally appear dominant in the chart.

> Need more than 8 series? Reconsider the chart — 8+ categories usually read as noise. Group or small-multiple instead.

### Consuming in SVG

Because the SVG is authored in-page, you can reference tokens directly:

```html
<svg viewBox="0 0 400 180" class="chart-frame-body-svg" aria-hidden="true">
  <polyline fill="none" stroke="var(--color-chart-1)" stroke-width="2"
            points="0,120 40,100 80,110 120,80 160,70 200,60 240,75 280,55 320,40 360,35 400,20" />
  <polyline fill="none" stroke="var(--color-chart-2)" stroke-width="2" stroke-dasharray="4 3"
            points="0,100 40,95 80,90 120,85 160,80 200,75 240,70 280,65 320,60 360,55 400,50" />
</svg>
```

Bonus: this is theme-reactive for free — when `data-theme="dark"` flips on `<html>`, the token values change and the SVG re-renders with the dark palette.

### Consuming in Canvas / JS chart libraries

Canvas contexts don't understand CSS variables. Read tokens at render time:

```js
const root = document.documentElement;
const token = (name) => getComputedStyle(root).getPropertyValue(name).trim();

const palette = [
  token("--color-chart-1"),
  token("--color-chart-2"),
  token("--color-chart-3"),
  token("--color-chart-4"),
  token("--color-chart-5"),
  token("--color-chart-6"),
  token("--color-chart-7"),
  token("--color-chart-8"),
];
```

Re-read and re-render when the theme changes. The cleanest hook is a `MutationObserver` on `[data-theme]`:

```js
const observer = new MutationObserver(() => chart.updateColors(readPalette()));
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});
```

### Chart.js example

```js
import { Chart } from "chart.js/auto";

const read = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

new Chart(document.getElementById("chart").getContext("2d"), {
  type: "line",
  data: {
    labels: months,
    datasets: [
      { label: "Revenue", data: revenue, borderColor: read("--color-chart-1"), backgroundColor: "transparent" },
      { label: "Target",  data: target,  borderColor: read("--color-chart-2"), borderDash: [4, 3], backgroundColor: "transparent" },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // let chart-frame-body own the aspect ratio
    scales: {
      x: { ticks: { color: read("--color-fg-muted") } },
      y: { ticks: { color: read("--color-fg-muted") } },
    },
  },
});
```

## Responsive behavior

`chart-frame-body` declares `inline-size: 100%` + `aspect-ratio: 16 / 9` + `min-inline-size: 0`. Drop it inside:

- a `grid` (KPI-row style) — each chart scales to its column
- a `switcher` — charts stack on narrow viewports
- a `card` / `surface` — internal padding owned by the card; chart-frame doesn't add its own

Override the aspect ratio inline:

```html
<div class="chart-frame-body" style="--chart-frame-ratio: 3 / 1"><!-- wide sparkline --></div>
```

Or lock a minimum height:

```html
<div class="chart-frame-body" style="--chart-frame-min-h: 16rem"><!-- never shorter than 16rem --></div>
```

## Accessibility requirements

| Requirement | Implementation |
|-------------|----------------|
| Programmatic name | `<figure aria-labelledby="…">` + `<figcaption class="chart-frame-title">` |
| Description of chart content | `role="img"` + `aria-label` on `chart-frame-body` (summarize trend + takeaway) |
| Data available to AT | Provide a `<details>` summary table below the chart, or a visually-hidden `<table>` |
| Not encoding by color alone | Use stroke patterns (`stroke-dasharray`), markers, shapes, or labels in addition to color |
| Text contrast | Label text uses `--color-fg-muted` for axes, `--color-fg-default` for titles |
| Keyboard access (interactive charts) | Expose `tabindex="0"` on data points; wire arrow-key navigation |

### Data-table fallback

```html
<figure class="chart-frame" aria-labelledby="sales-title">
  <figcaption class="chart-frame-title" id="sales-title">Q4 Sales by Region</figcaption>
  <div class="chart-frame-body" role="img" aria-describedby="sales-details">…</div>

  <details id="sales-details">
    <summary>Show data table</summary>
    <table class="table">
      <thead><tr><th>Region</th><th>Sales</th></tr></thead>
      <tbody>
        <tr><td>EU</td><td>$1.2M</td></tr>
        <tr><td>APAC</td><td>$900K</td></tr>
      </tbody>
    </table>
  </details>
</figure>
```

## Dark mode

Automatic if you follow the pattern above — tokens are re-read on theme change (for Canvas) or cascade automatically (for in-page SVG). No special handling.

Test by toggling `data-theme="dark"` on `<html>` and confirming:
- Each series color is still distinguishable against the dark body surface.
- Axis labels use `--color-fg-muted` (never hardcoded `#666`).
- Gridlines (if any) use `--color-border-subtle`.

## Anti-patterns

- ❌ Hard-coded hex series colors — use `--color-chart-1..8`.
- ❌ `<canvas>` without `aria-label` or a labelled ancestor.
- ❌ Hand-rolled `<div style="aspect-ratio: 16/9; position: relative;">` — use `chart-frame-body`.
- ❌ Skipping the data-table fallback on non-trivial charts (pie, stacked bar, geo).
- ❌ Setting chart colors once and never updating on theme change (Canvas/JS lib path).
- ❌ `overflow: hidden` on the `chart-frame-body` when your chart library renders tooltips outside — tooltips will clip.

## Related

- `docs/components/chart-frame.md` *(planned — anatomy reference is in `dist/contracts/anatomy.json`)*
- `docs/guides/canonical-conventions.md` — state attrs, token consumption rules
- `docs/guides/layout-composition.md` — `grid`, `switcher`, `card` recipes that wrap chart-frame
- `dist/contracts/tokens.json` — programmatic access to the chart palette
