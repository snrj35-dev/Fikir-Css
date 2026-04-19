<script>
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { resolveBtn, resolveCard, resolveAlert, resolveBadge } from "fikir-css/tooling";
  import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

  // ── Theme ──────────────────────────────────────────────────────────────────
  const theme = writable("light");
  function toggleTheme() {
    theme.update((t) => {
      const next = t === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }

  // ── Density ─────────────────────────────────────────────────────────────────
  const density = writable("comfortable");
  function toggleDensity() {
    density.update((d) => {
      const next = d === "comfortable" ? "compact" : "comfortable";
      if (next === "compact") {
        document.documentElement.setAttribute("data-density", "compact");
      } else {
        document.documentElement.removeAttribute("data-density");
      }
      return next;
    });
  }

  // ── Modal ──────────────────────────────────────────────────────────────────
  let modalOpen = false;
  let modalEl;
  let trap;
  let kbd;

  function openModal() {
    modalOpen = true;
    trap?.activate();
    kbd = bindOverlayKeyboard(modalEl, { onClose: closeModal });
  }

  function closeModal() {
    trap?.deactivate();
    kbd?.destroy();
    kbd = null;
    modalOpen = false;
  }

  onMount(() => {
    trap = createFocusTrap(modalEl);
  });

  onDestroy(() => {
    kbd?.destroy();
  });

  // ── Form ────────────────────────────────────────────────────────────────────
  let inputValue = "";
  let submitted = false;
  function handleSubmit(e) {
    e.preventDefault();
    submitted = true;
  }
  function handleReset() {
    inputValue = "";
    submitted = false;
  }
</script>

<div class="surface" style="min-height: 100vh; padding: var(--space-6)">
  <div class="container stack" style="--stack-gap: var(--space-6)">

    <!-- Header -->
    <header class="cluster" style="justify-content: space-between; align-items: center">
      <h1 class="heading-2">Fikir CSS × Svelte</h1>
      <div class="cluster" style="gap: var(--space-2)">
        <button class={resolveBtn({ variant: "outline", tone: "neutral" })} type="button" on:click={toggleTheme}>
          {$theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <button class={resolveBtn({ variant: "outline", tone: "neutral" })} type="button" on:click={toggleDensity}>
          {$density === "comfortable" ? "⬛ Compact" : "⬜ Comfortable"}
        </button>
      </div>
    </header>

    <!-- Buttons -->
    <article class="{resolveCard({ variant: 'elevated', padding: 'md' })} stack">
      <h2 class="heading-3">Buttons — <code>resolveBtn()</code></h2>
      <div class="cluster" style="gap: var(--space-2); flex-wrap: wrap">
        <button class={resolveBtn()} type="button">Primary</button>
        <button class={resolveBtn({ tone: "neutral" })} type="button">Neutral</button>
        <button class={resolveBtn({ tone: "danger" })} type="button">Danger</button>
        <button class={resolveBtn({ variant: "outline" })} type="button">Outline</button>
        <button class={resolveBtn({ size: "sm" })} type="button">Small</button>
        <button class={resolveBtn({ size: "lg" })} type="button">Large</button>
      </div>
    </article>

    <!-- Badges -->
    <article class="{resolveCard({ variant: 'elevated', padding: 'md' })} stack">
      <h2 class="heading-3">Badges — <code>resolveBadge()</code></h2>
      <div class="cluster" style="gap: var(--space-2)">
        <span class={resolveBadge({ tone: "neutral" })}>Neutral</span>
        <span class={resolveBadge({ tone: "primary" })}>Primary</span>
        <span class={resolveBadge({ tone: "danger" })}>Danger</span>
      </div>
    </article>

    <!-- Alerts -->
    <article class="{resolveCard({ variant: 'elevated', padding: 'md' })} stack">
      <h2 class="heading-3">Alerts — <code>resolveAlert()</code></h2>
      <div class="stack">
        <div class={resolveAlert()} role="alert">
          <p class="alert-title">Info</p>
          <p class="alert-description">Default alert with no tone modifier.</p>
        </div>
        <div class={resolveAlert({ tone: "danger" })} role="alert">
          <p class="alert-title">Error</p>
          <p class="alert-description">Something went wrong. Please try again.</p>
        </div>
      </div>
    </article>

    <!-- Form -->
    <article class="{resolveCard({ variant: 'elevated', padding: 'md' })} stack">
      <h2 class="heading-3">Form</h2>
      <form class="stack" on:submit={handleSubmit}>
        <div class="field">
          <label class="label" for="svelte-name">Name</label>
          <input
            id="svelte-name"
            class="input"
            type="text"
            placeholder="Your name"
            bind:value={inputValue}
          />
          <p class="helper-text">Enter your display name.</p>
        </div>
        {#if submitted}
          <div class={resolveAlert()} role="alert">
            <p class="alert-title">Submitted</p>
            <p class="alert-description">Hello, {inputValue || "stranger"}!</p>
          </div>
        {/if}
        <div class="cluster" style="gap: var(--space-2)">
          <button class={resolveBtn()} type="submit">Submit</button>
          <button
            class={resolveBtn({ variant: "outline", tone: "neutral" })}
            type="button"
            on:click={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </article>

    <!-- Modal trigger -->
    <article class="{resolveCard({ variant: 'elevated', padding: 'md' })} stack">
      <h2 class="heading-3">Modal — <code>data-open</code> driven</h2>
      <button class={resolveBtn()} type="button" on:click={openModal}>Open modal</button>
    </article>

  </div>

  <!-- Modal (always in DOM — CSS shows/hides via data-open) -->
  <div
    bind:this={modalEl}
    class="modal"
    data-open={String(modalOpen)}
    role="dialog"
    aria-modal="true"
    aria-labelledby="svelte-modal-title"
  >
    <div class="modal-dialog">
      <header class="modal-header">
        <h2 id="svelte-modal-title" class="modal-title">Confirm action</h2>
        <button type="button" class="icon-button" aria-label="Close" on:click={closeModal}>✕</button>
      </header>
      <div class="modal-body">
        <p>
          This is a Fikir CSS modal driven by <code>data-open</code>.
          No JS animation library needed.
        </p>
      </div>
      <footer class="modal-footer">
        <button
          class={resolveBtn({ variant: "outline", tone: "neutral" })}
          type="button"
          on:click={closeModal}
        >
          Cancel
        </button>
        <button class={resolveBtn()} type="button" on:click={closeModal}>Confirm</button>
      </footer>
    </div>
  </div>
</div>
