# Contributing

Thanks for contributing.

This repository is the Fikir CSS v1.0 design system. Please keep changes small, explicit, and aligned with the [support policy](./docs/release/what-is-stable-in-v1.md).

## Before You Start
1. Read `README.md` and the [support policy](./docs/release/what-is-stable-in-v1.md).
2. Review architecture docs under `docs/architecture/`.
3. Check the [post-1.0 backlog](./docs/roadmap/post-1.0-backlog.md) — your idea may already be tracked.
4. Open an issue first for non-trivial changes. Use the appropriate [issue template](.github/ISSUE_TEMPLATE/).

## Development Flow
1. Install deps: `npm install`
2. Build: `npm run build`
3. Run the full CI suite: `npm test` (must pass with 0 failures)
4. Verify generated artifacts update as expected (`dist/contracts/*`)
5. Update docs when behavior, contracts, or validation changes.

## Scope Rules
- **Supported surfaces** (`supported` tier) are stable — do not break their public selectors.
- Do not promote a surface from `beta` → `supported` without filing a [support level promotion issue](.github/ISSUE_TEMPLATE/support_level_promotion.md).
- Do not add new component families without prior discussion.
- Do not add new architecture layers in drive-by PRs.
- Prefer contract consistency and CI improvements over feature expansion.
- Patch changes (`1.0.x`) must follow the [hotfix checklist](./docs/release/hotfix-checklist.md).

## Pull Request Checklist
- [ ] `npm test` passes with 0 failures
- [ ] Contract outputs are consistent (`dist/contracts/*` regenerated via `npm run build`)
- [ ] README/docs updated when behaviour, selectors, or contracts change
- [ ] No breaking change to a `supported`-tier selector without a migration note
- [ ] CHANGELOG entry added if user-visible

## Commit Style (Recommended)
Use clear prefixes:
- `docs:` documentation-only
- `build:` build/validation pipeline
- `contracts:` contract updates
- `playground:` demo/showcase updates

## Questions
If scope is unclear, open an issue using the [documentation/scope template](.github/ISSUE_TEMPLATE/documentation_or_scope.md).
