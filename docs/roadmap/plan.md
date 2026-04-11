# Fikir CSS — Professionalization Plan (v0.4 Track)

> Last reviewed: 2026-04-11
> Replaces: `docs/archive/plan-2026-04-11-v0.3-completed.md`

## 1. Purpose
This plan defines the next phase after v0.3 release: move from strong prototype/product baseline to a more professional, workflow-complete UI foundation.

## 2. Current Baseline
- v0.3 release is published (`v0.3.0`).
- Core and many advanced surfaces are implemented.
- CI/release gates are in place.
- Main remaining growth area is component/workflow completeness versus market expectations.
- Build architecture is contract-manifest driven CSS generation (not SCSS loop-based generation).
- Naming system already supports `plain` and `prefixed` modes for integration risk management.
- Local measured bundle baseline is ~76 KB raw / ~8.9 KB gzip (2026-04-11).

## 3. Strategic Objectives
1. Increase supported surface depth (not only breadth).
2. Close highest-value competitive gaps.
3. Strengthen quality automation (a11y + visual + stability).
4. Improve adoption readiness for real product teams.

## 4. Competitive Positioning Summary
Based on benchmark docs from MUI, Radix, shadcn/ui, and Ant Design, Fikir CSS should prioritize:
- `number-input`
- `rating`
- `tree-view`
- `tags-input`
- `result/status` surface

Detailed analysis: `docs/roadmap/competitive-gap-analysis-2026-04-11.md`
Promotion candidate list: `docs/roadmap/v0.4-promotion-candidates.md`

## 5. Workstreams

### Workstream A — Support-Level Maturity
Objective:
Promote stable experimental surfaces into `supported` with full criteria evidence.

Deliverables:
- promotion candidates list
- support-matrix updates
- release impact records

### Workstream B — Gap Closure Components
Objective:
Implement high-value missing components that complete common app workflows.

Deliverables:
- RFC + implementation + tests + docs + playground examples for each selected gap component

### Workstream C — Data/Product Workflow Depth
Objective:
Make data-heavy and settings-heavy app flows production-credible.

Deliverables:
- workflow-level examples (dashboard/settings/table workflows)
- data grid/table conventions with stronger guidance

### Workstream D — Quality Automation
Objective:
Raise trust with deterministic and repeatable quality checks.

Deliverables:
- a11y CI scope expansion
- visual regression automation progression
- bundle/size guardrails stabilization

### Workstream E — Adoption and Governance
Objective:
Reduce onboarding friction for external teams and contributors.

Deliverables:
- issue/milestone hygiene
- feedback loop with external evaluators
- clearer support promotion lifecycle

### Workstream F — Runtime Efficiency and Interop Hardening
Objective:
Convert external technical feedback into measurable, repo-specific improvements.

Deliverables:
- external review disposition with evidence-backed accept/reject decisions
- gzip-aware bundle guardrail extension
- prefixed-mode CI smoke validation for collision-safe adoption
- logical-property consistency audit (physical -> logical where applicable)
- fluid token pilot (`clamp`) RFC and migration note

## 6. Milestone Proposal

### Milestone P1 — v0.4 Professional Core
Must include:
- first gap components (`number-input`, `rating`, `result`)
- at least 3 experimental -> supported promotions
- improved a11y CI scope and release impact process

### Milestone P2 — Workflow Completeness
Must include:
- `tree-view` and `tags-input`
- stronger data workflow conventions
- external feedback-driven refinements

### Milestone P3 — Advanced Product Readiness
Must include:
- chart integration pattern guidance
- scaled visual/a11y automation
- stable promotion cadence and issue hygiene

## 7. Guardrails
- No feature merges without support-level intent (`supported`/`experimental` target).
- No promotion without criteria evidence.
- No release without passing `test:ci` and release checklist.
- No optimization claim without local measurable evidence (raw + gzip bundle metrics).

## 8. Success Criteria
The v0.4 track is successful when:
- missing high-value workflow components are implemented,
- supported surface is meaningfully expanded,
- quality gates catch regressions earlier,
- at least first external feedback loop is closed with tracked actions,
- performance/interop hardening items are tracked with measurable baselines.
