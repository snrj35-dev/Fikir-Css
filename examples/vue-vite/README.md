# Fikir CSS × Vue 3 Example

A working Vue 3 + Vite example demonstrating Fikir CSS integration.

## What's included
- Theme toggle (`data-theme`) via a reactive ref
- Typed resolvers (`resolveBtn`, `resolveAlert`, `resolveCard`, `resolveBadge`) in templates
- Modal driven by `data-open` with `createFocusTrap` + `bindOverlayKeyboard` from `fikir-css/helpers`
- `<script setup>` single-file component

## Setup

```bash
npm install
npm run dev
```

## Key patterns

### Theme toggle
```js
const theme = ref("light");
function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
}
```

### Resolver in template
```vue
<button :class="resolveBtn({ variant: 'outline', tone: 'neutral' })" @click="toggleTheme">
  Toggle
</button>
```

### Modal with focus trap
```vue
<!-- Always in DOM — CSS hides it when data-open="false" -->
<div ref="modalEl" class="modal" :data-open="String(modalOpen)" role="dialog">…</div>
```
```js
onMounted(() => { trap = createFocusTrap(modalEl.value); });
watch(modalOpen, (open) => {
  open ? trap.activate() : trap.deactivate();
});
```
