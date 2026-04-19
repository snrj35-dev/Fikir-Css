# Sidebar

> Support level: **Supported** | Surface key: `component.sidebar` | Canonical: `.comp-sidebar`

## When to use

Fixed-width side panel for navigation or secondary content.

- ✓ App sidebar navigation
- ✓ Fixed side panel with content
- ✓ Collapsible navigation drawer
- ✗ Layout primitive (use stack/grid)
- ✗ Modal overlays (use drawer instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-sidebar` | Sidebar container | n/a |
| `comp-sidebar-collapsed` | Hidden state | Modifier |
| `comp-sidebar-item` | Navigation item | n/a |
| `comp-sidebar-item-active` | Current page | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Expanded | Default | Sidebar shown |
| Collapsed | Toggle/mobile | Sidebar hidden |

## Basic usage

```html
<!-- Sidebar navigation -->
<aside class="comp-sidebar" style="width: 250px; padding: 1rem; background: var(--color-bg-subtle); border-right: 1px solid var(--color-border-subtle); overflow-y: auto;">
  <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
    <a class="comp-sidebar-item comp-sidebar-item-active" href="/" style="padding: 0.75rem; border-radius: 0.5rem; background: var(--color-bg-default); color: var(--color-accent); text-decoration: none; display: block;">Dashboard</a>
    <a class="comp-sidebar-item" href="/users" style="padding: 0.75rem; border-radius: 0.5rem; color: var(--color-fg-base); text-decoration: none; display: block;">Users</a>
    <a class="comp-sidebar-item" href="/settings" style="padding: 0.75rem; border-radius: 0.5rem; color: var(--color-fg-base); text-decoration: none; display: block;">Settings</a>
  </nav>
</aside>

<!-- Sidebar with sections -->
<aside class="comp-sidebar" style="width: 250px; padding: 1rem; background: var(--color-bg-subtle);">
  <nav style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 0.75rem; text-transform: uppercase; color: var(--color-fg-muted); font-weight: 600;">Main</h3>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <a href="/" style="padding: 0.5rem; text-decoration: none; color: var(--color-fg-base);">Dashboard</a>
        <a href="/projects" style="padding: 0.5rem; text-decoration: none; color: var(--color-fg-base);">Projects</a>
      </div>
    </div>
    <div>
      <h3 style="margin: 0 0 0.5rem 0; font-size: 0.75rem; text-transform: uppercase; color: var(--color-fg-muted); font-weight: 600;">Admin</h3>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <a href="/users" style="padding: 0.5rem; text-decoration: none; color: var(--color-fg-base);">Users</a>
        <a href="/settings" style="padding: 0.5rem; text-decoration: none; color: var(--color-fg-base);">Settings</a>
      </div>
    </div>
  </nav>
</aside>

<!-- Collapsible sidebar -->
<aside class="comp-sidebar" id="sidebar" style="width: 250px; padding: 1rem; background: var(--color-bg-subtle); overflow-y: auto; max-height: 100vh;">
  <button class="comp-icon-button" onclick="toggleSidebar()" aria-label="Toggle sidebar" aria-expanded="true" aria-controls="sidebar-nav" style="margin-bottom: 1rem;">☰</button>
  <nav id="sidebar-nav" style="display: flex; flex-direction: column; gap: 0.5rem;">
    <a href="/" style="padding: 0.75rem; text-decoration: none;">Dashboard</a>
    <a href="/users" style="padding: 0.75rem; text-decoration: none;">Users</a>
  </nav>
</aside>
```

## With icons

```html
<aside class="comp-sidebar" style="width: 250px; padding: 1rem;">
  <nav style="display: flex; flex-direction: column; gap: 0.25rem;">
    <a href="/" style="padding: 0.75rem; display: flex; align-items: center; gap: 0.75rem; text-decoration: none; border-radius: 0.5rem;">
      <span style="font-size: 1.25rem;">📊</span>
      <span>Dashboard</span>
    </a>
    <a href="/users" style="padding: 0.75rem; display: flex; align-items: center; gap: 0.75rem; text-decoration: none; border-radius: 0.5rem;">
      <span style="font-size: 1.25rem;">👥</span>
      <span>Users</span>
    </a>
  </nav>
</aside>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<aside>` and `<nav>`
- [x] **Links:** Active link marked with aria-current
- [x] **Collapse:** Toggle has aria-expanded and aria-controls
- [x] **Keyboard:** Tab navigates items
- [x] **Focus:** Visible focus indicators

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Navigate items |
| `Enter` | Follow link |
| `Escape` (mobile) | Close sidebar |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<nav>` | Navigation | Semantic navigation |
| `aria-current="page"` | Active link | Mark current page |
| `aria-expanded` (toggle) | Collapse state | On toggle button |
| `aria-controls` (toggle) | Controlled element | Links to nav |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-subtle` | Sidebar background | Subtle color |
| `--color-border-subtle` | Right border | Divider |
| `--space-*` | Padding | Scales with density |

## Variants

- **Fixed:** Always visible sidebar
- **Collapsible:** Toggle show/hide (especially mobile)
- **With sections:** Grouped navigation items
- **Icons:** Icon + text items
- **Width:** Fixed 200-300px typical

## AI / machine-readable notes

- **Selector pattern:** `comp-sidebar` fixed-width container with `comp-sidebar-item` navigation links
- **Active:** Mark current page with `aria-current="page"`
- **Collapse:** Toggle with `aria-expanded` and `aria-controls`
- **Width:** Fixed width (typically 250px) for predictable layout
- **Copy-paste use:** Update navigation links and active states

## Related patterns

- **App-shell:** Full page layout with sidebar
- **Switcher:** Responsive sidebar + main
- **Stack:** Vertical layout
