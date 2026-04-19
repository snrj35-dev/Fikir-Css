# Fikir CSS — RC Burn-in Plan

> Created: 2026-04-16  
> Applies to: `1.0.0-rc.N`

## Objective

Validate that the release candidate behaves like the final stable build under real consumer conditions, with no planned feature work remaining.

## Entry criteria

- `package.json#version` is `X.Y.Z-rc.N`
- Release notes and migration notes are drafted
- `npm run test:ci`, `npm run package:smoke`, and `npm run validate:version` pass
- Supported-surface freeze checklist is complete

## Burn-in duration

- Minimum duration: 7 calendar days
- Restart the burn-in clock if an RC-blocking `P0` issue is fixed and a new RC is published

## Daily checks

- Review new issues for release-blocker labels
- Verify install flow on npm, GitHub Pages, and example fixtures
- Re-run smoke coverage for supported interactive surfaces when RC fixes land
- Record findings in the active RC notes pack

## Allowed changes during burn-in

- `P0` bug fixes
- Docs corrections that prevent incorrect adoption
- Packaging or publish-flow fixes required to ship the release

No new features, surface promotions, or selector churn are allowed during burn-in.

## Exit criteria

- No open `P0` issues remain
- No drift exists between docs, examples, and package version
- Maintainer sign-off recorded in release notes / RC notes pack
- Stable release checklist is ready to run without further content changes

## Related

- [`release-promotion-flow.md`](./release-promotion-flow.md)
- [`release-checklist-v1.md`](./release-checklist-v1.md)
- [`v1.0-rc-notes-pack.md`](./v1.0-rc-notes-pack.md)
