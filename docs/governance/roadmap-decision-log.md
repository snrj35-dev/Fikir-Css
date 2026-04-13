# Monthly Roadmap Decision Log

> Created: 2026-04-12
> Scope: M3 governance — records major product decisions per month

## Format

```
## YYYY-MM — [Decision Title]
**Context:** Why this decision was needed
**Decision:** What was decided
**Trade-offs:** What was considered and rejected
**Impact:** Which tasks / components are affected
```

---

## 2026-04 — M2 Scope Freeze

**Context:** M2 milestone needed a clear scope boundary to prevent scope creep from M3 work.
**Decision:** M2 scope is limited to: segmented-control, menubar-submenu, toast variants, skeleton presets, table states, virtualized-list guidance, chart embedding guidance, settings-panel promotion, headless contract spec, class conflict resolution, recipe-typing strict mode, theme modes (high-contrast/density/shape), and quality automation scripts.
**Trade-offs:** Deferred opt-in CSS split bundle (originally M2) to M3 due to complexity. Chart renderer integration (Recharts/Visx) is guidance-only; no new CSS surface.
**Impact:** `docs/roadmap/tasklist.md` sections 6–9 form M2 scope.

## 2026-04 — Settings Panel Promoted from RFC-Only

**Context:** Settings panel had only an RFC; no CSS or tests existed. Strong demand from internal product teams.
**Decision:** Promote to canonical implementation in M2 with full CSS, contract keys, and test coverage.
**Trade-offs:** Increases M2 bundle size by ~2.1KB raw. Accepted given product value.
**Impact:** `packages/components/settings-panel.css`, naming contract update, css-manifest update.

## 2026-04 — Headless Contract Uses data-* Attributes as Primary State Mechanism

**Context:** Two options were considered for component state: (a) CSS class toggling, (b) data-* attribute contract.
**Decision:** Data-* attributes are the canonical state mechanism. ARIA attributes serve accessibility only and must not be used as CSS styling hooks except where they are the only available option (`aria-expanded`, `aria-selected`, `aria-invalid`, `aria-current`).
**Trade-offs:** Slight verbosity in JS (`.dataset.open = "true"` vs. `.classList.add("open")`). Gains: clearer separation of styling from behavior, better SSR compatibility.
**Impact:** `docs/architecture/headless-contract-spec.md`
