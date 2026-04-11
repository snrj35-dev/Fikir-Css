# How To Evaluate The Playground

## Purpose
Guide contributors and early evaluators when reviewing playground quality against support commitments.

## Evaluation Scope
Focus on:
- supported sections first (`docs/roadmap/support-matrix.md`)
- support labels in `playground/index.html`
- canonical class usage (no alias leakage)

## Evaluation Checklist
1. Build and open
- `npm run build`
- open `playground/index.html`

2. Support-label consistency
- Section label (`supported`/`experimental`/`showcase`) matches support matrix entry.

3. Core behavior sanity
- button/input/card/field flows are stable.
- selected M1 slices (`modal`, `tabs`, `table`, `empty-state`) behave as documented.

4. Accessibility smoke
- keyboard navigation is usable for supported surfaces.
- focus/escape behavior for modal/tabs follows docs.
- dark mode readability is preserved.

5. Demo boundary checks
- demo-only styles are isolated to `demo-*` selectors.
- no framework class overrides in `playground/demo.css`.

## Reporting
Open issues using:
- `.github/ISSUE_TEMPLATE/request_for_feedback.md`
- `.github/ISSUE_TEMPLATE/support_level_promotion.md` (for promotion proposals)

Include:
- environment (browser/os)
- section numbers
- expected vs actual behavior
- screenshots when relevant
