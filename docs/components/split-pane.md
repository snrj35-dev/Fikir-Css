# Split Pane

> Support level: **Supported** | Surface key: `component.splitPane` | Canonical: `.comp-split-pane`

## When to use

Resizable divider between two panes. Adjustable pane widths.

- ✓ Code editor with sidebar (resizable)
- ✓ File browser + content (adjustable split)
- ✓ Master/detail layout
- ✗ Fixed two-column (use grid/switcher)
- ✗ Simple layouts (use stack)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-split-pane` | Container wrapper | n/a |
| `comp-split-pane-left` | Left pane | n/a |
| `comp-split-pane-divider` | Resizable divider | n/a |
| `comp-split-pane-right` | Right pane | n/a |
| `comp-split-pane-vertical` | Vertical split (top/bottom) | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Two panes with divider |
| Dragging | Mouse drag divider | Divider actively dragged |
| Resized | Size changed | Panes adjust width |

## Basic usage

```html
<!-- Horizontal split (left/right) -->
<div class="comp-split-pane" style="display: flex; height: 100vh;">
  <div class="comp-split-pane-left" style="flex: 0 0 250px; overflow-y: auto; border-right: 1px solid var(--color-border-subtle);">
    <nav style="padding: 1rem;">
      <!-- Left pane content (file tree, etc) -->
    </nav>
  </div>
  
  <div class="comp-split-pane-divider" style="flex: 0 0 1px; background: var(--color-border-subtle); cursor: col-resize;" draggable="true"></div>
  
  <div class="comp-split-pane-right" style="flex: 1; overflow: auto;">
    <!-- Right pane content (editor, etc) -->
  </div>
</div>

<!-- Vertical split (top/bottom) -->
<div class="comp-split-pane comp-split-pane-vertical" style="display: flex; flex-direction: column; height: 100vh;">
  <div class="comp-split-pane-left" style="flex: 0 0 300px; overflow-y: auto; border-bottom: 1px solid var(--color-border-subtle);">
    <div style="padding: 1rem;">
      <!-- Top pane content -->
    </div>
  </div>
  
  <div class="comp-split-pane-divider" style="flex: 0 0 1px; background: var(--color-border-subtle); cursor: row-resize;" draggable="true"></div>
  
  <div class="comp-split-pane-right" style="flex: 1; overflow: auto;">
    <!-- Bottom pane content -->
  </div>
</div>

<!-- Master/detail layout -->
<div class="comp-split-pane" style="display: flex; height: calc(100vh - 60px);">
  <!-- Master list -->
  <div class="comp-split-pane-left" style="flex: 0 0 300px; overflow-y: auto; border-right: 1px solid var(--color-border-subtle); background: var(--color-bg-subtle);">
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer; background: var(--color-bg-default);">Item 1</li>
      <li style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer;">Item 2</li>
    </ul>
  </div>
  
  <!-- Divider (draggable) -->
  <div class="comp-split-pane-divider" style="flex: 0 0 6px; background: transparent; cursor: col-resize; display: flex; align-items: center; justify-content: center;">
    <div style="width: 1px; height: 60%; background: var(--color-border-subtle);"></div>
  </div>
  
  <!-- Detail view -->
  <div class="comp-split-pane-right" style="flex: 1; overflow: auto; padding: 2rem;">
    <h2>Item Details</h2>
    <p>Detail content for selected item.</p>
  </div>
</div>
```

## JavaScript for resize

```javascript
function initSplitPane(paneSelector) {
  const pane = document.querySelector(paneSelector);
  const divider = pane.querySelector('.comp-split-pane-divider');
  const left = pane.querySelector('.comp-split-pane-left');
  
  divider.addEventListener('mousedown', (e) => {
    const startX = e.clientX;
    const startWidth = left.offsetWidth;
    
    document.addEventListener('mousemove', (e) => {
      const offset = e.clientX - startX;
      left.style.flex = `0 0 ${startWidth + offset}px`;
    });
    
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', null);
    });
  });
}

initSplitPane('.comp-split-pane');
```

## Accessibility checklist

- [x] **Keyboard:** Arrow keys adjust divider position
- [x] **Focus:** Visible focus on divider
- [x] **ARIA:** Divider has role="separator" + aria-label
- [x] **Screen reader:** Announcement when divider moves
- [x] **Touch:** Touch events for mobile (if needed)

## Keyboard behavior

| Key | Action |
|-----|--------|
| `←/→` (divider focused) | Move divider left/right |
| `↑/↓` (vertical) | Move divider up/down |
| `Home/End` | Move to edge |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `role="separator"` (divider) | Resizable divider | Semantic role |
| `aria-label` (divider) | Divider purpose | "Resize panes" |
| `aria-orientation` | Divider direction | "horizontal" or "vertical" |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Divider color | Border color |

## Variants

- **Horizontal:** Left/right panes (default)
- **Vertical:** Top/bottom panes
- **Master/detail:** Primary + secondary
- **Draggable:** Mouse drag divider
- **Keyboard:** Arrow key adjust

## Responsive

On mobile, may hide left pane or show in drawer instead of split.

## AI / machine-readable notes

- **Selector pattern:** `comp-split-pane` wrapper with `comp-split-pane-left`, `comp-split-pane-divider`, `comp-split-pane-right` children
- **Flex layout:** Use `flex: 0 0 <width>` for fixed left, `flex: 1` for flexible right
- **Draggable divider:** Use `draggable="true"` or mouse events
- **Keyboard:** Arrow keys adjust position (JavaScript required)
- **Responsive:** Hide left pane on mobile, show in drawer
- **Copy-paste use:** Update width, content, and JavaScript handlers

## Related patterns

- **Switcher:** Responsive panes without resize
- **Grid:** Fixed 2-column layouts
- **Stack:** Vertical layout
