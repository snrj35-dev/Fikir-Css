<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { resolveBtn, resolveCard, resolveAlert, resolveBadge } from "fikir-css/tooling";
import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

// ── Theme ────────────────────────────────────────────────────────────────────
const theme = ref("light");
function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme.value);
}

// ── Density ───────────────────────────────────────────────────────────────────
const density = ref("comfortable");
function toggleDensity() {
  density.value = density.value === "comfortable" ? "compact" : "comfortable";
  if (density.value === "compact") {
    document.documentElement.setAttribute("data-density", "compact");
  } else {
    document.documentElement.removeAttribute("data-density");
  }
}

// ── Modal ────────────────────────────────────────────────────────────────────
const modalOpen = ref(false);
const modalEl = ref(null);
let trap = null;
let kbd = null;

function openModal() { modalOpen.value = true; }
function closeModal() { modalOpen.value = false; }

watch(modalOpen, (open) => {
  if (open) {
    trap?.activate();
    kbd = bindOverlayKeyboard(modalEl.value, { onClose: closeModal });
  } else {
    trap?.deactivate();
    kbd?.destroy();
    kbd = null;
  }
});

onMounted(() => {
  trap = createFocusTrap(modalEl.value);
});

onUnmounted(() => {
  kbd?.destroy();
});

// ── Form ──────────────────────────────────────────────────────────────────────
const inputValue = ref("");
const submitted = ref(false);
function handleSubmit(e) {
  e.preventDefault();
  submitted.value = true;
}
function handleReset() {
  inputValue.value = "";
  submitted.value = false;
}
</script>

<template>
  <div class="surface" style="min-height: 100vh; padding: var(--space-6)">
    <div class="container stack" style="--stack-gap: var(--space-6)">

      <!-- Header -->
      <header class="cluster" style="justify-content: space-between; align-items: center">
        <h1 class="heading-2">Fikir CSS × Vue 3</h1>
        <div class="cluster" style="gap: var(--space-2)">
          <button :class="resolveBtn({ variant: 'outline', tone: 'neutral' })" type="button" @click="toggleTheme">
            {{ theme === 'light' ? '🌙 Dark' : '☀️ Light' }}
          </button>
          <button :class="resolveBtn({ variant: 'outline', tone: 'neutral' })" type="button" @click="toggleDensity">
            {{ density === 'comfortable' ? '⬛ Compact' : '⬜ Comfortable' }}
          </button>
        </div>
      </header>

      <!-- Buttons -->
      <article :class="`${resolveCard({ variant: 'elevated', padding: 'md' })} stack`">
        <h2 class="heading-3">Buttons — <code>resolveBtn()</code></h2>
        <div class="cluster" style="gap: var(--space-2); flex-wrap: wrap">
          <button :class="resolveBtn()" type="button">Primary</button>
          <button :class="resolveBtn({ tone: 'neutral' })" type="button">Neutral</button>
          <button :class="resolveBtn({ tone: 'danger' })" type="button">Danger</button>
          <button :class="resolveBtn({ variant: 'outline' })" type="button">Outline</button>
          <button :class="resolveBtn({ size: 'sm' })" type="button">Small</button>
          <button :class="resolveBtn({ size: 'lg' })" type="button">Large</button>
        </div>
      </article>

      <!-- Badges -->
      <article :class="`${resolveCard({ variant: 'elevated', padding: 'md' })} stack`">
        <h2 class="heading-3">Badges — <code>resolveBadge()</code></h2>
        <div class="cluster" style="gap: var(--space-2)">
          <span :class="resolveBadge({ tone: 'neutral' })">Neutral</span>
          <span :class="resolveBadge({ tone: 'primary' })">Primary</span>
          <span :class="resolveBadge({ tone: 'danger' })">Danger</span>
        </div>
      </article>

      <!-- Alerts -->
      <article :class="`${resolveCard({ variant: 'elevated', padding: 'md' })} stack`">
        <h2 class="heading-3">Alerts — <code>resolveAlert()</code></h2>
        <div class="stack">
          <div :class="resolveAlert()" role="alert">
            <p class="alert-title">Info</p>
            <p class="alert-description">Default alert with no tone modifier.</p>
          </div>
          <div :class="resolveAlert({ tone: 'danger' })" role="alert">
            <p class="alert-title">Error</p>
            <p class="alert-description">Something went wrong. Please try again.</p>
          </div>
        </div>
      </article>

      <!-- Form -->
      <article :class="`${resolveCard({ variant: 'elevated', padding: 'md' })} stack`">
        <h2 class="heading-3">Form</h2>
        <form class="stack" @submit="handleSubmit">
          <div class="field">
            <label class="label" for="vue-name">Name</label>
            <input
              id="vue-name"
              class="input"
              type="text"
              placeholder="Your name"
              v-model="inputValue"
            />
            <p class="helper-text">Enter your display name.</p>
          </div>
          <div v-if="submitted" :class="resolveAlert()" role="alert">
            <p class="alert-title">Submitted</p>
            <p class="alert-description">Hello, {{ inputValue || 'stranger' }}!</p>
          </div>
          <div class="cluster" style="gap: var(--space-2)">
            <button :class="resolveBtn()" type="submit">Submit</button>
            <button
              :class="resolveBtn({ variant: 'outline', tone: 'neutral' })"
              type="button"
              @click="handleReset"
            >
              Reset
            </button>
          </div>
        </form>
      </article>

      <!-- Modal trigger -->
      <article :class="`${resolveCard({ variant: 'elevated', padding: 'md' })} stack`">
        <h2 class="heading-3">Modal — <code>data-open</code> driven</h2>
        <button :class="resolveBtn()" type="button" @click="openModal">Open modal</button>
      </article>

    </div>

    <!-- Modal (always in DOM — CSS shows/hides via data-open) -->
    <div
      ref="modalEl"
      class="modal"
      :data-open="String(modalOpen)"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vue-modal-title"
    >
      <div class="modal-dialog">
        <header class="modal-header">
          <h2 id="vue-modal-title" class="modal-title">Confirm action</h2>
          <button type="button" class="icon-button" aria-label="Close" @click="closeModal">✕</button>
        </header>
        <div class="modal-body">
          <p>
            This is a Fikir CSS modal driven by <code>data-open</code>.
            No JS animation library needed.
          </p>
        </div>
        <footer class="modal-footer">
          <button
            :class="resolveBtn({ variant: 'outline', tone: 'neutral' })"
            type="button"
            @click="closeModal"
          >
            Cancel
          </button>
          <button :class="resolveBtn()" type="button" @click="closeModal">Confirm</button>
        </footer>
      </div>
    </div>
  </div>
</template>
