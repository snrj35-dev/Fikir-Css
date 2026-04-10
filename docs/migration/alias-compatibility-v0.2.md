# Alias Removal Migration / Compatibility Strategy (v0.2)

## Scope
This strategy covers removal of dual selector aliases from dist:
- Utility aliases: `.u-*`
- Component aliases: `.comp-*`

Canonical class surface remains:
- Utility canonical: `.p-4`, `.bg-primary-500`, ...
- Component canonical: `.btn`, `.btn-primary`, `.card`, ...

## Build Artifact
Build outputs a deterministic alias map at:
- `dist/contracts/alias-migration.json`

This file maps removed aliases to canonical selectors.
Example:
- `u-bg-primary-500` -> `bg-primary-500`
- `comp-btn-primary` -> `btn-primary`

## Migration Steps
1. Parse codebase class strings.
2. Replace classes using `alias-migration.json` mapping.
3. Run build and verify no alias class remains in source.

## Compatibility Policy
- v0.2: aliases removed from dist, migration map provided.
- v0.3+: alias usage should fail CI with lint/codemod gate.

## Assumption
Class names are not dynamically generated in opaque runtime strings.
