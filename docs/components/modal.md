# Modal

> Support level: **Supported** | Surface key: `component.modalBackdrop`, `component.modal`

## Classes

| Class | Role |
|-------|------|
| `modal-backdrop` | Full-screen overlay — place on the outermost wrapper |
| `modal` | Dialog container |
| `modal-header` | Header area |
| `modal-title` | Heading inside header |
| `modal-body` | Scrollable content area |
| `modal-footer` | Action buttons area |

## States

| State | How |
|-------|-----|
| Open | `data-open="true"` on `modal-backdrop` |
| Closed | `data-open="false"` or attribute removed |

## Basic usage

```html
<div class="modal-backdrop" data-open="false"
     role="dialog" aria-modal="true" aria-labelledby="m-title">
  <div class="modal">
    <header class="modal-header">
      <h2 id="m-title" class="modal-title">Confirm</h2>
      <button type="button" class="icon-button" aria-label="Close" id="close-btn">✕</button>
    </header>
    <div class="modal-body">
      <p>Are you sure you want to delete this item?</p>
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
  backdrop.setAttribute('data-open', 'false')
  trap.deactivate()
}
```

## Accessibility

- `role="dialog"` + `aria-modal="true"` on `modal-backdrop`
- `aria-labelledby` pointing to `modal-title`
- Focus trap required — use `createFocusTrap` from `fikir-css/helpers`
- `Escape` key closes via `bindOverlayKeyboard`
- Clicking outside closes via `bindOverlayKeyboard`
- Return focus to trigger on close (handled by `trap.deactivate()`)
