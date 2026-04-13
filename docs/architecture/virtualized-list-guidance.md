# Virtualized List and Table: Pattern and Integration Note

> Created: 2026-04-12
> Scope: M2 guidance (no new CSS surface — integration pattern only)

## Overview

Fikir CSS provides semantic component selectors for `list`, `table`, and `data-grid`. When content sets are large (>100 rows), DOM virtualization libraries are used to render only visible rows. This note defines how Fikir CSS styles integrate with virtualization.

## Key Constraint

Virtualization replaces the natural DOM flow with a positioned container of fixed height. CSS rules that rely on sibling combinators (`+`, `~`) or `nth-child` will not work as expected since only a subset of items is in the DOM at any time.

## Recommended Integration Pattern

### Windowed List

```html
<div class="list" role="list" style="height: 400px; overflow-y: auto;" aria-label="Items">
  <!-- virtualization library renders items here -->
  <div role="listitem" class="list-item">...</div>
</div>
```

- Apply `list` and `list-item` classes to the container and individual row elements.
- Do NOT rely on `list-item + list-item` separator rules — use `gap` on the container instead.
- Pass `aria-rowcount` on the container if the total count is known.

### Windowed Table

```html
<div role="grid" aria-rowcount="5000" aria-label="Data table">
  <div role="rowgroup"> <!-- header --> </div>
  <div role="rowgroup" style="height: 600px; overflow-y: auto;">
    <!-- virtualized rows rendered by library -->
    <div role="row" class="table-row">
      <div role="gridcell" class="table-cell">...</div>
    </div>
  </div>
</div>
```

- Use `role="grid"` on the outer container with `aria-rowcount`.
- Apply `table-row`, `table-cell`, `table-head-cell` on the rendered row/cell elements.
- `table-head` and `table-body` can be applied to the `role="rowgroup"` divs.

## Token Compatibility

All Fikir CSS tokens (`--space-*`, `--color-*`, etc.) are CSS custom properties and work regardless of DOM virtualization approach.

## Integration Libraries

Tested and documented integration patterns:

| Library | Framework | Notes |
|---------|-----------|-------|
| TanStack Virtual | Framework-agnostic | Recommended — see `docs/ecosystem/tanstack-virtual-integration.md` |
| react-window | React | Use `itemData` to pass class names |
| virtua | React/Vue/Svelte | Native CSS-in-JS compatible |

## Accessibility Notes

1. Always set `aria-rowcount` on the grid container to communicate total row count.
2. Use `aria-rowindex` on each rendered row.
3. Keyboard navigation within virtualized grids requires library-level focus management.
4. The `data-loading="true"` attribute on the `table`/`data-grid` wrapper triggers Fikir CSS loading opacity.

## Anti-patterns

- Do not nest a native `<table>` inside a fixed-height overflow container — use `role="grid"` for virtualization.
- Do not use `table-border-collapse` and expect row borders to appear via sibling selectors when rows are virtual.
