# Fikir CSS — Scoring Evidence Sources per Pillar

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This document defines, for each scoring pillar, the authoritative evidence sources used to assign a score. Reviewers must consult these sources when filling out a scorecard.

See `docs/roadmap/scoring-rubric.md` for the full scoring criteria.

---

## Pillar 1 — Surface Depth and Completeness

| Evidence Source | What It Proves |
|----------------|----------------|
| `docs/roadmap/support-matrix.md` | Counts of supported vs experimental vs rfc-only surfaces |
| `packages/components/*.css` | Implementation existence per surface |
| `packages/layouts/*.css` | Layout primitive coverage |
| `tests/build/*.test.mjs` | Per-surface regression test existence |
| `tests/source/single-class-surface.test.mjs` | Recipe-layer coverage completeness |
| `docs/rfcs/components/` | RFC/spec existence per surface |
| `playground/index.html` | Public demo availability per surface |

**Scoring notes:**
- Each surface must have: implementation + test + RFC/spec + playground demo to count as fully complete.
- Experimental surfaces count as 0.5 toward completeness.
- RFC-only surfaces count as 0.1.

---

## Pillar 2 — Accessibility and Quality Trust

| Evidence Source | What It Proves |
|----------------|----------------|
| `docs/architecture/core-accessibility-expectations.md` | Core a11y standards definition |
| `docs/architecture/overlay-accessibility-expectations.md` | Overlay-specific a11y expectations |
| `docs/architecture/navigation-accessibility-notes.md` | Navigation component a11y |
| `tests/source/a11y-expanded-ci-scope.test.mjs` | A11y CI scope automation |
| `tests/source/a11y-scope-docs.test.mjs` | A11y docs coverage validation |
| `.github/workflows/ci.yml` | CI pipeline a11y check integration |
| Per-surface RFC a11y sections | Surface-level documented a11y requirements |

**Scoring notes:**
- Static semantics CI counts as baseline.
- Keyboard traversal tests per overlay/navigation surface are required for 9.0+.
- Contrast regression CI is required for 10.0.

---

## Pillar 3 — Runtime and Bundle Performance

| Evidence Source | What It Proves |
|----------------|----------------|
| `dist/contracts/size-report.json` | Current raw + gzip sizes |
| `docs/release/bundle-size-thresholds.md` | Defined budget bands |
| `scripts/validate-size-thresholds.mjs` | CI budget enforcement |
| `scripts/report-size-diff.mjs` | Release-to-release size diff |
| `scripts/report-bundle-layers.mjs` | Per-layer CSS contribution breakdown |
| `scripts/css-manifest.mjs` | Full list of included CSS files |

**Scoring notes:**
- A defined gzip budget band that is enforced in CI is required for 8.0+.
- Component-level CSS contribution map is required for 9.0+.
- Dead-surface detection is required for 10.0.

---

## Pillar 4 — DX and Tooling Excellence

| Evidence Source | What It Proves |
|----------------|----------------|
| `contracts/naming.contract.mjs` | Selector contract source of truth |
| `contracts/recipes.contract.mjs` | Recipe variant contract source of truth |
| `packages/recipes/generated/resolvers.ts` | Generated type-safe recipe API |
| `dist/contracts/selectors.json` | Built selector manifest |
| `dist/contracts/alias-migration.json` | Alias migration map |
| `tests/source/contract-key-integrity.test.mjs` | Contract cross-reference validation |
| `tests/source/naming-mode-contract.test.mjs` | Plain/prefixed naming parity tests |
| `scripts/report-contract-drift.mjs` | Contract drift detection artifact |
| `docs/contracts/naming-convention-spec.md` | Naming convention specification |
| `docs/contracts/recipe-contract.md` | Recipe contract specification |

**Scoring notes:**
- Working recipe API with TS types is required for 8.0+.
- Contract drift CI artifact is required for 9.0+.
- Strict mode invalid variant diagnostics are required for 10.0.

---

## Pillar 5 — Documentation and Adoption Readiness

| Evidence Source | What It Proves |
|----------------|----------------|
| `README.md` | Primary entry point clarity |
| `docs/INDEX.md` | Docs navigation hub quality |
| `docs/paths/` | Task-oriented user/contributor/maintainer paths |
| `docs/migration/` | Migration guides existence and quality |
| `playground/index.html` | Live usage examples |
| `tests/source/docs-link-audit.test.mjs` | Cross-link freshness CI |
| `docs/release/release-note-template.md` | Docs process artifacts |

**Scoring notes:**
- Short-first README with deep-links is required for 8.0+.
- At least one migration quickstart (from Tailwind or Bootstrap) is required for 9.0+.
- All three migration quickstarts + anti-patterns handbook are required for 10.0.

---

## Pillar 6 — Governance and Release Discipline

| Evidence Source | What It Proves |
|----------------|----------------|
| `docs/release/release-checklist.md` | Release gate completeness |
| `docs/release/changelog-policy.md` | Changelog consistency policy |
| `docs/release/versioning-semver-policy.md` | Version bump governance |
| `docs/release/milestone-release-notes-process.md` | Milestone management discipline |
| `docs/community/` | Contributor and community governance docs |
| `.github/workflows/ci.yml` | Automated release safety net |
| `docs/roadmap/external-feedback-theme-mapping-*.md` | Feedback loop evidence |
| GitHub milestone issue count + SLA adherence | Active governance indicator |

**Scoring notes:**
- Enforced release checklist + CI gate is required for 8.0+.
- Active GitHub milestone + feedback log is required for 9.0+.
- Monthly decision log + contributor growth targets are required for 10.0.

---

## Evidence Collection Process

1. Before each release candidate round, collect evidence from all sources above.
2. Fill in `docs/release/scorecard-template.md` for that release.
3. Store completed scorecard in `docs/release/scorecard-vX.Y.Z.md`.
4. Compare against previous scorecard to track pillar score trends.
