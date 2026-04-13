# Fikir CSS — Contract Compatibility Matrix

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This matrix documents the compatibility guarantees between Fikir CSS contract artifacts across versions. It defines what constitutes a breaking change in each contract artifact and which version transitions are safe.

---

## Contract Artifacts

| Artifact | Source | Built Output | Contract Type |
|----------|--------|-------------|--------------|
| Naming contract | `contracts/naming.contract.mjs` | `dist/contracts/selectors.json` | Selector surface |
| Recipes contract | `contracts/recipes.contract.mjs` | `packages/recipes/generated/resolvers.ts` | Variant API |
| Alias migration map | built by `scripts/build-css.mjs` | `dist/contracts/alias-migration.json` | Migration utility |
| Size report | built by `scripts/build-css.mjs` | `dist/contracts/size-report.json` | Performance artifact |
| CSS bundle | built by `scripts/build-css.mjs` | `dist/fikir.css` | Public CSS surface |

---

## Breaking Change Definitions

### Naming Contract (selectors.json)

| Change Type | Breaking? | Notes |
|------------|-----------|-------|
| Add new selector key | No | Additive; existing consumers unaffected |
| Rename existing selector key | **Yes** | All consumers referencing the old key must update |
| Remove selector key | **Yes** | CSS surface disappears; consumers break |
| Change `base` value of a key | **Yes** | Class name changes in output CSS |
| Change `domain` of a key | **Yes** | Affects prefixed mode resolution |
| Change `mode` default | **Yes** | Affects all class names in plain ↔ prefixed switch |
| Add new `domain` type | No (if handled) | Requires resolver update in build script |

### Recipes Contract (resolvers.ts)

| Change Type | Breaking? | Notes |
|------------|-----------|-------|
| Add new recipe | No | Additive |
| Add new variant axis | **Minor break** (TS consumers) | Default must be provided; new axis is optional |
| Add new variant value | No | Additive; existing calls unaffected |
| Remove a recipe | **Yes** | All TS consumers using the recipe break |
| Remove a variant axis | **Yes** | TS consumers passing that axis break |
| Remove a variant value | **Yes** | TS consumers passing that value break |
| Change `defaults` | **Minor break** | Output class changes without explicit input |
| Rename a recipe function | **Yes** | Import paths break |

### CSS Bundle (fikir.css)

| Change Type | Breaking? | Notes |
|------------|-----------|-------|
| Add new `@layer` block | No (if prelude updated) | Existing cascade unaffected |
| Reorder `@layer` declarations | **Yes** | Specificity resolution changes for all consumers |
| Add new selector to existing layer | No | Additive |
| Remove existing selector | **Yes** | Components relying on that selector lose styling |
| Change property value in selector | Minor | Visual change; semantic intent preserved |
| Add `!important` to existing rule | Minor | May override consumer overrides |

---

## Version Compatibility Table

| From → To | CSS Bundle | Selectors JSON | Resolvers TS | Safe upgrade? |
|-----------|-----------|----------------|-------------|---------------|
| v0.2 → v0.3 | Additive only | Additive only | Additive only | Yes |
| v0.3 → v0.4 | Additive only | Additive only | Additive only | Yes |
| v0.4 → v1.0-M1 | Additive + promotions | Additive only | Additive only | Yes |
| v0.4 → v1.0-M2 | Additive + new surfaces | Additive only | New axes (optional) | Yes (with deprecation) |
| v0.4 → v1.0 | See release notes | See release notes | See release notes | Migration guide required |

---

## Compatibility Guarantee Levels

### Supported surfaces
- **Patch**: No selector removals, no defaults changes, no layer reordering.
- **Minor**: May add new selectors, new recipes, new variant axes (with defaults), new layers appended.
- **Major**: Breaking changes in selector names, recipe API, or layer order; migration guide required.

### Experimental surfaces
- No compatibility guarantees between versions.
- May change selector names, remove surfaces, or alter variant axes without notice.
- Consumers should not build production dependency on experimental surfaces.

---

## Contract Key Stability Rules

A contract key (e.g., `component.btn`, `utility.bgPrimary500`) is considered stable once:
1. The surface it belongs to is promoted to `supported` in `docs/roadmap/support-matrix.md`.
2. Two release cycles have passed without API issues.

Stable keys follow the deprecation window policy in `docs/contracts/selector-deprecation-window-policy.md`.

---

## CI Enforcement

- `tests/source/contract-key-integrity.test.mjs`: validates recipe keys exist in naming contract.
- `tests/source/naming-mode-contract.test.mjs`: validates plain/prefixed parity.
- `scripts/report-contract-drift.mjs`: detects and reports contract drift between builds.
- `npm run validate:prefixed`: smoke-tests prefixed mode output.

---

## Related Documents

- `docs/contracts/naming-contract.md`
- `docs/contracts/token-taxonomy-v1.md`
- `docs/contracts/selector-deprecation-window-policy.md`
- `docs/contracts/alias-removal-checklist.md`
- `docs/release/versioning-semver-policy.md`
