# App Shell

> Support level: **Supported** | Surface key: `component.appShell` | Canonical root: `.app-shell`

## When to use

Full-application layout wrapper. Provides a built-in CSS Grid that arranges a topbar, a sidebar, and a main content area with sensible responsive behavior out of the box.

- ✓ Admin / dashboard / product shell
- ✓ Sidebar + topbar + main content skeleton
- ✓ Needs to adapt between mobile (stacked) and desktop (sidebar + main)
- ✗ Single-page marketing layouts (use `container` / `stack`)
- ✗ Card-level composition (use `grid`, `cluster`)

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `app-shell` | Root grid container | `div` |
| `app-shell-topbar` | Top navigation row | `header` |
| `app-shell-sidebar` | Side navigation area | `aside` |
| `app-shell-main` | Primary content area | `main` |
| `app-shell-content` | Inner grid that holds `app-shell-sidebar + app-shell-main` | `div` |

> `app-shell-main` is the page body region.
> `app-shell-content` is the 2-column grid **inside** the shell that places the sidebar next to the main area (at `>= 64rem`) and stacks them on narrow viewports.

The CSS ships responsive defaults:

- below `64rem`: single column, sidebar stacks above main
- at `>= 64rem`: `15rem` sidebar column + main content column

You do **not** need inline `grid-template-areas` or media queries for this basic layout.

## Basic usage

```html
<div class="app-shell">
  <header class="app-shell-topbar">
    <strong>My App</strong>
    <nav class="cluster" aria-label="Topbar actions">
      <button class="btn btn-ghost btn-sm">Help</button>
      <button class="btn btn-ghost btn-sm">Profile</button>
    </nav>
  </header>

  <div class="app-shell-content">
    <aside class="app-shell-sidebar">
      <nav class="sidebar-nav" aria-label="Main">
        <a class="sidebar-nav-item" href="/" aria-current="page">Dashboard</a>
        <a class="sidebar-nav-item" href="/users">Users</a>
        <a class="sidebar-nav-item" href="/settings">Settings</a>
      </nav>
    </aside>

    <main class="app-shell-main">
      <!-- page body -->
    </main>
  </div>
</div>
```

## Without sidebar

Drop `app-shell-sidebar` and keep only `app-shell-main` inside `app-shell-content`.

```html
<div class="app-shell">
  <header class="app-shell-topbar">Brand</header>
  <div class="app-shell-content">
    <main class="app-shell-main"><!-- content --></main>
  </div>
</div>
```

## Mobile drawer (hamburger) pattern

`app-shell` itself stacks sidebar above main below `64rem`. If you want a true slide-in drawer on mobile, pair `app-shell` with the `drawer` component and hide `app-shell-sidebar` on narrow viewports.

```html
<div class="app-shell">
  <header class="app-shell-topbar">
    <button class="icon-button icon-button-md" aria-label="Open menu"
            aria-controls="mobile-nav" aria-expanded="false"
            data-action="open-drawer">☰</button>
    <strong>My App</strong>
  </header>

  <div class="app-shell-content">
    <aside class="app-shell-sidebar" data-desktop-only>
      <!-- desktop sidebar -->
    </aside>

    <main class="app-shell-main"><!-- content --></main>
  </div>

  <!-- mobile drawer mirrors the sidebar nav -->
  <div class="drawer" id="mobile-nav">
    <div class="drawer-backdrop"></div>
    <div class="drawer-panel">
      <div class="drawer-header">Menu</div>
      <div class="drawer-body">
        <nav class="sidebar-nav" aria-label="Main">
          <!-- same links -->
        </nav>
      </div>
    </div>
  </div>
</div>
```

Wire the open/close logic with `fikir-css/helpers` (`bindOverlayKeyboard`, `createFocusTrap`) — see `docs/guides/overlay-js-helpers.md`.

## Accessibility checklist

- Use the semantic landmarks: `<header>` for topbar, `<aside>` for sidebar, `<main>` for main content.
- Include a skip link before `app-shell-topbar` that jumps to `app-shell-main`:
  ```html
  <a class="visually-hidden" href="#main-content">Skip to main content</a>
  ```
  and add `id="main-content"` on `app-shell-main`.
- Mobile drawer trigger must have `aria-controls` + `aria-expanded` wired to the drawer.

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Topbar + sidebar surface |
| `--color-bg-default` | Main content surface |
| `--color-border-subtle` | Dividers between regions |
| `--space-2` / `--space-3` | Padding inside shell regions |
| `--radius-md` | Inner region corners |

## AI / machine-readable notes

- Canonical structure:
  `app-shell > app-shell-topbar + app-shell-content(app-shell-sidebar + app-shell-main)`
- **Do not** invent `app-shell-footer` or `app-shell-header` — those selectors are not in the surface. Use `app-shell-topbar` for the top row and a plain `<footer>` inside `app-shell-main` if needed.
- The responsive 2-column grid is built in (`@media (min-width: 64rem)`). Do not add inline `grid-template-columns` unless you are overriding the default.
- Canonical active nav marker is `aria-current="page"` on `sidebar-nav-item`, not `data-active`.
- See `dist/contracts/anatomy.json` → `components.app-shell.minimal_html` for the canonical skeleton.

## Related

- **`sidebar-nav`** — navigation list that lives inside `app-shell-sidebar`
- **`page-header`** — title + actions block at the top of `app-shell-main`
- **`drawer`** — mobile-drawer companion for narrow viewports
- **`cluster`** / **`stack`** — layout primitives for content inside `app-shell-main`
