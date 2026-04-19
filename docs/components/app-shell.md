# App Shell

> Support level: **Supported** | Surface key: `component.appShell` | Canonical: `.comp-app-shell`

## When to use

Root layout container for application. Header, sidebar, main content, footer.

- ✓ Application-level layout
- ✓ Header + sidebar + main + footer structure
- ✓ Responsive shell adapting to screen size
- ✗ Single page component layouts (use stack/grid)
- ✗ Card-level layouts (use grid)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-app-shell` | Root shell container | n/a |
| `comp-app-shell-header` | Top header section | n/a |
| `comp-app-shell-sidebar` | Left sidebar navigation | n/a |
| `comp-app-shell-main` | Main content area | n/a |
| `comp-app-shell-footer` | Bottom footer section | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Full layout shown |
| Sidebar collapsed | Mobile/toggle | Sidebar hidden, main expands |

## Basic usage

```html
<!-- Full app shell -->
<div class="comp-app-shell" style="display: grid; grid-template-columns: 250px 1fr; grid-template-rows: auto 1fr auto; min-height: 100vh; grid-template-areas: 'header header' 'sidebar main' 'footer footer';">
  
  <!-- Header -->
  <header class="comp-app-shell-header" style="grid-area: header; padding: 1rem 2rem; background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between;">
    <h1 style="margin: 0; font-size: 1.25rem;">My App</h1>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <button class="comp-button-text">Help</button>
      <button class="comp-button-text">Profile</button>
    </div>
  </header>
  
  <!-- Sidebar -->
  <aside class="comp-app-shell-sidebar" style="grid-area: sidebar; padding: 1rem; background: var(--color-bg-subtle); border-right: 1px solid var(--color-border-subtle); overflow-y: auto;">
    <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="/" style="padding: 0.75rem; border-radius: 0.5rem; color: var(--color-accent); text-decoration: none; background: var(--color-bg-default); display: block;">Dashboard</a>
      <a href="/users" style="padding: 0.75rem; border-radius: 0.5rem; color: var(--color-fg-base); text-decoration: none; display: block;">Users</a>
      <a href="/settings" style="padding: 0.75rem; border-radius: 0.5rem; color: var(--color-fg-base); text-decoration: none; display: block;">Settings</a>
    </nav>
  </aside>
  
  <!-- Main content -->
  <main class="comp-app-shell-main" style="grid-area: main; padding: 2rem; overflow-y: auto; background: var(--color-bg-default);">
    <h2>Welcome back!</h2>
    <p>Your main content goes here.</p>
  </main>
  
  <!-- Footer -->
  <footer class="comp-app-shell-footer" style="grid-area: footer; padding: 1rem 2rem; background: var(--color-bg-surface); border-top: 1px solid var(--color-border-subtle); text-align: center; color: var(--color-fg-muted); font-size: 0.875rem;">
    © 2026 My App. All rights reserved.
  </footer>
</div>
```

## Responsive (mobile sidebar hidden)

```html
<div class="comp-app-shell" style="display: grid; grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; min-height: 100vh; grid-template-areas: 'header' 'main' 'footer';">
  <header class="comp-app-shell-header"><!-- header --></header>
  <main class="comp-app-shell-main"><!-- main --></main>
  <footer class="comp-app-shell-footer"><!-- footer --></footer>
</div>

<!-- Sidebar toggle button in header for mobile -->
<button class="comp-icon-button" aria-label="Toggle sidebar" onclick="toggleSidebar()" style="display: none; /* show on mobile */"></button>
```

## Without footer

```html
<div class="comp-app-shell" style="display: grid; grid-template-columns: 250px 1fr; grid-template-rows: auto 1fr; min-height: 100vh; grid-template-areas: 'header header' 'sidebar main';">
  <!-- header, sidebar, main only -->
</div>
```

## Without sidebar

```html
<div class="comp-app-shell" style="display: grid; grid-template-columns: 1fr; grid-template-rows: auto 1fr auto; min-height: 100vh; grid-template-areas: 'header' 'main' 'footer';">
  <!-- header, main, footer only -->
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<header>`, `<aside>`, `<main>`, `<footer>` appropriately
- [x] **Skip navigation:** Skip link to main content (hidden, visible on focus)
- [x] **Landmark:** Proper landmark roles for screen readers
- [x] **Keyboard:** Tab navigates all interactive elements
- [x] **Focus trap:** None (sidebar can be closed)

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Navigate header, sidebar, main, footer |
| `Escape` (on mobile) | Close sidebar |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<header>` | Top banner | Role `banner` implicit |
| `<aside>` | Sidebar navigation | Role `complementary` or `navigation` |
| `<main>` | Main content | Role `main` implicit |
| `<footer>` | Footer section | Role `contentinfo` implicit |
| Skip link | Jump to main | Hidden, focusable |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Header/footer bg | Surface color |
| `--color-bg-subtle` | Sidebar bg | Subtle background |
| `--color-border-subtle` | Borders | Divider color |
| `--space-*` | Padding | Scales with density |

## Responsive breakpoints

- **Desktop:** Header, full-width sidebar, main, footer
- **Tablet:** Header, narrower sidebar, main, footer
- **Mobile:** Header (sidebar toggle), main, footer (sidebar hidden)

## Variants

- **With sidebar:** Full layout with navigation
- **Without sidebar:** Header + main + footer only
- **With footer:** Include bottom footer
- **Sticky header:** Header stays on scroll
- **Collapsible sidebar:** Toggle sidebar on mobile

## AI / machine-readable notes

- **Selector pattern:** `comp-app-shell` grid wrapper with `comp-app-shell-header`, `comp-app-shell-sidebar`, `comp-app-shell-main`, `comp-app-shell-footer` areas
- **Grid layout:** Use CSS Grid with named template areas (header, sidebar, main, footer)
- **Responsive:** Adjust grid columns on mobile (hide sidebar or reduce width)
- **Skip link:** Include hidden skip link to main content
- **Copy-paste use:** Update header title, sidebar navigation, main content, footer text

## Related patterns

- **Stack:** Vertical layout primitive
- **Cluster:** Horizontal layout primitive
- **Grid:** 2D grid layouts
- **Page-header:** Page-level header with title + actions
