# Changelog

All notable changes are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
