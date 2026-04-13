# Parsing-Cost Benchmark Methodology

> Created: 2026-04-12
> Scope: M3 — how to measure and track CSS parsing cost

## Why Parsing Cost Matters

Large CSS bundles cause measurable render-blocking time. Chrome's CSS parsing blocks layout until the entire stylesheet is parsed. For a 100kb CSS file, this can be 5–20ms on mid-range devices.

## Measurement Method

Use **Chrome DevTools Performance panel** or **Lighthouse** to capture CSS parse time:

### 1. Lighthouse CLI (Recommended for CI)

```bash
npx lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./dist/contracts/lighthouse-report.json \
  --chrome-flags="--headless" \
  --only-categories=performance
```

Extract relevant metrics from the report:
- `parse-css` task duration in the trace
- `render-blocking-resources` audit
- `unused-css-rules` audit

### 2. Chrome DevTools Trace

1. Open DevTools → Performance tab
2. Record a page load (Ctrl+Shift+E)
3. Expand **Parse Stylesheet** tasks in the flame chart
4. Note duration for `fikir.css`

### 3. Puppeteer-based Script

```js
import puppeteer from "puppeteer";

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.tracing.start({ categories: ["blink.user_timing", "disabled-by-default-devtools.timeline"] });
await page.goto("http://localhost:3000");
const trace = await page.tracing.stop();

const events = JSON.parse(trace.toString()).traceEvents;
const parseEvents = events.filter((e) => e.name === "ParseAuthorStyleSheet");
for (const e of parseEvents) {
  console.log(`Parse: ${e.args.data?.styleSheetUrl} — ${e.dur / 1000}ms`);
}

await browser.close();
```

## Baseline Measurements (v0.4 → v1.0-M1)

| Version | Raw bytes | Gzip bytes | Parse time (est.) |
|---------|-----------|------------|-------------------|
| v0.4.0 | 72,358 | 8,344 | ~8ms |
| v1.0-M1 | ~90,000 | ~10,400 | ~10ms |

Target: Keep parse time under **15ms** on median Android device equivalent.

## Gzip Target Bands

| Milestone | Gzip Target |
|-----------|-------------|
| M1 | ≤ 12KB |
| M2 | ≤ 18KB |
| M3 | ≤ 22KB (full surface) |
| M4 v1.0 | ≤ 25KB (with opt-in split ≤ 14KB core) |

Core-only bundle (opt-in split) should stay under 14KB gzip at v1.0.

## Automated Check

`npm run validate:size` enforces thresholds defined in `scripts/validate-size-thresholds.mjs`.

## Trend Tracking

See `docs/release/performance-trend-dashboard.md` for per-release tracking.
