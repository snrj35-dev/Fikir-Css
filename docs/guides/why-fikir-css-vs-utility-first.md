# Why Fikir CSS vs Utility-First

> M18 — v1.0.0

This is not a "Fikir CSS is better" document. It is a decision guide for teams evaluating tradeoffs.

---

## The core difference

| | Utility-first (Tailwind) | Fikir CSS |
|---|---|---|
| **Authoring model** | Compose atomic classes per element | Apply semantic component classes |
| **Bundle strategy** | JIT — only used classes shipped | Static bundle, fixed ~12 KB gzip |
| **Component abstraction** | You build it (Headless UI, Radix, etc.) | Built-in semantic surfaces |
| **Token system** | `tailwind.config.js` JS object | CSS custom properties |
| **Dark mode** | `dark:` class prefix | `prefers-color-scheme` + `data-theme` |
| **Framework binding** | Framework-agnostic | Framework-agnostic |
| **SSR** | No hydration issues | No hydration issues |
| **Learning curve** | Must learn utility class names | Must learn component class names |

---

## When utility-first (Tailwind) wins

- **Highly custom designs** — every element has bespoke spacing, color, and layout that doesn't map to components. Utility classes make one-offs fast.
- **Design system is built in-house** — your team designs and owns the component library; utilities are the raw material.
- **Large build pipeline already set up** — PostCSS, purge, JIT are already part of your stack.
- **Tailwind-first team** — existing engineers know Tailwind well; switching cost is real.

## When Fikir CSS wins

- **Ship fast with pre-built surfaces** — 82 ready-to-use components (`modal`, `drawer`, `data-grid`, `settings-panel`, etc.) without building from scratch.
- **Zero build tool required** — link the CSS, add classes, done. Works in plain HTML, CDN, or any bundler.
- **SSR without configuration** — no Emotion, no CSS-in-JS setup. Plain stylesheet.
- **Design token export** — `dist/tokens.json` (W3C DTCG) ready for Figma Variables sync out of the box.
- **Consistent density control** — compact / comfortable mode via single `data-density` attribute.
- **Headless accessibility** — focus trap, keyboard dismiss, roving tabindex helpers ship with the package (`fikir-css/helpers`).
- **Predictable bundle size** — ~12 KB gzip regardless of how many classes you use.

---

## Can they be used together?

Yes. A common pattern:

```css
/* Import Fikir CSS first */
@import "fikir-css/css";
/* Then Tailwind utilities (utilities layer wins over Fikir components) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Use Fikir CSS semantic components (`.modal`, `.btn`, `.data-grid`) for structured UI, and Tailwind utilities for one-off layout adjustments.

See `docs/guides/adding-to-existing-project.md` for the full coexistence setup.

---

## What Fikir CSS is not

- **Not a React component library** — there are no `<Button />` JSX components. Fikir CSS is CSS. You write the HTML; the CSS provides the styles.
- **Not an animation library** — transitions are minimal and respect `prefers-reduced-motion`.
- **Not a layout engine** — layout primitives (`stack`, `cluster`, `container`, `grid`) cover 80% of cases; complex layouts still use CSS Grid directly.

---

## Summary

Choose utility-first when you need **maximum design freedom** and are building a custom design system from scratch.

Choose Fikir CSS when you need **production-ready component surfaces quickly**, with minimal bundle size, no build pipeline, and first-class accessibility helpers.

Both approaches are valid. Many teams combine them.
