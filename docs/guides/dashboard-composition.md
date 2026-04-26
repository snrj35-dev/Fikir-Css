# Dashboard Composition Walkthrough

> Status: **Stable** · Added 2026-04-20 (M22)
> Companion read for the [dashboard starter](../../examples/dashboard-starter/index.html).

This guide is the prose counterpart to the dashboard starter. It walks through *why* each part of the starter looks the way it looks, and ties the decisions back to Fikir CSS primitives, components, and conventions.

If you just want to run the starter, open `examples/dashboard-starter/index.html` — it loads Fikir CSS from the CDN and works with zero tooling.

If you want to understand the choices, read on.

---

## The three levers

Every layout in the starter is expressed through **one of three levers**, in this priority order:

1. **A component** (`app-shell`, `kpi-card`, `table`, `drawer`, `modal`, …) — the most semantic, most stable surface.
2. **A layout primitive** (`grid`, `cluster`, `stack`, `switcher`, `sidebar`, `center`, `container`) — tuned via CSS custom properties (`--grid-min`, `--stack-gap`).
3. **A utility** (`flex-1`, `min-w-0`, `overflow-auto`, `gap-6`, `p-*`, …) — only when a primitive can't express the need.

You should not reach for inline `display: grid` or `display: flex` unless you've ruled out #1 and #2 first. If you find yourself writing media queries, a primitive (usually `switcher` or `grid`) almost certainly already solves that problem for you.

For the decision tree, see `docs/guides/layout-composition.md` § Decision tree.

---

## The shell

```html
<div class="app-shell">
  <header class="app-shell-topbar">…</header>
  <div class="app-shell-content">
    <aside class="app-shell-sidebar">…</aside>
    <main class="app-shell-main" id="main-content">…</main>
  </div>
</div>
```

**Why `app-shell` and not inline grid:** `app-shell-content` already carries a media query at `64rem` that switches from a single column (mobile) to `15rem + 1fr` (desktop). Writing your own grid-template-areas here would mean maintaining a second source of truth.

**Why `data-desktop-only` on the sidebar:** if you want a drawer experience below a chosen breakpoint, you hide the inline sidebar at that breakpoint and render a separate `drawer` for mobile. The helper `bindSidebarDrawer` wires them together — see `docs/patterns/sidebar-drawer-responsive.md`.

---

## The topbar

```html
<header class="app-shell-topbar">
  <span class="brand">…</span>
  <div class="cluster" style="--cluster-gap: var(--space-2)">
    <div class="search-box" style="max-inline-size: 18rem">…</div>
    <button class="icon-button icon-button-md" aria-label="Notifications">🔔</button>
  </div>
</header>
```

The topbar itself is `display: flex; justify-content: space-between` — already baked into `app-shell-topbar`. For the right-hand cluster of actions we use the `cluster` primitive with a tighter gap. Inline `max-inline-size` on `search-box` keeps it from eating the whole row.

---

## The KPI row

```html
<div class="grid" style="--grid-min: 14rem">
  <article class="kpi-card">…</article>
  <article class="kpi-card">…</article>
  <article class="kpi-card">…</article>
  <article class="kpi-card">…</article>
</div>
```

`grid` uses `repeat(auto-fit, minmax(var(--grid-min), 1fr))`. That single line replaces three media queries:

- ≥ 56 rem → 4-up
- 32–56 rem → 2-up
- < 32 rem → 1-up

Bump `--grid-min` to `16rem` if you want fewer cards per row.

Each card uses the canonical `kpi-card` slots (`header`, `value`, `meta`, `trend`). The card owns its own background, border, padding, and gap — don't re-add those inline.

---

## Split content (chart + activity)

```html
<div class="switcher" style="--switcher-min: 22rem; --switcher-gap: var(--space-4)">
  <section class="card card-flat card-p-md" style="flex: 1 1 0%; min-inline-size: 0">…</section>
  <section class="card card-flat card-p-md" style="flex: 1 1 0%; min-inline-size: 0">…</section>
</div>
```

`switcher` is the single-axis responsive layout: it keeps children side-by-side while each one fits ≥ `--switcher-min`, and flips to a vertical stack when the container can't. No media query.

The `flex: 1 1 0%; min-inline-size: 0` on each child is what lets a wide SVG chart live inside one column without forcing the column to grow — the `min-w-0` utility does the same thing (and is a stable class name), but inline expression is fine here because it applies to a narrow context.

---

## The chart

```html
<section class="card card-flat card-p-md">
  <div class="stack" style="--stack-gap: var(--space-3)">
    <div class="cluster" data-cluster-justify="between">
      <h2>Revenue</h2>
      <div class="segmented-control segmented-control-sm">…</div>
    </div>
    <svg viewBox="0 0 400 160">…</svg>
    <div class="progress" role="progressbar" aria-valuenow="72" …>…</div>
  </div>
</section>
```

- `stack` handles the vertical rhythm inside the card.
- `cluster[data-cluster-justify="between"]` pushes the title left, the segmented-control right.
- The SVG uses `var(--color-accent)` as its stroke — swap `data-theme="dark"` on `<html>` and it automatically restyles.
- The `progress` canonical markup: inline `style="width: 72%"` **plus** `aria-valuenow="72"` on the root. Either alone is wrong.

For richer charts, wrap them in `chart-frame` (see `docs/components/chart-frame.md`) and use `--color-chart-1..8` for series colors.

---

## The timeline

```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker" aria-hidden="true"></div>
    <div class="timeline-content">
      <p class="timeline-title">New order #1284 paid</p>
      <p class="timeline-meta">2 hours ago</p>
    </div>
  </div>
</div>
```

`timeline-item` is a 2-column grid (`auto minmax(0, 1fr)`) — the marker lands in the first column automatically. `timeline-content` carries the `border-left` that becomes the vertical connector, and the last item's connector fades to transparent via CSS — no class or JS needed.

---

## The table region

```html
<section class="stack" style="--stack-gap: var(--space-3)">
  <div class="cluster" data-cluster-justify="between">
    <h2>Latest orders</h2>
    <div class="cluster">…buttons…</div>
  </div>

  <div class="overflow-auto">
    <table class="table">…</table>
  </div>

  <nav class="pagination pagination-md" aria-label="Pagination">…</nav>
</section>
```

Three things worth noting:
- `overflow-auto` wraps the table so a wide column set scrolls inside the region instead of pushing the page wider than the viewport. This is exactly the utility's reason to exist.
- The pagination active item uses `aria-current="page"` (not `data-active`) — see `docs/guides/canonical-conventions.md`.
- Prev/Next buttons carry `aria-label` because the `‹ ›` glyphs are not announced.

---

## The modal (accessible)

```html
<div class="modal" id="new-order-modal" role="dialog" aria-modal="true" aria-labelledby="new-order-title">
  <div class="modal-backdrop" data-action="close-modal"></div>
  <div class="modal-dialog">
    <div class="modal-header"><h2 id="new-order-title">…</h2></div>
    <div class="modal-body">…</div>
    <div class="modal-footer">…</div>
  </div>
</div>
```

Canonical markup:
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` on the root.
- `modal-backdrop` is an ordinary `<div>`. It does **not** auto-close on click — we bind that ourselves in the glue script, using `bindOverlayKeyboard` from `fikir-css/helpers`.
- `data-open="true"` opens the modal. **Remove** the attribute to close it (never set to `"false"`).

See `docs/components/modal.md` and `docs/guides/overlay-js-helpers.md`.

---

## The toast

```html
<div class="toast-viewport" aria-live="polite">
  <div class="toast" id="order-created-toast" data-tone="success">…</div>
</div>
```

`toast-viewport` already has `position: fixed; inset-block-end: var(--space-4); inset-inline-end: var(--space-4); z-index: 45`. You do not add inline positioning. Each `toast` is hidden by default and becomes visible when `data-open="true"` is present.

---

## The glue script

```html
<script type="module">
  import { createFocusTrap, bindOverlayKeyboard }
    from "https://unpkg.com/fikir-css@latest/dist/helpers/index.mjs";

  const trap = createFocusTrap(modal);
  function openModal(e)  { modal.setAttribute("data-open", "true");
                           trap.activate(e?.currentTarget ?? null);
                           keyboardBinding = bindOverlayKeyboard(modal, { onClose: closeModal }); }
  function closeModal() { modal.removeAttribute("data-open");
                          trap.deactivate();
                          keyboardBinding?.destroy(); keyboardBinding = null; }
</script>
```

Three canonical helpers take care of the things you would otherwise get wrong:

- **`createFocusTrap`** — Tab / Shift+Tab stays inside the dialog.
- **`bindOverlayKeyboard`** — Escape anywhere, click on the backdrop itself → close.
- **`bindSidebarDrawer`** (not used in the basic starter, but available) — same treatment for the mobile nav drawer, including breakpoint awareness.

All three import from the same module. Loading them from the CDN is valid because `dist/helpers/index.mjs` is a pure ESM file with no dependencies.

---

## Checklist before you ship

- [ ] No inline `display: grid` or `display: flex` on a container that could use `grid` / `cluster` / `stack` / `switcher` / `sidebar`.
- [ ] Active nav items use `aria-current="page"`, active tabs use `data-active="true"` + `aria-selected="true"`.
- [ ] Every overlay has `aria-modal="true"` (if dialog) + focus-trap + Escape close.
- [ ] `toast-viewport` is at the root (not nested inside a positioned ancestor).
- [ ] Every chart has a `<figure>`/`<figcaption>` (or `aria-label`) and does not encode by color alone.
- [ ] Tables that can overflow live inside an `overflow-auto` wrapper.
- [ ] Form inputs are inside `field` with a matching `label[for]` and wired `aria-describedby`.
- [ ] Skip-link to `#main-content` lives before the topbar.
- [ ] All class names exist in `dist/contracts/selectors.json` — no invented helpers.

---

## Related reading

- `examples/dashboard-starter/index.html` — the working starter
- `docs/guides/canonical-conventions.md` — state attribute and convention cheat sheet
- `docs/guides/layout-composition.md` — primitive recipes and decision tree
- `docs/guides/overlay-js-helpers.md` — focus trap + keyboard helpers API
- `docs/patterns/form-layout.md`, `docs/patterns/sidebar-drawer-responsive.md` — composite recipes
- `docs/architecture/chart-embedding-pattern.md` — chart tokens + `chart-frame`
