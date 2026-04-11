# Fikir CSS — Productization Task List

> Actionable backlog for turning Fikir CSS into a real product.
> Last reviewed: 2026-04-11

## 1. Usage Notes

This task list follows the productization plan and is organized around workstreams and milestones.

Task types:
- scope / governance
- packaging / release
- implementation maturity
- docs / examples
- accessibility / quality

Legend:
- `[ ]` not started
- `[~]` in progress
- `[x]` done
- `(M1)` Milestone 1
- `(M2)` Milestone 2
- `(M3)` Milestone 3
- `(M4)` Milestone 4

---

## 2. P0 — Must do before calling it a product

### Scope and support classification
- [x] Create a component/pattern support matrix `(M1)`
- [x] Label every public surface as `supported`, `experimental`, `rfc-only`, or `planned` `(M1)`
- [x] Audit README surface list against actual implementation state `(M1)`
- [x] Add support-level labeling to playground sections `(M1)`
- [x] Add support-level labeling to docs navigation `(M1)`

### Product positioning cleanup
- [x] Rewrite README “Current Status” around support levels `(M1)`
- [x] Add “Supported Surface” section to README `(M1)`
- [x] Add “Experimental Surface” section to README `(M1)`
- [x] Add “RFC-only / Planned Surface” section to README `(M1)`
- [x] Clarify package/repo usage expectations `(M1)`

---

## 3. P1 — Packaging and distribution

### Package strategy
- [x] Define package entrypoints `(M1)`
- [x] Decide shipped artifacts vs source-only files `(M1)`
- [x] Define published file list `(M1)`
- [x] Document installation and consumption flow `(M1)`
- [x] Add starter consumer example `(M1)`

### Build/distribution
- [x] Create package distribution checklist `(M1)`
- [x] Ensure generated artifacts are reproducible `(M1)`
- [x] Define dist contract for selectors/migration/size artifacts `(M1)`
- [x] Add package smoke test `(M1)`
- [x] Add post-build validation for publishable outputs `(M1)`

### Release ergonomics
- [x] Define versioning/semver policy `(M1)`
- [x] Create release checklist document `(M1)`
- [x] Add changelog policy `(M1)`
- [x] Add release note template `(M1)`
- [x] Add migration note template `(M1)`

---

## 4. P2 — Core component product-readiness

### Core surface (must support)
- [x] Button support-level declaration `(M1)`
- [x] Input support-level declaration `(M1)`
- [x] Card support-level declaration `(M1)`
- [x] Badge support-level declaration `(M1)`
- [x] Alert support-level declaration `(M1)`
- [x] Label support-level declaration `(M1)`
- [x] Helper Text support-level declaration `(M1)`
- [x] Error Text support-level declaration `(M1)`
- [x] Field / Form Field support-level declaration `(M1)`

### Core implementation hardening
- [x] Button state refinement implementation `(M1)`
- [x] Input validation surface implementation `(M1)`
- [x] Card slot/composition implementation `(M1)`
- [x] Label implementation `(M1)`
- [x] Helper Text implementation `(M1)`
- [x] Error Text implementation `(M1)`
- [x] Field / Form Field implementation `(M1)`

### Core quality
- [x] Add core component regression tests `(M1)`
- [x] Add default behavior invariants `(M1)`
- [x] Add supported usage examples `(M1)`
- [x] Add a11y expectation table for core surfaces `(M1)`

---

## 5. P3 — Minimal overlay/navigation for first supportable release

### Overlay slice
- [x] Choose one supported overlay surface for M1 `(M1)`
- [x] Modal implementation hardening **or** Toast implementation hardening `(M1)`
- [x] Add focus and accessibility tests for chosen overlay `(M1)`
- [x] Add playground example for chosen overlay `(M1)`

### Navigation slice
- [x] Choose one supported navigation slice for M1 `(M1)`
- [x] Tabs hardening **or** Accordion hardening `(M1)`
- [x] Add keyboard/a11y notes `(M1)`
- [x] Add usage example `(M1)`

### Data/display slice
- [x] Choose one supported data/display slice for M1 `(M1)`
- [x] Table hardening **or** Empty State hardening `(M1)`
- [x] Add example `(M1)`
- [x] Add docs note on density/layout expectations `(M1)`

---

## 6. P4 — Accessibility and behavior verification

### Core a11y
- [x] Create component accessibility checklist `(M1)`
- [x] Document button vs link semantics `(M1)`
- [x] Document input/field/error relationships `(M1)`
- [x] Document readonly vs disabled behavior `(M1)`
- [x] Document icon-only surface guidance `(M2)`

### Overlay a11y
- [x] Create overlay focus management checklist `(M2)`
- [x] Add modal/drawer/popover keyboard behavior expectations `(M2)`
- [x] Add dismiss/escape behavior guidance `(M2)`

### Verification
- [x] Decide a11y testing scope in CI `(M2)`
- [x] Add manual accessibility QA checklist `(M1)`
- [x] Add example-based a11y notes in playground/docs `(M1)`

---

## 7. P5 — Documentation system cleanup

### Docs IA
- [x] Add docs landing page by audience `(M1)`
- [x] Split docs into user / maintainer / contributor paths `(M2)`
- [x] Add “where to start” guide `(M1)`
- [x] Add “how to add a component RFC” guide `(M2)`
- [x] Add “how to move RFC to supported implementation” guide `(M2)`

### Current docs consistency
- [x] Audit docs links for dead/incorrect paths `(M1)`
- [x] Cross-check RFC list against implementation/support matrix `(M1)`
- [x] Mark stale docs with status banners `(M1)`
- [x] Add `Last reviewed` convention for core docs `(M2)`

### README polish
- [x] Add install/usage snippet for package consumption `(M1)`
- [x] Add support-level matrix summary `(M1)`
- [x] Add release/migration links `(M1)`
- [x] Add “who this is for” section `(M1)`

---

## 8. P6 — Playground productization

### Playground labeling
- [x] Label sections as supported/experimental/showcase `(M1)`
- [x] Add “build output missing” notice if CSS is absent `(M1)`
- [x] Remove any demo-specific overrides that touch framework classes `(M1)`
- [x] Add section legend/explainer `(M1)`

### Example pages
- [x] Create minimal getting-started page `(M1)`
- [x] Create form validation example `(M2)`
- [x] Create app-shell example refinement `(M2)`
- [x] Create data display example page `(M2)`
- [x] Create accessibility-focused example notes `(M2)`

### Confidence tooling
- [x] Add visual regression plan for playground `(M2)`
- [x] Identify screenshot baseline strategy `(M2)`

---

## 9. P7 — Release engineering and CI hardening

### CI gates
- [x] Ensure source/build tests are mandatory for main `(M1)`
- [x] Add docs link validation `(M2)`
- [x] Add release artifact verification `(M1)`
- [x] Add version/tag consistency checks `(M2)`
- [x] Add package smoke install test `(M1)`

### Release process
- [x] Define release promotion flow `(M1)`
- [x] Define experimental-to-supported criteria `(M1)`
- [x] Create release checklist file `(M1)`
- [x] Create milestone-based release notes process `(M2)`

### Metrics/guardrails
- [x] Define acceptable bundle size thresholds `(M2)`
- [x] Add size diff reporting in CI `(M2)`
- [x] Add alias migration regression guard in release flow `(M1)`

---

## 10. P8 — Governance and external adoption

### Project management
- [x] Convert roadmap into GitHub issues/milestones `(M1)`
- [x] Create labels by workstream and support level `(M1)`
- [~] Open first milestone for supported foundation release `(M1, external GitHub action)`
- [x] Open issue templates for support level promotion `(M2)`

### Community readiness
- [x] Add “request for feedback” issue `(M1)`
- [x] Add “how to evaluate the playground” contributor note `(M2)`
- [~] Collect first external user feedback `(M1, requires real external responses)`
- [x] Add known limitations page `(M1)`

---

## 11. M2 — Core UI kit expansion

### Forms
- [x] Textarea RFC → implementation `(M2)`
- [x] Select RFC → implementation `(M2)`
- [x] Checkbox RFC → implementation `(M2)`
- [x] Radio RFC → implementation `(M2)`
- [x] Switch RFC → implementation `(M2)`
- [x] Input Group RFC → implementation `(M2)`

### Overlay
- [x] Modal `(M2)`
- [x] Toast `(M2)`
- [x] Tooltip `(M2)`
- [x] Popover `(M2)`
- [x] Dropdown Menu `(M2)`
- [x] Drawer `(M2)`

### Navigation
- [x] Tabs `(M2)`
- [x] Accordion `(M2)`
- [x] Pagination `(M2)`
- [x] Breadcrumb `(M2)`

### Display
- [x] Table `(M2)`
- [x] Avatar `(M2)`
- [x] Empty State `(M2)`
- [x] Stat `(M2)`

---

## 12. M3 — Product patterns and app surface

### Layout and patterns
- [x] Navbar `(M3)`
- [x] Sidebar `(M3)`
- [x] Page Header `(M3)`
- [x] Section `(M3)`
- [x] App Shell `(M3)`
- [x] Filter Bar `(M3)`
- [x] Data Table Toolbar `(M3)`
- [x] Settings Panel `(M3)`

### Product examples
- [x] Dashboard example page `(M3)`
- [x] Settings page example `(M3)`
- [x] Data table workflow example `(M3)`

---

## 13. M4 — Advanced surface (phase-gated)

### Advanced components
- [x] Combobox `(M4)`
- [x] Autocomplete `(M4)`
- [x] Command Palette `(M4)`
- [x] Date Picker `(M4)`
- [x] Date Range Picker `(M4)`
- [x] File Upload `(M4)`
- [x] Dropzone `(M4)`
- [x] Data Grid `(M4)`
- [x] Editable Field `(M4)`

### Gate before starting M4
- [~] M1 release shipped `(requires tag + GitHub release publish)`
- [x] M2 support matrix updated
- [x] playground sections labeled
- [x] release process stable
- [x] docs/implementation drift under control

---

## 14. Definition of Done for Product-Ready Surface

A surface is product-ready only if:

- [x] support level declared
- [x] RFC/spec exists
- [x] implementation exists
- [x] canonical surface validated
- [x] naming/token rules respected
- [x] tests exist
- [x] docs exist
- [x] example exists
- [x] accessibility expectations documented
- [x] release impact reviewed

---

## 15. Immediate Next 10 Tasks

- [x] Create support matrix
- [x] Reclassify README surface list by support level
- [x] Label playground sections by support level
- [x] Define package/distribution strategy
- [x] Add release checklist document
- [x] Finish Button/Input/Card/Field product-readiness pass
- [x] Choose one overlay for M1 support
- [x] Choose one navigation slice for M1 support
- [x] Create minimal consumer install example
- [x] Convert roadmap to GitHub milestones/issues

---

## 16. Recommended File Placement

Suggested repo location:
- `docs/roadmap/tasklist.md`
