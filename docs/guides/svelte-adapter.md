# Svelte Adapter Guidance

> Updated: M18 — v1.0.0, Svelte 4 / SvelteKit

## Installation

```bash
npm install fikir-css
```

```ts
// src/app.ts or routes/+layout.ts
import "fikir-css/css";
import "fikir-css/themes/compact"; // opt-in: enables data-density="compact"
```

## Using Semantic Components

```svelte
<button type="button" class="btn btn-primary" on:click={handleSave}>
  Save
</button>
```

## Modal with Svelte State

```svelte
<script lang="ts">
  let open = $state(false);
</script>

<button type="button" class="btn btn-primary" on:click={() => open = true}>
  Open modal
</button>

<div
  class="modal"
  data-open={String(open)}
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div class="modal-dialog">
    <header class="modal-header">
      <h2 id="modal-title" class="modal-title">Title</h2>
      <button type="button" class="icon-button" aria-label="Close"
        on:click={() => open = false}>✕</button>
    </header>
    <div class="modal-body">Content</div>
  </div>
</div>
```

## Accordion with Svelte

```svelte
<script lang="ts">
  let expanded = $state(false);
</script>

<div class="accordion-item">
  <h3 class="accordion-header">
    <button
      type="button"
      class="accordion-trigger"
      aria-expanded={String(expanded)}
      aria-controls="panel-1"
      on:click={() => expanded = !expanded}
    >
      Section title
    </button>
  </h3>
  <div id="panel-1" class="accordion-panel" role="region" hidden={!expanded}>
    Content
  </div>
</div>
```

## Segmented Control

```svelte
<script lang="ts">
  let selected = $state("list");
  const options = [
    { label: "List", value: "list" },
    { label: "Grid", value: "grid" },
  ];
</script>

<div class="segmented-control" role="group" aria-label="View mode">
  {#each options as opt}
    <div class="segmented-control-item">
      <input
        type="radio"
        id="view-{opt.value}"
        name="view"
        value={opt.value}
        bind:group={selected}
        class="segmented-control-input"
      />
      <label for="view-{opt.value}" class="segmented-control-label">
        {opt.label}
      </label>
    </div>
  {/each}
</div>
```

## Theme & Density Store

```ts
// src/lib/theme.ts
import { writable } from 'svelte/store'

export const theme = writable<'light' | 'dark'>('light')
export const density = writable<'comfortable' | 'compact'>('comfortable')

export function toggleTheme() {
  theme.update((t) => {
    const next = t === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    return next
  })
}

export function toggleDensity() {
  density.update((d) => {
    const next = d === 'comfortable' ? 'compact' : 'comfortable'
    if (next === 'compact') {
      document.documentElement.setAttribute('data-density', 'compact')
    } else {
      document.documentElement.removeAttribute('data-density')
    }
    return next
  })
}
```

Usage in layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import 'fikir-css/css'
  import 'fikir-css/themes/compact'
  import { theme, density, toggleTheme, toggleDensity } from '$lib/theme'
</script>

<button class="btn btn-outline btn-neutral btn-sm" on:click={toggleTheme}>
  {$theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
</button>
<button class="btn btn-outline btn-neutral btn-sm" on:click={toggleDensity}>
  {$density === 'comfortable' ? '⬛ Compact' : '⬜ Comfortable'}
</button>

<slot />
```

## SvelteKit SSR

Fikir CSS is static CSS — SvelteKit SSR works out of the box. Import the stylesheet in your root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "fikir-css/css";
</script>
```
