# Icon Strategy

> Status: **Stable** · Added 2026-04-20 (M22)
> Fikir CSS does not ship an icon set. This page tells you how to pick one, wire it cleanly into the framework, and keep it theme-reactive.

## The short version

1. Pick **one** icon set and stick with it. Popular sets that work well with Fikir's sizing and color conventions:
   - **[Lucide](https://lucide.dev/)** — 1000+ icons, clean line style, tree-shakeable SVG components for React/Vue/Svelte.
   - **[Phosphor](https://phosphoricons.com/)** — 6 weights, same icon across all weights.
   - **[Heroicons](https://heroicons.com/)** — solid + outline, made by Tailwind team.
   - **[Radix Icons](https://www.radix-ui.com/icons)** — 15×15 grid, minimalist.
2. Use **inline SVG** (or a per-icon component) with `stroke="currentColor"` or `fill="currentColor"`.
3. Size via the `icon-button` size scale, not inline pixels.
4. Decorative icons: `aria-hidden="true"`. Icon-only buttons/links: `aria-label="…"`.

## The `currentColor` rule

Icons must inherit color from their ancestor so they react to theme, density, and interactive states (hover, focus, disabled) for free.

```html
<!-- ✅ Good: icon re-colors with the button/badge/link it lives in -->
<button class="btn btn-outline btn-md">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
  Add item
</button>

<!-- ❌ Bad: icon will always be purple even in an error button -->
<svg stroke="#6d28d9">…</svg>
```

For filled glyphs: `fill="currentColor"` instead of stroke.

## Sizing

Pick one size per context. Align with the component you embed in:

| Context | Recommended icon size |
|---------|-----------------------|
| Inside `btn-xs` / `icon-button-xs` | 12 px |
| Inside `btn-sm` / `icon-button-sm` | 14 px |
| Inside `btn-md` / `icon-button-md` | 16 px |
| Inside `btn-lg` / `icon-button-lg` | 20 px |
| Inside `sidebar-nav-item`, menu items | 16 px |
| Decorative inline in body text | `1em` |

Use explicit `width`/`height` on the SVG rather than CSS `width`/`height` — it prevents pre-hydration layout jumps and zero-width flashes.

## Icon-only buttons

Use the `icon-button` component, which carries its own square sizing and focus/hover/disabled states:

```html
<button class="icon-button icon-button-md" aria-label="Open settings">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06…" />
  </svg>
</button>
```

- `aria-label` is **required** — the button has no text.
- The SVG should be `aria-hidden="true"` so it doesn't double-announce.
- Pair `aria-expanded` / `aria-pressed` / `aria-controls` as appropriate for state.

## Decorative vs meaningful

| Icon role | Markup |
|-----------|--------|
| Decorative (repeats adjacent label) | `aria-hidden="true"` on the SVG |
| Icon-only interactive (no visible text) | `aria-label` on the **button/anchor**, `aria-hidden="true"` on the SVG |
| Status indicator (conveys meaning no text does) | `role="img"` + `aria-label="…"` on the SVG, or a visually-hidden sibling `<span class="visually-hidden">…</span>` |

Never use `<span>🔔</span>` as an icon in production — emoji rendering varies wildly by OS/browser and is usually announced as "bell emoji" or similar to screen readers. Emojis are fine in starter demos and throwaway prototypes (the Fikir dashboard starter uses a few) but not shipped product UI.

## Sprite vs per-icon SVG

| Strategy | Pros | Cons | Pick when |
|----------|------|------|-----------|
| Inline SVG per usage | Simplest, no build tooling | More HTML bytes | You use < 20 icons or render via a component lib that tree-shakes |
| SVG sprite (`<symbol>` + `<use>`) | One HTTP request, defined once | Needs a build step or a sprite file | You use 20+ icons and are not already on a component lib |
| Icon font | Wide browser support | Worse a11y, blurry at odd sizes | Avoid — modern SVG is universally supported |

If you go sprite route:

```html
<!-- Once in layout -->
<svg style="display:none" aria-hidden="true">
  <symbol id="i-plus" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" />
  </symbol>
  <symbol id="i-settings" viewBox="0 0 24 24">…</symbol>
</svg>

<!-- Usage -->
<button class="icon-button icon-button-md" aria-label="Add">
  <svg width="16" height="16" aria-hidden="true"><use href="#i-plus" /></svg>
</button>
```

## Theme reactivity

Because you use `currentColor`, icons automatically match:

- `data-theme="dark"` → inherit `--color-fg-default` / `--color-fg-muted`
- Button tone changes (`btn-danger`, `btn-success`) → button sets `color`, icon inherits
- `data-density` — icon size doesn't shift with density; that is usually correct. If you want smaller icons in compact density, scope CSS:
  ```css
  [data-density="compact"] .icon-button svg { width: 14px; height: 14px; }
  ```

## Framework usage

### React (Lucide example)

```jsx
import { Plus } from "lucide-react";

<button className="btn btn-primary btn-md">
  <Plus size={16} strokeWidth={2} aria-hidden />
  Add customer
</button>
```

Lucide already renders SVG with `stroke="currentColor"` by default — it just works.

### Vue / Svelte

Both Lucide and Phosphor ship official Vue / Svelte packages with the same API.

### Plain HTML

Copy-paste the SVG source from the icon set's website. Keep the `width` + `height` + `viewBox` attributes, and make sure `stroke` / `fill` is `currentColor`.

## Anti-patterns

- ❌ Hard-coded icon colors (`stroke="#666"`).
- ❌ Icon-only buttons without `aria-label`.
- ❌ Mixing 3+ icon sets in one product — pick one for consistency.
- ❌ Emoji as production icons.
- ❌ Icon-font solutions on new projects.
- ❌ SVG `width: 100%` inside a flex/grid child without a fixed aspect ratio — it can grow unpredictably.

## Related

- `docs/components/icon-button.md` — size scale and canonical markup
- `docs/guides/canonical-conventions.md` — `aria-*` state attribute rules
- `docs/architecture/chart-embedding-pattern.md` — similar `currentColor` pattern applied to charts
