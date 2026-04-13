# Fikir CSS — Strict Alias Removal Checklist

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This document tracks all active and completed selector alias deprecations. Every deprecated selector must have an entry here before the deprecation is announced. Reviewers check this list before approving any removal PR.

---

## Legend

- `[ ]` → not started
- `[~]` → in deprecation window (old selector still present)
- `[x]` → removed (entry kept for historical reference)

Columns:
- **Old selector**: the deprecated class name
- **New selector**: the replacement class name (or "removed" if no replacement)
- **Contract key**: `contracts/naming.contract.mjs` key
- **Deprecated in**: version when deprecated
- **Removable after**: earliest version when removal is allowed
- **Removed in**: version when actually removed (fill in when done)

---

## Active Deprecations

*(none at v0.4 baseline — list will be populated as deprecations are announced)*

| Status | Old selector | New selector | Contract key | Deprecated in | Removable after | Removed in |
|--------|-------------|-------------|-------------|--------------|----------------|-----------|
| — | — | — | — | — | — | — |

---

## Completed Removals

*(none yet)*

| Old selector | New selector | Contract key | Deprecated in | Removed in | Migration note |
|-------------|-------------|-------------|--------------|-----------|---------------|
| — | — | — | — | — | — |

---

## Pre-Removal Checklist

Before opening a removal PR, all items below must be checked:

### For each selector being removed:

- [ ] Deprecation was announced at least N releases ago (per `selector-deprecation-window-policy.md`)
- [ ] `deprecated: true` flag exists in `contracts/naming.contract.mjs` entry
- [ ] CSS alias comment exists in source file: `/* deprecated: ... */`
- [ ] `dist/contracts/alias-migration.json` entry exists (old → new mapping)
- [ ] Entry exists in this checklist with correct "Deprecated in" version
- [ ] Internal usage audited (no internal references to old selector in `packages/`)
- [ ] Playground examples updated to use new selector
- [ ] RFC/docs updated to remove or replace old selector references
- [ ] Release notes "Breaking Changes" section updated
- [ ] `npm run test:ci` passes with old selector removed
- [ ] Migration note updated: `docs/migration/`

### Prefixed mode (if applicable):

- [ ] Prefixed-mode alias migration entry added: `"comp-old": "comp-new"`
- [ ] `npm run validate:prefixed` passes

---

## How to Add an Entry

When a selector is marked deprecated:

1. Add a row to the "Active Deprecations" table above.
2. Set status to `[~]`.
3. Fill all columns except "Removed in".
4. In the source CSS file, add: `/* deprecated: use .new-class instead; will be removed in vX.Y.0 */`
5. In `contracts/naming.contract.mjs`, add `deprecated: true` and `replacedBy` / `removedIn` fields.
6. Add an entry to `dist/contracts/alias-migration.json` (or ensure build script generates it).

When the selector is removed:

1. Move the row to "Completed Removals".
2. Set status to `[x]`.
3. Fill the "Removed in" and "Migration note" columns.

---

## Related Documents

- `docs/contracts/selector-deprecation-window-policy.md`
- `docs/contracts/token-lifecycle-policy.md`
- `docs/contracts/contract-compatibility-matrix.md`
- `docs/contracts/naming-contract.md`
- `dist/contracts/alias-migration.json` (built artifact)
