# Fikir CSS × Vue 3 Adapter Guide

> Updated: M11

## Installation

```bash
npm install fikir-css@beta
```

In your `main.ts` / `main.js`:

```ts
import 'fikir-css/css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## `useTheme()` Composable

```vue
<template>
  <div
    class="modal"
    :data-open="String(open)"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal-dialog">
      <header class="modal-header">
        <h2 id="modal-title" class="modal-title">{{ title }}</h2>
        <button type="button" class="icon-button" aria-label="Close" @click="close">
          ✕
        </button>
      </header>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{ title: string }>();
const open = ref(false);
const close = () => (open.value = false);
defineExpose({ open: () => (open.value = true), close });
</script>
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

## Dynamic Classes

```vue
<template>
  <button
    type="button"
    :class="['btn', variant === 'primary' ? 'btn-primary' : '', size === 'sm' ? 'btn-sm' : '']"
  >
    <slot />
  </button>
</template>
```

## SSR

Fikir CSS is static CSS with no JavaScript side effects — Nuxt.js, Vite SSR, and other Vue SSR frameworks work without additional configuration.
