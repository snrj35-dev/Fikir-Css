# Bundle Size Thresholds (M2)

> Last reviewed: 2026-04-11

This document defines acceptable CSS bundle size limits for the current productization baseline.

## Scope
- Bundle: `dist/fikir.css`
- Size report source: `dist/contracts/size-report.json`

## Thresholds
- Maximum bundle size: `100000` bytes
- Maximum positive size diff per change: `8000` bytes

## Rationale
- Current baseline bundle is ~75 KB, so 100 KB keeps room for controlled growth.
- Positive diff cap protects against accidental large CSS inflation in a single change.
- Intentional larger growth should be milestone-reviewed and documented in release notes.

## Validation Commands
- Build artifacts: `npm run build`
- Enforce thresholds: `npm run validate:size`
- Report diff for CI logs/summary: `npm run report:size`

## Review Policy
- If threshold validation fails, either:
  - reduce bundle growth, or
  - update this policy with explicit milestone rationale and reviewer agreement.
