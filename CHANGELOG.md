# Changelog

All notable changes are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.1] — 2026-04-28

### Focus: AI-Native Ecosystem

### Added
- Zero-custom-CSS dashboard reference in `examples/dashboard/`.
- Composition guidance in `docs/guides/composition-patterns.md`.
- AI-focused SKILL updates for dashboard, `kpi-card`, `stat-group`, and `app-shell` usage.

### Changed
- Strengthened README/SKILL guidance so AI agents prefer existing surfaces and contracts before writing custom CSS.
- Expanded dashboard and starter examples around page-level composition.

---

## [1.2.0] — 2026-04-27

### Focus: Premium & Ecosystem

### Added
- OLED theme via `data-theme="oled"`.
- Glass variants for `app-shell`, `modal`, and `navbar`.
- Fullscreen app-shell variant for edge-to-edge dashboard layouts.
- Limited spacing/layout utility layer.
- Standalone helper bundle `fikir-helpers.js`.
- Zero-to-dashboard and headless adapter guidance.

### Changed
- Typography surfaces (`heading`, `text`, `code`, `kbd`, `quote`, `callout`) were expanded in contracts but remain experimental until promotion evidence is complete.

---

## [1.1.0] — 2026-04-26

### Focus: Maturity Gaps, Documentation, CI Hardening

### Added
- Canonical component documentation pass across 25+ components.
- `SKILL.md` and `.github/copilot-instructions.md` for AI agent usage.
- `density_effect` metadata in `capabilities.json`.
- VS Code custom-data manifests as stable generated outputs.

### Changed
- Strengthened docs-selector consistency checks to reduce AI-facing documentation drift.

### Fixed
- Legacy `comp-surface` skeleton guidance replaced with the current `surface` class.

---

## [1.0.0] — 2026-04-19

### Focus: Stable Release — AI Adoption, Framework Support, Quality Gates (M14–M21)

This is the first stable release of Fikir CSS. The `supported` surface list is now **frozen** under semver: breaking changes to any supported surface require a MAJOR version bump.

**Surface counts at v1.0.0:** 69 supported · 22 beta · 10 experimental + 2 experimental patterns · 0 deprecated

### Added

#### Machine-Readable Artifacts for AI (M20)
- **`dist/contracts/anatomy.json`** — Minimal HTML structure for 60 components with sub-element roles and `data-*` attribute documentation
- **`dist/contracts/capabilities.json`** — Per-component "does / does not / requires_app_css" capability matrix
- **`dist/contracts/variants.json`** — Canonical global axes (6 tones, 5 styles, 4 sizes) and per-recipe variant registry
- **`dist/contracts/primitives.json`** — 7 layout primitive defaults, CSS custom properties, and examples
- **`dist/contracts/selectors.json`** expanded — Now includes global and per-component `data-*` markers alongside 417 selector entries
- **`contracts/anatomy.contract.mjs`** + **`contracts/capabilities.contract.mjs`** — Source-of-truth contract files for anatomy and capabilities
- **`scripts/generate-manifests.mjs`** — Single script that generates all 6 JSON manifests; integrated into `npm run build`
- **`scripts/validate-manifests.mjs`** — CI validation for all manifests (0 errors, 0 warnings)
- **`npm run build:manifests`** + **`npm run validate:manifests`** scripts
- 4 new `package.json` subpath exports: `fikir-css/contracts/anatomy`, `/capabilities`, `/variants`, `/primitives`
- **`docs/guides/machine-readable-contracts.md`** — Full guide including AI system prompt example and CDN URLs

#### Framework & Adoption (M18)
- **`examples/react-vite`** — Full runnable starter with density, helpers, result/data-grid/settings/app-shell flows
- **`examples/vue-vite`** — Full Vue 3 example with theme/density toggle and overlay demo
- **`examples/svelte-vite`** — Full SvelteKit example with writable store theme management and modal demo
- **`examples/starter-consumer`** — Updated to `fikir-css: ^0.6.0`; npm/bundler/plain HTML instructions
- Playwright smoke tests for Vue and Svelte examples
- **`docs/guides/ssr-hydration-conventions.md`** — SSR/hydration guide for React, Vue, Svelte
- **`docs/guides/adding-to-existing-project.md`**, `anti-patterns.md`, `overlay-js-helpers.md`, `design-token-export.md`
- **`docs/guides/plain-html-quickstart.md`** — Zero-toolchain quickstart
- **`docs/guides/why-fikir-css-vs-utility-first.md`** — Positioning comparison

#### Quality Gates & CI (M19)
- **`tests/build/subpath-exports.test.mjs`** — 26 subpath export smoke tests
- **`tests/build/typescript-types-surface.test.mjs`** — 8 TypeScript types surface tests
- **`scripts/validate-example-structure.mjs`** — Example structure validation (CI gate)
- `docs:quality:strict` and `validate:examples` added to `test:ci` chain
- **`docs/governance/semver-policy.md`**, `deprecation-policy.md`, `support-policy.md`
- **`docs/release/release-checklist-v1.md`**, `rc-burn-in-plan.md`
- **344 docs files**, 0 broken links
- RC score: 9.57 / 10

#### Surfaces (M14–M16)
- 236+ Playwright browser tests across components (M17 cross-theme, density, shape, reduced-motion smoke)
- All M16 target surfaces now implemented: `time-picker`, `date-time-picker`, `empty-search-state`, `inline-notice`, `command-bar`, `tree-table`, `coachmark`, `copy-button`, `password-input`, `stat-group`, `auth-screen`
- `filter-bar` and `data-table-toolbar` experimental patterns with `data-pattern` / `data-slot` contracts

#### v1.0 Freeze (M21.1)
- `docs/roadmap/support-matrix.md` — Final freeze applied; stale "not yet implemented" section removed; all surfaces properly classified
- `docs/release/v1.0-support-freeze-checklist.md` — Freeze gates verified

### Changed
- `build` script now includes `generate-manifests.mjs` and runs `validate:manifests` in `test:ci`
- Support matrix: **"not yet implemented" section removed** — all 11 pending M16 surfaces are now classified as beta or experimental
- `docs/guides/machine-readable-contracts.md` — Status updated from "Planned" to "Stable"

### Fixed
- No breaking changes to any `supported` surface since v0.6.0 baseline.

### Migration from v0.6.0

No selector renames in the `supported` surface tier. See `docs/migration/v0.6-to-v1.0-migration-note.md` for full details.

---

## [0.6.0] — 2026-04-13

### Focus: Stability & Distribution (M9), Theme System (M10), Framework Examples (M11), Component Showcase (M12), Site Redesign & CI Hardening (M13)

### Added
- **Site landing page restructure** — Install + Theme Switcher + Real App Examples sections precede component gallery
- **Live theme switcher** in site gallery — light / dark / high-contrast + compact / comfortable toggles
- **Token Explorer compare mode** — `↔ Compare` button shows two themes side-by-side
- **`docs/guides/theme-system.md`** — full guide: all themes, activation, mixing, token overrides, custom theme, reduced-motion
- **Component gallery additions**: `stepper`, `timeline`, `tree-view` in `site/index.html` (sidebar + live markup)
- **Migration guides**: `docs/migration/from-bootstrap.md`, `docs/migration/from-tailwind.md`
- **Component API docs** (11 components): button, modal, alert, input, badge, accordion, tabs, card, stepper, tree-view, timeline + `_template.md`
- **`docs/benchmark.md`** — bundle size + runtime + feature comparison vs Bootstrap 5, Tailwind CSS, Bulma, Pico CSS
- **README**: "Why not Tailwind?" comparison table, theme switching snippet, npm beta badge
- **`docs/guides/vue-adapter.md`** — full content: modal component, segmented control, dynamic classes, SSR note
- **`docs/guides/svelte-adapter.md`** — updated: dark mode writable store, SvelteKit layout, `@beta` install
- **RFC note**: per-component CSS tree-shaking deferred to M13+ (`docs/rfcs/per-component-tree-shaking-rfc-note.md`)
- **Fizibilite kararı**: `site/` + `playground/` birleştirme — ayrı tutulacak, bakım maliyeti gerekçesiyle

### Changed
- `package.json` repository/homepage/bugs URLs updated to `snrj35-dev`
- README: version badge `v0.5.0` → `v0.6.0-beta`; CDN example → GitHub Pages URL
- `site/index.html`: hero badges updated, CDN fallback removed, hero CTA buttons added
- `playground/index.html`: version badge corrected `v1.0-M2` → `v0.5.0`
- `publish.yml`: added `--dry-run` verification step; added `--tag beta` for prerelease dist-tag
- `test:ci`: `build` step moved to start of chain (dist/ was missing in CI cold start)
- `build` script: added 3 missing contract report scripts (`contract-drift`, `bundle-layers`, `component-css-map`)
- `validate-size-thresholds`: diff checks skipped on cold start (`previousBytes=0`)

### Fixed
- CI failures: `dist/fikir.css` missing when tests ran before build in fresh CI clone
- CI failures: missing contract report JSON files (`contract-drift-report.json` etc.)
- Version/tag mismatch validation in `validate-version-tag-consistency.mjs`
- **`btn--sm` → `btn-sm`** across all playground HTML files (class rename from v0.5.0 not applied)
- `alert-danger` double CSS definition: `@layer components` and `@layer recipes` both defined `.alert-danger` with conflicting values; unified to single token-based declaration
- `badge-info` visually identical to `badge-primary`; `--color-info-500` moved to sky blue (`oklch(65% 0.15 220)`) for distinct cyan tone
- Hero stat boxes in dark mode inverted contrast (`bg-default` darker than `bg-surface`); corrected to `color-mix(accent 4%, bg-surface)`
- `site-content` missing `min-width: 0` (CSS grid overflow blowout)
- README `"npm publish pending"` outdated after npm publication; warning removed
- `detect-flaky-tests.mjs` `shell: true` causing DEP0190 deprecation warning; replaced with `readdir`-based explicit file expansion
- `package-lock.json` stale name/version (`fikir-css-mvp@0.3.0`); regenerated to match `fikir-css@0.6.0`
- CI `npm install` → `npm ci` (ci.yml + publish.yml) for deterministic installs

### Added (M13 — Site Redesign & CI Hardening)
- **Site redesign** (`site/index.html`): app-shell architecture, premium header with backdrop blur, dramatic hero with eyebrow + stats row, sidebar with live search/filter, `gallery-heading` with surface count badge
- **Visual regression gate**: `--strict` flag in `diff-playground-screenshots.mjs`; 12 baseline screenshots versioned; CI strategy: main push auto-updates baseline, PRs get strict diff
- **Node matrix `[20, 22]`** in CI (Node 18 removed: EOL April 2025)
- **`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24`** env added to suppress Node 20 actions deprecation warning
- **`report-dead-surfaces.mjs`** expanded to scan all 6 playground HTML files (was single `index.html`); `--min-coverage` flag for CI gate
- **`--update-baseline`** flag in screenshot diff script for one-command baseline refresh

---

## [0.5.0] — 2026-04-12

### Added
- **Recipe resolvers** — `resolveBtn`, `resolveCard`, `resolveAlert`, `resolveBadge`, `resolveModal`, `resolveTabs` named exports from `fikir-css/tooling`
- **TypeScript declaration file** — `dist/tooling/resolve-classes.d.ts` with full typed API; `"types"` field in package exports
- **`fikir-css/tokens`** — W3C DTCG-format `dist/tokens.json` generated on every build
- **CSS slices** — `fikir-css/slices/forms`, `overlays`, `navigation`, `data-display` opt-in entrypoints
- **React Vite fixture** — `examples/react-vite/` runnable starter with all resolvers demonstrated
- **API stability badges** — `[stable]` / `[beta]` / `[exp]` annotations in `docs/roadmap/support-matrix.md`
- **Contributor growth targets** — `docs/community/contributor-growth-targets.md`
- **Versioned compatibility matrix** — `docs/release/compatibility-matrix.md`
- **v1.0 RC notes pack** — `docs/release/v1.0-rc-notes-pack.md`
- **`settings-panel`** promoted from `rfc-only` → `experimental`

### Fixed
- `data-color-scheme` → `data-theme` corrected across all documentation files
- `starter-consumer/index.html` — `.button` → `btn btn-primary`, badge updated to `v0.5.0`
- Import golden path standardised — all adapter guides now use `fikir-css/css` + `fikir-css/tooling`
- `resolveBtn` now correctly emits `btn-solid` and `btn-md` to match recipe contract output
- `known-limitations.md` version reference updated to v0.5.0

### Recipe contract expanded
- `input`, `alert`, `badge`, `modal`, `tabs` added to `contracts/recipes.contract.mjs`

---

## [0.4.0] — 2026-04-11

### Added
- M2 Wave 6 surfaces: `combobox`, `search-box`, `autocomplete`, `command-palette` (`[beta]`)
- Fluid token (`clamp`) pilot showcase in playground
- `segmented-control` canonical implementation
- `settings-panel` RFC and pattern implementation
- Toast tone variants: `toast--success`, `toast--info`, `toast--warn`, `toast--error`
- Skeleton presets for table / form / card / content
- Theme packs: `high-contrast`, `compact`, `comfortable`, `reduced-motion`, `shape`
- Brand theme override cookbook
- Headless contract spec and overlay accessibility expectations doc
- Class conflict resolution utility (`resolveClasses`) prototype
- React, Vue, Svelte adapter guides
- SSR hydration conventions guide
- Design token export mapping (CSS vars → JSON)

### Fixed
- `role="tabpanel"` added to all tabs-panel elements in playground
- Playground `demo.css` no longer overrides canonical framework classes

---

## [0.3.0] — 2026-04-10

### Added
- M1 Wave 1–5 surface promotions to `supported`:
  - `icon-button`, `link`, `divider`, `surface`, `visually-hidden`, `skeleton`, `spinner`
  - `tooltip`, `popover`, `dropdown-menu`
  - `accordion`, `breadcrumb`, `navbar`, `menu-bar`, `sidebar-nav`
  - `stepper`, `page-header`, `section-block`, `app-shell`, `split-pane`
  - `data-grid`, `result`, `stat`, `list`, `description-list`
- Promotion evidence bundles per wave
- Automated contract drift report in CI
- Bundle layer contribution report

---

## [0.2.0] — 2026-04-09

### Added
- Token taxonomy v1 freeze (core + semantic + mode tokens)
- Contract compatibility matrix
- Selector deprecation window policy
- 9.9/10 weighted scoring rubric
- Comparator baseline matrix (Tailwind / Bootstrap / MUI / Chakra / Mantine / Panda / Headless / Radix)

---

## [0.1.0] — 2026-04-08

### Added
- Initial contract-driven CSS foundation
- `@layer` architecture: `reset → base → layouts → recipes → components → utilities`
- Core component set: `button`, `input`, `card`, `badge`, `alert`, `modal`, `tabs`, `table`, `toast`, `pagination`
- `naming.contract.mjs` — canonical class name registry
- `dist/contracts/selectors.json` — machine-readable selector manifest
- Plain and prefixed naming modes
