# RFC Note: Per-Component CSS Tree-Shaking

> Status: **Deferred to M13+** | Filed: M12

## Background

An expert review suggested exploring per-component CSS imports such as:

```js
import 'fikir-css/button.css'
import 'fikir-css/modal.css'
```

This would allow consumers to import only the CSS they need, reducing bundle size for projects that use a small subset of components.

## Current state

The full bundle is **~10.5 KB gzip** — already small enough that per-component shaking provides marginal benefit for most projects. The current architecture intentionally ships a single `fikir.css` bundle for simplicity and CDN usability.

## Why deferred

1. **10.5 KB is acceptable** for the vast majority of use cases. Most frameworks (React, Vue, Svelte) add 30–100+ KB of their own runtime.
2. **No build step** is a core feature — per-component imports require a bundler.
3. **@layer architecture** means component CSS depends on token and base layers being loaded first; shipping split bundles requires careful layer order guarantees.
4. **CDN consumers** (plain HTML) would need multiple `<link>` tags.

## Proposed future approach (M13+)

If demand grows, the implementation path is:

1. **Subpath exports** per component — `fikir-css/components/button` → `dist/components/button.css`
2. **Bundler plugin** (`vite-plugin-fikir`) — auto-tree-shakes based on used class names (similar to Tailwind JIT)
3. **Layers manifest** — each component declares its `@layer` dependencies so the plugin can include them

## Decision

Keep single-bundle approach through GA. Revisit in M13 if per-component requests accumulate in issues.
