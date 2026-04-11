# Release Impact Review (M2)

> Last reviewed: 2026-04-11

Use this review before tagging to capture user-visible impact and migration risk.

## Required Review Areas
1. Surface impact
- Which `supported` or `experimental` surfaces changed?
- Did support level change in `docs/roadmap/support-matrix.md`?

2. Selector and compatibility impact
- Any canonical selector additions/removals?
- Any alias migration changes in `dist/contracts/alias-migration.json`?

3. Behavior and accessibility impact
- Any keyboard/focus/semantic behavior changes?
- Any dark-mode readability or tone/contrast impact?

4. Consumer impact
- Any install, build, or package entrypoint change?
- Any docs/examples that must be updated for users?

## Evidence Checklist
- [ ] Release note updated (`docs/release/vX.Y-release-notes.md`)
- [ ] Migration note reviewed (`docs/migration/`)
- [ ] Support matrix update reviewed (`docs/roadmap/support-matrix.md`)
- [ ] CI result recorded (`npm run test:ci`)

## Output
- Summarize impact in release note `Behavioral Notes` + `Upgrade Notes`.
