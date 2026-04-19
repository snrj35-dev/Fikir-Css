# Fikir CSS

**Contract-driven CSS design system.** Zero-runtime. Predictable cascade. Token-first.

A single `fikir.css` file gives you 99 UI surfaces. No build step for consumers. State via `data-*` attributes, not class proliferation.

**v1.0.0** &nbsp;·&nbsp; **~152 KB raw / ~18 KB gzip** &nbsp;·&nbsp; **99 surfaces** &nbsp;·&nbsp; [![npm](https://img.shields.io/npm/v/fikir-css)](https://www.npmjs.com/package/fikir-css)

🔗 **[Live component gallery →](https://snrj35-dev.github.io/Fikir-Css/)** &nbsp;·&nbsp; [GitHub](https://github.com/snrj35-dev/Fikir-Css)

---

## What

Fikir CSS is a contract-driven CSS design system for teams that want semantic selectors, token-based theming, and zero runtime by default.

- One stylesheet covers 99 surfaces across component, layout, overlay, navigation, and data UI
- Public surfaces are explicitly labeled as `supported`, `beta`, `experimental`, or `deprecated`
- Consumers can stay in plain HTML, or opt into resolvers and helpers only when needed

## Why

- No mandatory consumer build step for the default path
- Theme, density, and motion are controlled with tokens and `data-*` attributes instead of framework-specific runtime APIs
- The product story is explicit: supported surfaces are stable, beta surfaces are opt-in, experimental surfaces are not sold as ready

---

## Quick Start

### Option 1 — CDN (zero install, works in 60 seconds)

Copy this into any `.html` file and open it:

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

    <h1 class="heading-2">Fikir CSS in 60 seconds</h1>

    <!-- Buttons -->
    <div class="cluster" style="gap: .5rem">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-neutral">Neutral</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-outline btn-neutral">Outline</button>
    </div>

    <!-- Alert -->
    <div class="alert alert-danger" role="alert">
      <p class="alert-title">Error</p>
      <p class="alert-description">Something went wrong.</p>
    </div>

    <!-- Card with form -->
    <div class="card card-elevated" style="padding: 1.5rem">
      <div class="field">
        <label class="label" for="email">Email</label>
        <input id="email" class="input" type="email" placeholder="you@example.com" />
        <p class="helper-text">We'll never share your email.</p>
      </div>
      <div class="cluster" style="gap: .5rem; margin-top: 1rem">
        <button class="btn btn-primary btn-sm">Subscribe</button>
        <span class="badge badge-neutral">Free tier</span>
      </div>
    </div>

    <!-- Dark mode toggle -->
    <button class="btn btn-outline btn-neutral btn-sm"
      onclick="document.documentElement.setAttribute('data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')">
      Toggle dark mode
    </button>

  </main>
</body>
</html>
```

### Option 2 — npm

```bash
npm install fikir-css
```

Use prerelease channels only when a release note explicitly calls for them:
`npm install fikir-css@beta` or `npm install fikir-css@rc`.

```html
<!-- HTML -->
<link rel="stylesheet" href="node_modules/fikir-css/dist/fikir.css" />
```

```js
// Bundler (Vite / webpack / Parcel)
import "fikir-css/css";
```

### Import cheat sheet

| Situation | Import |
|-----------|--------|
| Bundler (Vite / webpack / Parcel / Rollup) | `import "fikir-css/css"` |
| Plain HTML | `<link rel="stylesheet" href="node_modules/fikir-css/dist/fikir.css" />` |
| CDN | `<link rel="stylesheet" href="https://snrj35-dev.github.io/Fikir-Css/dist/fikir.css" />` |
| Recipe resolvers (JS/TS) | `import { resolveBtn, resolveCard } from "fikir-css/tooling"` |
| Overlay JS helpers | `import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers"` |
| Design tokens (JSON) | `import tokens from "fikir-css/tokens" assert { type: "json" }` |
| Slice (opt-in) | `import "fikir-css/slices/forms"` |
| Theme layer | `import "fikir-css/themes/dark"` |

> **One rule:** use `fikir-css/css` for the stylesheet everywhere. `fikir-css/tooling` for typed resolvers. `fikir-css/helpers` for overlay behavior. Nothing else needed to get started.

### Option 3 — Build from source

```bash
git clone https://github.com/snrj35-dev/Fikir-Css.git
cd Fikir-Css
npm install && npm run build
# open playground/index.html — no dev server needed
```

---

## Themes

Themes are activated with attributes, not recompilation:

- `data-theme="light|dark|high-contrast"`
- `data-density="compact|comfortable"`
- `data-motion="reduced"` when you need an explicit reduced-motion path

Full guide: [docs/guides/theme-system.md](./docs/guides/theme-system.md)

## Examples

- [Site gallery](https://snrj35-dev.github.io/Fikir-Css/) is the curated, copy-paste-first surface gallery for high-value usage
- [Playground](./playground/index.html) is the workflow lab for templates, interaction-heavy demos, support-tier labeling, and broader smoke coverage
- [React example](./examples/react-vite/) shows typed resolvers and helper usage in a real framework fixture

## Support Snapshot

Only `supported` surfaces are presented as production-ready defaults in quick start and starter examples.

| Level | Meaning |
|------|---------|
| `supported` | Stable, documented, selector contract frozen |
| `beta` | Usable, but additive or compatibility changes may still happen |
| `experimental` | Not recommended for production; may change or disappear |

See the full matrix in [docs/roadmap/support-matrix.md](./docs/roadmap/support-matrix.md).

---

## 30-second example

```html
<html data-theme="dark">
<body>

  <!-- Buttons -->
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-outline btn-neutral">Outline</button>
  <button class="btn btn-danger">Danger</button>

  <!-- Card with padding -->
  <article class="card card-elevated card-p-md">
    <h2>Card title</h2>
    <p>Content goes here.</p>
    <span class="badge badge-success">New</span>
  </article>

  <!-- Alert tones -->
  <div class="alert alert-warning" role="alert">
    <p class="alert-title">Warning</p>
    <p class="alert-description">Your session expires soon.</p>
  </div>

  <!-- Modal (toggle data-open to open/close) -->
  <div class="modal" data-open="false" role="dialog" aria-modal="true">
    <div class="modal-dialog">
      <h2 class="modal-title">Hello</h2>
      <button class="icon-button" aria-label="Close">✕</button>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast-viewport" aria-live="polite">
    <article class="toast toast--success" data-open="true">
      <p class="toast-title">Saved!</p>
    </article>
  </div>

</body>
</html>
```

Toggle dark mode at any time:
```js
document.documentElement.setAttribute("data-theme", "dark"); // or "light"
```

---

## For AI Assistants (Copilot / Claude / Cursor)

Fikir CSS ships a machine-readable selector manifest at `dist/contracts/selectors.json`. Drop it into your AI context to get accurate class-name completions:

```js
import selectors from "fikir-css/contracts/selectors";
// { "component.button": "btn", "component.buttonPrimary": "btn-primary", … }
```

**Key conventions for AI context:**
- Theme: `data-theme="light|dark|high-contrast"` on `<html>`
- Density: `data-density="compact|comfortable"` on `<html>`
- State: `data-open="true|false"`, `data-active="true"`, `data-disabled="true"`
- Variants: `btn-primary`, `btn-outline`, `btn-danger` (modifier suffix, not `btn--primary`)
- ARIA-first: components are styled off semantic HTML + ARIA attributes, not extra class toggles

### Token rules for custom CSS — MUST follow

When writing application-specific CSS alongside Fikir CSS, **always consume Fikir tokens**. Never invent a parallel custom property system.

**✅ DO — extend Fikir tokens:**

```css
/* Brand color: override --color-accent, don't create --my-accent */
:root {
  --color-accent: #7c3aed;  /* your brand purple */
}

/* Spacing: use --space-* scale */
.my-card { padding: var(--space-4) var(--space-6); }

/* Radius: use --radius-* scale */
.my-panel { border-radius: var(--radius-lg); }

/* Colors: use semantic tokens — they auto-adapt to dark/high-contrast */
.my-component {
  background: var(--color-bg-surface);
  color: var(--color-fg-default);
  border: 1px solid var(--color-border-subtle);
}
```

**❌ DON'T — parallel token system:**

```css
/* BAD: creates a system that breaks dark mode */
:root {
  --my-brand-accent: #7c3aed;   /* use --color-accent instead */
  --my-bg: #ffffff;              /* use --color-bg-default instead */
  --my-text: #111827;            /* use --color-fg-default instead */
}

/* BAD: hard-coded values ignore the theme system */
.my-card {
  background: #ffffff;           /* breaks in dark mode */
  color: #111827;                /* breaks in dark mode */
  padding: 16px 24px;            /* use var(--space-4) var(--space-6) */
  border-radius: 8px;            /* use var(--radius-md) */
}
```

### Token cheat sheet

| Need | Token |
|------|-------|
| Brand / accent color | `--color-accent` |
| Page background | `--color-bg-default` |
| Card / panel background | `--color-bg-surface` |
| Primary text | `--color-fg-default` |
| Secondary / muted text | `--color-fg-muted` |
| Borders | `--color-border-subtle` |
| Success state | `--color-success` |
| Warning state | `--color-warning` |
| Error / danger state | `--color-danger` |
| Spacing (xs→xl) | `--space-1` `--space-2` `--space-3` `--space-4` `--space-6` `--space-8` |
| Border radius | `--radius-sm` `--radius-md` `--radius-lg` |
| Font sizes | `--font-size-xs` `--font-size-sm` `--font-size-md` `--font-size-lg` |
| Transitions | `--transition-duration-fast` `--transition-duration-base` |

→ Full token list: [`packages/tokens/`](./packages/tokens/) | Full guide: [`docs/guides/theme-system.md`](./docs/guides/theme-system.md)

---

## Support Levels

Current tier summary, aligned with [`docs/roadmap/support-matrix.md`](./docs/roadmap/support-matrix.md):

| Level | Count | Summary |
|------|-------|---------|
| `supported` | 69 surfaces | Production-ready, selector contract frozen |
| `beta` | 22 surfaces | Usable, but additive or compatibility changes may land in MINOR releases |
| `experimental` | 10 surfaces + 2 patterns | No semver guarantee; not recommended for production |
| `deprecated` | 0 | No deprecated public surface in the v1.0.0 baseline |

### Supported families

- Core / foundation: `button`, `icon-button`, `link`, `badge`, `alert`, `card`, `surface`, `divider`, `skeleton`, `spinner`, `visually-hidden`
- Form / input: `field`, `label`, `helper-text`, `error-text`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `input-group`, `number-input`, `range-slider`, `segmented-control`, `otp-input`, `search-box`
- Overlay / feedback: `modal`, `drawer`, `popover`, `tooltip`, `dropdown-menu`, `toast`, `progress`, `loading-overlay`, `hover-card`, `result`
- Navigation: `tabs`, `accordion`, `breadcrumb`, `pagination`, `navbar`, `menu-bar`, `sidebar-nav`, `stepper`, `command-palette`, `tree-view`
- Data / display: `table`, `data-grid`, `list`, `description-list`, `avatar`, `avatar-group`, `stat`, `kpi-card`, `empty-state`, `timeline`, `tag-chip`
- Layout / shell: `stack`, `cluster`, `container`, `center`, `grid`, `switcher`, `sidebar`, `page-header`, `section-block`, `app-shell`, `split-pane`

For the full list of beta and experimental surfaces with rationale and upgrade guidance, see **[docs/release/what-is-stable-in-v1.md](./docs/release/what-is-stable-in-v1.md)**.

---

## Start Here

| Role | First path |
|------|------------|
| Consumer | [User path](./docs/paths/user-path.md) · [Quick Start](#quick-start) · [Site gallery](https://snrj35-dev.github.io/Fikir-Css/) · [Playground](./playground/index.html) |
| Contributor | [Contributor path](./docs/paths/contributor-path.md) · [Support matrix](./docs/roadmap/support-matrix.md) · [RFC guide](./docs/contributor/how-to-add-component-rfc.md) |
| Maintainer | [Maintainer path](./docs/paths/maintainer-path.md) · [Release flow](./docs/release/release-promotion-flow.md) · [Semver policy](./docs/governance/semver-policy.md) |

Need a framework or competitor migration plan? Start at [docs/migration/README.md](./docs/migration/README.md).  
Need the full navigation tree? Use [docs/hub.md](./docs/hub.md).

---

## Architecture

```
contracts/naming.contract.mjs   ← single source of truth for class names
contracts/recipes.contract.mjs  ← variant resolution rules
scripts/build-css.mjs           ← resolves {{placeholders}} → real class names
dist/fikir.css                  ← built output consumed by apps
dist/contracts/selectors.json   ← selector manifest for tooling
```

**Layer order:** `reset → base → layouts → recipes → components → utilities`

Components use `data-*` attributes for state (not CSS classes):
```html
<div class="modal" data-open="true" role="dialog" aria-modal="true">
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Build `dist/fikir.css` and all contract artifacts |
| `npm test` | Full CI: source + build tests + validations |
| `npm run test:source` | Source contract tests |
| `npm run test:build` | Built output surface tests |
| `npm run report:bundle-layers` | Layer size breakdown |
| `npm run report:dead-surfaces` | Playground coverage check |
| `npm run validate:size` | Gzip threshold enforcement |
| `npm run report:contrast` | WCAG AA contrast regression |

---

## Docs Reference

<details>
<summary>Architecture docs</summary>

- [Technical summary](./docs/architecture/technical-summary.md)
- [Headless contract spec](./docs/architecture/headless-contract-spec.md)
- [Headless examples](./docs/architecture/headless-examples.md)
- [Semantic-to-utility equivalence](./docs/architecture/semantic-utility-equivalence.md)
- [Virtualized list / table guidance](./docs/architecture/virtualized-list-guidance.md)
- [Chart embedding pattern](./docs/architecture/chart-embedding-pattern.md)
- [Brand theme cookbook](./docs/architecture/brand-theme-cookbook.md)
- [Overlay layering / z-index](./docs/architecture/overlay-layering-z-index-notes.md)
- [Overlay accessibility](./docs/architecture/overlay-accessibility-expectations.md)

</details>

<details>
<summary>Guides</summary>

- [Migration from Tailwind](./docs/guides/migration-from-tailwind.md)
- [Migration from Bootstrap](./docs/guides/migration-from-bootstrap.md)
- [Migration from MUI](./docs/guides/migration-from-mui.md)
- [React adapter](./docs/guides/react-adapter.md)
- [Vue adapter](./docs/guides/vue-adapter.md)
- [Svelte adapter](./docs/guides/svelte-adapter.md)
- [SSR / hydration conventions](./docs/guides/ssr-hydration-conventions.md)
- [Design token export formats](./docs/guides/design-token-export.md)
- [Figma token handoff](./docs/guides/figma-token-handoff.md)
- [Anti-patterns & troubleshooting](./docs/guides/anti-patterns.md)

</details>

<details>
<summary>Contracts & RFCs</summary>

- [Naming contract](./docs/contracts/naming-contract.md)
- [Naming convention spec](./docs/contracts/naming-convention-spec.md)
- [Recipe contract](./docs/contracts/recipe-contract.md)
- [Token dictionary spec](./docs/contracts/token-dictionary-spec.md)
- [Class conflict resolution RFC](./docs/rfcs/class-conflict-resolution-rfc.md)
- Component RFCs: [`docs/rfcs/components/`](./docs/rfcs/components/)

</details>

<details>
<summary>Testing & release</summary>

- [Theme regression checklist](./docs/testing/theme-regression-checklist.md)
- [Parsing-cost benchmark](./docs/testing/parsing-cost-benchmark.md)
- [Performance trend dashboard](./docs/release/performance-trend-dashboard.md)
- [v1.0 support freeze checklist](./docs/release/v1.0-support-freeze-checklist.md)
- [v1.0 migration guarantee policy](./docs/release/v1.0-migration-guarantee-policy.md)
- [Release checklist](./docs/release/release-checklist.md)
- [Selector contract freeze](./docs/governance/selector-contract-freeze.md)
- [Versioning / semver policy](./docs/governance/semver-policy.md)

</details>

---

## Theme Switching

Activate any theme with a single attribute — no rebuild, no JS class toggling:

```html
<html data-theme="dark">          <!-- dark mode -->
<html data-theme="high-contrast"> <!-- WCAG AAA -->
<html data-density="compact">     <!-- compact spacing -->
<html data-theme="dark" data-density="compact"> <!-- combine -->
```

Toggle with JS:

```js
document.documentElement.setAttribute('data-theme', 'dark')
document.documentElement.removeAttribute('data-density') // back to default
```

→ Full guide: [docs/guides/theme-system.md](./docs/guides/theme-system.md)

---

## Why not Tailwind / Bootstrap?

| | Fikir CSS | Tailwind CSS | Bootstrap 5 |
|--|-----------|-------------|-------------|
| **Bundle** | ~10.5 KB gzip | ~3–12 KB (purged, build required) | ~22 KB gzip |
| **Build step** | ❌ None | ✅ Required | ❌ None |
| **Runtime JS** | ❌ Zero | ❌ Zero | ✅ Required (modals, dropdowns) |
| **Dark mode** | `data-theme="dark"` | `dark:` variant | `data-bs-theme="dark"` |
| **Compact/density theme** | ✅ `data-density` | ❌ Manual | ❌ |
| **TypeScript resolvers** | ✅ `fikir-css/tooling` | ❌ | ❌ |
| **Component count** | 82 surfaces | Utility only | ~40 components |
| **ARIA semantics in API** | ✅ `data-*` state selectors | ❌ | Partial |

→ Full benchmark: [docs/benchmark.md](./docs/benchmark.md)
→ Migration guides: [Migration hub](./docs/migration/README.md)

---

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening issues or PRs.

## License

MIT. See [LICENSE](./LICENSE).
