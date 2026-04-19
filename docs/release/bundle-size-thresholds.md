# Bundle Size Thresholds (M2)

> Last reviewed: 2026-04-20 (v1.0 baseline review)

This document defines acceptable CSS bundle size limits for the current productization baseline.

## Scope
- Bundle: `dist/fikir.css`
- Size report source: `dist/contracts/size-report.json`

## Thresholds
- Maximum bundle size: `165000` bytes
- Maximum positive size diff per change: `8000` bytes
- Maximum gzip bundle size: `22000` bytes
- Maximum positive gzip size diff per change: `1500` bytes

## Rationale
- v1.0 baseline bundle is ~152 KB raw / ~18 KB gzip, reflecting 99 component CSS files and 12 data-pattern components added through M13–M21.
- The previous 104 KB threshold was set at the M2 baseline (~100 KB); growth to 152 KB is intentional and fully reviewed.
- `165000` / `22000` provide ~10 % headroom for minor growth before the next review.
- Positive diff cap protects against accidental large CSS inflation in a single PR.
- Gzip limits keep network-transfer costs visible during CI checks.
- Intentional larger growth should be milestone-reviewed and documented in release notes.

## Validation Commands
- Build artifacts: `npm run build`
- Enforce thresholds: `npm run validate:size`
- Report diff for CI logs/summary: `npm run report:size`

## Review Policy
- If threshold validation fails, either:
  - reduce bundle growth, or
  - update this policy with explicit milestone rationale and reviewer agreement.
