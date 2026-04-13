# Fikir CSS — Product Scoring Rubric (9.9/10 Target)

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This document defines the weighted scoring model used to measure Fikir CSS progress toward the `9.9/10` product quality target declared in `docs/roadmap/plan.md`.

Each pillar has a weight. The weighted average of all pillar scores must reach `>= 9.9` for two consecutive release candidate rounds to declare v1.0 readiness.

---

## Scoring Model

| # | Pillar | Weight | Max Points |
|---|--------|--------|-----------|
| 1 | Surface depth and completeness | 20% | 10 |
| 2 | Accessibility and quality trust | 20% | 10 |
| 3 | Runtime and bundle performance | 15% | 10 |
| 4 | DX and tooling excellence | 20% | 10 |
| 5 | Documentation and adoption readiness | 15% | 10 |
| 6 | Governance and release discipline | 10% | 10 |

**Weighted score formula:**

```
score = (P1 * 0.20) + (P2 * 0.20) + (P3 * 0.15) + (P4 * 0.20) + (P5 * 0.15) + (P6 * 0.10)
```

---

## Pillar Scoring Criteria

### Pillar 1 — Surface Depth and Completeness (20%)

| Score | Criteria |
|-------|----------|
| 10.0 | Full component parity with Tailwind/Bootstrap/MUI baseline. Workflow-complete composability. All supported surfaces have RFC + implementation + tests + a11y + docs. |
| 9.0–9.9 | Near-complete. One or two minor surfaces missing or in experimental. |
| 8.0–8.9 | Core components complete; advanced surfaces (date-picker, tree-view, command-palette) still experimental. |
| 7.0–7.9 | Significant gaps in navigation, overlay, or data-display slices. |
| < 7.0 | More than 20% of the required surface is missing or unimplemented. |

**Key evidence sources:**
- `docs/roadmap/support-matrix.md` (supported vs experimental count)
- `packages/components/*.css` (implementation coverage)
- `tests/build/*.test.mjs` (test coverage per surface)

---

### Pillar 2 — Accessibility and Quality Trust (20%)

| Score | Criteria |
|-------|----------|
| 10.0 | All supported surfaces have documented a11y expectations. Keyboard traversal tests pass. Contrast regression CI is active. Scenario-level interaction assertions in CI. |
| 9.0–9.9 | A11y docs and static semantics CI complete. Keyboard tests cover ≥ 90% of overlay/navigation surfaces. |
| 8.0–8.9 | A11y docs present but keyboard tests are partial. Contrast CI not yet active. |
| 7.0–7.9 | A11y docs for core surfaces only; overlay/navigation surfaces undocumented. |
| < 7.0 | No systematic a11y documentation or automation. |

**Key evidence sources:**
- `docs/architecture/core-accessibility-expectations.md`
- `docs/architecture/overlay-accessibility-expectations.md`
- `tests/source/a11y-expanded-ci-scope.test.mjs`

---

### Pillar 3 — Runtime and Bundle Performance (15%)

| Score | Criteria |
|-------|----------|
| 10.0 | Gzip size within defined budget bands. Component-level CSS map in build. Dead-surface detection active. Parsing-cost benchmark published. |
| 9.0–9.9 | Gzip budget held. Size report in CI. Component-level map draft exists. |
| 8.0–8.9 | Gzip budget defined and monitored but component-level opt-in not available. |
| 7.0–7.9 | Gzip tracked informally; no CI guardrails. |
| < 7.0 | No size tracking or budget enforcement. |

**Key evidence sources:**
- `dist/contracts/size-report.json`
- `docs/release/bundle-size-thresholds.md`
- `scripts/validate-size-thresholds.mjs`

---

### Pillar 4 — DX and Tooling Excellence (20%)

| Score | Criteria |
|-------|----------|
| 10.0 | Type-safe recipe API with strict mode and invalid variant diagnostics. Contract drift CI artifact. Alias migration tooling. Class conflict resolution utility. Semantic-to-utility equivalence tables. |
| 9.0–9.9 | Recipe API functional with types. Contract drift report exists. Migration tooling covers all supported surfaces. |
| 8.0–8.9 | Recipe API exists. Types partial. No drift report or conflict resolution. |
| 7.0–7.9 | Build system works but recipe API is manual. No type safety. |
| < 7.0 | No recipe API or meaningful DX tooling. |

**Key evidence sources:**
- `contracts/naming.contract.mjs`
- `contracts/recipes.contract.mjs`
- `packages/recipes/generated/resolvers.ts`
- `dist/contracts/selectors.json`

---

### Pillar 5 — Documentation and Adoption Readiness (15%)

| Score | Criteria |
|-------|----------|
| 10.0 | Task-oriented docs hub. Migration quickstarts (Tailwind/Bootstrap/MUI). Copy-paste starter templates. Anti-patterns handbook. Docs quality CI checks active. |
| 9.0–9.9 | README is clear and short-first. Migration guides exist for top two competitors. Playground examples cover all supported surfaces. |
| 8.0–8.9 | Docs exist but are not task-oriented. Migration guides draft only. |
| 7.0–7.9 | Core docs exist; advanced surfaces undocumented. No migration guidance. |
| < 7.0 | Minimal documentation. No onboarding path. |

**Key evidence sources:**
- `README.md`
- `docs/migration/`
- `playground/index.html`
- `docs/INDEX.md`

---

### Pillar 6 — Governance and Release Discipline (10%)

| Score | Criteria |
|-------|----------|
| 10.0 | Active v1.0 milestone on GitHub. Feedback log maintained every cycle. Monthly roadmap decision log. Contributor growth targets defined. API stability badges. |
| 9.0–9.9 | GitHub milestone active. Release checklist enforced. Feedback log active. |
| 8.0–8.9 | Release checklist exists. Milestone on GitHub but feedback loop informal. |
| 7.0–7.9 | Release process documented but not enforced. No GitHub milestone. |
| < 7.0 | Ad-hoc release process. No governance documentation. |

**Key evidence sources:**
- `docs/release/release-checklist.md`
- `docs/release/changelog-policy.md`
- `docs/community/`
- `.github/workflows/`

---

## Exit Condition

Fikir CSS v1.0 is ready when:
1. Weighted score `>= 9.9` is achieved.
2. Score is maintained for **two consecutive release candidate rounds**.
3. No single pillar score falls below `9.5`.

---

## Related Documents

- `docs/roadmap/plan.md` — strategic goals and milestone framework
- `docs/roadmap/scoring-evidence-sources.md` — per-pillar evidence source definitions
- `docs/roadmap/baseline-score-record.md` — current score snapshot
- `docs/release/scorecard-template.md` — release-time scorecard template
