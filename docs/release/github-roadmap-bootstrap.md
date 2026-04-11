# GitHub Roadmap Bootstrap

## Purpose
Seed labels, milestone, and M1 governance issues from repo-managed manifests.

## Inputs
- `.github/project-management/labels.json`
- `.github/project-management/milestones.json`
- `.github/project-management/issues-m1.json`

## Command
```bash
npm run github:bootstrap
```

## Requirements
- `GH_TOKEN` or `GITHUB_TOKEN` must be set for write operations.
- Without token, command runs in dry-run mode and prints intended actions.

## Current Target
- Repository slug inferred from `origin` remote (`snrj35-dev/Fikir-Css`).

## Notes
- Command is idempotent: existing labels/milestones/issues are updated by title/name.
- Use this before M1 governance review and release preparation.
