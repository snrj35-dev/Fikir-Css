# vX.Y.Z Migration Note

> Source: `vA.B.C`
> Target: `vX.Y.Z`
> Channel: `beta` / `rc` / `latest`

## Target
Describe source and target versions.

## Migration Impact
- Breaking or potentially breaking change 1
- Breaking or potentially breaking change 2

## Supported Surface Freeze Check
- List any `supported` surfaces touched by this release
- Classify whether the change is additive or breaking
- State whether the change followed `docs/governance/selector-contract-freeze.md`

## Selector / Alias Changes
- Link to `dist/contracts/alias-migration.json` if selector rename mapping exists.
- Explicitly state if no alias migration is needed.

## Token/Behavior Changes
- Describe visual or semantic behavior changes that may impact consumers.

## Release Channel Guidance
- Should consumers stay on `@beta`, `@rc`, or stable?
- What must be validated before the release can move to the next channel?

## Recommended Migration Steps
1. Run `npm run build`.
2. Apply alias/selector updates from `dist/contracts/alias-migration.json` if present.
3. Validate affected supported surfaces in the consumer app.
4. Re-check release notes and support matrix for support-level changes.
