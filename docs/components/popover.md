# Popover

> Support level: **Supported** | Surface key: `component.popover` | Canonical: `.popover`

## When to use

Floating panel with interactive content. Appears on click/focus. Larger and more flexible than tooltip.

- ✓ Rich content (text, buttons, form fields)
- ✓ User actions (settings, previews)
- ✓ Anchored to trigger element
- ✓ Click-to-open (non-modal)
- ✗ Critical information (use modal)
- ✗ Full-page overlays (use modal)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `popover` | Popover container | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Hidden | Default | Popover invisible |
| Visible | Click trigger | Popover appears |
| Focused | Click inside | Focus remains on content |

## Basic usage

```html
<!-- Popover with button trigger -->
<div style="display: inline-block; position: relative;">
  <button type="button" class="btn" id="popover-trigger">More options</button>
  <div 
    class="popover" 
    role="dialog" 
    aria-labelledby="popover-trigger"
    style="position: absolute; top: 100%; left: 0; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; padding: 1rem; min-width: 200px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: none; z-index: 100;"
  >
    <button type="button" class="btn btn-ghost" style="display: block; width: 100%; text-align: left;">Edit</button>
    <button type="button" class="btn btn-ghost" style="display: block; width: 100%; text-align: left;">Duplicate</button>
    <button type="button" class="btn btn-ghost" style="display: block; width: 100%; text-align: left;">Delete</button>
  </div>
</div>

<!-- Click trigger script (basic) -->
<script>
  document.getElementById('popover-trigger').addEventListener('click', () => {
    const popover = document.querySelector('[role="dialog"]');
    popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
  });
</script>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="dialog"` (non-modal popover)
- [x] **Labeled:** aria-labelledby points to trigger
- [x] **Closable:** Click outside or Escape closes
- [x] **Focus:** Focus moves into popover on open
- [x] **Keyboard:** Escape closes popover

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role` | Always | `"dialog"` (non-modal) or `"menuitem"` (if menu) |
| `aria-labelledby` | Always | ID of trigger button |

## Popover positioning

- **Bottom** (most common, below trigger)
- **Top** (above trigger)
- **Left** (to the left)
- **Right** (to the right)

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Popover background | Auto-adapts to dark/high-contrast |
| `--color-border-subtle` | Popover border | |
| `--color-fg-default` | Content text color | |
| `--space-3`, `--space-4` | Internal padding | Scales with density |
| `--radius-md` | Border radius | Scales with shape |
| `--shadow-md` (or `--elevation-2`) | Floating elevation | Drop shadow |

## AI / machine-readable notes

- **Selector pattern:** `popover` container (canonical class — see `dist/contracts/selectors.json`)
- **Positioning:** Anchored via CSS `position: absolute; top/left`; recommend `Floating UI` or anchor positioning
- **Visibility:** Show on click; hide on Escape or click-outside
- **Content:** Can include any HTML (buttons, forms, etc.)
- **Copy-paste use:** Update trigger ID and button actions

## Related

- **`tooltip`** — non-interactive hint (hover-only)
- **`dropdown-menu`** — menu alternative with keyboard navigation
- **`hover-card`** — hover-triggered preview card
- **`modal`** — blocking center dialog for critical content
