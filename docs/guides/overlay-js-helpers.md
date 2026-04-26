# Overlay JS Helpers

> Updated: M18 — v1.0.0

`fikir-css/helpers` provides three vanilla-JS utilities for accessible overlay behavior. Zero dependencies, fully tree-shakeable.

```js
import {
  createFocusTrap,
  bindOverlayKeyboard,
  bindSidebarDrawer,
  createRovingTabindex,
} from "fikir-css/helpers";
```

### CDN (no bundler)

The helpers module is a vanilla ESM file and loads directly from unpkg/jsdelivr:

```html
<script type="module">
  import {
    createFocusTrap,
    bindOverlayKeyboard,
    bindSidebarDrawer,
  } from "https://unpkg.com/fikir-css@latest/dist/helpers/index.mjs";
</script>
```

For a reproducible build pin the version: `fikir-css@1.1.0/dist/helpers/index.mjs`.

---

## `createFocusTrap(container)`

Traps keyboard focus inside an element. On `activate()` it moves focus to the first focusable child. On `deactivate()` it returns focus to the trigger element.

```js
const trap = createFocusTrap(document.getElementById("my-modal"));

// When opening the modal:
openBtn.addEventListener("click", () => {
  modal.setAttribute("data-open", "true");
  trap.activate(openBtn); // pass the trigger so focus returns on close
});

// When closing:
function closeModal() {
  modal.removeAttribute("data-open"); // use removeAttribute — CSS checks [data-open="true"]
  trap.deactivate();
}
```

### API

| Method | Description |
|--------|-------------|
| `activate(triggerEl?)` | Start trapping. Focuses first focusable child. `triggerEl` is where focus returns on `deactivate()`. |
| `deactivate()` | Stop trapping. Return focus to `triggerEl`. |

---

## `bindOverlayKeyboard(overlayEl, options)`

Binds Escape-key dismiss and optional backdrop-click dismiss to an overlay element.

```js
const { destroy } = bindOverlayKeyboard(
  document.getElementById("my-modal"),
  {
    onClose: closeModal,
    closeOnBackdrop: true, // default — click outside dialog closes it
  }
);

// Clean up when the overlay is permanently removed from the DOM:
destroy();
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onClose` | `() => void` | required | Called when Escape is pressed or backdrop is clicked. |
| `closeOnBackdrop` | `boolean` | `true` | Whether clicking the wrapper (not the dialog) triggers `onClose`. |

---

## `bindSidebarDrawer({ trigger, drawer, breakpoint? })`

High-level convenience wrapper that composes `createFocusTrap` + `bindOverlayKeyboard` with viewport awareness for a responsive sidebar/drawer pair. On viewports at or above `breakpoint` (default `60rem`) the helper becomes a no-op because the inline sidebar is expected to be visible; below it, the drawer becomes a focus-trapped overlay with Escape + backdrop-click close.

```js
import { bindSidebarDrawer } from "fikir-css/helpers";

bindSidebarDrawer({
  trigger: document.querySelector('[data-action="open-drawer"]'),
  drawer:  document.getElementById("mobile-nav"),
  breakpoint: "60rem",
});
```

The `trigger` element has its `aria-expanded` kept in sync automatically. The helper listens on the matching `matchMedia` query and auto-closes the drawer if the user crosses into desktop while it's open.

Full recipe: `docs/patterns/sidebar-drawer-responsive.md`.

---

## `createRovingTabindex(container, options?)`

Implements roving tabindex arrow-key navigation inside a container. Sets `tabindex="-1"` on all items except the focused one (`tabindex="0"`).

```js
// Tabs
const nav = createRovingTabindex(document.querySelector(".tabs-list"), {
  itemSelector: '[role="tab"]',
  orientation: "horizontal",
});

// Vertical menu
const menu = createRovingTabindex(document.querySelector(".dropdown-menu"), {
  itemSelector: '[role="menuitem"]',
  orientation: "vertical",
});

// Remove when component unmounts:
nav.destroy();
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `itemSelector` | `string` | ARIA roles + `button`,`a[href]` | CSS selector for navigable items. |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'both'` | Which arrow keys navigate. |
| `wrap` | `boolean` | `true` | Whether focus wraps from last item to first. |

### Key bindings

| Key | Action |
|-----|--------|
| `ArrowDown` / `ArrowRight` | Next item |
| `ArrowUp` / `ArrowLeft` | Previous item |
| `Home` | First item |
| `End` | Last item |

---

## Full example — Modal with focus trap + keyboard dismiss

```html
<button id="open-modal" class="btn btn-primary">Open</button>

<div id="modal" class="modal" data-open="false" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-dialog">
    <header class="modal-header">
      <h2 id="modal-title">Confirm</h2>
      <button id="close-modal" class="icon-button" aria-label="Close">✕</button>
    </header>
    <div class="modal-body">
      <p>Are you sure you want to continue?</p>
    </div>
    <footer class="modal-footer">
      <button id="cancel" class="btn btn-outline btn-neutral">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </footer>
  </div>
</div>
```

```js
import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

const modalEl  = document.getElementById("modal");
const openBtn  = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel");

const trap = createFocusTrap(modalEl);
const { destroy } = bindOverlayKeyboard(modalEl, { onClose: closeModal });

function openModal() {
  modalEl.setAttribute("data-open", "true");
  trap.activate(openBtn);
}

function closeModal() {
  modalEl.removeAttribute("data-open"); // use removeAttribute — CSS checks [data-open="true"]
  trap.deactivate();
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
```

---

## Headless boundary

Fikir CSS handles **visual state only** via CSS classes and `data-*` attributes.
The helpers handle **behavioral state**: focus management, keyboard interaction, and ARIA.

| Concern | Handled by |
|---------|-----------|
| Show / hide overlay | CSS `data-open` attribute |
| Backdrop blur / animation | CSS |
| Focus trap | `createFocusTrap` |
| Escape + backdrop dismiss | `bindOverlayKeyboard` |
| Arrow-key navigation | `createRovingTabindex` |
| `aria-expanded`, `aria-selected` | Your code (framework or vanilla) |

## Used by these components

| Component | Helper | Doc |
|-----------|--------|-----|
| Modal | `createFocusTrap` + `bindOverlayKeyboard` | `docs/architecture/overlay-accessibility-expectations.md` |
| Drawer | `createFocusTrap` + `bindOverlayKeyboard` | `docs/architecture/overlay-layering-z-index-notes.md` |
| Dropdown | `bindOverlayKeyboard` | — |
| Command palette | `createFocusTrap` + `bindOverlayKeyboard` | — |
| Tabs, menu-bar | `createRovingTabindex` | `docs/architecture/navigation-accessibility-notes.md` |
| Tree view | `createRovingTabindex` | — |

## Framework usage

| Framework | Pattern | Guide |
|-----------|---------|-------|
| React | `useEffect` + `useRef` wrapping trap/kbd | `docs/guides/react-adapter.md` |
| Vue 3 | `watch(open, ...)` + `onMounted` | `docs/guides/vue-adapter.md` |
| Svelte | `$: { if (open) ... }` or `afterUpdate` | `docs/guides/svelte-adapter.md` |

See also: `docs/architecture/headless-contract-spec.md`
