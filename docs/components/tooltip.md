# Tooltip

> Support level: **Supported** | Surface key: `component.tooltip` | Canonical: `.tooltip`

## When to use

Small floating label that appears on hover/focus. Provides brief context or clarification for UI element.

- ✓ Brief clarification of icon button purpose
- ✓ Additional information on hover
- ✓ Keyboard shortcut hints
- ✓ Disabled state explanation
- ✗ Long text or content (use popover instead)
- ✗ Interactive content (use popover or modal)
- ✗ Critical information (make permanent, don't hide in tooltip)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `tooltip` | Tooltip container | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Hidden | Default | Tooltip invisible |
| Visible | Hover or focus | Tooltip appears with fade-in |
| Arrow | Optional | Points to trigger element |

## Basic usage

```html
<!-- Icon button with tooltip -->
<div style="position: relative; display: inline-block;">
  <button type="button" class="icon-button" aria-label="Delete item">
    🗑️
  </button>
  <div class="tooltip" role="tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: var(--color-bg-default); padding: 0.5rem 0.75rem; border-radius: 0.25rem; font-size: 0.75rem; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s;">
    Delete
  </div>
</div>

<!-- Standalone tooltip -->
<button type="button" aria-describedby="saved-tooltip">Save</button>
<div 
  id="saved-tooltip" 
  class="tooltip" 
  role="tooltip"
  style="display: none;"
>
  Document saved (Ctrl+S)
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="tooltip"` and `aria-describedby`
- [x] **Keyboard accessible:** Appears on focus (not just hover)
- [x] **Not critical:** Tooltip supplements, doesn't contain required info
- [x] **Screen reader:** aria-describedby links tooltip to trigger
- [x] **No interaction:** Tooltip is read-only, not interactive

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role` | Always | `"tooltip"` |
| `aria-describedby` | On trigger button | ID of tooltip element |

## Tooltip positioning

- **Top** (above element)
- **Bottom** (below element)
- **Left** (left of element)
- **Right** (right of element)

## AI / machine-readable notes

- **Selector pattern:** `tooltip` container
- **Trigger:** Use `aria-describedby` on button to link tooltip
- **Visibility:** Show on `:hover` and `:focus-visible` of trigger
- **Content:** Keep text brief (2–4 words)
- **Copy-paste use:** Update trigger button label and tooltip text

## Related patterns

- **Popover:** Larger, interactive floating panel
- **Helper-text:** Form field guidance (permanent, not hover)
