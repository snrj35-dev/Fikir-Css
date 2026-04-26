# Sidebar Nav

> Support level: **Supported** | Surface key: `component.sidebarNav` | Canonical root: `.sidebar-nav`

## Status

Supported. Use for vertical product navigation, settings navigation, or left-rail dashboard menus.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `sidebar-nav` | Root navigation container | `nav` |
| `sidebar-nav-section` | Optional link group | `div` |
| `sidebar-nav-item` | Navigation link | `a` |

## Basic usage

```html
<nav class="sidebar-nav" aria-label="Sidebar navigation">
  <div class="sidebar-nav-section">
    <a class="sidebar-nav-item" href="/" aria-current="page">Dashboard</a>
    <a class="sidebar-nav-item" href="/orders">Orders</a>
    <a class="sidebar-nav-item" href="/customers">Customers</a>
  </div>

  <div class="sidebar-nav-section">
    <a class="sidebar-nav-item" href="/settings">Settings</a>
    <a class="sidebar-nav-item" href="/billing">Billing</a>
  </div>
</nav>
```

## In `app-shell-sidebar`

```html
<aside class="app-shell-sidebar">
  <nav class="sidebar-nav" aria-label="Main">
    <div class="sidebar-nav-section">
      <a class="sidebar-nav-item" href="/" aria-current="page">Overview</a>
      <a class="sidebar-nav-item" href="/analytics">Analytics</a>
      <a class="sidebar-nav-item" href="/reports">Reports</a>
    </div>

    <div class="sidebar-nav-section">
      <a class="sidebar-nav-item" href="/team">Team</a>
      <a class="sidebar-nav-item" href="/settings">Settings</a>
    </div>
  </nav>
</aside>
```

## Variants and states

- Active item: set `aria-current="page"` on the current `sidebar-nav-item`
- Section grouping: use multiple `sidebar-nav-section` wrappers to separate link clusters
- Mobile pattern: use `drawer` to present the same nav on narrow screens

## CSS custom properties

Sidebar Nav does not expose component-specific custom properties.

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Nav background |
| `--color-fg-default` | Default item color |
| `--color-border-subtle` | Borders |
| `--color-primary-500` | Active item background |
| `--color-gray-50` | Active item text |
| `--radius-md` | Rounded corners |
| `--space-2` / `--space-3` | Item spacing |

## Accessibility checklist

- Use `<nav>` with a clear accessible name.
- Mark the active destination with `aria-current="page"`.
- Keep link text specific enough to stand alone.
- If you mirror the nav inside a drawer, keep link order consistent between desktop and mobile.

## AI notes

- Canonical selectors are `sidebar-nav`, `sidebar-nav-section`, and `sidebar-nav-item`.
- Do not invent `sidebar-nav-submenu`, `sidebar-item-active`, or `data-active`.
- `sidebar-nav-item` is the clickable link itself, not a list wrapper.
- Grouping is optional; when not needed, links can live directly under `sidebar-nav`.

## Related components

- `app-shell`
- `drawer`
- `navbar`
