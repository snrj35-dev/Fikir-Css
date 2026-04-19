# SSR and Hydration-Safe Usage Conventions

> Updated: M18 — v1.0.0, Next.js / Nuxt / SvelteKit / Astro

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

### 3. Color scheme and density without JavaScript

Fikir CSS dark mode is driven by `prefers-color-scheme` — no JavaScript needed. For user-controlled switching, render `data-theme` and `data-density` server-side from a cookie:

```html
<!-- Set by server based on user preference cookies -->
<html data-theme="dark" data-density="compact">
```

For compact density, the `fikir-css/themes/compact` stylesheet must also be imported:

```ts
import "fikir-css/css";
import "fikir-css/themes/compact"; // required for data-density="compact" to work
```

### 4. Avoid `document.querySelector` in SSR

State management via direct DOM manipulation (`document.querySelector`) must be wrapped in a `useEffect` / `onMount` / `after hydration` guard.

### 5. CSS custom properties across SSR boundary

CSS custom properties (`var(--space-4)`) are fully SSR-compatible. They are resolved at paint time in the browser, not at server render time.

## Framework-specific Notes

### Next.js (App Router)

```tsx
// app/layout.tsx
import "fikir-css/css";
import "fikir-css/themes/compact";
```

Read cookies server-side to set initial theme and density on `<html>`:

```tsx
import { cookies } from "next/headers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("fikir-theme")?.value ?? "light";
  const density = cookies().get("fikir-density")?.value ?? "comfortable";
  return (
    <html data-theme={theme} data-density={density === "compact" ? "compact" : undefined}>
      <body>{children}</body>
    </html>
  );
}
```

### Nuxt 3

```ts
// nuxt.config.ts
css: ["fikir-css/css", "fikir-css/themes/compact"],
```

For SSR-safe theme, set `data-theme` in `app.vue` using a cookie plugin:

```vue
<!-- app.vue -->
<html :data-theme="theme" :data-density="density || undefined">
```

### SvelteKit

Import in `+layout.svelte` — see `docs/guides/svelte-adapter.md`.

For SSR-safe density, read a cookie in the server load function:

```ts
// +layout.server.ts
export function load({ cookies }) {
  return {
    theme: cookies.get('fikir-theme') ?? 'light',
    density: cookies.get('fikir-density') ?? 'comfortable',
  };
}
```

```svelte
<!-- +layout.svelte -->
<svelte:head>
  <html data-theme={data.theme} data-density={data.density === 'compact' ? 'compact' : undefined} />
</svelte:head>
```

### Astro

```astro
---
import "fikir-css/css";
import "fikir-css/themes/compact";
const theme = Astro.cookies.get("fikir-theme")?.value ?? "light";
---
<html data-theme={theme}>
```

Astro renders Fikir CSS component classes server-side without any additional configuration.
