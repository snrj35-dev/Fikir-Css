# Layout Composition Recipes

> Status: **Stable** · Added 2026-04-20 (post-1.0 M22).
> Goal: cover the layout needs of a real dashboard without reaching for inline `display: grid` or `flex` styles.

Fikir CSS ships **seven layout primitives** plus an **`app-shell` component**. Together they answer almost every "how do I lay this out?" question you'll have in an admin/dashboard product. This page maps concrete UI needs to the right primitive.

Source of truth for primitive defaults: `dist/contracts/primitives.json`.

---

## Primitives at a glance

| Primitive | Type | Default | Best for |
|-----------|------|---------|----------|
| `stack` | vertical flex | gap `var(--space-4)` | Any vertical flow (form sections, card body) |
| `cluster` | horizontal flex + wrap | gap `var(--space-2)` | Toolbars, inline chip rows, action groups |
| `grid` | auto-fit grid | min column `14rem` | KPI rows, card galleries, N-up tile grids |
| `switcher` | flex that flips to column when items get narrow | min item `16rem` | 2-up blocks that should stack on mobile without media queries |
| `sidebar` | 2-column grid (collapses < 56rem) | sidebar width `18rem` | Sidebar + content blocks *inside a page* |
| `center` | block with max-width and place-items | `var(--container-md)` | Centered hero content |
| `container` | block with max-width only | `var(--container-md)` | Page gutters |

Override a primitive by setting its CSS variable inline or in a style block, never by adding utility class soup. Example:

```html
<div class="grid" style="--grid-min: 16rem; --grid-gap: var(--space-6)">
  <!-- grid items -->
</div>
```

---

## Recipe 1 — KPI row (4-up responsive)

**Need:** four `kpi-card`s on desktop, 2-up on tablet, 1-up on mobile. No media queries needed.

```html
<div class="grid" style="--grid-min: 14rem">
  <article class="kpi-card">…</article>
  <article class="kpi-card">…</article>
  <article class="kpi-card">…</article>
  <article class="kpi-card">…</article>
</div>
```

Why it works: `grid` uses `repeat(auto-fit, minmax(var(--grid-min), 1fr))`, so the card count per row is derived from container width. Shrink the viewport and it re-flows.

For looser spacing, set `--grid-gap: var(--space-6)`.

---

## Recipe 2 — Toolbar with left content + right actions

**Need:** search input on the left, buttons on the right, wraps gracefully.

```html
<div class="cluster" data-cluster-justify="between">
  <div class="search-box" style="max-inline-size: 20rem">
    <input class="search-box-input" type="search" placeholder="Search orders…" />
    <button class="search-box-action">Go</button>
  </div>

  <div class="cluster">
    <button class="btn btn-outline btn-md">Export</button>
    <button class="btn btn-primary btn-md">New order</button>
  </div>
</div>
```

Why it works: `cluster[data-cluster-justify="between"]` pushes the first child to `flex-start` and the last to `flex-end`, with the same wrap/gap behavior as a plain `cluster`.

---

## Recipe 3 — Content split: main area + right rail (2:1)

**Need:** main panel 2/3, side rail 1/3, stacks on narrow viewports.

Option A — use the `sidebar` primitive inverted:

```html
<div class="sidebar" data-sidebar-side="end" style="--sidebar-width: 22rem">
  <main>
    <!-- main content (gets the wide column) -->
  </main>
  <aside>
    <!-- right rail -->
  </aside>
</div>
```

Option B — use `switcher` when the split is roughly 1:1 and must stack at some threshold:

```html
<div class="switcher" style="--switcher-min: 20rem">
  <section>Left block</section>
  <section>Right block</section>
</div>
```

---

## Recipe 4 — Vertical card body with consistent gaps

```html
<article class="card card-flat card-p-md">
  <div class="stack">
    <header>
      <h3>Project status</h3>
    </header>
    <p>Week 12 summary…</p>
    <div class="cluster">
      <button class="btn btn-ghost btn-sm">View</button>
      <button class="btn btn-primary btn-sm">Update</button>
    </div>
  </div>
</article>
```

Tune gap via `--stack-gap: var(--space-6)` on the `.stack` element if you need a looser rhythm.

---

## Recipe 5 — Full app shell with sidebar + topbar

See `docs/components/app-shell.md` for the canonical skeleton. Short version:

```html
<div class="app-shell">
  <header class="app-shell-topbar">…</header>
  <div class="app-shell-content">
    <aside class="app-shell-sidebar">
      <nav class="sidebar-nav" aria-label="Main">
        <a class="sidebar-nav-item" href="/" aria-current="page">Dashboard</a>
      </nav>
    </aside>
    <main class="app-shell-main">
      <!-- page body -->
    </main>
  </div>
</div>
```

`app-shell-content` handles the 2-column → 1-column responsive switch at `64rem`. No extra CSS required.

---

## Recipe 6 — Stat group (3–4 stats in a strip)

Use the `stat-group` pattern. It is an auto-fit grid aware of density and supports a divided variant.

```html
<div data-pattern="stat-group" data-variant="divided">
  <div class="stat">
    <p class="stat-label">Active</p>
    <p class="stat-value">1,284</p>
  </div>
  <div class="stat">
    <p class="stat-label">Churned</p>
    <p class="stat-value">22</p>
  </div>
  <div class="stat">
    <p class="stat-label">New this week</p>
    <p class="stat-value">+128</p>
  </div>
</div>
```

Tune with `--stat-group-min`, `--stat-group-gap` on the root.

---

## Recipe 7 — Data table region

Tables do not need a layout primitive, but their surrounding region usually does:

```html
<section class="stack" style="--stack-gap: var(--space-3)">
  <div data-pattern="data-table-toolbar">
    <div data-slot="controls">
      <div data-slot="search"><!-- search-box --></div>
      <div data-slot="actions"><!-- buttons --></div>
    </div>
  </div>

  <div class="overflow-auto">
    <table class="table">
      <!-- … -->
    </table>
  </div>

  <nav class="pagination pagination-md" aria-label="Pagination">
    <!-- pagination-item list -->
  </nav>
</section>
```

`overflow-auto` is a minimal utility added for exactly this case (wrap a wide table so it scrolls inside its region instead of blowing out the page width).

---

## Recipe 8 — Mobile drawer bridge

```html
<button class="icon-button icon-button-md" aria-label="Open menu"
        data-action="open-drawer">☰</button>

<div class="drawer" id="mobile-nav">
  <div class="drawer-backdrop"></div>
  <div class="drawer-panel">
    <div class="drawer-header">Menu</div>
    <div class="drawer-body">
      <nav class="sidebar-nav" aria-label="Main">
        <!-- same links as desktop sidebar -->
      </nav>
    </div>
  </div>
</div>
```

Wire open/close with `bindOverlayKeyboard` + `createFocusTrap` from `fikir-css/helpers`. Recipe: `docs/guides/overlay-js-helpers.md`.

---

## When to reach for a utility

Fikir intentionally ships a **narrow** utility layer (see `docs/release/utility-surface-budget-policy.md`). Use utilities only when a primitive or component cannot express the need:

| Utility | Use |
|---------|-----|
| `flex-1` | Spacer inside `cluster` / flex row |
| `overflow-auto` | Wrap a wide table or long code block |
| `min-w-0` | Allow a flex/grid child to shrink below its content size (classic "overflowing column" fix) |
| `gap-6` | Looser gap when `--stack-gap` / `--grid-gap` override isn't ergonomic |
| `gap-2`, `gap-4` | Extra tuning where primitive default isn't quite right |
| `p-0`, `p-2`, `p-4`, `px-4`, `py-2` | Spacing adjustments outside a component slot |

Anything beyond this list is a signal to promote the need into a component variant or layout primitive, not a new utility.

---

## Decision tree

```
Need a layout?
├── Full app shell?                 → app-shell (component)
├── Repeating card grid?            → grid primitive (tune --grid-min)
├── Sidebar + content (page-level)? → sidebar primitive
├── Vertical flow with gap?         → stack primitive
├── Horizontal row of inline items? → cluster primitive
│   └── Right/left split?           → cluster[data-cluster-justify="between"]
├── 2 blocks that stack small?      → switcher primitive
├── Stats strip?                    → [data-pattern="stat-group"]
└── Centered hero/page?             → center or container primitive
```

If the answer isn't in this tree, look at the components inventory (`dist/contracts/anatomy.json`) — the chance that your "layout" is actually a named component (`page-header`, `section-block`, `split-pane`, `auth-screen`, etc.) is high.

---

## Related reading

- `docs/guides/canonical-conventions.md` — state/markup conventions
- `docs/guides/machine-readable-contracts.md` — manifest tour
- `docs/components/app-shell.md`, `docs/components/sidebar.md`, `docs/components/grid.md`, `docs/components/stack.md`, `docs/components/cluster.md` — per-primitive deep dives
- `dist/contracts/primitives.json` — machine-readable defaults and CSS variables
