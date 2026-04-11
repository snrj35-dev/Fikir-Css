# Release Promotion Flow (M1)

## 1. Prepare Candidate
1. Ensure branch is up to date.
2. Run `npm run test:ci`.
3. Run `npm run package:smoke`.
4. Confirm `docs/release/release-checklist.md` is complete.

## 2. Write Notes
1. Copy `docs/release/release-note-template.md`.
2. Create `docs/release/vX.Y.Z-release-notes.md`.
3. For support-level promotions, apply `docs/release/experimental-to-supported-criteria.md`.
4. Update migration note if behavioral or selector migration impact exists.
5. For milestone-based releases, apply `docs/release/milestone-release-notes-process.md`.

## 3. Version and Tag
1. Ensure `package.json#version` equals target version.
2. Commit release changes.
3. Create tag: `git tag vX.Y.Z`.

## 4. Publish Release Record
1. Push branch and tag.
2. Create GitHub release with the release note summary/highlights.
3. Link migration note and support matrix in release body.

## 5. Post-Release Hygiene
1. Move next-scope tasks to active roadmap.
2. Record any known limitations discovered during release QA.
