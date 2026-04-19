# Fikir CSS × Vue 3 Adapter Guide

> Updated: M18 — v0.6.0

## Installation

```bash
npm install fikir-css
```

In your `main.ts` / `main.js`:

```ts
import 'fikir-css/css'
import 'fikir-css/themes/compact' // opt-in: enables data-density="compact"
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## Theme & Density Toggle Composable

```ts
// src/composables/useTheme.ts
import { ref } from 'vue'

export function useTheme() {
  const theme = ref<'light' | 'dark'>('light')
  const density = ref<'comfortable' | 'compact'>('comfortable')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function toggleDensity() {
    density.value = density.value === 'comfortable' ? 'compact' : 'comfortable'
    if (density.value === 'compact') {
      document.documentElement.setAttribute('data-density', 'compact')
    } else {
      document.documentElement.removeAttribute('data-density')
    }
  }

  return { theme, density, toggleTheme, toggleDensity }
}
```

Usage in a component:

```vue
<script setup>
import { useTheme } from '@/composables/useTheme'
const { theme, density, toggleTheme, toggleDensity } = useTheme()
</script>

<template>
  <button :class="resolveBtn({ variant: 'outline', tone: 'neutral' })" @click="toggleTheme">
    {{ theme === 'light' ? '🌙 Dark' : '☀️ Light' }}
  </button>
  <button :class="resolveBtn({ variant: 'outline', tone: 'neutral' })" @click="toggleDensity">
    {{ density === 'comfortable' ? '⬛ Compact' : '⬜ Comfortable' }}
  </button>
</template>
```

## Modal with `data-open` + Focus Trap

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { createFocusTrap, bindOverlayKeyboard } from 'fikir-css/helpers'

const open = ref(false)
const modalEl = ref<HTMLElement | null>(null)
let trap = null
let kbd = null

const openModal = () => (open.value = true)
const closeModal = () => (open.value = false)

onMounted(() => { trap = createFocusTrap(modalEl.value!) })
onUnmounted(() => { kbd?.destroy() })
watch(open, (isOpen) => {
  if (isOpen) {
    trap?.activate()
    kbd = bindOverlayKeyboard(modalEl.value!, { onClose: closeModal })
  } else {
    trap?.deactivate(); kbd?.destroy(); kbd = null
  }
})
</script>

<template>
  <!-- Always in DOM — CSS shows/hides via data-open -->
  <div
    ref="modalEl"
    class="modal"
    :data-open="String(open)"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal-dialog">
      <header class="modal-header">
        <h2 id="modal-title" class="modal-title">{{ title }}</h2>
        <button type="button" class="icon-button" aria-label="Close" @click="closeModal">✕</button>
      </header>
      <div class="modal-body"><slot /></div>
    </div>
  </div>
</template>
```

## Segmented Control

```vue
<template>
  <div class="segmented-control" role="group" :aria-label="name">
    <div v-for="opt in options" :key="opt.value" class="segmented-control-item">
      <input
        type="radio"
        :id="`${name}-${opt.value}`"
        :name="name"
        :value="opt.value"
        v-model="model"
        class="segmented-control-input"
      />
      <label :for="`${name}-${opt.value}`" class="segmented-control-label">
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: { label: string; value: string }[];
  name: string;
}>();
const model = defineModel<string>();
</script>
```

## Recipe Resolvers

```vue
<script setup>
import { resolveBtn, resolveCard, resolveAlert, resolveBadge } from 'fikir-css/tooling'
</script>

<template>
  <button :class="resolveBtn({ variant: 'outline', tone: 'neutral', size: 'md' })" type="button">
    Action
  </button>
  <article :class="`${resolveCard({ variant: 'elevated', padding: 'md' })} stack`">
    <div :class="resolveAlert({ tone: 'danger' })" role="alert">
      <p class="alert-title">Error</p>
    </div>
  </article>
</template>
```

## SSR

Fikir CSS is static CSS with no JavaScript side effects — Nuxt.js, Vite SSR, and other Vue SSR frameworks work without additional configuration.
