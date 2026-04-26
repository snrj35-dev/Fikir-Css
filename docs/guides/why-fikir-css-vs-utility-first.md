# Tailwind → Fikir CSS Cheat Sheet

> Last reviewed: 2026-04-25
> Audience: developers coming from Tailwind, UnoCSS, Windi, or any utility-first stack who want to start being productive in Fikir CSS in 10 minutes.

If you only have one minute, this is the headline:

| Tailwind way | Fikir way |
|--------------|-----------|
| `flex gap-4 items-center` | `class="cluster"` |
| `flex flex-col gap-4` | `class="stack"` |
| `grid grid-cols-4 gap-6` | `class="grid"` (auto-fit, tune with `--grid-min`) |
| `mx-auto max-w-screen-md px-4` | `class="container"` |
| `bg-blue-600 text-white px-4 py-2 rounded` | `class="btn btn-primary btn-md"` |
| `dark:bg-gray-900` | `<html data-theme="dark">` |
| `aria-invalid:ring-red-500` | `<input class="input" data-invalid="true">` |

The rest of this page is the same idea, expanded.

---

## 1 · Layout primitives — replace your flex/grid soups

Fikir ships eight **layout primitives** (`@layer layouts`) that subsume 80% of what you used utility classes for:

### Cluster — horizontal row that wraps

```html
<!-- ❌ Tailwind -->
<div class="flex flex-wrap items-center gap-2">…</div>

<!-- ✅ Fikir -->
<div class="cluster">…</div>

<!-- Variants via data-* (no extra class) -->
<div class="cluster" data-cluster-justify="between">…</div>
<div class="cluster" data-cluster-nowrap="true">…</div>
```

Tune the gap with `style="--cluster-gap: var(--space-4)"` instead of stacking `gap-2` / `gap-3` / `gap-4` classes.

### Stack — vertical flow with consistent gap

```html
<!-- ❌ Tailwind -->
<div class="flex flex-col gap-4">…</div>

<!-- ✅ Fikir -->
<div class="stack">…</div>
```

Stack uses `> * + * { margin-block-start }`, so it survives child elements changing without flex layout shifts. Tune with `--stack-gap`.

### Grid — auto-fit responsive grid

```html
<!-- ❌ Tailwind, breakpoint-by-breakpoint -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">…</div>

<!-- ✅ Fikir, intrinsic responsive -->
<div class="grid" style="--grid-min: 14rem">…</div>
```

`grid-min` is the minimum column width. The browser fits as many columns as fit. **No media queries.**

### Switcher — equal-width children that flip to single-column

```html
<!-- ❌ Tailwind -->
<div class="flex flex-wrap gap-4 [&>*]:flex-1 [&>*]:min-w-[16rem]">…</div>

<!-- ✅ Fikir -->
<div class="switcher">…</div>
```

### Sidebar — content + sidebar that collapses on narrow viewports

```html
<!-- ❌ Tailwind -->
<div class="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
  <aside>…</aside>
  <main>…</main>
</div>

<!-- ✅ Fikir -->
<div class="sidebar">
  <aside>…</aside>
  <main>…</main>
</div>
```

Side-flip with `data-sidebar-side="end"`.

### Container — max-width wrapper

```html
<!-- ❌ Tailwind -->
<div class="mx-auto max-w-screen-md px-4">…</div>

<!-- ✅ Fikir -->
<div class="container">…</div>
```

### Center — center inside a min-height region

```html
<!-- ❌ Tailwind -->
<div class="grid place-items-center min-h-screen">…</div>

<!-- ✅ Fikir -->
<div class="center" data-center-intrinsic="true">…</div>
```

### App-shell — the whole admin shell

```html
<!-- ❌ Tailwind, several dozen utility classes -->
<div class="grid grid-rows-[auto_1fr] grid-cols-[18rem_1fr] min-h-screen">…</div>

<!-- ✅ Fikir -->
<div class="app-shell">
  <header class="app-shell-topbar">…</header>
  <div class="app-shell-content">
    <aside class="app-shell-sidebar">…</aside>
    <main class="app-shell-main">…</main>
  </div>
</div>
```

---

## 2 · Components — stop rebuilding the same widgets

Tailwind gives you raw materials. Fikir gives you the finished components. Side by side:

| What you want | Tailwind path | Fikir path |
|---------------|---------------|------------|
| **Primary button** | `class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"` | `class="btn btn-primary btn-md"` |
| **Outline button** | `class="border border-gray-300 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded"` | `class="btn btn-outline btn-neutral btn-md"` |
| **Danger soft button** | (write more utilities) | `class="btn btn-danger btn-soft btn-md"` |
| **Card with elevation** | `class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"` | `class="card card-elevated card-p-md"` |
| **Alert (error)** | Build it yourself | `class="alert alert-danger"` with `alert-title` / `alert-description` slots |
| **Modal** | Build it (Headless UI + Tailwind) | `class="modal" data-open="true"` with backdrop, dialog, header/body/footer slots |
| **Drawer / sheet** | Build it | `class="drawer" data-open="true"` |
| **Toast** | Build it (use a JS lib) | `class="toast-viewport"` + tone variants |
| **Form field** | Compose label + input + helper-text | `class="field"` wraps `label` + `input` + `helper-text` / `error-text` |
| **KPI card** | Build it | `class="kpi-card"` with `kpi-card-header`, `kpi-card-value`, `kpi-card-trend` |
| **Data table toolbar** | Build it | `data-pattern="data-table-toolbar"` |
| **Sidebar nav** | Build it | `class="sidebar-nav"` with sections + items |

For the full set of 99 surfaces see <https://snrj35-dev.github.io/Fikir-Css/> or [`docs/roadmap/support-matrix.md`](../roadmap/support-matrix.md).

---

## 3 · State — `data-*`, not class modifiers

This is the single biggest mental shift. **Stop encoding state in classes.**

| Concept | Tailwind | Fikir |
|---------|----------|-------|
| **Open/closed overlay** | `class="modal hidden"` → JS toggles `hidden` | `data-open="true"` / `data-open="false"` |
| **Active nav item** | `class="bg-gray-200"` toggled in JS | `aria-current="page"` |
| **Form invalid** | `aria-invalid:ring-red-500` plus toggling `aria-invalid` | `data-invalid="true"` on `field` (or `aria-invalid` on the input — both wired) |
| **Disabled** | `disabled:opacity-50` + `disabled` attr | Native `disabled` attribute, styling is built in |
| **Loading** | `class="opacity-50 cursor-wait"` | `class="loading-overlay" data-loading="true"` |
| **Toast tone** | (manual tone classes) | `class="toast" data-tone="danger"` |
| **Theme** | `class="dark"` on `<html>` | `data-theme="dark"` on `<html>` |
| **Density** | (no built-in concept) | `data-density="compact"` on `<html>` |
| **Reduced motion** | (`@media (prefers-reduced-motion)`) | `data-motion="reduced"` on `<html>`, also auto-respects the media query |

**Rule of thumb:** if you would have written `dark:`, `aria-invalid:`, `disabled:`, or `data-[state=open]:` in Tailwind, in Fikir it's already wired — just toggle the corresponding attribute.

---

## 4 · Tokens — `var(--…)`, not theme keys

```css
/* ❌ Tailwind, lives in tailwind.config.js + JIT */
.bg-primary { @apply bg-blue-600; }

/* ✅ Fikir, lives in CSS custom properties */
.my-custom-thing {
  background: var(--color-primary-500);
  color: var(--color-fg-on-primary);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}
```

Every token is exported in `dist/tokens.json` (W3C DTCG format), ready for Figma Variables. The whole list:

- Color: `--color-bg-*`, `--color-fg-*`, `--color-border-*`, `--color-primary-*`, `--color-accent`, `--color-danger`, `--color-success`, `--color-warning`, `--color-info`, `--color-chart-1..8`
- Spacing: `--space-0` … `--space-12`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`
- Font size: `--font-size-xs` … `--font-size-2xl`
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Container: `--container-sm`, `--container-md`, `--container-lg`

**Do not ship hard-coded colors or pixel spacings.** If a token doesn't exist, prefer adjusting an existing token over inventing a new design value.

---

## 5 · Theming and dark mode

```html
<!-- ❌ Tailwind -->
<html class="dark">
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">…</body>
</html>

<!-- ✅ Fikir -->
<html data-theme="dark">
  <body class="surface">…</body>
</html>
```

The single `fikir.css` ships **light, dark, and high-contrast** themes. Toggling `data-theme` updates every token simultaneously. There is **no `dark:` prefix** — components consume tokens, tokens flip, components re-render.

Add a custom theme by overriding tokens under your own attribute:

```css
[data-theme="brand-night"] {
  --color-bg-default: #0a0a0f;
  --color-fg-default: #e8e8f0;
  --color-accent: #c084fc;
  /* … */
}
```

---

## 6 · Migration recipes (incremental adoption)

### Recipe A — keep Tailwind, add Fikir on top

```css
/* tokens-only build of Fikir, no components */
@import "fikir-css/css" layer(tokens);
@tailwind base;
@tailwind components;
@tailwind utilities;
```

You now have all `--color-*`, `--space-*`, `--radius-*` tokens available in your Tailwind utilities (`bg-[var(--color-primary-500)]`).

### Recipe B — replace your component library, keep Tailwind for layout one-offs

```css
@import "fikir-css/css";
@tailwind utilities; /* utility layer wins over Fikir's lower-priority component layer */
```

Use Fikir for `.modal`, `.btn`, `.card`, `.data-grid`. Use Tailwind utilities for one-off positioning when needed.

### Recipe C — full replacement

Drop Tailwind. Use Fikir's layout primitives (`stack`, `cluster`, `grid`, `sidebar`, `app-shell`) plus the small built-in [utility surface](../release/utility-surface-budget-policy.md) (`items-center`, `flex-1`, `gap-2`, `text-sm`, etc.). The total utility selector budget is capped at ~45 — there's no Tailwind-grade utility set, **and that is intentional**: the budget forces you to reach for primitives or component classes first.

---

## 7 · "But I miss…" — equivalents lookup

| You miss | Reach for |
|----------|-----------|
| `space-y-4` | `class="stack"` (uses `--stack-gap`) |
| `space-x-2` | `class="cluster"` (uses `--cluster-gap`) |
| `flex-1` | utility `class="flex-1"` is built in |
| `min-w-0` | utility `class="min-w-0"` is built in |
| `overflow-auto` | utility `class="overflow-auto"` is built in |
| `text-sm` / `text-lg` | utilities `text-xs` … `text-lg` are built in |
| `font-semibold` | utility `class="font-semibold"` is built in |
| `bg-white` (theme-aware) | `class="surface"` or `var(--color-bg-surface)` |
| `text-gray-500` (theme-aware) | `var(--color-fg-muted)` |
| `border-gray-200` | `var(--color-border-subtle)` |
| `hover:bg-blue-700` | Built into `btn-primary`. Component has hover/active baked in. |
| `focus:ring-2 focus:ring-blue-500` | Built into every focusable component. |
| `disabled:opacity-50` | Native `disabled` attribute is styled. |
| `dark:` variant | `data-theme="dark"` on `<html>` (no per-class prefix) |
| `peer:` / `group:` | Generally not needed — use ARIA attribute selectors (`[aria-current="page"]`, `[data-open="true"]`). |

---

## 8 · When to keep using Tailwind

Fikir CSS is **not** a Tailwind replacement for every team. Stay on utility-first when:

- You ship **highly bespoke designs** with one-off spacing on every element.
- Your design system **lives in your codebase already**, and components are JSX-not-CSS.
- The team's mental model is utility-first and switching cost is real.

Fikir wins when:

- You want **production-ready surfaces** (modal, drawer, table, command-palette, …) without building or vendoring them.
- You want **zero-build-step CSS** (CDN works).
- You want **first-class density / theme / motion contracts** out of the box.
- You ship **server-rendered HTML** and want SSR with no hydration story.

Both can coexist (recipes A and B above).

---

## See also

- [`docs/getting-started.md`](../getting-started.md) — 15-minute zero-to-page walkthrough
- [`docs/guides/canonical-conventions.md`](./canonical-conventions.md) — `data-*` vs class, tone vs modifier
- [`docs/guides/layout-composition.md`](./layout-composition.md) — primitives in depth
- [`docs/guides/density.md`](./density.md) — `data-density` matrix
- [`docs/release/utility-surface-budget-policy.md`](../release/utility-surface-budget-policy.md) — why the utility set is small on purpose
- [`examples/dashboard-starter/`](../../examples/dashboard-starter/) — a real dashboard built only with primitives + components

---

## Appendix — original tradeoff table (kept for reference)

The headline-level decision factors haven't changed:

| | Utility-first (Tailwind) | Fikir CSS |
|---|---|---|
| **Authoring model** | Compose atomic classes per element | Apply semantic component classes |
| **Bundle strategy** | JIT — only used classes shipped | Static bundle, fixed ~18 KB gzip |
| **Component abstraction** | You build it (Headless UI, Radix, etc.) | Built-in semantic surfaces |
| **Token system** | `tailwind.config.js` JS object | CSS custom properties |
| **Dark mode** | `dark:` class prefix | `data-theme="dark"` (single attribute) |
| **Framework binding** | Framework-agnostic | Framework-agnostic |
| **SSR** | No hydration issues | No hydration issues |
| **Learning curve** | Memorise utilities | Memorise components + 8 layout primitives |
