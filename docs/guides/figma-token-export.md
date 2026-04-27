# Figma Token Export

> Updated: M18 — v1.0.0

Fikir CSS ships a W3C DTCG-compatible `tokens.json` at `dist/tokens.json`. This file can be imported into Figma Variables using **Token Studio** (formerly Figma Tokens) or the native Figma Variables REST API.

---

## Getting the tokens file

```bash
npm install fikir-css
```

The file is at `node_modules/fikir-css/dist/tokens.json`.

Or import it in JavaScript:

```js
import tokens from "fikir-css/tokens" assert { type: "json" };
```

---

## Option 1 — Token Studio for Figma (Recommended)

[Token Studio](https://tokens.studio/) is a Figma plugin that reads W3C DTCG token files directly.

### Steps

1. Install Token Studio from the Figma Community
2. Open the plugin → **Sync** → **File / URL**
3. Paste the URL to your hosted `tokens.json` (e.g. from your CDN or GitHub raw URL):
   ```
   https://cdn.jsdelivr.net/npm/fikir-css@latest/dist/tokens.json
   ```
4. Click **Load** — tokens appear as Token Sets
5. Map token sets to Figma Variables via **Variables** tab → **Apply**

Token Studio preserves the DTCG `$type` and `$value` fields and creates Figma variable collections per group.

Create two collections aligned with Fikir CSS's token architecture:
- **Fikir Core** — raw values (`--space-*`, `--radius-*`, `--font-size-*`)
- **Fikir Semantic** — semantic aliases (`--color-fg-default`, `--color-accent`, etc.) with Light and Dark modes

See `docs/guides/figma-token-handoff.md` for the variable binding table and dark mode configuration.

---

## Option 2 — Figma Variables REST API

Use the [Figma Variables API](https://www.figma.com/developers/api#variables) to programmatically import tokens.

```js
// scripts/sync-figma-tokens.mjs
import { readFile } from "node:fs/promises";

const FIGMA_FILE_KEY = "YOUR_FILE_KEY";
const FIGMA_TOKEN    = process.env.FIGMA_ACCESS_TOKEN;

const tokens = JSON.parse(await readFile("node_modules/fikir-css/dist/tokens.json", "utf8"));

// Map DTCG tokens to Figma variable payload
// See https://www.figma.com/developers/api#variables for full schema
const variables = Object.entries(tokens).flatMap(([groupKey, group]) =>
  Object.entries(group).map(([tokenKey, token]) => ({
    name: `${groupKey}/${tokenKey}`,
    resolvedType: token.$type === "color" ? "COLOR" : "FLOAT",
    valuesByMode: { default: token.$value },
  }))
);

await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables`, {
  method: "POST",
  headers: {
    "X-Figma-Token": FIGMA_TOKEN,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ variableMutations: variables }),
});

console.log(`Synced ${variables.length} tokens to Figma`);
```

```bash
FIGMA_ACCESS_TOKEN=figd_xxx node scripts/sync-figma-tokens.mjs
```

---

## Token structure

`tokens.json` follows the W3C DTCG format:

```json
{
  "color": {
    "primary": {
      "500": { "$type": "color", "$value": "oklch(62% 0.18 262)" },
      "600": { "$type": "color", "$value": "oklch(56% 0.18 262)" }
    },
    "danger": {
      "500": { "$type": "color", "$value": "oklch(62% 0.2 24)" }
    }
  },
  "space": {
    "1": { "$type": "dimension", "$value": "0.25rem" },
    "2": { "$type": "dimension", "$value": "0.5rem" }
  },
  "radius": {
    "sm": { "$type": "dimension", "$value": "0.375rem" },
    "md": { "$type": "dimension", "$value": "0.625rem" },
    "lg": { "$type": "dimension", "$value": "0.875rem" }
  }
}
```

---

## Semantic token mapping

Semantic tokens (e.g. `--color-bg-default`) are derived from primitives at runtime via CSS custom properties. They are **not** included in `tokens.json` because their value depends on the active theme (`data-theme="light"` vs `"dark"`).

To export semantic tokens per-theme, extract the computed values at build time:

```js
// Pseudocode — run in a headless browser (Playwright/Puppeteer)
const lightValues = await page.evaluate(() => {
  const styles = getComputedStyle(document.documentElement);
  return {
    bgDefault:  styles.getPropertyValue("--color-bg-default"),
    fgDefault:  styles.getPropertyValue("--color-fg-default"),
    accent:     styles.getPropertyValue("--color-accent"),
  };
});
```

---

## Updating tokens when Fikir CSS is upgraded

```bash
npm update fikir-css
# tokens.json is updated automatically at node_modules/fikir-css/dist/tokens.json
# Re-run your sync script or reload Token Studio
```
