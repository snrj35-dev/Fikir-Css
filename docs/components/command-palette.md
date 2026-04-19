# Command Palette

> Support level: **Supported** | Surface key: `component.commandPalette` | Canonical: `.comp-command-palette`

## When to use

Keyboard-searchable command/action menu. Triggered by keyboard shortcut (Cmd+K or Ctrl+K). Users can search and execute actions quickly.

- ✓ Quick access to commands and pages
- ✓ Application shortcuts discovery
- ✓ Search + action combined
- ✓ Power users and keyboard-first apps
- ✗ Primary navigation (use navbar or sidebar nav)
- ✗ Simple command list (use menu instead)
- ✗ Mobile apps (Cmd+K not expected on touch)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-command-palette` | Palette container (modal) | n/a |
| `comp-command-palette-input` | Search input | n/a |
| `comp-command-palette-results` | Results list | n/a |
| `comp-command-palette-item` | Result item | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Hidden | Default | Palette invisible |
| Visible | Cmd+K pressed | Palette modal shown |
| Searching | User types | Results filter dynamically |
| Focused | Result highlighted | Keyboard arrow selection |

## Basic usage

```html
<!-- Command palette modal (hidden by default) -->
<div class="comp-command-palette" id="cmd-palette" role="dialog" aria-labelledby="cmd-title" aria-modal="true" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: flex-start; justify-content: center; padding-top: 10vh;">
  <div style="background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; width: 90%; max-width: 500px; max-height: 400px; display: flex; flex-direction: column;">
    
    <!-- Search input -->
    <input 
      type="search" 
      id="cmd-input"
      class="comp-command-palette-input"
      placeholder="Type a command... (Cmd+K)"
      style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); font-size: 1rem; border: none; outline: none;"
      autocomplete="off"
    >
    
    <!-- Results list -->
    <ul 
      class="comp-command-palette-results" 
      role="listbox"
      id="cmd-results"
      style="list-style: none; padding: 0; margin: 0; overflow-y: auto; flex: 1;"
    >
      <li 
        role="option" 
        class="comp-command-palette-item"
        style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer;"
      >
        <div style="font-weight: 500;">Create new document</div>
        <div style="font-size: 0.75rem; color: var(--color-fg-muted);">Cmd+N</div>
      </li>
      
      <li 
        role="option" 
        aria-selected="true"
        style="background: var(--color-bg-default); padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer;"
      >
        <div style="font-weight: 500;">Open settings</div>
        <div style="font-size: 0.75rem; color: var(--color-fg-muted);">Cmd+,</div>
      </li>
      
      <li 
        role="option" 
        class="comp-command-palette-item"
        style="padding: 0.75rem 1rem; cursor: pointer;"
      >
        <div style="font-weight: 500;">Go to dashboard</div>
        <div style="font-size: 0.75rem; color: var(--color-fg-muted);">Cmd+D</div>
      </li>
    </ul>
  </div>
</div>

<!-- Keyboard shortcut to open palette -->
<script>
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('cmd-palette').style.display = 'flex';
      document.getElementById('cmd-input').focus();
    }
  });
  
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('cmd-palette').style.display = 'none';
    }
  });
</script>
```

## With categories

```html
<!-- Results grouped by category -->
<ul class="comp-command-palette-results">
  <li style="padding: 0.5rem 1rem; font-size: 0.75rem; font-weight: bold; color: var(--color-fg-muted); text-transform: uppercase;">
    Pages
  </li>
  <li class="comp-command-palette-item">Go to dashboard</li>
  <li class="comp-command-palette-item">Go to settings</li>
  
  <li style="padding: 0.5rem 1rem; margin-top: 0.5rem; font-size: 0.75rem; font-weight: bold; color: var(--color-fg-muted); text-transform: uppercase;">
    Actions
  </li>
  <li class="comp-command-palette-item">Create new document</li>
  <li class="comp-command-palette-item">Save document</li>
</ul>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="dialog"` for modal, `role="listbox"` for results
- [x] **Keyboard:** Cmd+K opens, Escape closes, Arrow keys navigate
- [x] **Search:** Real-time filtering as user types
- [x] **Focus:** Focus inside palette when open
- [x] **Screen reader:** Results announced; current item indicated
- [x] **Hotkeys:** Keyboard shortcuts shown for each command

## Keyboard behavior

| Key | Action |
|-----|--------|
| Cmd+K (Mac) or Ctrl+K (Windows) | Open/close palette |
| Arrow Down | Next result |
| Arrow Up | Previous result |
| Enter | Execute command |
| Escape | Close palette |
| Type | Search/filter results |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="dialog"` | Palette modal | Always |
| `aria-modal` | Palette | `"true"` |
| `role="listbox"` | Results list | Always |
| `role="option"` | Result item | Always |
| `aria-selected` | Highlighted item | `"true"` or `"false"` |

## Command data structure

```javascript
const commands = [
  { id: 'new', label: 'Create new document', category: 'Document', hotkey: 'Cmd+N' },
  { id: 'open', label: 'Open file', category: 'Document', hotkey: 'Cmd+O' },
  { id: 'settings', label: 'Go to settings', category: 'Navigation', hotkey: 'Cmd+,' },
  { id: 'dashboard', label: 'Go to dashboard', category: 'Navigation', hotkey: 'Cmd+D' },
];

function filterCommands(query) {
  return commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );
}
```

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Palette background | Surface color |
| `--color-bg-default` | Highlighted item | Hover/focus background |
| `--color-border-subtle` | Divider lines | Subtle border |
| `--space-*` | Padding | Item spacing |

## AI / machine-readable notes

- **Selector pattern:** `comp-command-palette` modal with `comp-command-palette-input` search and `comp-command-palette-results` list
- **Keyboard:** Listen for Cmd+K (Mac) and Ctrl+K (Windows)
- **Search:** Real-time filter results as user types
- **Navigation:** Arrow keys highlight items; Enter executes
- **Keyboard shortcuts:** Show hotkey for each command in results
- **Copy-paste use:** Update commands list and keyboard shortcuts

## Popular command palette libraries

- **cmdk** (React)
- **vue-command-palette** (Vue)
- **fzf** (CLI-inspired)

## Related patterns

- **Search-box:** Text search (simpler, no command execution)
- **Dropdown-menu:** Menu alternative (triggered differently)
