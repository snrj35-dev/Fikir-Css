# Fikir CSS — Deprecation Policy

> Created: 2026-04-16  
> Applies from: `v1.0.0`

## Purpose

This policy defines how a `supported` surface moves to `deprecated`, how long it remains available, and what migration evidence must exist before removal.

## Deprecation lifecycle

1. A `supported` surface may only be marked `deprecated` in a MINOR release.
2. The same release must update:
   - `docs/roadmap/support-matrix.md`
   - release notes and `CHANGELOG.md`
   - a migration note in `docs/migration/` when consumer action is required
3. If a safe alias exists, it must be recorded in `dist/contracts/alias-migration.json` and tracked in `docs/contracts/alias-removal-checklist.md`.
4. Selector-level removals must follow `docs/contracts/selector-deprecation-window-policy.md`.
5. The deprecated surface remains documented until the next MAJOR release removes it.

## Minimum guarantees

- Minimum deprecation window: one MINOR release before removal
- Removal of a `supported` surface always requires a MAJOR version bump
- Replacement surface or pattern must be named explicitly
- Docs, demos, and examples must stop recommending the deprecated contract

## What counts as required evidence

- A release-note entry under `### Deprecated`
- A migration path or explicit statement that no automatic migration exists
- Support-matrix status changed from `supported` to `deprecated`
- Selector or alias mapping documented when a direct replacement exists
- README, site, and playground stop presenting the deprecated surface as a recommended path

## Exceptions

`beta` and `experimental` surfaces may change or disappear without the full deprecation window, but the removal must still be called out in release notes.

## Related

- [`semver-policy.md`](./semver-policy.md)
- [`selector-contract-freeze.md`](./selector-contract-freeze.md)
- [`support-policy.md`](./support-policy.md)
- [`../contracts/selector-deprecation-window-policy.md`](../contracts/selector-deprecation-window-policy.md)
- [`../roadmap/support-matrix.md`](../roadmap/support-matrix.md)
