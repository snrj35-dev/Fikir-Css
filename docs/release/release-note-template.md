# vX.Y.Z Release Notes

> Status: `beta` / `rc` / `latest`
> Install: `npm install fikir-css@beta` / `npm install fikir-css@rc` / `npm install fikir-css`
> Promotion target: `beta → rc`, `rc → latest`, or `latest`

## Summary
One-paragraph summary of this release.

## Channel Criteria
- Why this build belongs on the selected channel
- What must be true before it is promoted to the next channel
- Explicitly state whether consumers should use `@beta`, `@rc`, or plain `fikir-css`

## Contract Impact
- List supported surfaces touched in this release
- Classify each contract change as additive or breaking
- Link `dist/contracts/alias-migration.json` or state that no alias migration is required

## Highlights
- Highlight 1
- Highlight 2
- Highlight 3

## Behavioral Notes
- Note behavior changes that are not strictly breaking but may affect usage.

## Upgrade Notes
- State version jump (`vA.B.C -> vX.Y.Z`)
- Call out required migration actions
- Link migration file if needed

## Validation Snapshot
- `npm run test:ci`: pass/fail
- `npm run package:smoke`: pass/fail
- `npm run validate:publish`: pass/fail
- `npm run validate:version`: pass/fail

## Reference Checklist
- `docs/release/release-checklist.md`
- `docs/release/release-promotion-flow.md`
- `docs/roadmap/support-matrix.md`
- `docs/governance/selector-contract-freeze.md`
