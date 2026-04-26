# Machine-Readable Contracts

> Status: **Stable** — M20 deliverable. Generated at build time into `dist/contracts/`.

Fikir CSS provides six JSON manifests in `dist/contracts/` for AI assistants, web agents, IDE tooling, and automated code generation. They eliminate class name guessing and component structure ambiguity.

## Available manifests

| Manifest | Path | Purpose |
|----------|------|---------|
| Selectors | `dist/contracts/selectors.json` | All CSS class names + global `data-*` markers |
| Anatomy | `dist/contracts/anatomy.json` | Minimal HTML per component + sub-element roles |
| Tokens | `dist/contracts/tokens.json` | Design token values with px equivalents and `used_by` component metadata |
| Capabilities | `dist/contracts/capabilities.json` | What each component does / does not do |
| Variants | `dist/contracts/variants.json` | Canonical tones, styles, sizes per component |
| Primitives | `dist/contracts/primitives.json` | Layout primitive defaults and CSS custom properties |

## Generating manifests

Manifests are generated automatically as part of the standard build:

```bash
npm run build           # full build — includes manifests
npm run build:manifests # manifests only (requires dist/contracts/ from a prior build)
```

Validate generated manifests:

```bash
npm run validate:manifests
```

## CDN access (v1.0+)

After publishing to npm, manifests are accessible via CDN:

```
https://unpkg.com/fikir-css@latest/dist/contracts/anatomy.json
https://unpkg.com/fikir-css@latest/dist/contracts/selectors.json
https://unpkg.com/fikir-css@latest/dist/contracts/variants.json
https://unpkg.com/fikir-css@latest/dist/contracts/capabilities.json
https://unpkg.com/fikir-css@latest/dist/contracts/tokens.json
https://unpkg.com/fikir-css@latest/dist/contracts/primitives.json
```

## npm subpath imports

```js
import selectors   from "fikir-css/contracts/selectors";
import anatomy     from "fikir-css/contracts/anatomy";
import capabilities from "fikir-css/contracts/capabilities";
import variants    from "fikir-css/contracts/variants";
import primitives  from "fikir-css/contracts/primitives";
```

---

## Manifest reference

### selectors.json

Maps every contract key to its CSS class name. Also documents global and per-component `data-*` markers.

```json
{
  "schema_version": "1.0",
  "naming": { "mode": "plain" },
  "selectors": {
    "component.btn": "btn",
    "component.btnPrimary": "btn-primary",
    "component.modal": "modal",
    ...
  },
  "data_markers": {
    "global": [
      { "attr": "data-theme", "values": ["dark"], "description": "..." },
      { "attr": "data-density", "values": ["compact", "comfortable"], "description": "..." },
      { "attr": "data-shape", "values": ["rounded", "sharp"], "description": "..." }
    ],
    "components": {
      "modal": [
        { "attr": "data-open", "on": "root", "values": ["true"], "description": "Show modal. Remove attribute to hide." }
      ]
    }
  }
}
```

**Key rule:** `data-open` controls overlay visibility. Always **remove the attribute** to hide — never `setAttribute("data-open", "false")`.

---

### anatomy.json

Minimal HTML structure for each component with sub-element roles.

```json
{
  "components": {
    "modal": {
      "status": "stable",
      "root_selector": "modal",
      "element": "div",
      "elements": [
        { "selector": "modal-backdrop", "role": "backdrop overlay", "element": "div" },
        { "selector": "modal-dialog",   "role": "dialog container", "element": "div" },
        { "selector": "modal-header",   "role": "header row",       "element": "div" },
        { "selector": "modal-body",     "role": "body content",     "element": "div" },
        { "selector": "modal-footer",   "role": "footer/actions",   "element": "div" }
      ],
      "visibility": { "attr": "data-open", "value": "true", "on": "root" },
      "minimal_html": "<div class=\"modal\" data-open=\"true\">...</div>",
      "notes": "App must manage focus trap and Escape key."
    }
  }
}
```

---

### variants.json

Canonical global axes and per-component resolver information.

```json
{
  "global": {
    "tones":  ["neutral", "primary", "success", "warning", "danger", "info"],
    "styles": ["solid", "soft", "outline", "ghost", "plain"],
    "sizes":  ["xs", "sm", "md", "lg"]
  },
  "recipe_components": {
    "button": {
      "resolver_fn": "buttonRecipe",
      "defaults": { "variant": "solid", "tone": "primary", "size": "md" },
      "axes": {
        "tone":    { "values": ["primary", "neutral", "danger"], "default": "primary" },
        "variant": { "values": ["solid", "soft", "outline", "ghost", "plain"], "default": "solid" },
        "size":    { "values": ["sm", "md", "lg"], "default": "md" }
      }
    }
  }
}
```

Use the resolver for dynamic class generation:

```js
import { buttonRecipe } from "fikir-css/tooling";
const classes = buttonRecipe({ tone: "danger", variant: "outline", size: "sm" });
// → "btn btn-danger btn-outline btn-sm"
```

---

### capabilities.json

What each component does and does not do — critical for AI code generation.

```json
{
  "components": {
    "navbar": {
      "status": "stable",
      "does": [
        "Provides horizontal nav layout with brand, nav list, and items"
      ],
      "does_not": [
        "Does NOT provide fixed/sticky positioning — add position:fixed in app CSS",
        "Does NOT handle mobile hamburger toggle — app JS required"
      ],
      "requires_app_css": [
        "Add position:fixed and top:0 for sticky navbar in app"
      ]
    }
  }
}
```

---

### tokens.json

All design tokens grouped by category with px equivalents and direct component usage metadata.

```json
{
  "groups": {
    "space": {
      "--space-4": { "$value": "1rem", "$type": "dimension", "px": 16, "used_by": ["drawer", "input", "modal"] },
      "--space-2": { "$value": "0.5rem", "$type": "dimension", "px": 8, "used_by": ["badge", "button", "card"] }
    },
    "color": {
      "--color-primary": { "$value": "var(--color-primary-500)", "$type": "color", "used_by": ["button", "link", "tabs"] }
    }
  }
}
```

---

### primitives.json

Layout primitive defaults and CSS custom properties.

```json
{
  "primitives": {
    "stack": {
      "selector": "stack",
      "layout": "flex",
      "direction": "column",
      "default_gap": "var(--space-4)",
      "css_properties": [
        { "prop": "--stack-gap", "description": "Override gap", "default": "var(--space-4)" }
      ],
      "example": "<div class=\"stack\"><!-- children --></div>"
    }
  }
}
```

---

## AI system prompt example

Paste anatomy and variants manifests into a Claude/ChatGPT system prompt:

```
You are a UI builder using Fikir CSS. Here are the machine-readable contracts:

VARIANTS: <paste variants.json content>
ANATOMY: <paste anatomy.json content>
CAPABILITIES: <paste capabilities.json content>

Rules:
- Read selectors.json before writing markup. If a class is not listed there, do not invent it.
- Prefer contract selectors and layout primitives over ad hoc inline layout styles.
- Use class names exactly as listed in selectors.json (mode: plain)
- Toggle overlays (modal, drawer) with data-open="true" on root. Remove attribute to hide.
- Never use data-open="false" — remove the attribute instead.
- Navbar does NOT have fixed positioning — add it in app CSS if needed.
- Focus trapping for modal/drawer must be implemented in app JS.
```

---

## Manifest maintenance

Manifests are generated from source-of-truth contract files in `contracts/`:

| Source file | Generates |
|-------------|-----------|
| `contracts/naming.contract.mjs` | `selectors.json` (class map) |
| `contracts/anatomy.contract.mjs` | `anatomy.json` |
| `contracts/capabilities.contract.mjs` | `capabilities.json` |
| `contracts/recipes.contract.mjs` | `variants.json` (recipe axes) |
| `packages/layouts/*.css` | `primitives.json` |
| `packages/tokens/*.css` | `tokens.json` |

When a component CSS file changes, update the corresponding entry in `contracts/anatomy.contract.mjs` and `contracts/capabilities.contract.mjs`, then re-run `npm run build:manifests`.

See `docs/roadmap/plan.md` §8.5 for the full drift-detection strategy.
