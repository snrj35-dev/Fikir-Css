# Hotfix Checklist (v1.0.x)

> Use this checklist for `1.0.x` patch releases that fix a bug or regression without adding new surfaces.  
> For minor feature releases (`1.1.0`+) use the full [release checklist](./release-checklist-v1.md).

---

## Criteria for a hotfix (must pass ALL)

- [ ] The fix targets a **supported** surface only (no beta/experimental changes in a hotfix)
- [ ] The change is **selector-safe** — no class name, token, or data attribute removed or renamed
- [ ] No new public API surface is added
- [ ] The fix is backwards compatible with `v1.0.0`

If any criterion fails, use a minor or major release process instead.

---

## Pre-merge

- [ ] Reproduce the bug in isolation (branch off `main`)
- [ ] Fix is scoped to the minimum necessary change
- [ ] `npm test` passes locally (0 errors, 0 warnings)
- [ ] `npm run validate:manifests` passes (0 errors, 0 warnings)
- [ ] `npm run detect:anatomy-drift` passes
- [ ] PR description links to the issue and includes a minimal reproduction

---

## Versioning

- [ ] Bump `version` in `package.json` from `1.0.x` → `1.0.(x+1)`
- [ ] Run `npm run validate:version` — version and package.json must match
- [ ] Add `### v1.0.(x+1)` entry to `CHANGELOG.md`:
  ```
  ### v1.0.X — YYYY-MM-DD
  - fix: [description] (#issue)
  ```

---

## Build & publish

- [ ] `npm run build` succeeds
- [ ] `npm run validate:size` — diff must be ≤ 0 bytes (hotfixes should not grow the bundle)
- [ ] `npm publish --tag latest` (dry-run first: `npm publish --dry-run`)
- [ ] Verify on npm: `npm info fikir-css version` shows the new version

---

## Post-publish

- [ ] GitHub release created with tag `v1.0.x` and CHANGELOG excerpt
- [ ] Close the GitHub issue fixed by this hotfix
- [ ] Notify in the relevant discussion / release channel
- [ ] Merge `main` back into any active feature branches to pick up the fix

---

## Rollback plan

If the hotfix introduces a regression:
1. `npm unpublish fikir-css@1.0.x` (within 72h of publish)
2. Re-tag `v1.0.(x-1)` as `latest`: `npm dist-tag add fikir-css@1.0.(x-1) latest`
3. Open a new issue, fix on a new branch
