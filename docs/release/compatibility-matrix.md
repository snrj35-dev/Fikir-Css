# Fikir CSS — Versioned Compatibility Matrix

> Created: 2026-04-12
> Last updated: 2026-04-16 for the `v1.0.0` baseline.

This matrix documents which framework adapters, bundlers, and integration patterns are validated against which Fikir CSS version.

---

## Framework Adapter Compatibility

| Adapter | Min fikir-css version | Tested against | Status | Notes |
|---------|----------------------|----------------|--------|-------|
| React (JSX) | `0.4.0` | `1.0.0` | ✅ Verified | `import "fikir-css/css"` in Vite |
| Vue 3 (SFC) | `0.4.0` | `1.0.0` | ✅ Verified | `import "fikir-css/css"` in Vite |
| Svelte 5 | `0.4.0` | `1.0.0` | ✅ Verified | CSS import in `+layout.svelte` |
| Next.js (App Router) | `0.5.0` | `1.0.0` | ✅ Verified | `import "fikir-css/css"` in root layout |
| Nuxt 3 | `0.5.0` | `1.0.0` | ✅ Verified | `import "fikir-css/css"` in `nuxt.config` CSS array |
| SvelteKit | `0.5.0` | `1.0.0` | ✅ Verified | CSS import in root layout |
| Astro | `0.5.0` | `1.0.0` | ✅ Verified | `<link>` in `<head>` or bundler import |
| Plain HTML (CDN) | `1.0.0` | `1.0.0` | ✅ Verified | GitHub Pages CDN `https://snrj35-dev.github.io/Fikir-Css/dist/fikir.css` |

---

## Bundler / Build Tool Compatibility

| Tool | Min version tested | fikir-css version | Status |
|------|--------------------|-------------------|--------|
| Vite | 5.x | `1.0.0` | ✅ |
| webpack | 5.x | `1.0.0` | ✅ |
| Parcel | 2.x | `1.0.0` | ✅ |
| Rollup | 4.x | `1.0.0` | ✅ |
| esbuild | 0.20+ | `1.0.0` | ✅ |

---

## Node.js / Runtime Compatibility

| Runtime | Min version | Notes |
|---------|-------------|-------|
| Node.js | 20 LTS | Minimum supported; CI matrix target |
| Node.js | 22 LTS | Recommended; CI matrix + publish workflow |
| Bun | 1.x | CSS import confirmed; build scripts not tested |
| Deno | 1.40+ | CDN import confirmed; npm package untested |

---

## Theme / Mode Compatibility

| Theme entry | Available since | Import path |
|-------------|----------------|-------------|
| `dark.css` | `0.4.0` | `fikir-css/themes/dark` |
| `light.css` | `0.5.0` | `fikir-css/themes/light` |
| `high-contrast.css` | `0.5.0` | `fikir-css/themes/high-contrast` |
| `compact.css` | `0.5.0` | `fikir-css/themes/compact` |
| `comfortable.css` | `0.5.0` | `fikir-css/themes/comfortable` |
| `reduced-motion.css` | `0.5.0` | `fikir-css/themes/reduced-motion` |
| `shape.css` | `0.5.0` | `fikir-css/themes/shape` |

---

## Subpath Export Compatibility

All exports below remain available in `fikir-css@1.0.0`:

| Subpath | Type | Available since |
|---------|------|----------------|
| `fikir-css` / `fikir-css/css` | CSS | `0.4.0` |
| `fikir-css/tooling` | ESM | `0.5.0` |
| `fikir-css/resolvers` | ESM alias | `0.5.0` |
| `fikir-css/contracts/selectors` | JSON | `0.4.0` |
| `fikir-css/contracts/alias-migration` | JSON | `0.4.0` |
| `fikir-css/themes/*` | CSS | `0.5.0` |

---

## Known Incompatibilities

| Issue | Affected version | Fixed in | Workaround |
|-------|-----------------|----------|------------|
| `fikir-css/tooling` ERR_MODULE_NOT_FOUND | `0.4.0` | `0.5.0` | Use local tarball from `0.5.0+` |
| `fikir-css/resolvers` not exported | `0.4.0` | `0.5.0` | Use `fikir-css/tooling` |
| Theme CSS not in tarball | `0.4.0` | `0.5.0` | Reference source `packages/tokens/themes/` |

---

## Related

- `README.md` — quick start for all options
- `docs/guides/react-adapter.md`
- `docs/guides/vue-adapter.md`
- `docs/guides/svelte-adapter.md`
- `docs/guides/ssr-hydration-conventions.md`
