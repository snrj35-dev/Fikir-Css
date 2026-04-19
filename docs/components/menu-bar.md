# Menu Bar

> Support level: **Supported** | Surface key: `component.menuBar` | Canonical: `.comp-menu-bar`

## When to use

Horizontal menu bar with keyboard navigation and arrow key support. Application-style menu (File, Edit, View) or top navigation.

- ✓ Application menu (File, Edit, Help)
- ✓ Top navigation bar with dropdowns
- ✓ Horizontal menu with submenus
- ✓ Keyboard-accessible navigation
- ✗ Simple horizontal links (use navbar instead)
- ✗ Mobile primary nav (use drawer/hamburger menu)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-menu-bar` | Menu bar container | n/a |
| `comp-menu-bar-item` | Top-level menu item | n/a |
| `comp-menu-bar-submenu` | Dropdown submenu | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Closed | Default | Submenu hidden |
| Open | Click or hover | Submenu visible |
| Focused | Keyboard | Item highlighted |

## Basic usage

```html
<!-- Application menu bar -->
<nav class="comp-menu-bar" role="menubar" style="display: flex; border-bottom: 1px solid var(--color-border-subtle); background: var(--color-bg-surface);">
  <button type="button" class="comp-menu-bar-item" role="menuitem" aria-haspopup="true" aria-expanded="false">
    File
  </button>
  <button type="button" class="comp-menu-bar-item" role="menuitem" aria-haspopup="true" aria-expanded="false">
    Edit
  </button>
  <button type="button" class="comp-menu-bar-item" role="menuitem" aria-haspopup="true" aria-expanded="false">
    View
  </button>
  <button type="button" class="comp-menu-bar-item" role="menuitem" aria-haspopup="true" aria-expanded="false">
    Help
  </button>
</nav>

<!-- Menu item with submenu -->
<div style="position: relative;">
  <button type="button" class="comp-menu-bar-item" role="menuitem" aria-haspopup="true" aria-expanded="false" id="file-menu">
    File
  </button>
  <ul 
    class="comp-menu-bar-submenu" 
    role="menu" 
    aria-labelledby="file-menu"
    style="position: absolute; top: 100%; left: 0; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); display: none; min-width: 150px;"
  >
    <li role="none">
      <button type="button" role="menuitem">New</button>
    </li>
    <li role="none">
      <button type="button" role="menuitem">Open</button>
    </li>
    <li role="none">
      <button type="button" role="menuitem">Save</button>
    </li>
    <li role="separator" style="height: 1px; background: var(--color-border-subtle); margin: 0.25rem 0;"></li>
    <li role="none">
      <button type="button" role="menuitem">Exit</button>
    </li>
  </ul>
</div>
```

## Keyboard navigation

```html
<!-- Full application with menu bar -->
<div class="surface">
  <nav class="comp-menu-bar" role="menubar">
    <!-- Menu items: navigate with arrow keys -->
  </nav>
  <main>
    <!-- Application content -->
  </main>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="menubar"`, `role="menu"`, `role="menuitem"`
- [x] **Keyboard:** Arrow keys navigate, Enter opens submenu
- [x] **Focus:** Focus moves with arrow keys; submenu opens on Enter/Down
- [x] **Escape:** Escape closes submenu, returns focus to menu item
- [x] **Screen reader:** Menu structure announced

## Keyboard behavior

| Key | Action |
|-----|--------|
| Arrow Right | Next menu item |
| Arrow Left | Previous menu item |
| Arrow Down | Open submenu (if available) |
| Arrow Up | Close submenu |
| Enter or Space | Activate menu item |
| Escape | Close submenu, keep focus |
| Home | First menu item |
| End | Last menu item |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="menubar"` | Menu bar | Top-level navigation |
| `role="menu"` | Submenu | Dropdown menu |
| `role="menuitem"` | Menu item button | Each menu item |
| `aria-haspopup` | Item with submenu | `"true"` or `"menu"` |
| `aria-expanded` | Item with submenu | `"true"` or `"false"` |
| `aria-labelledby` | Submenu | ID of menu item button |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Menu background | Surface color |
| `--color-border-subtle` | Divider lines | Subtle border |
| `--space-*` | Padding | Menu spacing |

## AI / machine-readable notes

- **Selector pattern:** `comp-menu-bar` with `comp-menu-bar-item` buttons and `comp-menu-bar-submenu` dropdowns
- **Keyboard:** Implement arrow key navigation and Enter to activate
- **Focus:** Highlight current menu item
- **Submenus:** Show/hide on Enter and arrow keys
- **Copy-paste use:** Update menu item labels and submenu content

## Related patterns

- **Navbar:** Simple horizontal navigation (less keyboard-heavy)
- **Dropdown-menu:** Similar to submenu but triggered differently
