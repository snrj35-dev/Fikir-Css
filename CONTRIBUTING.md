# Contributing

Thanks for contributing.

This repository is a contract-driven CSS foundation prototype. Please keep changes small, explicit, and compatible with current v0.2 scope.

## Before You Start
1. Read `README.md` and architecture docs under `docs/architecture/`.
2. Confirm your change does not introduce a new framework feature outside current scope.
3. Open an issue first for non-trivial changes.

## Development Flow
1. Install deps: `npm install`
2. Build: `npm run build`
3. Verify generated artifacts update as expected.
4. Update docs when behavior, contracts, or validation changes.

## Scope Rules
- Do not add new component families without prior discussion.
- Do not add new architecture layers in drive-by PRs.
- Prefer contract consistency and validation improvements over feature expansion.

## Pull Request Checklist
- [ ] Build passes locally (`npm run build`)
- [ ] Contract outputs are consistent (`dist/contracts/*`)
- [ ] README/docs updated when needed
- [ ] Change is within v0.2 foundation scope

## Commit Style (Recommended)
Use clear prefixes:
- `docs:` documentation-only
- `build:` build/validation pipeline
- `contracts:` contract updates
- `playground:` demo/showcase updates

## Questions
If scope is unclear, open an issue and label it as `scope-check`.
