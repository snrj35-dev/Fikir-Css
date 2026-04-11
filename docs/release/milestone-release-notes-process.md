# Milestone-Based Release Notes Process (M2)

## Purpose
Standardize how milestone work is translated into release notes with clear scope and evidence.

## Inputs
- Active milestone board/issues (`M1`, `M2`, ...)
- `docs/roadmap/tasklist.md` status
- `docs/roadmap/support-matrix.md`
- migration + release artifacts in `docs/migration/` and `docs/release/`

## Process
1. Freeze milestone scope
- Confirm included issues and deferred issues.
- Ensure support-level changes are finalized.

2. Group changes by release sections
- Summary
- Highlights
- Behavioral Notes
- Upgrade Notes

3. Attach evidence per change group
- implementation paths
- tests
- docs updates
- migration impact

4. Draft release note file
- Create `docs/release/vX.Y.Z-release-notes.md` (or project naming convention)
- Link migration notes and release checklist.

5. Run release gates
- `npm run test:ci`
- `npm run validate:publish`
- `npm run package:smoke`
- `npm run validate:version`

6. Final review
- Verify version/tag consistency
- Verify support matrix and tasklist updates
- Publish release record

## Minimum Milestone Release Note Checklist
- [ ] Milestone scope section included
- [ ] Supported vs experimental changes explicitly marked
- [ ] Breaking/behavioral notes included
- [ ] Migration note references included when needed
- [ ] Validation command results captured

## Recommended Section Add-on
For milestone-driven releases, add this section:

### Milestone Scope
- Completed in this milestone:
- Deferred from this milestone:
- Support-level promotions:
