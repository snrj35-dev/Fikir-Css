---
name: fikir-css
description: >
  Use this skill whenever the user wants to build UI components, pages, or layouts using Fikir CSS.
  Triggers include: any mention of "fikir", "fikir-css", "fikir.css", "contract-driven CSS", or when
  the user is working in a project that imports fikir-css. Also trigger when the user asks to convert
  Bootstrap/Tailwind markup to Fikir CSS, or requests help with data-* state attributes, design tokens,
  or the contract/selector system. Do NOT use for projects using Tailwind, Bootstrap, or custom CSS
  without Fikir CSS present.
---

## What Fikir CSS Is

Fikir CSS is a **contract-driven CSS design system** — NOT a utility-first or component-class framework.
One `fikir.css` file covers 99 UI surfaces. Zero runtime. Zero build step for consumers.

### The single most important rule

`class="button"` **≠ the rendered selector.** Semantic class names map to generated selectors via the
contract system. **Always check `selectors.json` before writing selectors in production code.**

- Live selector manifest: `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/selectors.json`
- Component gallery: `https://snrj35-dev.github.io/Fikir-Css/`

---

## Installation & Import

```html
<!-- CDN (no install) -->
<link rel="stylesheet" href="https://snrj35-dev.github.io/Fikir-Css/dist/fikir.css" />
```

```bash
npm install fikir-css
```

```js
// Bundler (Vite / webpack / Parcel / Rollup)
import "fikir-css/css";

// Typed resolvers
import { resolveBtn, resolveCard } from "fikir-css/tooling";

// Overlay JS helpers
import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

// Design tokens (JSON)
import tokens from "fikir-css/tokens" assert { type: "json" };
```

---

## Core Mental Model

### 1 — State lives in `data-*` attributes, NOT class modifiers

```html
<!-- ✅ CORRECT -->
<button class="btn" data-variant="primary" data-size="sm">Click me</button>
<div class="modal" data-open="true" role="dialog" aria-modal="true"></div>
<div class="toast" data-open="false"></div>

<!-- ❌ WRONG — class modifiers do not control state -->
<button class="btn-primary btn-sm">Click me</button>
<div class="modal modal--open"></div>
```

### 2 — Variants use suffix notation (not BEM double-dash)

```html
<!-- ✅ CORRECT -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline btn-neutral">Outline</button>
<div class="card card-elevated card-p-md"></div>
<span class="badge badge-success">New</span>
<div class="alert alert-warning" role="alert"></div>

<!-- ❌ WRONG -->
<button class="btn--primary"></button>
<div class="card--elevated"></div>
```

### 3 — Theme and density on `<html>`, never inline

```html
<html data-theme="light">          <!-- default -->
<html data-theme="dark">           <!-- dark mode -->
<html data-theme="high-contrast">  <!-- WCAG AAA -->
<html data-density="compact">      <!-- compact spacing -->
<html data-theme="dark" data-density="compact">  <!-- combine freely -->
```

Toggle with JS:
```js
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.removeAttribute('data-density'); // back to default
```

---

## Design Token Rules

When writing custom CSS alongside Fikir CSS, **always consume Fikir tokens**. Never invent parallel
custom properties — they break dark mode and high-contrast themes.

### Token cheat sheet

| Need                     | Token                            |
|--------------------------|----------------------------------|
| Brand / accent color     | `--color-accent`                 |
| Page background          | `--color-bg-default`             |
| Card / panel background  | `--color-bg-surface`             |
| Primary text             | `--color-fg-default`             |
| Secondary / muted text   | `--color-fg-muted`               |
| Borders                  | `--color-border-subtle`          |
| Success state            | `--color-success`                |
| Warning state            | `--color-warning`                |
| Error / danger state     | `--color-danger`                 |
| Spacing (xs → xl)        | `--space-1` `--space-2` `--space-3` `--space-4` `--space-6` `--space-8` |
| Border radius            | `--radius-sm` `--radius-md` `--radius-lg` |
| Font sizes               | `--font-size-xs` `--font-size-sm` `--font-size-md` `--font-size-lg` |
| Transitions              | `--transition-duration-fast` `--transition-duration-base` |

```css
/* ✅ DO — extend Fikir tokens */
:root {
  --color-accent: #7c3aed; /* override brand color */
}

.my-card {
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
  color: var(--color-fg-default);
  border: 1px solid var(--color-border-subtle);
}

/* ❌ DON'T — hard-coded values break theming */
.my-card {
  background: #ffffff;  /* breaks dark mode */
  color: #111827;       /* breaks dark mode */
  padding: 16px 24px;   /* ignores spacing scale */
}
```

---

## Surface Catalog (Supported = Production-Ready)

### Core / Foundation
`button` · `icon-button` · `link` · `badge` · `alert` · `card` · `surface` · `divider`
`skeleton` · `spinner` · `visually-hidden`

### Form / Input
`field` · `label` · `helper-text` · `error-text` · `input` · `textarea` · `select`
`checkbox` · `radio` · `switch` · `input-group` · `number-input` · `range-slider`
`segmented-control` · `otp-input` · `search-box`

### Overlay / Feedback
`modal` · `drawer` · `popover` · `tooltip` · `dropdown-menu` · `toast` · `progress`
`loading-overlay` · `hover-card` · `result`

### Navigation
`tabs` · `accordion` · `breadcrumb` · `pagination` · `navbar` · `menu-bar`
`sidebar-nav` · `stepper` · `command-palette` · `tree-view`

### Data / Display
`table` · `data-grid` · `list` · `description-list` · `avatar` · `avatar-group`
`stat` · `kpi-card` · `empty-state` · `timeline` · `tag-chip`

### Layout / Shell
`stack` · `cluster` · `container` · `center` · `grid` · `switcher`
`sidebar` · `page-header` · `section-block` · `app-shell` · `split-pane`

**Support levels:**
- `supported` (69 surfaces) — selector contract frozen, safe for production
- `beta` (22 surfaces) — usable, minor changes may land in MINOR releases
- `experimental` (10 surfaces) — no semver guarantee, avoid in production

---

## Common Component Patterns

### Button
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline btn-neutral">Outline</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary" data-disabled="true" aria-disabled="true">Disabled</button>
```

### Card
```html
<article class="card card-elevated card-p-md">
  <h2>Card title</h2>
  <p>Content here.</p>
  <span class="badge badge-success">New</span>
</article>
```

### Form Field
```html
<div class="field">
  <label class="label" for="email">Email</label>
  <input id="email" class="input" type="email" placeholder="you@example.com" />
  <p class="helper-text">We'll never share your email.</p>
  <!-- On error: -->
  <p class="error-text" role="alert">Invalid email address.</p>
</div>
```

### Modal
```html
<div class="modal" data-open="false" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-dialog">
    <h2 class="modal-title" id="modal-title">Dialog Title</h2>
    <p>Modal content.</p>
    <button class="icon-button" aria-label="Close">✕</button>
  </div>
</div>
```

Toggle:
```js
document.querySelector('.modal').dataset.open = 'true';  // open
document.querySelector('.modal').dataset.open = 'false'; // close
```

### Toast
```html
<div class="toast-viewport" aria-live="polite">
  <article class="toast toast--success" data-open="true">
    <p class="toast-title">Saved!</p>
  </article>
</div>
```

### Alert
```html
<div class="alert alert-danger" role="alert">
  <p class="alert-title">Error</p>
  <p class="alert-description">Something went wrong.</p>
</div>

<div class="alert alert-warning" role="alert">
  <p class="alert-title">Warning</p>
  <p class="alert-description">Your session expires soon.</p>
</div>
```

### Layout (Stack + Cluster + Container)
```html
<div class="container">
  <main class="stack" style="gap: var(--space-4)">
    <!-- vertical stack of blocks -->
    <div class="cluster" style="gap: var(--space-2)">
      <!-- horizontal wrapping group -->
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-outline btn-neutral">Cancel</button>
    </div>
  </main>
</div>
```

---

## Contract Reference Files

Always fetch these when generating or verifying components:

| File | URL | Purpose |
|------|-----|---------|
| `selectors.json` | `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/selectors.json` | Semantic → generated selector map |
| `primitives.json` | `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/primitives.json` | Base component primitives |
| `variants.json` | `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/variants.json` | All component variants |
| `anatomy.json` | `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/anatomy.json` | Component structure contracts |
| `tokens.json` | `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/tokens.json` | Full design token dictionary |
| `capabilities.json` | `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/capabilities.json` | Feature capability matrix |

---

## TypeScript Resolvers (Optional)

For typed, safe class name resolution in JS/TS projects:

```ts
import { resolveBtn, resolveCard, resolveAlert } from "fikir-css/tooling";

const btnClasses = resolveBtn({ variant: "primary", size: "sm" });
// → "btn btn-primary btn-sm"

const cardClasses = resolveCard({ elevation: "elevated", padding: "md" });
// → "card card-elevated card-p-md"
```

---

## Overlay Helpers (JS)

```js
import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";

const modal = document.querySelector('.modal');
const trap = createFocusTrap(modal);

// Open
modal.dataset.open = 'true';
trap.activate();

// Close on Escape
bindOverlayKeyboard(modal, {
  onClose: () => {
    modal.dataset.open = 'false';
    trap.deactivate();
  }
});
```

---

## React Usage

```tsx
import "fikir-css/css";
import { resolveBtn } from "fikir-css/tooling";

function PrimaryButton({ children, size = "md" }) {
  return (
    <button className={resolveBtn({ variant: "primary", size })}>
      {children}
    </button>
  );
}

function Modal({ open, title, children, onClose }) {
  return (
    <div
      className="modal"
      data-open={String(open)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-dialog">
        <h2 className="modal-title" id="modal-title">{title}</h2>
        {children}
        <button className="icon-button" aria-label="Close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
```

Full guide: `docs/guides/react-adapter.md`

---

## Architecture Overview

```
contracts/naming.contract.mjs    ← single source of truth for class names
contracts/recipes.contract.mjs   ← variant resolution rules
scripts/build-css.mjs            ← resolves {{placeholders}} → real class names
dist/fikir.css                   ← built output consumed by apps
dist/contracts/selectors.json    ← selector manifest for tooling / AI
```

**CSS layer order:** `reset → base → layouts → recipes → components → utilities`

---

## Anti-Patterns to Avoid

```html
<!-- ❌ Class-based state — NEVER do this -->
<div class="modal modal--open"></div>
<button class="btn btn--disabled"></button>

<!-- ❌ Inventing custom tokens -->
<style>
  :root { --my-blue: #3b82f6; }  /* use --color-accent instead */
</style>

<!-- ❌ Hard-coded values that break theming -->
<style>
  .card { background: white; color: black; } /* use CSS tokens */
</style>

<!-- ❌ Assuming a class name is the final selector without checking selectors.json -->
<!-- The rendered selector for "btn" may be ".btn-_x1a2b" not ".btn" -->
```

---

## Quick-Start Template

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://snrj35-dev.github.io/Fikir-Css/dist/fikir.css" />
</head>
<body class="surface" style="padding: 2rem">
  <main class="container stack" style="max-width: 40rem">

    <h1 class="heading-2">Fikir CSS</h1>

    <div class="cluster" style="gap: .5rem">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-neutral">Neutral</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-outline btn-neutral">Outline</button>
    </div>

    <div class="field">
      <label class="label" for="email">Email</label>
      <input id="email" class="input" type="email" placeholder="you@example.com" />
      <p class="helper-text">We'll never share your email.</p>
    </div>

    <button class="btn btn-outline btn-neutral btn-sm"
      onclick="document.documentElement.setAttribute('data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')">
      Toggle dark mode
    </button>

  </main>
</body>
</html>
```

---

## Key Links

- 📦 npm: `npm install fikir-css`
- 🎨 Component gallery: `https://snrj35-dev.github.io/Fikir-Css/`
- 📋 selectors.json: `https://snrj35-dev.github.io/Fikir-Css/dist/contracts/selectors.json`
- 📖 Docs hub: `docs/hub.md`
- 🔧 Anti-patterns: `docs/guides/anti-patterns.md`
- 🎭 Theme system: `docs/guides/theme-system.md`
- ⚛️ React adapter: `docs/guides/react-adapter.md`
