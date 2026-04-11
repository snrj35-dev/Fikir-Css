# GitHub Release Readiness — v0.3

> Last reviewed: 2026-04-11

This document captures the current repository state for GitHub release preparation.

## Local Readiness (Completed)
- `npm run test:ci` passes.
- Packaging smoke and publishable artifact checks pass.
- Version/tag consistency checks pass.
- Docs link audit and support matrix alignment checks pass.

## Governance Readiness (Prepared)
- GitHub project-management manifests are present:
  - `.github/project-management/labels.json`
  - `.github/project-management/milestones.json`
  - `.github/project-management/issues-m1.json`
- Bootstrap command is ready:
  - `npm run github:bootstrap`
- Feedback intake template/log are ready:
  - `.github/ISSUE_TEMPLATE/request_for_feedback.md`
  - `docs/community/external-feedback-log.md`

## Remaining External Actions
1. Open M1 milestone and sync labels/issues on GitHub.
- Requires `GH_TOKEN` or `GITHUB_TOKEN`.

2. Publish release tag + GitHub release record.
- Suggested tag: `v0.3.0`.

3. Collect first external user feedback.
- Track entries in `docs/community/external-feedback-log.md`.
