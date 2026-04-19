# Dropdown Menu

> Support level: **Supported** | Surface key: `component.dropdownMenu` | Canonical: `.comp-dropdown-menu`

## When to use

Menu list that drops down from button. Similar to popover but optimized for menu/action lists with keyboard navigation.

- ✓ Action menus (edit, delete, share)
- ✓ Select alternatives (choose one of many)
- ✓ Navigation submenus
- ✓ Keyboard navigation (arrow keys)
- ✗ Form fields (use `select` instead)
- ✗ Rich content (use `popover`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-dropdown-menu` | Menu container | n/a |
| `comp-dropdown-menu-item` | Menu item | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Closed | Default | Menu invisible |
| Open | Click button | Menu slides down |
| Focused item | Arrow keys | Highlighted menu item |

## Basic usage

```html
<!-- Dropdown menu -->
<div style="position: relative; display: inline-block;">
  <button type="button" class="comp-button" id="menu-trigger" aria-haspopup="true" aria-expanded="false">
    Actions ▼
  </button>
  
  <ul 
    class="comp-dropdown-menu" 
    role="menu" 
    aria-labelledby="menu-trigger"
    style="position: absolute; top: 100%; left: 0; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; min-width: 180px; padding: 0.5rem; display: none; list-style: none;"
  >
    <li role="none">
      <button type="button" class="comp-dropdown-menu-item" role="menuitem">
        Edit
      </button>
    </li>
    <li role="none">
      <button type="button" class="comp-dropdown-menu-item" role="menuitem">
        Duplicate
      </button>
    </li>
    <li role="separator" style="height: 1px; background: var(--color-border-subtle); margin: 0.5rem 0;"></li>
    <li role="none">
      <button type="button" class="comp-dropdown-menu-item" role="menuitem">
        Delete
      </button>
    </li>
  </ul>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="menu"` and `role="menuitem"`
- [x] **Keyboard:** Arrow Up/Down navigate items, Enter selects
- [x] **Labeled:** aria-labelledby points to trigger button
- [x] **Closable:** Escape closes menu, click-outside closes
- [x] **Focus management:** Focus highlights current menu item

## Keyboard behavior

| Key | Action |
|-----|--------|
| Arrow Down | Next menu item |
| Arrow Up | Previous menu item |
| Home | First menu item |
| End | Last menu item |
| Enter or Space | Select item |
| Escape | Close menu |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="menu"` | Menu container | Always |
| `role="menuitem"` | Menu item button | Always |
| `role="menuitemcheckbox"` | Toggleable item | If item is checkbox |
| `role="menuitemradio"` | Selectable item | If item is radio |
| `aria-haspopup` | On trigger button | `"true"` |
| `aria-expanded` | On trigger button | `"true"` or `"false"` |
| `aria-labelledby` | Menu | ID of trigger button |

## AI / machine-readable notes

- **Selector pattern:** `comp-dropdown-menu` with `comp-dropdown-menu-item` children
- **Keyboard:** Implement arrow key navigation and Enter to select
- **Focus:** Highlight current item; move focus with arrow keys
- **Click:** Close on item selection or click-outside
- **Copy-paste use:** Update menu item text and action handlers

## Related patterns

- **Popover:** Interactive floating panel (more flexible)
- **Select:** Form field (built-in browser menu)
- **Menu-bar:** Horizontal menu with keyboard navigation
