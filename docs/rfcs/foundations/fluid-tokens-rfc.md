# RFC: Fluid Tokens Pilot (`clamp`) for Type and Spacing

## Status
- Status: Draft (pilot RFC)
- Scope: v0.4 technical hardening (`P7`)
- Non-goal: full global replacement of fixed token usage in one release

## Purpose
Define a safe pilot for fluid sizing using `clamp()` and compare behavior in playground before core token changes.

## Why
- Improve scale behavior across viewport ranges without adding breakpoint-only duplication.
- Keep changes measurable and reversible.
- Validate readability and spacing rhythm before any contract-wide migration.

## Pilot Constraints
1. Pilot is playground/docs-first.
2. No breaking change to current canonical component API.
3. Existing fixed token behavior remains default framework baseline.

## Proposed Pilot Surface
- Demo-only utility classes in `playground/demo.css`:
  - `demo-fluid-fixed-title`
  - `demo-fluid-clamp-title`
  - `demo-fluid-fixed-space`
  - `demo-fluid-clamp-space`
- Showcase section in `playground/index.html` comparing fixed vs fluid values.

## Candidate Formulas
- Type:
  - `font-size: clamp(1rem, 1.2vw + 0.9rem, 1.375rem);`
- Spacing:
  - `margin-block-start: clamp(var(--space-2), 1.4vw, var(--space-5));`

These are pilot values, not final design-token contract values.

## Acceptance Criteria
1. Playground includes side-by-side fixed/fluid comparison.
2. Test coverage verifies the presence of pilot section and clamp usage markers.
3. No canonical selector surface change is required for pilot completion.

## Risks
- Over-fluid formulas can feel unstable.
- Visual rhythm may diverge from current fixed token expectations.

## Rollout Plan
1. Add pilot section and tests.
2. Collect internal readability feedback.
3. If accepted, open follow-up RFC for token-level adoption path.

## References
- `docs/contracts/token-dictionary-spec.md`
- `docs/roadmap/plan.md`
- `docs/roadmap/tasklist.md`
