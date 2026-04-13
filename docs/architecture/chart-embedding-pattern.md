# Chart Embedding Pattern

> Created: 2026-04-12
> Scope: M2 guidance — token/a11y/responsive integration pattern

## Overview

Fikir CSS does not ship chart rendering — chart libraries (Recharts, Chart.js, Visx, Observable Plot, etc.) own their own rendering. This document defines how to embed charts inside Fikir CSS surfaces with correct token consumption, accessibility wiring, and responsive behavior.

## Token Consumption in Charts

Chart libraries that support CSS custom properties can consume Fikir tokens directly.

### Color Tokens for Chart Palettes

```js
const root = document.documentElement;
const getToken = (name) =>
  getComputedStyle(root).getPropertyValue(name).trim();

const chartColors = {
  primary:   getToken("--color-accent"),
  surface:   getToken("--color-bg-surface"),
  border:    getToken("--color-border-subtle"),
  fg:        getToken("--color-fg-default"),
  fgMuted:   getToken("--color-fg-muted"),
  danger:    getToken("--color-danger"),
};
```

Update chart colors when the color scheme changes by listening to `prefers-color-scheme` or a theme-change custom event.

### Spacing Tokens for Margins

Use CSS custom properties directly in inline styles for chart container spacing:

```html
<div class="card" style="padding: var(--space-4);">
  <canvas id="my-chart" aria-label="Revenue chart" role="img"></canvas>
</div>
```

## Recommended Wrapper Structure

```html
<figure class="surface surface-raised" aria-labelledby="chart-title-1">
  <figcaption id="chart-title-1" class="stat-label">
    Monthly Revenue
    <span class="badge badge-neutral">Jan–Dec 2025</span>
  </figcaption>
  <div class="chart-container" role="img" aria-label="Bar chart showing monthly revenue from January to December 2025">
    <!-- chart library renders here -->
  </div>
</figure>
```

Add a `.chart-container` utility class or apply dimensions directly via inline style.

## Responsive Behavior

Charts must be wrapped in a responsive container. Pattern:

```html
<div style="position: relative; inline-size: 100%; block-size: 300px;">
  <canvas ...></canvas>
</div>
```

For CSS Grid / split-pane layouts, use `min-inline-size: 0` on the chart wrapper to prevent grid blowout:

```html
<div class="split-pane">
  <div style="min-inline-size: 0;">
    <!-- chart here -->
  </div>
  <div class="settings-panel">...</div>
</div>
```

## Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| Chart has an accessible name | `aria-label` on the canvas/svg OR `aria-labelledby` pointing to a visible title |
| Chart data is available to screen readers | Provide a data table below or a `<details>` summary table |
| Color is not the only encoding | Use patterns, labels, or shapes in addition to color |
| Contrast ratio for chart text | Use `--color-fg-default` for labels; target minimum 4.5:1 |
| Focus management | SVG charts should expose `tabindex` on interactive data points |

## Dark Mode

Because chart colors are read from CSS custom properties at runtime, dark mode support is automatic if:
1. You read token values via `getComputedStyle` at render time.
2. You re-render or update chart colors when the color scheme changes.

## Anti-patterns

- Do not hardcode hex colors in chart configs — use tokens.
- Do not use `<canvas>` without an accessible label.
- Do not skip the data table fallback for complex charts (pie, stacked bar).
- Do not set `overflow: hidden` on a chart wrapper without testing tooltip clipping.
