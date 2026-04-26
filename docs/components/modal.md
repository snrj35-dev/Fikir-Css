# Modal

> Support level: **Supported** | Surface key: `component.modalBackdrop`, `component.modal` | Canonical: `.modal-backdrop`

## When to use

Blocking dialog that interrupts the user to confirm an action or collect focused input.

- ✓ Confirmation dialogs (delete, publish, overwrite)
- ✓ Focused multi-step forms that shouldn't lose context
- ✓ Detail panels triggered from a list or table row
- ✗ Non-blocking side panels — use `drawer`
- ✗ Quick contextual info — use `popover` or `hover-card`
- ✗ Simple one-line confirms — use a native `confirm()` or inline alert

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `modal-backdrop` | Full-screen overlay — outermost wrapper | `data-open="true"` to show |
| `modal` | Dialog container — centered card | n/a |
| `modal-header` | Header area — title + close button row | n/a |
| `modal-body` | Scrollable content area | n/a |
| `modal-footer` | Action buttons area | n/a |

> **Heading:** use a semantic heading element (`<h2>`) inside `modal-header` with an `id` referenced by `aria-labelledby`.

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Closed | _(default)_ | `data-open` absent or `data-open="true"` removed |
| Open | `data-open="true"` on `modal-backdrop` | Dialog visible, focus trapped |

## Basic usage

```html
<div class="modal-backdrop" role="dialog" aria-modal="true"
     aria-labelledby="confirm-title">
  <div class="modal">
    <header class="modal-header">
      <h2 id="confirm-title">Confirm deletion</h2>
      <button type="button" class="comp-icon-button" aria-label="Close dialog">✕</button>
    </header>
    <div class="modal-body">
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    </div>
    <footer class="modal-footer">
      <button type="button" class="btn btn-danger btn-sm">Delete</button>
      <button type="button" class="btn btn-outline btn-neutral btn-sm">Cancel</button>
    </footer>
  </div>
</div>
```

## JS wiring

```js
import { createFocusTrap, bindOverlayKeyboard } from 'fikir-css/helpers'

const backdrop = document.querySelector('.modal-backdrop')
const trap = createFocusTrap(backdrop.querySelector('.modal'))
const { destroy } = bindOverlayKeyboard(backdrop, { onClose: close })

function open(trigger) {
  backdrop.setAttribute('data-open', 'true')
  trap.activate(trigger)
}
function close() {
  backdrop.removeAttribute('data-open')
  trap.deactivate()
}
```

## Accessibility checklist

- [x] **role="dialog":** on `modal-backdrop` element
- [x] **aria-modal="true":** prevents screen readers from announcing background content
- [x] **aria-labelledby:** references the heading `id` inside `modal-header`
- [x] **Focus trap:** use `createFocusTrap` from `fikir-css/helpers` — focus must not escape the modal
- [x] **Escape key:** closes the modal via `bindOverlayKeyboard`
- [x] **Click outside:** closes the modal (handled by `bindOverlayKeyboard`)
- [x] **Focus return:** on close, focus returns to the element that triggered the modal (`trap.deactivate()`)
- [x] **Touch targets:** close button is at least 40px × 40px

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Cycle through focusable elements inside modal (trapped) |
| Shift + Tab | Reverse cycle |
| Escape | Close modal and return focus to trigger |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="dialog"` | Modal is visible | On `modal-backdrop` |
| `aria-modal` | Dialog is modal (blocks background) | `"true"` |
| `aria-labelledby` | Dialog has a visible heading | ID of the heading element in `modal-header` |
| `aria-describedby` | Dialog has a description | ID of body description element (optional) |

## Density modes

Modal padding and font size scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Reduced padding in header, body, footer |
| `default` | Standard padding |
| `comfortable` | Increased padding |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — modal card border-radius scales automatically
- **Motion:** Enter/exit animation respects `prefers-reduced-motion` — no animation in reduced-motion mode

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-overlay` | Backdrop scrim color | Semi-transparent dark |
| `--color-bg-surface` | Modal card background | |
| `--space-4`, `--space-6` | Padding in body and footer | Scales with density |
| `--radius-lg` | Modal card border radius | Scales with shape |
| `--transition-duration-normal` | Enter/exit animation | 0ms if reduced-motion |

## Anti-patterns

```html
<!-- ✗ Don't show modal without data-open attribute management -->
<div class="modal-backdrop" style="display:block">...</div>

<!-- ✓ Use data-open="true" -->
<div class="modal-backdrop" data-open="true">...</div>

<!-- ✗ Don't omit focus trap — focus will leak to background -->
<!-- ✓ Always use createFocusTrap from fikir-css/helpers -->
```

## AI / machine-readable notes

- **Open state:** `data-open="true"` on `modal-backdrop` shows the modal; remove the attribute to hide (do not use `data-open="false"`)
- **Focus management:** requires JS — use `createFocusTrap` + `bindOverlayKeyboard` from `fikir-css/helpers`
- **Selector anatomy:** `modal-backdrop > modal > (modal-header + modal-body + modal-footer)`
- **Heading inside modal-header:** use semantic `<h2>` or `<h3>` with `id`; no dedicated class needed
- **Copy-paste use:** substitute dialog title, body content, and footer button actions

## Related

- **`drawer`** — non-blocking side panel alternative
- **`popover`** — anchored, non-modal floating panel
- **`toast`** — transient, non-blocking notification
- **`alert`** — inline, non-blocking message
- **`createFocusTrap` / `bindOverlayKeyboard`** — overlay JS helpers from `fikir-css/helpers`
