# GitHub Release Readiness — v0.4

> Last reviewed: 2026-04-11

This document captures what is already completed locally for v0.4 and what must be done manually on GitHub.

## Local Readiness (Completed)
- `npm run test:ci` passes on 2026-04-11.
- `npm run capture:playground` deterministic baseline capture works.
- Supported-slice baseline assets exist under `playground/screenshots/sections/`.
- Support matrix promotions are updated in `docs/roadmap/support-matrix.md`.
- v0.4 draft release artifacts are present:
  - `docs/release/v0.4.0-release-criteria-freeze.md`
  - `docs/release/v0.4.0-release-notes.md`
  - `docs/migration/v0.4.0-migration-note-draft.md`

## Governance Readiness (Prepared)
- GitHub project-management manifests are present:
  - `.github/project-management/labels.json`
  - `.github/project-management/milestones.json`
  - `.github/project-management/issues-m1.json`
- Bootstrap script is ready and validated in dry-run:
  - `npm run github:bootstrap`
  - Result (2026-04-11): token missing, dry-run successful (`15 labels`, `1 milestone`, `7 issues` pending apply).

## Manual External Actions (Required)
1. Push local branch/commits.
- `git push origin main`

2. Sync roadmap labels/milestone/issues (if token available).
- Set `GH_TOKEN` or `GITHUB_TOKEN`.
- Run: `npm run github:bootstrap`

3. Publish v0.4 release on GitHub UI.
- Releases -> Draft a new release
- Tag: `v0.4.0`
- Title: `v0.4.0`
- Body source: `docs/release/v0.4.0-release-body.md`

4. Collect and log first external feedback entry.
- Update: `docs/community/external-feedback-log.md`

## Optional Token Smoke Check
If you suspect token scope problems:
- `GH_TOKEN='<token>' npm run github:bootstrap`
- Expected: no "Dry-run only" message, and apply path starts.
