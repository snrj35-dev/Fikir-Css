# Fikir CSS — Product Supremacy Task List (v1.0 Track)

> Last reviewed: 2026-04-11
> Replaces: `docs/archive/tasklist-2026-04-11-v0.4-released.md`

## 1. Usage
Legend:
- `[ ]` not started
- `[~]` in progress
- `[x]` done

Milestones:
- `(M1)` Product Core Lift
- `(M2)` Competitive Parity+
- `(M3)` Surpass Layer
- `(M4)` v1.0 Product Confidence

---

## 2. P0 — Archive and Reset
- [x] Archive completed v0.4 plan into `docs/archive/` `(M1)`
- [x] Archive completed v0.4 tasklist into `docs/archive/` `(M1)`
- [x] Create new v1.0 `plan.md` `(M1)`
- [x] Create new v1.0 `tasklist.md` `(M1)`

---

## 3. M0 — Product Scoring Baseline
- [ ] Publish `9.9/10` weighted scoring rubric doc `(M1)`
- [ ] Define scoring evidence sources per pillar `(M1)`
- [ ] Add release-time scorecard template `(M1)`
- [ ] Establish comparator baseline matrix (Tailwind/Bootstrap/MUI/Chakra/Mantine/Panda/Headless/Radix) `(M1)`
- [ ] Record current baseline score for each pillar `(M1)`

---

## 4. M1 — Foundation Engine 2.0
- [ ] Freeze token taxonomy v1 (core + semantic + mode tokens) `(M1)`
- [ ] Add token lifecycle policy (add/change/deprecate) `(M1)`
- [ ] Add contract compatibility matrix doc `(M1)`
- [ ] Add selector deprecation window policy `(M1)`
- [ ] Add strict alias removal checklist `(M1)`
- [ ] Expand naming-mode contract tests (plain/prefixed parity) `(M1)`
- [ ] Add automated contract drift report in CI artifact `(M1)`
- [ ] Add bundle layer contribution report (base/layout/utilities/components) `(M1)`

---

## 5. M1 — Support-Level Expansion (Experimental -> Supported)
- [ ] Promote `icon-button/link/divider/surface` pack to supported `(M1)`
- [ ] Promote `tooltip/popover/dropdown-menu` overlay slice to supported `(M1)`
- [ ] Promote `accordion/breadcrumb/navbar/menu-bar/sidebar-nav` slice to supported `(M1)`
- [ ] Promote `stepper/page-header/section-block/app-shell/split-pane` slice to supported `(M1)`
- [ ] Promote `data-grid/result/stat/list/description-list` slice to supported `(M1)`
- [ ] Promote `combobox/search-box/autocomplete/command-palette` slice to supported `(M2)`
- [ ] Promotion evidence bundle per surface (RFC + impl + tests + a11y + examples + release impact) `(M1)`
- [ ] Update support matrix and release artifacts after each promotion wave `(M1)`

---

## 6. M2 — Competitive Gap Closure (New Surfaces)
- [ ] `segmented-control` RFC + implementation + tests + playground/docs `(M2)`
- [ ] `menubar-submenu` interaction hardening package `(M2)`
- [ ] `toast-stack variants` (success/info/warn/error contracts) `(M2)`
- [ ] `skeleton presets` for table/form/card/content `(M2)`
- [ ] `table empty/loading/error states` unified pattern package `(M2)`
- [ ] `virtualized-list/table guidance` (pattern + integration note) `(M2)`
- [ ] `chart embedding pattern` (token/a11y/responsive guidance) `(M2)`
- [ ] `settings-panel` RFC-only -> canonical pattern implementation `(M2)`

---

## 7. M2 — Dual API (Utility + Semantic + Headless)
- [ ] Publish headless contract spec (states, aria, data attributes) `(M2)`
- [ ] Add headless examples for modal/dropdown/popover/tabs/accordion `(M2)`
- [ ] Add class conflict resolution utility RFC and prototype `(M2)`
- [ ] Add recipe-typing strict mode and invalid variant diagnostics `(M2)`
- [ ] Add semantic-to-utility equivalence tables for core supported surfaces `(M2)`

---

## 8. M2 — Theme and Brand Scalability
- [ ] Add high-contrast token mode `(M2)`
- [ ] Add compact density token mode `(M2)`
- [ ] Add comfortable density token mode `(M2)`
- [ ] Add reduced-motion token mode `(M2)`
- [ ] Add rounded/sharp shape mode switches `(M2)`
- [ ] Publish brand theme override cookbook `(M2)`
- [ ] Add theme regression checklist for all supported slices `(M2)`

---

## 9. M2/M3 — Quality Automation Upgrade
- [ ] Add deterministic section screenshot command to CI job `(M2)`
- [ ] Add threshold-based screenshot diff reporting (non-blocking first) `(M2)`
- [ ] Expand a11y CI from static semantics to scenario-level interaction assertions `(M2)`
- [ ] Add keyboard traversal matrix tests for overlay/navigation components `(M2)`
- [ ] Add contrast regression script for critical supported states `(M3)`
- [ ] Add flaky-test detector and quarantine workflow `(M3)`

---

## 10. M3 — Performance and Runtime Superiority
- [ ] Split optional CSS surfaces for opt-in distribution `(M3)`
- [ ] Add component-level CSS usage map in build outputs `(M3)`
- [ ] Add dead-surface detection report for playground examples `(M3)`
- [ ] Publish parsing-cost benchmark methodology `(M3)`
- [ ] Add baseline-to-release performance trend dashboard doc `(M3)`
- [ ] Keep gzip under defined target bands during M3 releases `(M3)`

---

## 11. M3 — Docs and DX Supremacy
- [ ] Convert README into short-first, deep-link second IA `(M3)`
- [ ] Create task-oriented docs hub (user/contributor/maintainer quick paths) `(M3)`
- [ ] Add “from Tailwind / from Bootstrap / from MUI” migration quickstarts `(M3)`
- [ ] Add copy-paste starter templates for app-shell/settings/data workflows `(M3)`
- [ ] Add anti-patterns and troubleshooting handbook `(M3)`
- [ ] Add docs quality checks for stale markers and cross-link freshness `(M3)`

---

## 12. M3 — Ecosystem and Integration
- [ ] Publish React adapter guidance for recipe + headless usage `(M3)`
- [ ] Publish Vue adapter guidance `(M3)`
- [ ] Publish Svelte adapter guidance `(M3)`
- [ ] Publish SSR/hydration-safe usage conventions `(M3)`
- [ ] Add design-token export format mapping (CSS vars -> JSON) `(M3)`
- [ ] Add Figma token handoff guidance `(M3)`

---

## 13. M3/M4 — Governance and Adoption
- [ ] Open and maintain active v1.0 milestone on GitHub `(M1)`
- [ ] Sync roadmap issues/labels using valid auth token `(M1)`
- [ ] Keep external feedback log active for every release cycle `(M2)`
- [ ] Maintain recurring top-3 feedback theme mapping updates `(M2)`
- [ ] Add monthly roadmap decision log `(M3)`
- [ ] Add contributor growth and review-SLA targets `(M4)`

---

## 14. M4 — Release Discipline and Product Confidence
- [ ] Define v1.0 support-level freeze checklist `(M4)`
- [ ] Define v1.0 migration guarantee policy `(M4)`
- [ ] Add API stability badges for supported surfaces `(M4)`
- [ ] Add versioned compatibility matrix for adapters/integrations `(M4)`
- [ ] Publish v1.0 release candidate notes pack `(M4)`
- [ ] Publish final `v1.0.0` release `(M4)`

---

## 15. Carry-over Completed Hardening Pack (Locked)
- [x] Define utility-surface budget policy (core vs optional utilities) `(P2)`
- [x] Create fluid token (`clamp`) RFC + playground comparison `(P2)`

---

## 16. Definition of Done (v1.0 Surface)
- [ ] RFC/spec exists and is current
- [ ] Implementation exists with canonical selector contract
- [ ] Source/build tests exist and pass in `npm run test:ci`
- [ ] Accessibility expectations are documented and verified
- [ ] Playground/docs examples exist and are link-valid
- [ ] Support level is declared in support matrix
- [ ] Release impact review is recorded
- [ ] Migration implications are documented when needed
