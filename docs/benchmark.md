# Performance Benchmark & Comparison

> Updated: M19 — v1.0.0 | Methodology: static analysis + Chrome DevTools
>
> Bundle sizes sourced from `npm run validate:size` (gzip) and `npm run report:size` (raw). Rendering benchmarks are approximate — measured on M1 MacBook Air, Chrome 124, 50 button + 1 modal page.

## Bundle size

| Library | CSS bundle | Gzip | JS required |
|---------|------------|------|-------------|
| **Fikir CSS v1.0.0** | 92 KB raw | **10.5 KB** | None |
| Bootstrap 5.3 | 194 KB raw | ~22 KB | Optional (~16 KB gzip) |
| Tailwind CSS 3 (purged, typical app) | ~8–30 KB | ~3–12 KB | None (build step required) |
| Tailwind CSS 4 (new engine) | ~15 KB | ~5 KB | None |
| Bulma 1.0 | 207 KB raw | ~23 KB | None |
| Pico CSS 2 | 86 KB raw | ~11 KB | None |
| Water.css | 5 KB raw | 2 KB | None |

> Fikir CSS ships **82 surfaces** (components + utilities + layout primitives) in 10.5 KB gzip. No purge step needed.
> Opt-in theme files: compact density (+0.8 KB), shape tokens (+0.4 KB).

## Runtime performance

| Metric | Fikir CSS | Bootstrap (with JS) | Tailwind |
|--------|-----------|--------------------|-----------| 
| JS parse time | **0 ms** (zero JS) | ~8 ms | 0 ms |
| Theme switching | CSS custom property cascade | Class toggle + rerender | Class toggle + JIT |
| First paint impact | Minimal (single CSS file) | Moderate (CSS + JS defer) | Minimal |
| CLS risk | None | None | None |

## Feature comparison

| Feature | Fikir CSS | Bootstrap 5 | Tailwind CSS |
|---------|-----------|-------------|--------------|
| Zero runtime JS | ✅ | ❌ (modals, dropdowns need JS) | ✅ |
| Design tokens (CSS vars) | ✅ | Partial | Via config |
| Dark mode | `data-theme` attribute | `data-bs-theme` attribute | `dark:` variant |
| Compact/density themes | ✅ `data-density` | ❌ | Manual config |
| TypeScript class resolvers | ✅ `fikir-css/tooling` | ❌ | Limited (IntelliSense) |
| Focus trap helper | ✅ `fikir-css/helpers` | ✅ (JS plugin) | ❌ |
| Tree-shakeable | ✅ (subpath imports) | Partial | ✅ (purge) |
| Build step required | ❌ (CDN usable) | ❌ | ✅ |
| ARIA semantics in API | ✅ (data-* driven) | Partial | ❌ (utility only) |
| Component count | 82 surfaces | ~40 components | Utility only |

## Accessibility

| Feature | Fikir CSS | Bootstrap 5 |
|---------|-----------|-------------|
| Modal focus trap | Built-in helper | JS plugin |
| Keyboard overlay close | Built-in helper | JS plugin |
| `aria-expanded` state | CSS-native (`[aria-expanded]` selector) | JS class toggle |
| Reduced motion | `@media` + `data-motion` override | Partial |
| High contrast theme | `data-theme="high-contrast"` | ❌ |
| WCAG AA target | ✅ | ✅ |

## Rendering benchmark

Measured with Chrome DevTools Performance panel on a page with 50 button instances + 1 modal:

| Scenario | Fikir CSS | Bootstrap 5 |
|----------|-----------|-------------|
| Initial parse | 1.2 ms | 3.8 ms |
| Style recalc (theme toggle) | 0.4 ms | 1.1 ms |
| Layout after theme toggle | 0 ms (no layout shift) | 0.2 ms |

> *Measurements are approximate and device-dependent. Re-run with `npm run capture:playground` and Chrome DevTools for your specific hardware.*

## When to choose Fikir CSS

- You want a **component-complete** system without writing component CSS from scratch
- You need **dark/compact/high-contrast** themes without a build step
- You want **zero-JS state** management (CSS-native `data-*` selectors)
- You are building with **Vue, React, Svelte, or plain HTML** and want typed class resolvers (`fikir-css/tooling`)
- You need overlay accessibility helpers without a third-party library (`fikir-css/helpers`)
- Bundle size and zero runtime are hard requirements
- You want W3C DTCG token export for Figma sync out of the box (`dist/tokens.json`)

## When to choose alternatives

- **Tailwind** — if you want maximum layout flexibility and custom one-off designs per component
- **Bootstrap** — if your team already knows it and you need a large component ecosystem with JS plugins
- **Pico CSS** — if you want a classless/minimal baseline with semantic HTML defaults
