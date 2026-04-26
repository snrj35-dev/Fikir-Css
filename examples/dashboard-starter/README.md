# Fikir CSS — Dashboard Starter

A single-file admin dashboard example that demonstrates the **canonical** way to compose Fikir CSS: `app-shell`, `grid`, `switcher`, `cluster`, `stack` primitives + `kpi-card`, `timeline`, `inline-notice`, `table`, `pagination`, `modal`, `toast` components.

## Run

Just open `index.html` in a browser — it loads Fikir CSS from the CDN. Zero build step, zero dependencies.

```bash
# or serve locally
python3 -m http.server 8080 --directory examples/dashboard-starter
# then visit http://localhost:8080
```

## What this file intentionally does NOT do

- No inline `display: grid; grid-template-columns: …` — the `grid` and `app-shell-content` primitives own that.
- No inline `position: fixed; bottom: 1rem; right: 1rem` on `toast-viewport` — the component already positions itself.
- No invented class names like `kpi-card-metric` or `app-shell-footer` — every class is in `dist/contracts/selectors.json`.
- No `data-active="true"` on nav items — navigation uses `aria-current="page"`.
- No parallel token system — only `--color-accent` is extended, everything else uses Fikir tokens.

## Next steps

- For production-grade overlay behavior (focus trap, escape to close), swap the inline `<script>` for `fikir-css/helpers`:
  ```js
  import { createFocusTrap, bindOverlayKeyboard } from "fikir-css/helpers";
  ```
  See `docs/guides/overlay-js-helpers.md`.
- For mobile drawer pattern, see `docs/components/app-shell.md` → "Mobile drawer (hamburger) pattern".
- For layout recipes beyond this starter, see `docs/guides/layout-composition.md`.
- For conventions (state attributes, aria-current, tone vs modifier classes), see `docs/guides/canonical-conventions.md`.
- For VS Code class / token autocomplete (works without `npm install`), see `docs/guides/vscode-autocomplete.md` → "Setup (CDN / no-build consumers)".
