# Fikir CSS — Baseline Score Record

> Created: 2026-04-12
> Snapshot date: 2026-04-12 (post v0.4 release, v1.0 track start)

## Purpose

Records the current product score for each pillar at the start of the v1.0 track. This is the baseline against which M1/M2/M3/M4 progress is measured.

---

## Current Baseline Scores (v0.4 Baseline)

| # | Pillar | Weight | Score | Weighted | Notes |
|---|--------|--------|-------|---------|-------|
| 1 | Surface depth and completeness | 20% | 7.5 | 1.50 | Large experimental surface exists; 14 supported components + 7 layouts. Advanced surfaces still experimental. |
| 2 | Accessibility and quality trust | 20% | 7.0 | 1.40 | Core a11y docs exist. Static semantics CI present. Keyboard traversal tests not yet active. Contrast CI missing. |
| 3 | Runtime and bundle performance | 15% | 7.5 | 1.13 | Size report and gzip tracking in CI. Budget bands defined. Component-level opt-in not yet available. |
| 4 | DX and tooling excellence | 20% | 7.5 | 1.50 | Contract-driven build with alias migration. Type-safe recipe resolvers generated. Contract drift CI not yet implemented. |
| 5 | Documentation and adoption readiness | 15% | 6.5 | 0.98 | README exists. Playground with demos. Migration notes present but no framework quickstarts. Docs IA not task-oriented. |
| 6 | Governance and release discipline | 10% | 7.5 | 0.75 | Release checklist enforced. Semver policy and changelog policy exist. GitHub milestone not yet active. Feedback log informal. |
| | **Weighted Total** | **100%** | | **7.26** | |

---

## Target vs. Baseline Gap

| Milestone | Target Score | Gap from Baseline |
|-----------|-------------|------------------|
| M1 — Product Core Lift | >= 9.0 | +1.74 |
| M2 — Competitive Parity+ | >= 9.4 | +2.14 |
| M3 — Surpass Layer | >= 9.7 | +2.44 |
| M4 — v1.0 Confidence | >= 9.9 | +2.64 |

---

## Per-Pillar Gap Analysis

### Pillar 1 — Surface Depth and Completeness (current: 7.5 → target: 10.0)

**Gap:** `+2.5`

Key actions needed:
- Promote 5 experimental waves to supported (M1 tasklist Section 5).
- Add M2 gap surfaces: `segmented-control`, `toast-stack variants`, `skeleton presets`, `table states`.
- Ensure all supported surfaces have full evidence bundle (RFC + test + a11y + playground).

### Pillar 2 — Accessibility and Quality Trust (current: 7.0 → target: 10.0)

**Gap:** `+3.0`

Key actions needed:
- Add keyboard traversal matrix tests for overlay/navigation components (M2).
- Expand a11y CI from static semantics to scenario-level interaction assertions (M2).
- Add contrast regression CI for critical supported states (M3).

### Pillar 3 — Runtime and Bundle Performance (current: 7.5 → target: 10.0)

**Gap:** `+2.5`

Key actions needed:
- Add component-level CSS usage map in build outputs (M3).
- Add dead-surface detection report (M3).
- Publish parsing-cost benchmark methodology (M3).
- Keep gzip under defined target bands throughout M3 releases.

### Pillar 4 — DX and Tooling Excellence (current: 7.5 → target: 10.0)

**Gap:** `+2.5`

Key actions needed:
- Expand naming-mode contract tests for plain/prefixed parity (M1).
- Add automated contract drift report in CI artifact (M1).
- Add recipe-typing strict mode and invalid variant diagnostics (M2).
- Add class conflict resolution utility RFC and prototype (M2).
- Add semantic-to-utility equivalence tables (M2).

### Pillar 5 — Documentation and Adoption Readiness (current: 6.5 → target: 10.0)

**Gap:** `+3.5`

Key actions needed:
- Convert README into short-first, deep-link second IA (M3).
- Create task-oriented docs hub (M3).
- Add migration quickstarts for Tailwind, Bootstrap, MUI (M3).
- Add copy-paste starter templates (M3).
- Add anti-patterns handbook (M3).
- Add docs quality CI checks (M3).

### Pillar 6 — Governance and Release Discipline (current: 7.5 → target: 10.0)

**Gap:** `+2.5`

Key actions needed:
- Open and maintain active v1.0 milestone on GitHub (M1).
- Sync roadmap issues/labels (M1).
- Keep external feedback log active for every release cycle (M2).
- Add monthly roadmap decision log (M3).
- Add contributor growth and review-SLA targets (M4).

---

## Score History

| Version | Date | P1 | P2 | P3 | P4 | P5 | P6 | Total |
|---------|------|----|----|----|----|----|----|-------|
| v0.4 (baseline) | 2026-04-12 | 7.5 | 7.0 | 7.5 | 7.5 | 6.5 | 7.5 | 7.26 |

*(Add new rows after each milestone release candidate.)*

---

## Related Documents

- `docs/roadmap/scoring-rubric.md`
- `docs/roadmap/scoring-evidence-sources.md`
- `docs/roadmap/comparator-baseline-matrix.md`
- `docs/release/scorecard-template.md`
