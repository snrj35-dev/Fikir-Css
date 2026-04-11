# Fikir CSS — Prototype to Product Plan

> Detailed plan to evolve Fikir CSS from a contract-driven prototype into a publishable, supportable product.
> Last reviewed: 2026-04-11

## 1. Purpose

This document defines the productization plan for Fikir CSS based on the current public repository state.

Fikir CSS already has a strong architectural foundation:
- contract-driven selector generation
- build-time CSS output
- validation pipeline
- naming and token specifications
- broad RFC coverage
- playground/demo and CI scaffolding

However, it is still explicitly positioned as a prototype, not a complete framework. The next stage is not “add more things”, but “turn what exists into something releasable, stable, and trustworthy”.

This plan focuses on that transition.

---

## 2. Current Reality Snapshot

### Strengths already present

Fikir CSS already has:
- a clear prototype framing
- a contract-first architecture
- a build/validation pipeline
- a documentation map with architecture notes, specs, and many RFCs
- a playground that demonstrates current surface area
- test/CI infrastructure
- release and migration note structure

### Product gaps still visible

To become a real product, Fikir CSS still needs:
- a clear supported surface vs planned surface distinction
- packaging/distribution ergonomics
- a stable consumer installation story
- stronger release automation and compatibility guarantees
- implementation maturity tracking per component
- browser/runtime support policy
- accessibility verification beyond documentation
- visual regression and real consumer examples
- governance and versioning discipline
- external adoption hooks (examples, starter usage, migration guidance)

---

## 3. Productization Goals

The product phase should produce the following outcomes:

1. **Stable consumer story**  
   A user can install, build, and use Fikir CSS without reading the entire repo.

2. **Explicit support model**  
   Supported, experimental, RFC-only, and planned surfaces are clearly separated.

3. **Release confidence**  
   A release should be backed by compatibility checks, migration artifacts, docs, and validation.

4. **Implementation credibility**  
   The implemented surface should match public claims in README and playground.

5. **Operational maintainability**  
   The project should be governable through issues, milestones, release notes, CI, and roadmap discipline.

---

## 4. Productization Principles

### 4.1 Stabilize before expanding
Do not continue broad surface expansion until the existing public surface is classified and support levels are explicit.

### 4.2 Public claims must be auditable
Anything listed in README/playground must be traceable to one of:
- implemented and tested
- implemented but experimental
- RFC-only
- planned only

### 4.3 Prefer smaller supported surface over broad ambiguous surface
A smaller but clearly supported v1.0 is better than a very broad but undefined “component surface”.

### 4.4 Docs must reflect delivery state
Specs and RFCs are assets, but they must stay synchronized with implementation and release state.

### 4.5 Product quality requires adoption workflows
A “real product” needs:
- install instructions
- examples
- versioning policy
- support expectations
- migration policy
- release discipline

---

## 5. Productization Workstreams

### Workstream A — Surface Classification and Product Scope

#### Objective
Define what Fikir CSS actually supports today and what it only documents.

#### Deliverables
- support matrix for every surface
- explicit labels: `supported`, `experimental`, `rfc-only`, `planned`
- README cleanup to reflect support status
- playground labeling aligned with support status

#### Why this matters
The current repository exposes a very broad component/pattern surface. That is powerful for exploration, but risky for product perception.

### Workstream B — Packaging and Distribution

#### Objective
Make Fikir CSS installable and consumable as a package, not only as a repo build.

#### Deliverables
- package export strategy
- distribution layout
- install/use documentation
- generated artifact publishing policy
- starter consumption example
- versioned release packaging

#### Questions to resolve
- What is the primary package entrypoint?
- Which files are shipped vs source-only?
- Are generated artifacts committed, published, or both?
- What is the support contract for `contracts/*.mjs` and generated files?

### Workstream C — Release Engineering and Compatibility

#### Objective
Turn build/test success into release trust.

#### Deliverables
- semver policy
- release gates
- alias migration validation in release flow
- changelog discipline
- release checklist
- compatibility matrix

#### Required release gates
- build success
- source/build tests
- contract parity validation
- migration artifact generation
- size report generation
- docs/release note update

### Workstream D — Component Product Readiness

#### Objective
Convert RFC-backed surfaces into product-ready surfaces.

#### Product readiness criteria
A component is product-ready only if it has:
- RFC/spec
- canonical class surface
- token usage aligned with token dictionary
- implementation status clearly declared
- tests
- demo examples
- accessibility expectations documented
- migration impact understood

#### Initial priority set
- Button
- Input
- Card
- Label / Helper Text / Error Text / Field
- Modal
- Table
- Tabs / Accordion / Pagination
- Avatar / Empty State / Badge / Alert

### Workstream E — Accessibility Quality

#### Objective
Move from a11y documentation to verifiable accessibility quality.

#### Deliverables
- accessibility checklist by component category
- keyboard behavior expectations
- overlay focus management tests
- semantic usage examples
- invalid/error/help text examples
- icon-only and interactive surface guidance

#### Scope priorities
- Button / Link semantics
- Input / Form Field relationships
- Modal / Drawer / Popover focus handling
- Menu-like surfaces
- Clickable vs non-clickable card/surface rules

### Workstream F — Documentation and Information Architecture

#### Objective
Restructure docs from “many good files” into a product documentation system.

#### Deliverables
- docs IA by audience:
  - getting started
  - architecture
  - contracts/specs
  - components
  - patterns
  - testing/quality
  - migration/releases
- implemented vs experimental markers
- docs landing pages by domain
- contributor path for adding a component/pattern

#### Key principle
Documentation should support:
- users
- contributors
- maintainers
- release managers

Not just architecture readers.

### Workstream G — Playground and Example Strategy

#### Objective
Turn the playground from a broad showcase into a product-quality example surface.

#### Deliverables
- labeled sections by support level
- minimal getting-started example
- realistic product example pages
- app-shell example
- form validation example
- data display example
- accessibility example notes

#### Product role of playground
The playground should answer:
- what is implemented
- what is stable
- how to use it
- how override behavior works

### Workstream H — Governance and Community Setup

#### Objective
Prepare the project for external users and contributors.

#### Deliverables
- issue taxonomy
- milestones by release
- labels for support level and workstream
- roadmap issue mapping
- contribution path for RFC → implementation
- maintainer checklist

#### Suggested issue labels
- `rfc`
- `implementation`
- `docs`
- `quality`
- `a11y`
- `release`
- `migration`
- `experimental`
- `good first issue`

---

## 6. Product Milestones

### Milestone 1 — Supported Foundation Release

#### Goal
Ship the first release that is small but genuinely supportable.

#### Must include
- stable install/build path
- explicit support matrix
- productized README
- release checklist
- supported core surface:
  - Button
  - Input
  - Card
  - Badge
  - Alert
  - Label / Helper / Error Text / Field
  - one overlay (`Modal` or `Toast`)
  - one navigation slice (`Tabs` or `Accordion`)
- compatibility/migration notes
- CI-backed release gates

#### Non-goal
Do not ship the whole roadmap in this milestone.

### Milestone 2 — Core Product UI Kit

#### Goal
Extend beyond foundation into a credible core UI kit.

#### Candidate scope
- form controls:
  - Textarea
  - Select
  - Checkbox
  - Radio
  - Switch
  - Input Group
- overlays:
  - Modal
  - Toast
  - Tooltip
  - Popover
  - Dropdown Menu
- navigation:
  - Tabs
  - Accordion
  - Pagination
  - Breadcrumb
- display:
  - Table
  - Avatar
  - Empty State
  - Stat

#### Required for milestone exit
- support status visible in docs/playground
- stronger a11y verification
- example pages
- release tags and changelog discipline

### Milestone 3 — Product Patterns and Real App Surface

#### Goal
Show that Fikir CSS is useful for real product interfaces, not only isolated widgets.

#### Candidate scope
- App Shell
- Page Header
- Section
- Sidebar
- Navbar
- Filter Bar
- Data Table Toolbar
- Settings Panel
- KPI Card / Timeline / Data display examples

#### Required for milestone exit
- at least 2 realistic example pages
- clear primitive/composite/pattern separation
- stronger navigation/layout guidance

### Milestone 4 — Advanced Surface (Phase-gated)

#### Goal
Adopt advanced components only after core product maturity exists.

#### Candidate scope
- Combobox
- Autocomplete
- Command Palette
- Date Picker
- Date Range Picker
- File Upload
- Dropzone
- Data Grid
- Editable Field

#### Rule
No advanced surface should be marked supported before:
- support matrix exists
- release engineering is stable
- component readiness criteria are enforced
- playground/examples show real usage

---

## 7. Release Readiness Checklist

A release should not be cut unless all of the following are true:

- [ ] support matrix updated
- [ ] README current status updated
- [ ] docs links valid
- [ ] build passes
- [ ] source tests pass
- [ ] build tests pass
- [ ] migration artifacts generated
- [ ] size report generated
- [ ] release notes written
- [ ] migration notes reviewed
- [ ] supported/experimental labels updated
- [ ] playground reflects current release state

---

## 8. Product Readiness Checklist by Surface

A component/pattern should be considered product-ready only if:

- [ ] RFC/spec exists
- [ ] implementation exists
- [ ] support level is declared
- [ ] canonical class surface is stable
- [ ] token usage aligns with token dictionary
- [ ] naming aligns with naming spec
- [ ] tests exist
- [ ] a11y expectations are documented
- [ ] example exists in playground/docs
- [ ] release impact is understood

---

## 9. Near-Term Recommended Sequence

### Phase A — Re-scope and stabilize
- classify all current public surfaces
- create support matrix
- update README/playground labels
- define first “supported foundation” release scope

### Phase B — Package and release foundation
- formalize packaging/distribution
- add release engineering guardrails
- publish first supportable package/release

### Phase C — Harden core components
- finish product-readiness pass for core surfaces
- strengthen a11y and example coverage
- close high-value docs gaps

### Phase D — Expand into core UI kit
- add/support form and overlay slices
- improve example pages
- build trust before broad expansion

---

## 10. Risks

### Risk 1 — Public surface inflation
The repository presents a wider surface area than can likely be supported today.

**Mitigation:** support matrix, labels, README/playground cleanup.

### Risk 2 — Docs/implementation drift
The docs and RFC inventory is already large.

**Mitigation:** release gates must include docs alignment checks and ownership.

### Risk 3 — Prototype architecture without consumer ergonomics
A technically strong repo can still fail as a product if installation and usage remain repo-centric.

**Mitigation:** packaging/distribution and starter consumption examples.

### Risk 4 — Advanced surface too early
Complex components can consume attention before core supportability exists.

**Mitigation:** milestone-gate advanced surface behind core maturity.

---

## 11. Definition of Success

Fikir CSS is no longer “just a prototype” when:

- a newcomer can install and use it from published artifacts
- supported vs experimental surface is obvious
- releases are gated and repeatable
- docs match implementation
- core surfaces are stable and tested
- the playground demonstrates supported usage, not just possibility
- contribution and migration paths are explicit

---

## 12. Recommended File Placement

Suggested repo location:
- `docs/roadmap/plan.md`
