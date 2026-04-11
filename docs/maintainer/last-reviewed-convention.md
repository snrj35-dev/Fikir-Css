# Last Reviewed Convention

> Last reviewed: 2026-04-11

Use this convention to keep core docs freshness explicit and auditable.

## Required Marker
Add this line directly under the main title block:

`> Last reviewed: YYYY-MM-DD`

Use ISO date format.

## Core Docs Scope
Apply the marker to these core docs first:
- `docs/INDEX.md`
- `docs/roadmap/plan.md`
- `docs/roadmap/tasklist.md`
- `docs/roadmap/support-matrix.md`
- `docs/release/release-checklist.md`

## Update Rule
- Refresh the date whenever the document is materially changed.
- If content is historical and no longer normative, prefer `Status: stale` instead of refreshing review date.

## Review Cadence
- Review core docs at least once per milestone.
- Review release-critical docs before every tag cut.
