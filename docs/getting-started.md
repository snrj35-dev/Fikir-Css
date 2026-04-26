# Getting Started — Fikir CSS in 15 Minutes

> Last reviewed: 2026-04-25
> Audience: junior devs, designers, anyone who wants a working page **today** without reading 85 component docs.

You will:

1. **Minute 0–3** — Drop Fikir into an HTML file from CDN.
2. **Minute 3–8** — Compose three core surfaces: `btn`, `card`, `modal`.
3. **Minute 8–15** — Lay out your own page with the `app-shell` + `cluster` + `stack` primitives.

By the end, you will have a real, themeable page that costs **0 build steps** and **0 npm dependencies**.

---

## 0 · Mental model (read once, then forget)

Fikir CSS is **contract-driven**. That means three things in practice:

- **Class names are semantic.** Write `class="btn btn-primary"`, not utility soups like `class="px-4 py-2 bg-blue-500"`.
- **State lives in `data-*` attributes**, never on classes. `data-open="true"`, `data-invalid="true"`, `data-active="true"`.
- **The selectors are public.** Every class in your HTML is listed in [`dist/contracts/selectors.json`][selectors] — if it isn't there, **don't write it**, find an alternative.

If you remember nothing else, remember those three. The rest is just shape.

---

## 1 · Minute 0–3 · Hello, Fikir

Create a file called `index.html` and paste this. That's the install:

```html
<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My first Fikir page</title>
    <link rel="stylesheet" href="https://unpkg.com/fikir-css@latest/dist/fikir.css" />
  </head>
  <body>
    <main class="surface" style="padding: 2rem">
      <h1>Hello, Fikir 👋</h1>
      <button class="btn btn-primary btn-md">Click me</button>
    </main>
  </body>
</html>
```

Open it in a browser. You should see a styled page with a real button.

**What you got for free:**

- The `data-theme="light"` attribute on `<html>` enables every theme token. Switch to `data-theme="dark"` to flip the entire page — no CSS changes.
- `class="surface"` gives the body a real background, foreground, and font stack.
- The button picked up tone (`btn-primary`), style is solid by default, size is `btn-md`.

If your page looks unstyled, the CDN URL is wrong. Double-check the `<link>`.

---

## 2 · Minute 3–8 · Three components everybody needs

Replace your `<main>` with this and refresh:

```html
<main class="container stack" style="max-width: 40rem; padding: 2rem">

  <!-- Button: tone × style × size -->
  <div class="cluster" style="gap: .5rem">
    <button class="btn btn-primary btn-md">Save</button>
    <button class="btn btn-outline btn-neutral btn-md">Cancel</button>
    <button class="btn btn-danger btn-soft btn-md">Delete</button>
  </div>

  <!-- Card: a real container with padding presets -->
  <div class="card card-elevated card-p-md">
    <p class="callout-title">You're using Fikir</p>
    <p>This card costs zero custom CSS. Tone via class, padding via class, elevation via class.</p>
  </div>

  <!-- Modal: state via data-open, no .show class -->
  <button class="btn btn-primary btn-md" id="open-demo">Open dialog</button>

  <div class="modal" id="demo-modal" data-open="false" role="dialog" aria-modal="true" aria-labelledby="demo-title">
    <div class="modal-backdrop"></div>
    <div class="modal-dialog">
      <header class="modal-header">
        <h2 id="demo-title">Confirm action</h2>
        <button class="icon-button icon-button-sm" aria-label="Close" id="close-demo">×</button>
      </header>
      <div class="modal-body">
        <p>This dialog is shown by toggling <code class="code">data-open="true"</code> on the root, nothing else.</p>
      </div>
      <footer class="modal-footer">
        <button class="btn btn-outline btn-neutral btn-md" id="cancel-demo">Cancel</button>
        <button class="btn btn-primary btn-md">Confirm</button>
      </footer>
    </div>
  </div>

</main>

<script>
  const modal = document.getElementById("demo-modal");
  document.getElementById("open-demo").onclick = () => modal.dataset.open = "true";
  document.getElementById("close-demo").onclick = () => modal.dataset.open = "false";
  document.getElementById("cancel-demo").onclick = () => modal.dataset.open = "false";
</script>
```

**Three things just happened:**

| What | How |
|------|-----|
| You varied buttons by **tone** (primary/neutral/danger), **style** (solid/soft/outline), and **size** (`btn-md`). | Stacked classes — no JS, no inline style. |
| The card is `card-elevated card-p-md`. | One class for the visual variant, one for the padding preset. |
| The modal opens by setting `data-open="true"` on the root. | Pure CSS attribute selector. The script never adds or removes a class. |

For production focus-trap and ESC-to-close, swap the inline `<script>` for `fikir-css/helpers` (see [docs/guides/overlay-js-helpers.md](./guides/overlay-js-helpers.md)).

---

## 3 · Minute 8–15 · Lay out a real page with primitives

Component classes (`btn`, `card`, `modal`) are only half the story. Layout in Fikir is **layout primitives**, not custom grids:

| Primitive | Does | Replaces |
|-----------|------|----------|
| `app-shell` | Topbar + sidebar + main grid | A whole `display: grid; grid-template-areas: …` block |
| `stack` | Vertical flow with consistent gap | `display: flex; flex-direction: column; gap: …` |
| `cluster` | Horizontal row that wraps with consistent gap | `display: flex; gap: …; flex-wrap: wrap` |
| `grid` | Auto-fit responsive grid (cards, KPIs) | `grid-template-columns: repeat(auto-fit, minmax(…))` |
| `center` | Center-align a child both axes | The 3-line flex centering trick |
| `container` | Max-width wrapper with horizontal padding | A custom `.wrapper { max-width: …; margin-inline: auto }` |

Replace your file body with the canonical app shell:

```html
<body class="surface">
  <div class="app-shell">

    <header class="navbar">
      <strong>My App</strong>
      <div class="cluster" style="gap: .5rem; margin-inline-start: auto">
        <button class="icon-button icon-button-sm" aria-label="Notifications">🔔</button>
        <button class="icon-button icon-button-sm" aria-label="Profile">👤</button>
      </div>
    </header>

    <div class="app-shell-content">
      <aside class="app-shell-sidebar">
        <nav class="sidebar-nav" aria-label="Primary">
          <div class="sidebar-nav-section">
            <a class="sidebar-nav-item" href="#" aria-current="page">Dashboard</a>
            <a class="sidebar-nav-item" href="#orders">Orders</a>
            <a class="sidebar-nav-item" href="#settings">Settings</a>
          </div>
        </nav>
      </aside>

      <main class="app-shell-main stack" style="padding: 2rem">
        <header class="page-header">
          <div class="page-header-content">
            <h1>Dashboard</h1>
            <p>Welcome back. Three KPIs and a card.</p>
          </div>
          <div class="page-header-actions">
            <button class="btn btn-primary btn-md">New report</button>
          </div>
        </header>

        <section class="grid" style="--grid-min: 14rem">
          <article class="kpi-card">
            <div class="kpi-card-header">Revenue</div>
            <p class="kpi-card-value">$24,580</p>
            <p class="kpi-card-meta">vs last month</p>
            <span class="kpi-card-trend" data-trend="up">↑ 12.4%</span>
          </article>
          <article class="kpi-card">
            <div class="kpi-card-header">Active users</div>
            <p class="kpi-card-value">1,284</p>
            <p class="kpi-card-meta">last 7 days</p>
            <span class="kpi-card-trend" data-trend="up">↑ 3.1%</span>
          </article>
          <article class="kpi-card">
            <div class="kpi-card-header">Churn</div>
            <p class="kpi-card-value">22</p>
            <p class="kpi-card-meta">monthly</p>
            <span class="kpi-card-trend" data-trend="down">↓ 0.8%</span>
          </article>
        </section>

        <div class="card card-flat card-p-md">
          <p>Plug your real content in here. The shell, the sidebar, the responsive KPI grid — all of it is one HTML pass with zero custom CSS.</p>
        </div>
      </main>
    </div>

  </div>
</body>
```

That is a real, responsive admin shell. Resize the browser: `app-shell-content` collapses to single-column under 64 rem, `grid` auto-fits the KPI cards, the page header stacks. **No media queries written.**

---

## You did it. What now?

You have:

- ✅ Installed Fikir from CDN with one `<link>`.
- ✅ Used three core components — `btn`, `card`, `modal`.
- ✅ Composed a real layout with `app-shell`, `stack`, `cluster`, `grid`.
- ✅ Toggled state with `data-open`, not classes.

**Next 15 minutes — pick one:**

- **Coming from Tailwind/utility-first?** Read [`docs/guides/why-fikir-css-vs-utility-first.md`](./guides/why-fikir-css-vs-utility-first.md) — a side-by-side cheat sheet that takes ~10 minutes.
- **Want a fully-built dashboard to copy from?** Open [`examples/dashboard-starter/`](../examples/dashboard-starter/) — single HTML file, every line is canonical.
- **Want to know what every class does?** Browse the live gallery: <https://snrj35-dev.github.io/Fikir-Css/>
- **AI assistant?** Always reference [`dist/contracts/selectors.json`][selectors]. Every class is listed there. If you can't find it, it's wrong.

**Frequently-needed component docs:**

- Buttons: [`docs/components/button.md`](./components/button.md)
- Forms: [`docs/components/input.md`](./components/input.md), [`field.md`](./components/field.md), [`select.md`](./components/select.md)
- Layout: [`docs/components/app-shell.md`](./components/app-shell.md), [`docs/guides/layout-composition.md`](./guides/layout-composition.md)
- Theming + density: [`docs/guides/density.md`](./guides/density.md), [`docs/guides/canonical-conventions.md`](./guides/canonical-conventions.md)

---

## Top 5 mistakes new users make

1. **Inventing class names.** `kpi-card-metric` doesn't exist. Always check [`selectors.json`][selectors] first.
2. **Using `class="active"` for state.** Use `data-active="true"` on the relevant element (or `aria-current="page"` for nav).
3. **Custom grids inside `app-shell`.** Don't `style="display: grid; …"` over the shell — the `grid`, `cluster`, `stack` primitives already do it.
4. **Hard-coding colors.** Use tokens: `var(--color-accent)`, `var(--color-fg-default)`. Don't write `#6d28d9` in your CSS.
5. **Loading the dark theme separately.** The single `fikir.css` already contains light + dark + high-contrast. Just toggle `data-theme="dark"` on `<html>`.

---

[selectors]: https://snrj35-dev.github.io/Fikir-Css/dist/contracts/selectors.json
