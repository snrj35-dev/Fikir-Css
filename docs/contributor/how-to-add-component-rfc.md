# How To Add a Component RFC

> Last reviewed: 2026-04-11

This guide defines the minimum process to add a new component RFC without breaking product scope discipline.

## 1. Scope Gate
- Confirm the proposal fits active roadmap scope in `docs/roadmap/plan.md`.
- Check whether the surface is already listed in `docs/roadmap/support-matrix.md` as `planned` or `rfc-only`.
- If scope is unclear, open an issue first and label as scope check.

## 2. Create RFC File
- Create a new RFC file under `docs/rfcs/components/` (for example: `docs/rfcs/components/button-rfc.md`).
- Use kebab-case file naming.
- Keep canonical class names aligned with naming contract (`docs/contracts/naming-contract.md`).

## 3. Required RFC Sections
- Purpose and boundary.
- Canonical class surface.
- Accessibility expectations.
- Token usage notes.
- Open questions / non-goals.

## 4. Cross-linking Requirements
- Add the RFC path to `README.md` documentation map if the surface is public.
- Ensure the support matrix state is explicit (`rfc-only`, `experimental`, or `supported`) in `docs/roadmap/support-matrix.md`.
- Update `docs/roadmap/tasklist.md` only if roadmap tracking changes.

## 5. Validation Before Merge
- Run `npm run docs:validate` for local docs link integrity.
- Run `npm run test:ci` if implementation changes accompany the RFC.

## 6. Review Expectations
- RFC text should be specific enough for implementation and test planning.
- Do not mark a surface `supported` from RFC-only status without promotion workflow evidence.
