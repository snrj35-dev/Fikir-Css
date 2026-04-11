# Fikir CSS — Professionalization Task List (v0.4 Track)

> Last reviewed: 2026-04-11
> Replaces: `docs/archive/tasklist-2026-04-11-v0.3-completed.md`

## 1. Usage
Legend:
- `[ ]` not started
- `[~]` in progress
- `[x]` done

Milestones:
- `(P1)` v0.4 Professional Core
- `(P2)` Workflow Completeness
- `(P3)` Advanced Product Readiness

---

## 2. P0 — Reset and Baseline
- [x] Archive completed v0.3 plan into `docs/archive/` `(P1)`
- [x] Archive completed v0.3 tasklist into `docs/archive/` `(P1)`
- [x] Create new v0.4 `plan.md` `(P1)`
- [x] Create new v0.4 `tasklist.md` `(P1)`
- [x] Publish competitor gap analysis doc `(P1)`
- [x] Define v0.4 promotion candidate list (experimental -> supported) `(P1)`

---

## 3. P1 — Support-Level Expansion
- [x] Promote `textarea` to supported (criteria-complete) `(P1)`
- [x] Promote `select` to supported (criteria-complete) `(P1)`
- [x] Promote `checkbox/radio/switch` to supported (criteria-complete) `(P1)`
- [x] Promote at least one overlay (`toast` or `popover`) to supported `(P1)`
- [x] Promote at least one navigation/data slice (`pagination` or `avatar/stat`) `(P1)`
- [x] Update support matrix + release notes for every promotion `(P1)`

---

## 4. P2 — Competitive Gap Components
- [x] `number-input` RFC `(P1)`
- [x] `number-input` implementation + tests + playground/docs `(P1)`
- [x] `rating` RFC `(P1)`
- [x] `rating` implementation + tests + playground/docs `(P1)`
- [x] `result/status` RFC `(P1)`
- [x] `result/status` implementation + tests + playground/docs `(P1)`
- [x] `tree-view` RFC `(P2)`
- [x] `tree-view` implementation + tests + playground/docs `(P2)`
- [x] `tags-input` RFC `(P2)`
- [x] `tags-input` implementation + tests + playground/docs `(P2)`

---

## 5. P3 — Workflow Examples
- [x] Dashboard example page baseline `(P2)`
- [x] Settings example page baseline `(P2)`
- [x] Data table workflow example baseline `(P2)`
- [x] Add multi-step settings workflow with validation states `(P2)`
- [x] Add tree + table mixed enterprise workflow example `(P2)`
- [x] Add result/status page examples for common outcomes `(P2)`

---

## 6. P4 — Quality and Automation
- [x] Define playground visual regression plan `(P1)`
- [x] Define screenshot baseline strategy `(P1)`
- [x] Add deterministic screenshot capture command `(P2)`
- [x] Add per-section visual baseline set for supported slices `(P2)`
- [x] Define bundle size thresholds `(P1)`
- [x] Add CI size diff reporting `(P1)`
- [x] Expand a11y CI scope beyond current baseline `(P2)`

---

## 7. P5 — Governance and Adoption
- [ ] Open M1 milestone on GitHub (manual external action) `(P1)`
- [~] Sync roadmap issues/labels via bootstrap with valid token `(P1)` (dry-run ready; auth apply pending)
- [x] Collect first external user feedback entry `(P1)`
- [x] Collect at least 5 external feedback entries `(P2)`
- [x] Map top 3 recurring feedback themes to roadmap issues `(P2)`

---

## 8. P6 — Release Discipline
- [x] v0.3.0 release published `(P1)`
- [x] v0.4.0 release criteria freeze `(P1)`
- [x] v0.4.0 migration note draft `(P1)`
- [x] v0.4.0 release note draft `(P1)`
- [ ] v0.4.0 release publish `(P1)`

---

## 9. P7 — Technical Hardening (External Review Follow-up)
- [x] Audit external AI review claims against current repo evidence `(P1)`
- [x] Publish external review disposition note (`docs/roadmap/external-review-disposition-2026-04-11.md`) `(P1)`
- [x] Add gzip threshold reporting/validation next to raw size thresholds `(P1)`
- [x] Add `prefixed` naming-mode CI smoke test (`build + selector sanity`) `(P1)`
- [x] Replace discovered framework/playground `margin-top` usages with logical `margin-block-start` equivalents `(P1)`
- [x] Define utility-surface budget policy (core vs optional utilities) `(P2)`
- [x] Create fluid token (`clamp`) RFC + playground comparison `(P2)`

---

## 10. Definition of Done (Surface)
A new surface is considered done only if all are true:
- [x] RFC/spec exists
- [x] Implementation exists
- [x] Canonical selector surface is validated
- [x] Tests pass in `test:ci`
- [x] Accessibility expectations documented
- [x] Playground/docs example exists
- [x] Support level declared in support matrix
- [x] Release impact reviewed
