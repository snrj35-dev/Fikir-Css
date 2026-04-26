# VS Code Autocomplete

Fikir CSS ships VS Code [custom data](https://code.visualstudio.com/api/extension-guides/custom-data-extension) files so you get class-name and design-token completions out of the box — no extension required.

> **What you get**
> - Class autocomplete in `class="…"` attributes for every Fikir CSS surface (e.g. `btn`, `btn-primary`, `card-elevated`, `modal-backdrop`, …).
> - `data-*` attribute completions with allowed values (`data-theme`, `data-density`, `data-shape`, `data-open`, `data-invalid`, …).
> - CSS token completions for every `--color-*`, `--space-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--transition-*` design token in your `var(--…)` calls.

---

## Setup (npm consumers)

After `npm install fikir-css`, create or update **`.vscode/settings.json`** in your project root:

```json
{
  "html.customData": [
    "./node_modules/fikir-css/dist/vscode/html-custom-data.json"
  ],
  "css.customData": [
    "./node_modules/fikir-css/dist/vscode/css-custom-data.json"
  ]
}
```

Reload the VS Code window (`Cmd/Ctrl + Shift + P` → **Developer: Reload Window**) and start typing:

```html
<button class="btn btn-"<!-- ← cursor here triggers tone/style/size completions -->
```

```css
.example {
  color: var(--color-/* ← token list appears */);
}
```

---

## Setup (CDN / no-build consumers)

VS Code's `customData` setting only accepts local file paths — remote URLs are not loaded. To use autocomplete without `npm`:

1. Download both files into your project (e.g. into a `vscode/` folder):
   - <https://snrj35-dev.github.io/Fikir-Css/dist/vscode/html-custom-data.json>
   - <https://snrj35-dev.github.io/Fikir-Css/dist/vscode/css-custom-data.json>
2. Point your `.vscode/settings.json` at the local copies:

```json
{
  "html.customData": ["./vscode/html-custom-data.json"],
  "css.customData": ["./vscode/css-custom-data.json"]
}
```

Re-download whenever you upgrade Fikir CSS to a new version, or pin a specific tag in the URL (e.g. `…/v1.1.0/dist/vscode/…`).

---

## Setup (monorepo / workspaces)

For a multi-root workspace, place the `settings.json` in the workspace root or per-folder. Paths are resolved relative to the folder that owns the `settings.json` file.

```json
{
  "html.customData": [
    "./packages/web/node_modules/fikir-css/dist/vscode/html-custom-data.json"
  ],
  "css.customData": [
    "./packages/web/node_modules/fikir-css/dist/vscode/css-custom-data.json"
  ]
}
```

---

## What the data files contain

| File | Source contract | Generator |
|------|-----------------|-----------|
| `dist/vscode/html-custom-data.json` | `dist/contracts/selectors.json` + `dist/contracts/anatomy.json` | `scripts/generate-manifests.mjs` (`buildVscodeHtmlCustomData`) |
| `dist/vscode/css-custom-data.json` | `dist/contracts/tokens.json` | `scripts/generate-manifests.mjs` (`buildVscodeCssCustomData`) |

Both files are validated by `scripts/validate-manifests.mjs` on every build (CI gates regressions).

The HTML custom data exposes:

- A global `class` attribute backed by the `fikir-css-classes` value set (one entry per Fikir CSS surface).
- Global `data-*` attributes (`data-theme`, `data-density`, `data-shape`, `data-style`, `data-variant`, `data-open`, `data-orientation`, `data-invalid`, `data-disabled`, `data-readonly`, `data-loading`, …) with their canonical value sets sourced from `anatomy.contract.mjs`.

The CSS custom data exposes every design token from `tokens.json` with `name`, `description` (group + value), and a `syntax` hint (e.g. `<color>`, `<length>`, `<number>`).

---

## Verifying the install

After reloading VS Code:

1. Open any HTML/JSX/TSX/Vue/Svelte file.
2. Type `class="btn ` — you should see `btn-primary`, `btn-neutral`, `btn-danger`, `btn-solid`, `btn-soft`, …
3. Type `data-theme="` — you should see `dark`.
4. Open a CSS file and type `var(--color-` — you should see the full token list.

If completions don't show:

- Confirm the JSON paths in `settings.json` resolve (open them via `Cmd/Ctrl + Click`).
- Confirm `editor.quickSuggestions.strings` is enabled (default: `on`).
- Reload the window after editing `settings.json`.
- For Vue/Svelte/JSX, ensure the official language extension is installed — VS Code's HTML server only powers `.html` by default.

---

## Related

- [`selectors.json` usage guide](./selector-manifest-usage.md) — same data, programmatic API
- [`machine-readable-contracts.md`](./machine-readable-contracts.md) — full contract reference
- [`canonical-conventions.md`](./canonical-conventions.md) — naming rules behind the autocomplete entries
