# Release Promotion Flow

> Last updated: 2026-04-16  
> Scope: `beta` → `rc` → `latest` promotion rules for the v1.0 track

## 1. Choose the release channel

Pick the channel from `package.json#version` before tagging:

- `X.Y.Z-beta.N` → publish with npm dist-tag `beta`
- `X.Y.Z-rc.N` → publish with npm dist-tag `rc`
- `X.Y.Z` → publish to `latest`

Git tags must always match the exact package version:

```bash
git tag vX.Y.Z-beta.N
git tag vX.Y.Z-rc.N
git tag vX.Y.Z
```

## 2. Prepare the candidate

1. Ensure the branch is up to date and the target version is committed.
2. Run `npm run test:ci`.
3. Run `npm run package:smoke`.
4. Confirm `docs/release/release-checklist.md` is complete.
5. Run `npm run validate:version` after all doc/example version changes land.

## 3. Write release evidence

1. Copy `docs/release/release-note-template.md`.
2. Create `docs/release/vX.Y.Z-release-notes.md`.
3. If selector, alias, or behavior migration exists, update the migration note in `docs/migration/`.
4. For support-level promotions, apply `docs/release/experimental-to-supported-criteria.md`.
5. Sync `README.md`, `site/index.html`, `playground/index.html`, and example fixtures with the same install story.

## 4. Promotion criteria

### Beta → RC

- All `M13` product-truth items are closed or explicitly deferred from the v1.0 critical path.
- Version, docs, examples, and support matrix tell the same story.
- Interactive supported surfaces have browser-level coverage on the agreed smoke matrix.
- Vue and Svelte examples are runnable enough for external validation.
- Only additive or bug-fix changes remain; no planned selector churn on supported surfaces.

### RC → Latest

- RC burn-in lasts at least 7 days.
- Only `P0` fixes are accepted during burn-in.
- No open blocker remains on any supported surface.
- `release-checklist.md`, support freeze checklist, and migration guarantees are complete.
- Release notes state the stable install command: `npm install fikir-css`.

## 5. Tag and publish

1. Push the branch and matching tag.
2. Let `.github/workflows/publish.yml` derive the npm dist-tag from `package.json#version`.
3. Create the GitHub release and link:
   - release notes
   - migration note
   - support matrix
   - semver policy

## 6. Post-release hygiene

1. Record promotion result in the roadmap/task list.
2. Move remaining items into the next active milestone.
3. Document any known limitations discovered during release QA.
