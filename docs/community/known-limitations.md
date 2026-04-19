# Known Limitations (M1 Baseline)

This page tracks current limitations for the v0.6.0 productization baseline.

## Scope Limitations
- Supported scope is intentionally narrow (core + selected slices). Broad implemented surface remains `experimental`.
- Some historical docs still describe v0.2 context and are marked `Status: stale`.

## Accessibility Limitations
- Full overlay focus trap behavior is not enforced yet for all overlays.
- Advanced keyboard models (for example full tabs arrow-key model) are not enforced as M1 release gates.

## Tooling Limitations
- Docs link auditing currently validates local references and templates, not external URL health.
- Visual regression workflow is not yet part of CI.
- GitHub roadmap bootstrap requires `GH_TOKEN`/`GITHUB_TOKEN` for API writes.

## Release/Governance Limitations
- Milestone/issue/label creation is script-assisted but cannot run without GitHub API credentials.
- External user feedback collection has not yet produced a first completed feedback cycle.

## Next Steps
- Move M2 automation and governance items from `docs/roadmap/tasklist.md` into active implementation batches.
