# Fikir CSS — Selector Contract Freeze

> Created: 2026-04-16  
> Applies from: `v1.0.0`

## Purpose

This document defines what is frozen once a surface is marked `supported`, which changes remain additive, and which changes are considered breaking.

## Freeze scope

For every surface labeled `supported` in [`../roadmap/support-matrix.md`](../roadmap/support-matrix.md), the public selector contract includes:

- canonical class selectors defined in `contracts/naming.contract.mjs`
- documented state hooks such as `data-open`, `data-active`, `aria-current`, and similar selectors used by the shipped CSS
- required structural selectors documented as canonical usage
- recipe resolver output that emits supported selectors

Visual refinements are allowed. Contract renames are not.

## What is allowed without breaking the freeze

### Patch-safe

- token-only visual refinements that preserve the same intent
- accessibility improvements that do not rename selectors or required attributes
- documentation fixes and example corrections

### Minor-safe additive changes

- new optional selector variants on a `supported` surface
- new optional data attributes that do not replace existing ones
- new subpath exports, tokens, or helpers
- new beta or experimental surfaces

Additive changes must not make existing supported markup invalid.

## What counts as breaking

- renaming or removing an existing supported class
- replacing a required `data-*` or `aria-*` hook with a different one
- changing required DOM structure so old documented markup no longer renders correctly
- changing resolver output for an existing supported recipe input in a way that removes or renames emitted selectors

These changes require a MAJOR release, or a prior deprecation cycle if an alias path exists.

## Additive vs breaking examples

| Change | Classification | Why |
|--------|----------------|-----|
| Add `btn-loading` as an optional new state class | Additive | Existing button markup still works |
| Add `data-density="comfortable"` support to a component that already works without it | Additive | Opt-in only |
| Rename `.btn-danger` to `.btn-critical` | Breaking | Existing supported markup stops matching |
| Replace `data-open="true"` with `[open]` as the only supported open state | Breaking | Required state hook changed |
| Add a new `toast--info` tone while keeping existing tones | Additive | Existing selectors preserved |
| Require a new wrapper around `.modal-dialog` for all current modal markup | Breaking | Canonical structure changed |

## Release expectations for supported surfaces

When a supported selector contract changes:

1. Classify the change as additive or breaking in the release note.
2. If a migration path exists, record it in `dist/contracts/alias-migration.json`.
3. Update the migration note and `docs/contracts/alias-removal-checklist.md`.
4. Keep README quick-start and starter examples on the frozen contract until the next MAJOR release lands.

## Stability by support tier

| Tier | Freeze level |
|------|--------------|
| `supported` | Frozen; breaking changes require MAJOR or prior deprecation path |
| `beta` | Additive and compatibility changes may still happen in MINOR |
| `experimental` | No freeze; may change or disappear without notice |
| `deprecated` | Frozen except for migration support and removal preparation |

## Related

- [`semver-policy.md`](./semver-policy.md)
- [`deprecation-policy.md`](./deprecation-policy.md)
- [`../contracts/selector-deprecation-window-policy.md`](../contracts/selector-deprecation-window-policy.md)
- [`../release/release-promotion-flow.md`](../release/release-promotion-flow.md)
