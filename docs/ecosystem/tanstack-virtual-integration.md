# TanStack Virtual Integration

> Integration guide for using TanStack Virtual with Fikir CSS data surfaces.

TanStack Virtual provides framework-agnostic virtual scrolling. Pair it with
`data-grid`, `table`, or `list` surfaces for performant large-dataset rendering.

## Basic setup

```bash
npm install @tanstack/virtual-core
```

```js
import { Virtualizer } from "@tanstack/virtual-core";

const virtualizer = new Virtualizer({
  count: rows.length,
  getScrollElement: () => scrollEl,
  estimateSize: () => 40,
});
```

## With Fikir CSS `data-grid`

Apply `class="data-grid"` to the container and render only the virtualised
slice inside:

```html
<div class="data-grid" style="height: 400px; overflow-y: auto;">
  <!-- only virtualised rows rendered here -->
</div>
```

See `docs/architecture/virtualized-list-guidance.md` for the full pattern spec.
