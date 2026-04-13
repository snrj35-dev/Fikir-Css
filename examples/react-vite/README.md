# Fikir CSS × React Vite Example

A minimal working fixture demonstrating Fikir CSS in a React + Vite project.

## What it shows

- CSS import via `import "fikir-css/css"` (no stylesheet link needed)
- `resolveBtn()` — typed button recipe resolver
- `resolveCard()` — typed card recipe resolver
- `resolveAlert()` — alert with tone variants
- `resolveBadge()` — badge with tone variants
- Modal driven by `data-open` attribute (no JS animation library)
- Dark/light theme toggle via `data-theme` on `<html>`

## Run

```bash
# From this folder — install from npm
npm install
npm run dev
```

Or install from local tarball (monorepo development):

```bash
# From repo root first:
npm run build
npm pack
# Then in this folder:
npm install ../../fikir-css-0.5.0.tgz
npm run dev
```

## Key patterns

### CSS import

```js
// src/main.jsx
import "fikir-css/css";
```

### Recipe resolvers

```js
import { resolveBtn, resolveCard, resolveBadge, resolveAlert } from "fikir-css/tooling";

// resolveBtn({ variant, tone, size }) → "btn btn-primary btn-sm"
const classes = resolveBtn({ variant: "solid", tone: "primary", size: "sm" });
```

### Theme toggle

```js
document.documentElement.setAttribute("data-theme", "dark"); // or "light"
```

### Modal (data-open driven)

```jsx
<div
  className="modal"
  data-open={String(open)}
  role="dialog"
  aria-modal="true"
>
  <div className="modal-dialog">
    ...
  </div>
</div>
```
