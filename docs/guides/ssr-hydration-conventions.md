# SSR and Hydration-Safe Usage Conventions

> Created: 2026-04-12
> Scope: M3 — SSR safety rules for Next.js, Nuxt, SvelteKit, Astro

## Core Guarantee

Fikir CSS is a static CSS file with no JavaScript runtime dependency. SSR hydration issues do not apply to the CSS itself — only to the JavaScript that manages `data-*` state attributes.

## Rules for SSR-safe Usage

### 1. Render initial state as HTML attributes

```tsx
// ❌ Wrong: setting open state only on the client after hydration
useEffect(() => modal.dataset.open = "true", []);

// ✅ Correct: server renders the correct initial state
<div class="modal" data-open={isOpen ? "true" : "false"}>
```

### 2. Use `hidden` for panels that must be invisible on first paint

For content that should be hidden from screen readers AND visually, use the HTML `hidden` attribute alongside `data-open`:

```html
<div class="tabs-panel" role="tabpanel" hidden data-open="false">
```

This prevents flash-of-visible-content on SSR hydration.

### 3. Color scheme without JavaScript

Fikir CSS dark mode is driven by `prefers-color-scheme` — no JavaScript needed. For user-controlled switching, set the `data-theme` attribute server-side based on a cookie:

```html
<!-- Set by server based on user preference cookie -->
<html data-theme="dark">
```

### 4. Avoid `document.querySelector` in SSR

State management via direct DOM manipulation (`document.querySelector`) must be wrapped in a `useEffect` / `onMount` / `after hydration` guard.

### 5. CSS custom properties across SSR boundary

CSS custom properties (`var(--space-4)`) are fully SSR-compatible. They are resolved at paint time in the browser, not at server render time.

## Framework-specific Notes

### Next.js (App Router)

```tsx
// app/layout.tsx
import "fikir-css";
```

For manual theme switching, read a cookie in the server component and pass `data-theme` to `<html>`:

```tsx
export default function RootLayout({ children }) {
  const theme = cookies().get("fikir-theme")?.value ?? "auto";
  return <html data-theme={theme}>{children}</html>;
}
```

### Nuxt 3

```ts
// nuxt.config.ts
css: ["fikir-css"],
```

### SvelteKit

Import in `+layout.svelte` — see `docs/guides/svelte-adapter.md`.

### Astro

```astro
---
import "fikir-css";
---
```

Astro renders Fikir CSS component classes server-side without any additional configuration.
