# Fikir CSS × Svelte Example

A working Svelte 4 + Vite example demonstrating Fikir CSS integration.

## What's included
- Theme toggle (`data-theme`) via a `writable` store
- Typed resolvers (`resolveBtn`, `resolveAlert`, `resolveCard`, `resolveBadge`) in templates
- Modal driven by `data-open` with `createFocusTrap` + `bindOverlayKeyboard` from `fikir-css/helpers`
- `bind:this` for direct DOM refs, `onMount`/`onDestroy` lifecycle hooks

## Setup

```bash
npm install
npm run dev
```

## Key patterns

### Theme toggle with writable store
```js
const theme = writable("light");
function toggleTheme() {
  theme.update((t) => {
    const next = t === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    return next;
  });
}
```

### Resolver in template
```svelte
<button class={resolveBtn({ variant: "outline", tone: "neutral" })} on:click={toggleTheme}>
  {$theme === "light" ? "🌙 Dark" : "☀️ Light"}
</button>
```

### Modal with focus trap + keyboard binding
```svelte
<!-- Always in DOM — CSS hides it when data-open="false" -->
<div bind:this={modalEl} class="modal" data-open={String(modalOpen)} role="dialog">…</div>
```
```js
onMount(() => { trap = createFocusTrap(modalEl); });
function openModal() {
  modalOpen = true;
  trap.activate();
  kbd = bindOverlayKeyboard(modalEl, { onClose: closeModal });
}
```
