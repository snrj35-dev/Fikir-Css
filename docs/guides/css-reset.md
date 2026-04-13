# CSS Reset

Fikir CSS includes a minimal, intentional reset written in `@layer reset` — the lowest-priority layer in its cascade. This means it is the easiest layer to override.

---

## What is reset

```css
/* @layer reset */
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
}

body {
  line-height: var(--line-height-base, 1.5);
  -webkit-font-smoothing: antialiased;
}

img, video, svg, canvas {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

This is a minimal modern reset, not an aggressive normalizer. It does **not** reset colors, link styles, or list styles.

---

## What is NOT reset

To avoid over-reach, Fikir CSS deliberately does **not** reset:

- Link colors (`a { color }`)
- List markers (`ul, ol { list-style }`)
- Table borders
- Custom properties (CSS variables)
- Scrollbar appearance

---

## Opting out of specific resets

Because all reset rules live in `@layer reset`, they are beaten by anything in a higher layer (including your unlayered styles):

```css
/* Option A — unlayered styles always win over @layer reset */
*, *::before, *::after {
  box-sizing: content-box; /* overrides the reset */
}

/* Option B — declare an overrides layer after reset */
@layer reset, base, layouts, recipes, components, utilities, my-app;

@layer my-app {
  * { box-sizing: content-box; }
}
```

---

## Opting out of the entire reset layer

If your project has its own reset or normalizer (e.g. Normalize.css, modern-normalize), you can suppress Fikir CSS's reset entirely by declaring your reset in a higher-priority layer:

```css
/* Load your own reset AFTER Fikir CSS, outside any layer */
@import "fikir-css/css";        /* Fikir CSS reset is in @layer reset */
@import "normalize.css";        /* unlayered — wins over everything */
```

Or wrap Fikir CSS in a lower-priority layer:

```css
@layer fikir, app;

@layer fikir {
  @import "fikir-css/css";      /* entire Fikir CSS inside lower-priority layer */
}
/* Your app styles in @layer app beat everything in @layer fikir */
```

---

## Interaction with existing projects

| Your setup | Risk | Solution |
|-----------|------|----------|
| You already use `box-sizing: border-box` | None — same value | No action needed |
| You rely on `margin`/`padding` on elements | Low — only body/html margins reset | Restore per-element margins explicitly |
| You use Normalize.css | Low | Load Normalize.css after Fikir CSS (unlayered wins) |
| You use Bootstrap's Reboot | Low | Bootstrap's Reboot is unlayered — it beats `@layer reset` |
| You use Tailwind's Preflight | Low — both reset to similar values | No conflict; slight differences are safe |

---

## Does the reset affect dark mode?

No. The reset layer contains no color declarations. All colors come from `@layer base` (theme tokens) which is overridden by `data-theme` attribute selectors.
