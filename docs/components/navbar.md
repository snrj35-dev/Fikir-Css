# Navbar

> Support level: **Supported** | Surface key: `component.navbar` | Canonical root: `.navbar`

## Status

Supported. Use for top-level site or app navigation where brand, primary links, and optional actions need to live in one horizontal row.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `navbar` | Root navigation shell | `nav` |
| `navbar-brand` | Brand / logo area | `a` |
| `navbar-nav` | Link group | `div` |
| `navbar-item` | Individual navigation link | `a` |

## Basic usage

```html
<nav class="navbar" aria-label="Main navigation">
  <a class="navbar-brand" href="/">
    <span aria-hidden="true">F</span>
    Fikir CSS
  </a>

  <div class="navbar-nav">
    <a class="navbar-item" href="/" aria-current="page">Overview</a>
    <a class="navbar-item" href="/components">Components</a>
    <a class="navbar-item" href="/patterns">Patterns</a>
  </div>
</nav>
```

## With actions

`navbar` only styles the core navigation surface. If you need extra controls on the right, place them next to `navbar-nav` with a layout primitive.

```html
<nav class="navbar" aria-label="Product navigation">
  <a class="navbar-brand" href="/dashboard">Northwind</a>

  <div class="cluster" data-cluster-justify="between" style="inline-size: 100%">
    <div class="navbar-nav">
      <a class="navbar-item" href="/dashboard" aria-current="page">Dashboard</a>
      <a class="navbar-item" href="/orders">Orders</a>
      <a class="navbar-item" href="/customers">Customers</a>
    </div>

    <div class="cluster">
      <button class="btn btn-ghost btn-sm" type="button">Help</button>
      <button class="btn btn-primary btn-sm" type="button">New order</button>
    </div>
  </div>
</nav>
```

## Variants and states

- Active item: set `aria-current="page"` on the current `navbar-item`
- Dense layouts: global `data-density="compact"` reduces spacing through shared tokens
- Sticky / elevated shells: apply app-level positioning or shadow utilities outside the component contract

## CSS custom properties

Navbar does not expose component-specific custom properties. It consumes shared semantic tokens and spacing tokens.

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Navbar background |
| `--color-fg-default` | Text and icon color |
| `--color-border-subtle` | Outline / separators |
| `--color-primary-500` | Active item background |
| `--radius-md` | Rounded corners |
| `--space-2` / `--space-3` | Internal gap and padding |

## Accessibility checklist

- Use `<nav>` with an accessible name such as `aria-label="Main navigation"`.
- Mark the current page with `aria-current="page"` on the active link.
- Keep brand text meaningful if the logo is icon-only.
- If you add a mobile toggle, its JS contract belongs to your app layer, not to `navbar` itself.

## AI notes

- Canonical selectors are `navbar`, `navbar-brand`, `navbar-nav`, `navbar-item`.
- Do not invent `navbar-menu`, `navbar-actions`, or `navbar-toggle`; those are not shipped selectors.
- `navbar-item` is applied directly to the clickable link element.
- Use `cluster` / `stack` for extra composition instead of inline one-off wrappers with custom classes.

## Related components

- `sidebar-nav`
- `menu-bar`
- `breadcrumb`
