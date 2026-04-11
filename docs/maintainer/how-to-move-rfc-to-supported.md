# How To Move RFC to Supported Implementation

> Last reviewed: 2026-04-11

This guide is the maintainer runbook for promoting a surface from RFC/experimental state to `supported`.

## 1. Eligibility Gate
- Apply all checks in `docs/release/experimental-to-supported-criteria.md`.
- Promotion is blocked if RFC/spec is stale, tests are missing, or docs drift exists.

## 2. Evidence Collection
- RFC/spec link (`docs/rfcs/components/*.md`).
- Implementation evidence (`packages/components/*.css` or pattern source).
- Test evidence (`tests/source` and `tests/build` coverage).
- Usage evidence (`playground/index.html` and docs examples).
- Accessibility evidence (`docs/architecture/*accessibility*.md` and QA checklist).

## 3. Repository Updates
- Update support status in `docs/roadmap/support-matrix.md`.
- Update user-facing claims in `README.md` when baseline changes.
- Add release note entry in `docs/release/vX.Y-release-notes.md`.
- Add migration note when selector/behavior compatibility is impacted.

## 4. Verification
- Run `npm run build`.
- Run `npm run test:ci`.
- Run release validation set:
  - `npm run package:smoke`
  - `npm run validate:publish`
  - `npm run validate:version`

## 5. Final Promotion Checklist
- [ ] Criteria document fully satisfied
- [ ] Support matrix updated
- [ ] README and playground labels aligned
- [ ] Release notes updated
- [ ] Migration impact reviewed
- [ ] CI green
