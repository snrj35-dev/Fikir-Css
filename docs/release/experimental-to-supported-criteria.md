# Experimental-to-Supported Promotion Criteria (M1)

## Purpose
Define the minimum bar for promoting a surface from `experimental` to `supported` in the support matrix.

## Promotion Eligibility (All Required)
A surface is eligible only when all conditions below are satisfied:

1. Spec baseline exists
- RFC/spec is published and reflects current canonical surface.

2. Implementation is canonical and stable
- Canonical selectors are implemented.
- Alias leakage checks exist and pass.

3. Test coverage exists
- Source/build regression tests cover selector presence and expected behavior.
- CI is green (`npm run test:ci`).

4. Accessibility expectations are documented
- Surface-level a11y expectations are documented.
- Keyboard and semantic behavior are explicit for the surface category.

5. Usage examples are available
- Playground and/or docs contain supported usage examples.
- Example uses canonical class surface.

6. Release impact is reviewed
- Migration impact is reviewed for selector/state changes.
- Release note mentions the promotion and affected surface.

## Promotion Blockers
Promotion must not happen if any item below is true:
- RFC/spec is missing or stale relative to implementation.
- Support matrix and README are not aligned.
- Known behavioral regression exists without explicit release caveat.
- Docs/test drift is unresolved.

## Promotion Workflow (M1)
1. Open promotion candidate in current iteration scope.
2. Run criteria audit against this document.
3. Update `docs/roadmap/support-matrix.md` status.
4. Add release note entry for promotion decision.
5. If needed, update migration notes.
6. Close with CI green status.

## Required Evidence Checklist
- [ ] RFC/spec link
- [ ] Implementation evidence (`packages/components/*.css` or layout/pattern equivalent)
- [ ] Test evidence (`tests/source` and/or `tests/build`)
- [ ] A11y note/checklist evidence
- [ ] Playground/docs usage evidence
- [ ] Release/migration note evidence

## Promotion Record Template
Use this template in release notes or tracking issue:

- Surface:
- Previous status:
- New status:
- Evidence links:
  - RFC/spec:
  - Implementation:
  - Tests:
  - A11y docs:
  - Usage example:
- Migration impact:
- Decision date:
