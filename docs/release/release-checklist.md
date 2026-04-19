# Release Checklist

> Last reviewed: 2026-04-11

Use this checklist before creating a release tag.

## Quality Gates
- [ ] `npm run test:ci`
- [ ] `npm run package:smoke`
- [ ] `npm run validate:publish`
- [ ] `npm run validate:version`
- [ ] `npm run validate:size`

## Artifact Gates
- [ ] `dist/fikir.css` regenerated
- [ ] `dist/contracts/selectors.json` regenerated
- [ ] `dist/contracts/alias-migration.json` regenerated
- [ ] `dist/contracts/size-report.json` regenerated

## Documentation Gates
- [ ] release note exists for target version (`docs/release/vX.Y-release-notes.md`)
- [ ] migration note reviewed/updated (`docs/migration/`)
- [ ] support matrix reviewed (`docs/roadmap/support-matrix.md`)
- [ ] promotion criteria reviewed for any support-level change (`docs/release/experimental-to-supported-criteria.md`)
- [ ] bundle size thresholds reviewed (`docs/release/bundle-size-thresholds.md`)
- [ ] release impact review completed (`docs/release/release-impact-review.md`)
- [ ] tasklist progress updated (`docs/roadmap/tasklist.md`)

## Version/Tag Gates
- [ ] `package.json#version` matches release target
- [ ] git tag format is `vX.Y.Z`
- [ ] tag and release note versions match exactly
- [ ] prerelease suffix and npm dist-tag agree (`-beta.N` → `beta`, `-rc.N` → `rc`, stable → `latest`)
- [ ] README / site / playground / examples use the correct install command for this channel
