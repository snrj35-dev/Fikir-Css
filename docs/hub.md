# Fikir CSS — Docs Hub

> Central navigation for all documentation. Find your path by role.

---

## By Role

### I'm a Consumer (using Fikir CSS in a project)

| Task | Doc |
|------|-----|
| Get started fast | [README quick start](../README.md#quick-start) |
| See what's available | [Support matrix](./roadmap/support-matrix.md) |
| Use in React | [React adapter](./guides/react-adapter.md) |
| Use in Vue | [Vue adapter](./guides/vue-adapter.md) |
| Use in Svelte | [Svelte adapter](./guides/svelte-adapter.md) |
| SSR / hydration safety | [SSR conventions](./guides/ssr-hydration-conventions.md) |
| Migrate from Tailwind | [Migration guide](./guides/migration-from-tailwind.md) |
| Migrate from Bootstrap | [Migration guide](./guides/migration-from-bootstrap.md) |
| Migrate from MUI | [Migration guide](./guides/migration-from-mui.md) |
| Wire JS behavior (headless) | [Headless contract](./architecture/headless-contract-spec.md) · [Examples](./architecture/headless-examples.md) |
| Override tokens / brand | [Brand cookbook](./architecture/brand-theme-cookbook.md) |
| Use dark/compact/high-contrast modes | [`packages/tokens/themes/`](../packages/tokens/themes/) |
| Resolve class conflicts | [Class conflict RFC](./rfcs/class-conflict-resolution-rfc.md) |
| Debug / avoid mistakes | [Anti-patterns](./guides/anti-patterns.md) |
| Token → Figma handoff | [Figma handoff](./guides/figma-token-handoff.md) · [Token export](./guides/design-token-export.md) |
| Embed charts | [Chart embedding pattern](./architecture/chart-embedding-pattern.md) |
| Use virtualized lists | [Virtualized list guidance](./architecture/virtualized-list-guidance.md) |

---

### I'm a Contributor (adding or improving a component)

| Task | Doc |
|------|-----|
| Add a new component RFC | [RFC authoring guide](./contributor/how-to-add-component-rfc.md) |
| Understand class naming rules | [Naming convention spec](./contracts/naming-convention-spec.md) |
| Understand the contract system | [Naming contract](./contracts/naming-contract.md) · [Recipe contract](./contracts/recipe-contract.md) |
| Understand token taxonomy | [Token dictionary spec](./contracts/token-dictionary-spec.md) |
| Run tests | `npm run test:source` · `npm run test:build` |
| Add a build surface test | [`tests/build/`](../tests/build/) |
| Check bundle layer sizes | `npm run report:bundle-layers` |
| Check playground coverage | `npm run report:dead-surfaces` |
| Write headless wiring for a component | [Headless contract](./architecture/headless-contract-spec.md) |
| Understand semantic-to-utility mapping | [Equivalence tables](./architecture/semantic-utility-equivalence.md) |

---

### I'm a Maintainer (releasing, promoting, governing)

| Task | Doc |
|------|-----|
| Promote a surface to supported | [Promotion guide](./maintainer/how-to-move-rfc-to-supported.md) |
| Run a release | [Release checklist](./release/release-checklist.md) · [Release flow](./release/release-promotion-flow.md) |
| Update support matrix | [Support matrix](./roadmap/support-matrix.md) |
| Validate publishable outputs | `npm run validate:publish` · `npm run validate:version` |
| Track bundle size | [Performance dashboard](./release/performance-trend-dashboard.md) · `npm run validate:size` |
| Run contrast regression | `npm run report:contrast` |
| Check theme regression | [Theme checklist](./testing/theme-regression-checklist.md) |
| v1.0 freeze checklist | [Freeze checklist](./release/v1.0-support-freeze-checklist.md) |
| Migration guarantee | [Guarantee policy](./release/v1.0-migration-guarantee-policy.md) |
| Decision log | [Roadmap decision log](./governance/roadmap-decision-log.md) |
| External feedback | [Feedback log](./governance/external-feedback-log.md) |

---

## By Topic

### Architecture
- [Technical summary](./architecture/technical-summary.md)
- [Headless contract spec](./architecture/headless-contract-spec.md)
- [Headless examples](./architecture/headless-examples.md)
- [Brand theme cookbook](./architecture/brand-theme-cookbook.md)
- [Semantic-to-utility equivalence](./architecture/semantic-utility-equivalence.md)
- [Overlay layering / z-index](./architecture/overlay-layering-z-index-notes.md)
- [Virtualized list / table guidance](./architecture/virtualized-list-guidance.md)
- [Chart embedding pattern](./architecture/chart-embedding-pattern.md)
- [Product patterns](./architecture/product-patterns.md)

### Contracts
- [Naming contract](./contracts/naming-contract.md)
- [Naming convention spec](./contracts/naming-convention-spec.md)
- [Recipe contract](./contracts/recipe-contract.md)
- [Token dictionary spec](./contracts/token-dictionary-spec.md)

### RFCs
- [Segmented Control RFC](./rfcs/components/segmented-control-rfc.md)
- [Class Conflict Resolution RFC](./rfcs/class-conflict-resolution-rfc.md)
- All component RFCs: [`docs/rfcs/components/`](./rfcs/components/)
- All foundation RFCs: [`docs/rfcs/foundations/`](./rfcs/foundations/)

### Testing & Quality
- [Theme regression checklist](./testing/theme-regression-checklist.md)
- [Parsing-cost benchmark](./testing/parsing-cost-benchmark.md)
- [Manual a11y QA checklist](./testing/manual-accessibility-qa-checklist.md)
- [A11y CI scope](./testing/a11y-ci-scope.md)

### Release & Governance
- [Versioning / semver policy](./release/versioning-semver-policy.md)
- [Performance trend dashboard](./release/performance-trend-dashboard.md)
- [v1.0 support freeze checklist](./release/v1.0-support-freeze-checklist.md)
- [v1.0 migration guarantee policy](./release/v1.0-migration-guarantee-policy.md)
- [Roadmap decision log](./governance/roadmap-decision-log.md)
- [External feedback log](./governance/external-feedback-log.md)

### Guides
- [Migration from Tailwind](./guides/migration-from-tailwind.md)
- [Migration from Bootstrap](./guides/migration-from-bootstrap.md)
- [Migration from MUI](./guides/migration-from-mui.md)
- [React adapter](./guides/react-adapter.md)
- [Vue adapter](./guides/vue-adapter.md)
- [Svelte adapter](./guides/svelte-adapter.md)
- [SSR / hydration conventions](./guides/ssr-hydration-conventions.md)
- [Design token export formats](./guides/design-token-export.md)
- [Figma token handoff](./guides/figma-token-handoff.md)
- [Anti-patterns & troubleshooting](./guides/anti-patterns.md)

---

## Starter Templates

Copy-paste starter HTML files for common application patterns:

| Template | File |
|----------|------|
| App shell (navbar + sidebar + content) | [`playground/templates/app-shell-starter.html`](../playground/templates/app-shell-starter.html) |
| Settings page | [`playground/templates/settings-starter.html`](../playground/templates/settings-starter.html) |
| Data workflow (table + filters + toolbar) | [`playground/templates/data-workflow-starter.html`](../playground/templates/data-workflow-starter.html) |
