# Responsive Sidebar ↔ Drawer Bridge — Canonical Recipe

> Status: **Stable** · Added 2026-04-20 (M22)
> Source of truth: `app-shell`, `app-shell-sidebar`, `sidebar-nav`, `drawer` components; `bindSidebarDrawer` helper.

Dashboards need two sibling navigation surfaces:

- **Desktop** (≥ ~960 px / 60 rem): a persistent inline sidebar next to the main area.
- **Mobile / narrow**: a slide-in drawer triggered by a hamburger button in the topbar.

This recipe wires both into a single coherent experience with one trigger button, focus trapping, Escape-to-close, backdrop-click-to-close, and automatic cleanup when the viewport crosses the breakpoint.

## Markup

Use the canonical `app-shell` layout for the desktop sidebar, and a separate `drawer` for the mobile surface. Both navs can render the **same** `sidebar-nav` subtree.

```html
<a class="visually-hidden" href="#main-content">Skip to main content</a>

<div class="app-shell">

  <!-- Topbar with hamburger trigger (hidden on desktop via CSS, see below) -->
  <header class="app-shell-topbar">
    <button class="icon-button icon-button-md"
            data-action="open-drawer"
            aria-controls="mobile-nav"
            aria-expanded="false"
            aria-label="Open navigation">☰</button>
    <strong>My App</strong>
  </header>

  <div class="app-shell-content">
    <!-- Desktop sidebar (hidden below 60rem via app CSS) -->
    <aside class="app-shell-sidebar" data-desktop-only>
      <nav class="sidebar-nav" aria-label="Main">
        <a class="sidebar-nav-item" href="/" aria-current="page">Dashboard</a>
        <a class="sidebar-nav-item" href="/orders">Orders</a>
        <a class="sidebar-nav-item" href="/customers">Customers</a>
        <a class="sidebar-nav-item" href="/settings">Settings</a>
      </nav>
    </aside>

    <main class="app-shell-main" id="main-content">
      <!-- page body -->
    </main>
  </div>
</div>

<!-- Mobile drawer — mirrors the sidebar nav -->
<div class="drawer" id="mobile-nav">
  <div class="drawer-backdrop"></div>
  <div class="drawer-panel">
    <div class="drawer-header">Menu</div>
    <div class="drawer-body">
      <nav class="sidebar-nav" aria-label="Main (mobile)">
        <a class="sidebar-nav-item" href="/" aria-current="page">Dashboard</a>
        <a class="sidebar-nav-item" href="/orders">Orders</a>
        <a class="sidebar-nav-item" href="/customers">Customers</a>
        <a class="sidebar-nav-item" href="/settings">Settings</a>
      </nav>
    </div>
  </div>
</div>
```

## Visibility CSS (only rule needed)

Hide the hamburger on desktop and the inline sidebar below the breakpoint. Everything else is already handled by `app-shell-content` and `drawer`.

```css
/* app.css */
[data-action="open-drawer"] { display: inline-flex; }

@media (min-width: 60rem) {
  [data-action="open-drawer"] { display: none; }
}

@media (max-width: 59.99rem) {
  [data-desktop-only] { display: none; }
}
```

> Note: `app-shell-content` itself already collapses to a single column below `64rem`, so you only need the `data-desktop-only` hide if you want the mobile-drawer pattern specifically. Pick the breakpoint that matches your `bindSidebarDrawer` call (defaults to `60rem`).

## Wiring with `bindSidebarDrawer`

### ESM (bundler)

```js
import { bindSidebarDrawer } from "fikir-css/helpers";

bindSidebarDrawer({
  trigger: document.querySelector('[data-action="open-drawer"]'),
  drawer:  document.getElementById('mobile-nav'),
  breakpoint: '60rem', // must match your CSS breakpoint
});
```

### CDN (no bundler)

```html
<script type="module">
  import { bindSidebarDrawer } from "https://unpkg.com/fikir-css@latest/dist/helpers/index.mjs";

  bindSidebarDrawer({
    trigger: document.querySelector('[data-action="open-drawer"]'),
    drawer:  document.getElementById('mobile-nav'),
  });
</script>
```

## What `bindSidebarDrawer` does

- On trigger click (narrow viewports only): sets `data-open="true"` on the drawer, moves focus into the panel, traps Tab/Shift+Tab inside the drawer.
- Binds Escape-to-close on document.
- Binds backdrop-click-to-close on the `drawer` root (works because `drawer-backdrop` is a child of the drawer root).
- Keeps `aria-expanded` on the trigger in sync.
- Watches the `matchMedia` breakpoint: if the user resizes or rotates into desktop while the drawer is open, closes it automatically.
- Returns `{ open, close, destroy }` so you can imperatively drive it (e.g. close on route change).

## Closing on navigation (SPA)

If your router swaps the main content without unmounting the drawer, call `close()` from your route change handler:

```js
const drawer = bindSidebarDrawer({ trigger, drawer: drawerEl });
router.onRouteChange(() => drawer.close());
```

## Accessibility checklist

- [ ] Trigger button has `aria-controls="<drawer-id>"`, `aria-expanded` (managed by helper), and `aria-label` since the icon-only button has no visible text.
- [ ] Drawer uses the canonical `drawer + drawer-backdrop + drawer-panel` anatomy.
- [ ] Skip-link to main content lives before the topbar so keyboard users can jump past the nav.
- [ ] Both nav instances use `sidebar-nav` with `aria-current="page"` on the active item.
- [ ] Focus is trapped inside the drawer while it is open and returns to the trigger on close.
- [ ] Escape closes the drawer.

## Related

- `docs/components/app-shell.md` — topbar + sidebar + main structure
- `docs/components/drawer.md` — drawer component surface
- `docs/guides/overlay-js-helpers.md` — `createFocusTrap`, `bindOverlayKeyboard`
- `docs/guides/canonical-conventions.md` — `aria-current` vs `data-active`
- `docs/guides/layout-composition.md` — `app-shell` + drawer section
