# Svelte Adapter Guidance

> Created: 2026-04-12
> Scope: M3 — recipe + headless usage in Svelte 5 / SvelteKit

## Installation

```bash
npm install fikir-css
```

```ts
// src/app.ts or routes/+layout.ts
import "fikir-css/css";
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

## SvelteKit SSR

Fikir CSS is static CSS — SvelteKit SSR works out of the box. Import the stylesheet in your root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "fikir-css/css";
</script>
```
