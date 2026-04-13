# Fikir CSS — Comparator Baseline Matrix

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This matrix establishes the competitive baseline that Fikir CSS must match or surpass across all scoring pillars. Comparators: Tailwind CSS, Bootstrap, MUI, Chakra UI, Mantine, Panda CSS, Headless UI, Radix UI.

---

## Pillar 1 — Surface Depth and Completeness

| Comparator | Component Count (approx.) | Workflow Composability | Notable Strengths | Notable Gaps |
|------------|--------------------------|----------------------|-------------------|-------------|
| **Tailwind CSS** | ~0 (utility-only) | Low (utility compositions only) | Utility speed | No components |
| **Bootstrap** | ~30 | Medium (grid + components) | Quick-start components | Limited composability, dated patterns |
| **MUI** | ~50+ | High (full design system) | Enterprise depth, data grid | Heavy bundle, limited CSS-only mode |
| **Chakra UI** | ~40+ | High | A11y focus, composable | React-only |
| **Mantine** | ~100+ | Very High | Massive surface, hooks | React-only, complex setup |
| **Panda CSS** | ~0 (utility engine) | Low-Medium | Build-time CSS, type-safe | No semantic components |
| **Headless UI** | ~15 (behavior only) | Medium | Fully accessible behaviors | Unstyled — requires external styling |
| **Radix UI** | ~30 (behavior only) | Medium-High | Best-in-class a11y primitives | Unstyled — requires external styling |
| **Fikir CSS target** | 80+ (full spectrum) | Very High | Utility + semantic + headless in one | — |

---

## Pillar 2 — Accessibility and Quality Trust

| Comparator | Keyboard Support | Screen Reader | Contrast | ARIA | A11y CI |
|------------|-----------------|---------------|----------|------|---------|
| **Tailwind CSS** | User responsibility | User responsibility | User responsibility | User responsibility | None |
| **Bootstrap** | Partial (some components) | Partial | Built-in defaults | Partial | None public |
| **MUI** | Yes (most components) | Yes | Yes (WCAG 2.1 AA) | Yes | Internal |
| **Chakra UI** | Yes | Yes | Yes | Yes (Radix-backed) | Yes |
| **Mantine** | Yes | Yes | Yes | Yes | Yes |
| **Panda CSS** | User responsibility | User responsibility | User responsibility | User responsibility | None |
| **Headless UI** | Excellent | Excellent | N/A (unstyled) | Excellent | Yes |
| **Radix UI** | Excellent | Excellent | N/A (unstyled) | Excellent | Yes |
| **Fikir CSS target** | Yes (all supported) | Yes | Yes (WCAG 2.1 AA) | Yes | Yes (CI-enforced) |

---

## Pillar 3 — Runtime and Bundle Performance

| Comparator | Full bundle (gzip, approx.) | Tree-shakable | Build-time CSS | Runtime injection |
|------------|----------------------------|---------------|----------------|-------------------|
| **Tailwind CSS** | ~10–30 KB (purged) | Yes (JIT) | Yes | Minimal |
| **Bootstrap** | ~22 KB (gzip) | Partial (Sass) | No | No |
| **MUI** | ~80–150 KB+ | Yes (component level) | Partial | CSS-in-JS (runtime) |
| **Chakra UI** | ~50–80 KB | Yes | No | Emotion (runtime) |
| **Mantine** | ~60–100 KB | Yes | No | CSS Modules |
| **Panda CSS** | ~5–20 KB (purged) | Yes | Yes | None (static) |
| **Headless UI** | ~15 KB | Yes | No | None |
| **Radix UI** | ~20–40 KB | Yes | No | None |
| **Fikir CSS target** | < 50 KB (gzip, full) | Planned (M3) | Yes (build pipeline) | None / minimal |

---

## Pillar 4 — DX and Tooling Excellence

| Comparator | Type-safe API | IDE autocomplete | Recipe/variant API | Migration tools | Conflict resolution |
|------------|--------------|-----------------|-------------------|-----------------|---------------------|
| **Tailwind CSS** | Plugin-based | VS Code plugin | CVA (third-party) | Upgrade guide | tailwind-merge |
| **Bootstrap** | No | No | No | Manual | No |
| **MUI** | Yes (TypeScript) | Yes | `sx` prop system | Yes | Inline styles |
| **Chakra UI** | Yes (TypeScript) | Yes | `<Box>` system | Yes | Prop merging |
| **Mantine** | Yes (TypeScript) | Yes | Theme overrides | Yes | Style props |
| **Panda CSS** | Yes (codegen) | Yes | Pattern API | N/A (new) | @layer |
| **Headless UI** | Yes (TypeScript) | Yes | N/A | N/A | N/A |
| **Radix UI** | Yes (TypeScript) | Yes | N/A | N/A | N/A |
| **Fikir CSS target** | Yes (contract codegen) | Planned (M3) | Recipe API (built-in) | Yes (alias migration) | @layer + class conflict RFC |

---

## Pillar 5 — Documentation and Adoption Readiness

| Comparator | Docs quality | Onboarding | Migration guides | Examples quality | Playground |
|------------|-------------|------------|-----------------|-----------------|-----------|
| **Tailwind CSS** | Excellent | Excellent | Yes | Excellent | Yes |
| **Bootstrap** | Good | Good | Yes | Good | Yes |
| **MUI** | Excellent | Good | Yes | Excellent | Yes (StackBlitz) |
| **Chakra UI** | Good | Good | Partial | Good | Yes |
| **Mantine** | Excellent | Excellent | Yes | Excellent | Yes |
| **Panda CSS** | Good | Medium | Limited | Good | Yes |
| **Headless UI** | Good | Good | N/A | Good | Yes |
| **Radix UI** | Excellent | Good | N/A | Excellent | Yes |
| **Fikir CSS target** | Excellent | Excellent | Yes (3 frameworks) | Excellent | Yes |

---

## Pillar 6 — Governance and Release Discipline

| Comparator | Semver policy | Changelog | Breaking change policy | Community |
|------------|--------------|-----------|------------------------|-----------|
| **Tailwind CSS** | Yes | Yes | Yes (major versions) | Large |
| **Bootstrap** | Yes | Yes | Yes | Large |
| **MUI** | Yes | Yes | Yes | Very large |
| **Chakra UI** | Yes | Yes | Yes | Medium |
| **Mantine** | Yes | Yes | Yes | Medium |
| **Panda CSS** | Yes | Yes | Yes | Growing |
| **Headless UI** | Yes | Yes | Yes | Medium |
| **Radix UI** | Yes | Yes | Yes | Growing |
| **Fikir CSS target** | Yes | Yes | Yes (deprecation window) | Growing |

---

## Surpass Conditions (per pillar)

| Pillar | Surpass Threshold | Current Gap vs. Best |
|--------|-------------------|----------------------|
| 1 — Surface depth | Full-spectrum (utility + semantic + headless in one) | None comparable; unique position |
| 2 — Accessibility | CI-enforced keyboard + contrast + ARIA | At parity with Radix/Headless when keyboard tests complete |
| 3 — Performance | < 50 KB gzip full bundle, component opt-in | Ahead of MUI/Chakra; behind Tailwind/Panda on purge |
| 4 — DX | Contract-driven type-safe + alias migration + drift CI | Ahead of Bootstrap; approaching Panda/MUI level |
| 5 — Docs | 3 migration quickstarts + playground + anti-patterns | Behind Tailwind/MUI/Mantine; M3 target |
| 6 — Governance | GitHub milestone + monthly decision log | Behind MUI/Bootstrap; M3 target |

---

## Related Documents

- `docs/roadmap/scoring-rubric.md`
- `docs/roadmap/scoring-evidence-sources.md`
- `docs/roadmap/baseline-score-record.md`
- `docs/roadmap/plan.md` (Pillar 3 — Competitor-Surpass Definition)
