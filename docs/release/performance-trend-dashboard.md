# Performance Trend Dashboard

> Created: 2026-04-12
> Updated each release — see scoring evidence sources

## Bundle Size Trend

| Release | Raw bytes | Gzip bytes | Δ Raw | Δ Gzip | Target met |
|---------|-----------|------------|-------|--------|-----------|
| v0.3.0 | 58,240 | 7,180 | — | — | ✅ |
| v0.4.0 | 72,358 | 8,344 | +14,118 | +1,164 | ✅ |
| v1.0-M1 | ~90,125 | ~10,350 | +17,767 | +2,006 | ✅ |
| v1.0-M2 | _(TBD)_ | _(TBD)_ | — | — | — |
| v1.0-M3 | _(TBD)_ | _(TBD)_ | — | — | — |

## Gzip Target Bands

| Milestone | Target | Status |
|-----------|--------|--------|
| M1 | ≤ 12KB gzip | ✅ ~10.4KB |
| M2 | ≤ 18KB gzip | pending |
| M3 | ≤ 22KB gzip (full) | pending |
| M4 v1.0 core | ≤ 14KB gzip | pending |

## Layer Contribution Trend (v1.0-M1)

| Layer | Bytes | % | Selectors |
|-------|-------|---|-----------|
| components | 74,659 | 82.5% | ~350 |
| utilities | 2,374 | 2.9% | 37 |
| recipes | 1,638 | 2.0% | 15 |
| base | 1,979 | 2.4% | 0 |
| layouts | 2,517 | 3.1% | 8 |
| reset | 257 | 0.3% | 0 |

## Parse Time Estimates

| Device class | v0.4 | v1.0-M1 | Target |
|-------------|------|---------|--------|
| High-end desktop | ~2ms | ~3ms | <5ms |
| Mid-range Android | ~8ms | ~10ms | <15ms |
| Low-end Android | ~20ms | ~25ms | <40ms |

## Opt-in Split Targets (M3)

- `fikir-core.css` (reset + base + layouts + core components): ≤ 14KB gzip
- `fikir-extended.css` (overlay + navigation + data surfaces): ≤ 8KB gzip
- `fikir-full.css` (complete bundle, identical to current): ≤ 25KB gzip

## How to Update This Dashboard

After each release:
1. Run `npm run build && npm run report:bundle-layers`
2. Copy layer sizes from `dist/contracts/bundle-layers-report.json`
3. Update the tables above with the release version

## Scripts

```bash
npm run report:bundle-layers      # Layer breakdown
npm run validate:size             # Gzip threshold enforcement
npm run report:component-map      # Per-component size breakdown
npm run report:dead-surfaces      # Playground coverage
```
