# Sidebar Nav

> Support level: **Supported** | Surface key: `component.sidebarNav` | Canonical: `.comp-sidebar-nav`

## When to use

Vertical navigation sidebar showing app sections or pages. Primary navigation for desktop apps and some websites.

- ✓ Application/product sidebar navigation
- ✓ Documentation left sidebar (TOC)
- ✓ Settings/account navigation panel
- ✓ Multi-section dashboard
- ✗ Mobile primary nav (use drawer instead)
- ✗ Flat site with few pages (use navbar instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-sidebar-nav` | Sidebar navigation container | n/a |
| `comp-sidebar-nav-item` | Navigation item (link) | n/a |
| `comp-sidebar-nav-section` | Section/group heading | n/a |
| `comp-sidebar-nav-submenu` | Nested items (collapsed/expanded) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Collapsed | Submenu hidden | Section shows no items |
| Expanded | Submenu visible | Section shows nested items |
| Current | Current page | Link highlighted/active |
| Hover | Mouse over | Link background highlighted |

## Basic usage

```html
<!-- Sidebar navigation -->
<aside class="comp-sidebar-nav" style="width: 250px; background: var(--color-bg-surface); border-right: 1px solid var(--color-border-subtle); padding: 1rem 0;">
  <nav aria-label="Main navigation">
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li>
        <a href="/dashboard" class="comp-sidebar-nav-item" style="display: block; padding: 0.75rem 1rem; text-decoration: none; color: var(--color-primary);">
          Dashboard
        </a>
      </li>
      <li>
        <a href="/projects" class="comp-sidebar-nav-item" style="display: block; padding: 0.75rem 1rem;">
          Projects
        </a>
      </li>
      
      <!-- Section heading -->
      <li class="comp-sidebar-nav-section" style="padding: 1rem 1rem 0.5rem; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; color: var(--color-fg-muted);">
        Tools
      </li>
      
      <li>
        <a href="/analytics" class="comp-sidebar-nav-item" style="display: block; padding: 0.75rem 1rem;">
          Analytics
        </a>
      </li>
      <li>
        <a href="/settings" class="comp-sidebar-nav-item" style="display: block; padding: 0.75rem 1rem;">
          Settings
        </a>
      </li>
    </ul>
  </nav>
</aside>

<!-- Collapsible sidebar section -->
<div class="comp-sidebar-nav-item">
  <button 
    type="button" 
    style="width: 100%; padding: 0.75rem 1rem; background: none; border: none; text-align: left; cursor: pointer; color: var(--color-fg-default);"
    aria-expanded="false"
    aria-controls="submenu-1"
  >
    Resources ▼
  </button>
  <ul id="submenu-1" class="comp-sidebar-nav-submenu" style="list-style: none; padding: 0; margin: 0; display: none; padding-left: 1rem;">
    <li><a href="/docs" class="comp-sidebar-nav-item" style="display: block; padding: 0.5rem 1rem;">Documentation</a></li>
    <li><a href="/api" class="comp-sidebar-nav-item" style="display: block; padding: 0.5rem 1rem;">API</a></li>
    <li><a href="/support" class="comp-sidebar-nav-item" style="display: block; padding: 0.5rem 1rem;">Support</a></li>
  </ul>
</div>
```

## With icons

```html
<a href="/dashboard" class="comp-sidebar-nav-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem;">
  <svg width="1em" height="1em" viewBox="0 0 24 24"><!-- dashboard icon --></svg>
  <span>Dashboard</span>
</a>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<nav>` with `aria-label`
- [x] **Links:** Each item is clickable link or button
- [x] **Current page:** Uses `aria-current="page"` on current item
- [x] **Expandable:** Collapsible sections use `aria-expanded` and `aria-controls`
- [x] **Keyboard:** Tab navigates through items
- [x] **Screen reader:** Navigation section announced as `<nav>`

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | On nav | e.g., "Main navigation", "Product navigation" |
| `aria-current` | Current item | `"page"` |
| `aria-expanded` | Collapsible item | `"true"` or `"false"` |
| `aria-controls` | Collapsible item | ID of submenu |

## Sidebar layouts

- **Fixed:** Always visible (desktop)
- **Collapsible:** Hide/show via button (responsive)
- **Floating:** Overlay on mobile
- **Sticky:** Scrolls with content but stays visible

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Sidebar background | Surface color |
| `--color-primary` | Current item | Highlight color |
| `--color-border-subtle` | Divider line | Subtle border |
| `--space-*` | Padding | Item padding/spacing |

## AI / machine-readable notes

- **Selector pattern:** `comp-sidebar-nav` with `comp-sidebar-nav-item`, `comp-sidebar-nav-section`, `comp-sidebar-nav-submenu` children
- **Collapsible:** Use `aria-expanded` on button and `aria-controls` to link submenu
- **Current:** Mark with `aria-current="page"`
- **Responsive:** Use CSS media queries to hide/show sidebar on mobile
- **Copy-paste use:** Update link href and labels, adjust nesting as needed

## Related patterns

- **Navbar:** Horizontal navigation (different layout)
- **Drawer:** Mobile/hidden navigation drawer
- **Breadcrumb:** Hierarchical trail (different purpose)
