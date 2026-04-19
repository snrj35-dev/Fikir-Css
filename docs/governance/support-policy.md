# Fikir CSS — Support Policy

> Created: 2026-04-16  
> Applies from: `v1.0.0`

## Scope

This policy defines which release channels receive maintenance, what kind of issues are in scope, and how long older versions remain supported.

## Support tiers

| Channel / version | Status | Maintainer commitment |
|-------------------|--------|------------------------|
| `latest` (`1.x`) | Active | Bug fixes, docs corrections, packaging fixes, supported-surface regressions |
| `rc` (`X.Y.Z-rc.N`) | Burn-in | Only `P0` and release-blocking fixes |
| `beta` (`X.Y.Z-beta.N`) | Preview | Best-effort feedback intake; no stability guarantee |
| `0.6.x` baseline | Maintenance | Critical consumer-facing fixes only; no new feature work |

## What is supported

- Installation and packaging problems
- Visual or behavioral regressions on `supported` surfaces
- Theme, density, shape, and reduced-motion regressions
- Broken documentation paths or misleading install guidance

## What is not guaranteed

- Feature requests on `beta` or `experimental` surfaces
- Custom application CSS built outside the published token contract
- Framework-specific app bugs unrelated to Fikir CSS selectors or exports

## Response priorities

| Priority | Description | Target response |
|----------|-------------|-----------------|
| `P0` | Release blocker, broken install, major regression on supported surface | 2 business days |
| `P1` | High-impact supported-surface bug or a11y regression | 5 business days |
| `P2` | Docs gap, enhancement, or non-blocking inconsistency | Best effort |

## Required references for supported releases

- `docs/roadmap/support-matrix.md`
- `docs/release/release-checklist-v1.md`
- `docs/release/rc-burn-in-plan.md`
- `docs/governance/deprecation-policy.md`

## Related

- [`semver-policy.md`](./semver-policy.md)
- [`deprecation-policy.md`](./deprecation-policy.md)
- [`../release/v1.0-support-freeze-checklist.md`](../release/v1.0-support-freeze-checklist.md)
