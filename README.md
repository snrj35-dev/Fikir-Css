# Fikir CSS

Contract-driven CSS foundation (v0.4).

Fikir CSS is a contract-driven CSS foundation repository focused on predictable cascade behavior, selector generation, and low-runtime delivery.

## Current Status
- Stage: `v0.4 release-candidate track`
- Support baseline: `docs/roadmap/support-matrix.md`
- Supported slice: expanded core forms + layout primitives + selected M1 slices (modal/toast/tabs/pagination/table-empty-state)
- Experimental slice: broad implemented component/pattern surface outside current support commitment
- Installation model: repo-first build (`npm install && npm run build`) with local package tarball consumption preview (`npm pack`)
- Stability: release-candidate track; APIs and file layout may still evolve between minor tags
- Intended use: architecture exploration and tooling validation

## Non-goals (Current)
- Full component library
- Full static extraction/compiler engine
- Production-ready plugin ecosystem
- Marketing/demo site as a product surface

## Who This Is For
- Teams validating contract-driven CSS architecture before full framework adoption
- Maintainers who need predictable selector/token contracts and reproducible build artifacts
- Contributors iterating on RFC-first component surfaces with test-backed changes

## Supported Surface (Current Baseline)
- See full matrix: `docs/roadmap/support-matrix.md`
- Core: `button`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `card`, `badge`, `alert`, `label`, `helper-text`, `error-text`, `field`
- Layout primitives: `container`, `stack`, `cluster`, `sidebar`, `switcher`, `center`, `grid`
- M1 slices: `modal`, `toast`, `tabs`, `pagination`, `table`, `empty-state`

## Experimental Surface
- Implemented and publicly demoed surfaces outside the supported baseline are marked `experimental` in:
  - `docs/roadmap/support-matrix.md`
- Includes advanced/productivity, broad overlay/navigation/data surfaces, and pattern compositions.

## RFC-only / Planned Surface
- RFC-only baseline example: `settings-panel` pattern (spec exists, no canonical implemented component surface yet)
- Planned scope is tracked in:
  - `docs/roadmap/plan.md`
  - `docs/roadmap/tasklist.md`

## Quick Start
1. Install dependencies
   - `npm install`
2. Build CSS and generated artifacts
   - `npm run build`
3. Open playground
   - `playground/index.html`

If `dist/fikir.css` is missing, run `npm run build` first.

## Package Consumption (Preview)
Entrypoints and package files are defined in:
- `package.json` (`style`, `exports`, `files`)
- `docs/roadmap/package-distribution-strategy.md`

Minimal local package flow:
1. Build artifacts:
   - `npm run build`
2. Create tarball:
   - `npm pack`
3. Install in a consumer project:
   - `npm install ../fikir-css-mvp-<version>.tgz`
4. Consume CSS:
   - plain HTML: `<link rel="stylesheet" href="./node_modules/fikir-css-mvp/dist/fikir.css" />`
   - bundler import: `import "fikir-css-mvp/css";`

Starter consumer example:
- `examples/starter-consumer/`

## Playground / Demo
- Path: `playground/`
- Purpose: showcase current foundation only (not production app patterns)
- Covers:
  - button, icon-button, link, divider, card, surface, input, textarea, select, checkbox, radio, switch, range-slider, number-input, rating, tags-input, otp-input, input-group, modal, toast, tooltip, popover, dropdown-menu, context-menu, progress, loading-overlay, drawer, tabs, accordion, pagination, breadcrumb, navbar, menu-bar, sidebar-nav, tree-view, stepper, page-header, section-block, app-shell, split-pane, table, data-grid, empty-state, result, avatar, avatar-group, tag-chip, stat, timeline, kpi-card, list, description-list, combobox, search-box, autocomplete, command-palette, badge, alert, text, heading, code, code-block, callout, quote, kbd, markdown-surface
  - date-picker, date-range-picker, calendar, file-upload, dropzone, editable-field, hover-card
  - field composition (`field`, `label`, `helper-text`, `error-text`), accessibility helper (`visually-hidden`)
  - loading primitives (`skeleton`, `spinner`)
  - `container`, `stack`, `cluster`, `sidebar`, `switcher`, `center`, `grid`
  - utility vs semantic override examples
  - light/dark token behavior
  - recipe resolver output snapshot

See [playground/README.md](./playground/README.md) for section details.
Minimal getting-started sample: `playground/getting-started.html`.
Standalone shell sample: `playground/app-shell-example.html`.

### Playground Screenshots
<details>
<summary>Light / Dark Preview</summary>

Light mode:
![Fikir CSS v0.3 playground light preview](./playground/screenshots/playground-light.png)

Dark mode:
![Fikir CSS v0.3 playground dark preview](./playground/screenshots/playground-dark.png)
</details>

## Architecture (v0.3)
Single sources of truth:
- Naming contract: `contracts/naming.contract.mjs`
- Recipe contract: `contracts/recipes.contract.mjs`

Build/validation entrypoint:
- `scripts/build-css.mjs`

Generated outputs:
- `dist/fikir.css`
- `packages/recipes/index.css`
- `packages/recipes/generated/resolvers.ts`
- `dist/contracts/selectors.json`
- `dist/contracts/alias-migration.json`
- `dist/contracts/size-report.json`

## Documentation Map
- Docs index (audience + support labels): `docs/INDEX.md`
- Role-based docs paths: `docs/paths/user-path.md`, `docs/paths/contributor-path.md`, `docs/paths/maintainer-path.md`
- Technical summary: `docs/architecture/technical-summary.md`
- Validation pipeline: `docs/architecture/validation-pipeline.md`
- Overlay layering notes: `docs/architecture/overlay-layering-z-index-notes.md`
- Overlay accessibility expectations: `docs/architecture/overlay-accessibility-expectations.md`
- Core accessibility expectations: `docs/architecture/core-accessibility-expectations.md`
- Icon-only surface guidance: `docs/architecture/icon-only-surface-guidance.md`
- Navigation accessibility notes: `docs/architecture/navigation-accessibility-notes.md`
- Layout primitives refinement notes: `docs/architecture/layout-primitives-refinement-notes.md`
- Product patterns: `docs/architecture/product-patterns.md`
- Settings panel pattern spec: `docs/architecture/settings-panel-pattern-spec.md`
- Filter bar pattern spec: `docs/architecture/filter-bar-pattern-spec.md`
- Naming contract: `docs/contracts/naming-contract.md`
- Naming convention spec: `docs/contracts/naming-convention-spec.md`
- Recipe contract: `docs/contracts/recipe-contract.md`
- Token dictionary spec: `docs/contracts/token-dictionary-spec.md`
- Field RFC: `docs/rfcs/components/field-rfc.md`
- Tabs RFC: `docs/rfcs/components/tabs-rfc.md`
- Accordion RFC: `docs/rfcs/components/accordion-rfc.md`
- Pagination RFC: `docs/rfcs/components/pagination-rfc.md`
- Page Header RFC: `docs/rfcs/components/page-header-rfc.md`
- Section RFC: `docs/rfcs/components/section-rfc.md`
- App Shell RFC: `docs/rfcs/components/app-shell-rfc.md`
- Split Pane RFC: `docs/rfcs/components/split-pane-rfc.md`
- Table RFC: `docs/rfcs/components/table-rfc.md`
- Empty State RFC: `docs/rfcs/components/empty-state-rfc.md`
- Avatar RFC: `docs/rfcs/components/avatar-rfc.md`
- Stat RFC: `docs/rfcs/components/stat-rfc.md`
- Timeline RFC: `docs/rfcs/components/timeline-rfc.md`
- KPI Card RFC: `docs/rfcs/components/kpi-card-rfc.md`
- List RFC: `docs/rfcs/components/list-rfc.md`
- Description List RFC: `docs/rfcs/components/description-list-rfc.md`
- Data Grid RFC: `docs/rfcs/components/data-grid-rfc.md`
- Avatar Group RFC: `docs/rfcs/components/avatar-group-rfc.md`
- Tag / Chip RFC: `docs/rfcs/components/tag-chip-rfc.md`
- Combobox RFC: `docs/rfcs/components/combobox-rfc.md`
- Search Box RFC: `docs/rfcs/components/search-box-rfc.md`
- Autocomplete RFC: `docs/rfcs/components/autocomplete-rfc.md`
- Command Palette RFC: `docs/rfcs/components/command-palette-rfc.md`
- Date Picker RFC: `docs/rfcs/components/date-picker-rfc.md`
- Date Range Picker RFC: `docs/rfcs/components/date-range-picker-rfc.md`
- Calendar RFC: `docs/rfcs/components/calendar-rfc.md`
- Number Input RFC: `docs/rfcs/components/number-input-rfc.md`
- Rating RFC: `docs/rfcs/components/rating-rfc.md`
- Result RFC: `docs/rfcs/components/result-rfc.md`
- Tree View RFC: `docs/rfcs/components/tree-view-rfc.md`
- Tags Input RFC: `docs/rfcs/components/tags-input-rfc.md`
- Fluid Tokens Pilot RFC: `docs/rfcs/foundations/fluid-tokens-rfc.md`
- File Upload RFC: `docs/rfcs/components/file-upload-rfc.md`
- Dropzone RFC: `docs/rfcs/components/dropzone-rfc.md`
- Editable Field RFC: `docs/rfcs/components/editable-field-rfc.md`
- Hover Card RFC: `docs/rfcs/components/hover-card-rfc.md`
- Icon Button RFC: `docs/rfcs/components/icon-button-rfc.md`
- Link RFC: `docs/rfcs/components/link-rfc.md`
- Divider RFC: `docs/rfcs/components/divider-rfc.md`
- Surface RFC: `docs/rfcs/components/surface-rfc.md`
- Visually Hidden RFC: `docs/rfcs/components/visually-hidden-rfc.md`
- Textarea RFC: `docs/rfcs/components/textarea-rfc.md`
- Select RFC: `docs/rfcs/components/select-rfc.md`
- Checkbox RFC: `docs/rfcs/components/checkbox-rfc.md`
- Radio RFC: `docs/rfcs/components/radio-rfc.md`
- Switch RFC: `docs/rfcs/components/switch-rfc.md`
- Input Group RFC: `docs/rfcs/components/input-group-rfc.md`
- Range Slider RFC: `docs/rfcs/components/range-slider-rfc.md`
- OTP / Pin Input RFC: `docs/rfcs/components/otp-input-rfc.md`
- Modal RFC: `docs/rfcs/components/modal-rfc.md`
- Toast RFC: `docs/rfcs/components/toast-rfc.md`
- Tooltip RFC: `docs/rfcs/components/tooltip-rfc.md`
- Popover RFC: `docs/rfcs/components/popover-rfc.md`
- Dropdown Menu RFC: `docs/rfcs/components/dropdown-menu-rfc.md`
- Context Menu RFC: `docs/rfcs/components/context-menu-rfc.md`
- Progress RFC: `docs/rfcs/components/progress-rfc.md`
- Loading Overlay RFC: `docs/rfcs/components/loading-overlay-rfc.md`
- Drawer RFC: `docs/rfcs/components/drawer-rfc.md`
- Breadcrumb RFC: `docs/rfcs/components/breadcrumb-rfc.md`
- Navbar RFC: `docs/rfcs/components/navbar-rfc.md`
- Menu Bar RFC: `docs/rfcs/components/menu-bar-rfc.md`
- Sidebar RFC: `docs/rfcs/components/sidebar-rfc.md`
- Stepper RFC: `docs/rfcs/components/stepper-rfc.md`
- Text RFC: `docs/rfcs/components/text-rfc.md`
- Heading RFC: `docs/rfcs/components/heading-rfc.md`
- Code RFC: `docs/rfcs/components/code-rfc.md`
- Code Block RFC: `docs/rfcs/components/code-block-rfc.md`
- Callout RFC: `docs/rfcs/components/callout-rfc.md`
- Quote RFC: `docs/rfcs/components/quote-rfc.md`
- Kbd RFC: `docs/rfcs/components/kbd-rfc.md`
- Markdown Surface RFC: `docs/rfcs/components/markdown-surface-rfc.md`
- Form field examples: `docs/architecture/form-field-examples.md`
- Dense data display examples: `docs/architecture/dense-data-display-examples.md`
- Data display token audit: `docs/architecture/data-display-token-audit.md`
- Data Grid research note: `docs/architecture/data-grid-research-note.md`
- Command bar pattern spec: `docs/architecture/command-bar-pattern-spec.md`
- Search + filter composite examples: `docs/architecture/search-filter-composite-examples.md`
- Data table toolbar pattern spec: `docs/architecture/data-table-toolbar-pattern-spec.md`
- Minimal test plan: `docs/testing/minimal-test-plan.md`
- Critical automation areas: `docs/testing/critical-automation-areas.md`
- Overlay focus management test plan: `docs/testing/overlay-focus-management-test-plan.md`
- Manual accessibility QA checklist: `docs/testing/manual-accessibility-qa-checklist.md`
- A11y CI scope: `docs/testing/a11y-ci-scope.md`
- Playground visual regression plan: `docs/testing/playground-visual-regression-plan.md`
- Package distribution strategy: `docs/roadmap/package-distribution-strategy.md`
- Package distribution checklist: `docs/release/package-distribution-checklist.md`
- Versioning/Semver policy: `docs/release/versioning-semver-policy.md`
- Changelog policy: `docs/release/changelog-policy.md`
- Release checklist: `docs/release/release-checklist.md`
- Release promotion flow: `docs/release/release-promotion-flow.md`
- Experimental-to-supported criteria: `docs/release/experimental-to-supported-criteria.md`
- Milestone release notes process: `docs/release/milestone-release-notes-process.md`
- Bundle size thresholds: `docs/release/bundle-size-thresholds.md`
- Utility surface budget policy: `docs/release/utility-surface-budget-policy.md`
- Release impact review: `docs/release/release-impact-review.md`
- v0.4 release impact review record: `docs/release/v0.4.0-release-impact-review.md`
- GitHub release readiness (v0.3): `docs/release/github-release-readiness-v0.3.md`
- GitHub release readiness (v0.4): `docs/release/github-release-readiness-v0.4.md`
- GitHub roadmap bootstrap guide: `docs/release/github-roadmap-bootstrap.md`
- Release note template: `docs/release/release-note-template.md`
- v0.4 release body (copy/paste): `docs/release/v0.4.0-release-body.md`
- Known limitations: `docs/community/known-limitations.md`
- Community feedback issue draft: `docs/community/request-for-feedback-issue.md`
- External feedback log: `docs/community/external-feedback-log.md`
- External feedback theme mapping: `docs/roadmap/external-feedback-theme-mapping-2026-04-11.md`
- Playground evaluation contributor note: `docs/community/how-to-evaluate-playground.md`
- RFC authoring guide: `docs/contributor/how-to-add-component-rfc.md`
- RFC-to-supported promotion guide: `docs/maintainer/how-to-move-rfc-to-supported.md`
- Last reviewed convention: `docs/maintainer/last-reviewed-convention.md`
- GitHub roadmap bootstrap assets: `.github/project-management/`, `scripts/bootstrap-github-roadmap.mjs`
- Migration notes: `docs/migration/`
- Migration note template: `docs/migration/migration-note-template.md`
- Release notes: `docs/release/`

## Roadmap (Near-term)
- v0.3.x:
  - strengthen CI/release guardrails
  - keep contract consistency and migration docs up to date
- v0.4 (planned):
  - packaging and distribution ergonomics
  - stricter release automation for contract parity and alias migration safety

## Experimental Areas
- Contract schema evolution (`contracts/*.mjs`)
- Build-time generation and validation boundaries (`scripts/build-css.mjs`)
- Selector migration workflow (`dist/contracts/alias-migration.json`)

## Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening issues or pull requests.

## License
MIT. See [LICENSE](./LICENSE).
