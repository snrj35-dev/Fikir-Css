# Starter Consumer Example

Minimal plain-HTML consumer for `fikir-css@1.0.0`. No build step required.

## Install

```bash
# From npm:
npm install fikir-css

# Or from local tarball (from repo root first):
npm pack
npm install ../../fikir-css-1.0.0.tgz
```

## Run

```bash
npm start
# → serves on http://localhost:3000
```

Or simply open `index.html` directly in a browser (file:// works for CSS, no module imports).

## What's demonstrated

- `data-theme` toggle (light ↔ dark) via vanilla JS
- Canonical classes: `btn`, `card`, `alert`, `badge`, `field`, `input`
- Layout primitives: `stack`, `cluster`, `container`

## CSS import

```html
<link rel="stylesheet" href="./node_modules/fikir-css/dist/fikir.css" />
```

## Opt-in theme / density

```html
<!-- Dark theme is bundled in fikir.css via [data-theme="dark"] — no extra import needed -->
<!-- Compact density (data-density="compact") requires an opt-in import: -->
<link rel="stylesheet" href="./node_modules/fikir-css/dist/themes/compact.css" />
```

Toggle density in vanilla JS:

```js
const html = document.documentElement;
const isCompact = html.getAttribute("data-density") === "compact";
isCompact
  ? html.removeAttribute("data-density")
  : html.setAttribute("data-density", "compact");
```

## Slice imports (bundler / ESM only)

```js
import "fikir-css/slices/forms";
import "fikir-css/slices/overlays";
import "fikir-css/slices/navigation";
import "fikir-css/slices/data-display";
```
