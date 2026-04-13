# Brand Theme Override Cookbook

> Created: 2026-04-12
> Scope: M2 — how to create brand-specific token overrides

## Overview

Fikir CSS is fully theme-able via CSS custom properties. A brand theme is a CSS file that overrides semantic tokens (and optionally core tokens) for a specific brand context.

## Step 1: Identify Tokens to Override

Start with semantic tokens in `packages/tokens/semantic.css`. These are the recommended override targets:

```
--color-bg-default       Background of the app/page
--color-bg-surface       Card/panel surface
--color-fg-default       Primary text
--color-fg-muted         Secondary/muted text
--color-border-subtle    Borders
--color-accent           Primary interactive color (buttons, links, focus rings)
--color-danger           Destructive action color
```

Core tokens (`--space-*`, `--font-size-*`, `--radius-*`) are also overridable for spacing and shape.

## Step 2: Create a Brand Theme File

```css
/* brand/acme-theme.css */
@layer base {
  [data-brand="acme"],
  .brand-acme {
    --color-accent: oklch(58% 0.22 170);        /* Acme teal */
    --color-danger: oklch(56% 0.24 18);          /* Acme red */
    --color-bg-default: oklch(97% 0.008 250);    /* Cool-tinted background */
    --color-bg-surface: oklch(99% 0.004 250);
    --color-fg-default: oklch(18% 0.015 250);
    --color-fg-muted: oklch(46% 0.02 250);
    --color-border-subtle: oklch(82% 0.012 250);
    --radius-md: 0.5rem;                          /* Less rounded than default */
  }
}
```

## Step 3: Apply the Brand Theme

**Via data attribute (recommended for multi-brand apps):**
```html
<html data-brand="acme">
  <!-- all Fikir components inherit the brand tokens -->
</html>
```

**Via CSS class:**
```html
<div class="brand-acme">
  <!-- scoped to this subtree -->
</div>
```

## Step 4: Dark Mode in Brand Themes

Add a nested override for dark mode:

```css
@layer base {
  [data-brand="acme"][data-theme="dark"],
  [data-brand="acme"] [data-theme="dark"],
  @media (prefers-color-scheme: dark) {
    [data-brand="acme"] {
      --color-bg-default: oklch(12% 0.015 250);
      --color-bg-surface: oklch(16% 0.018 250);
      --color-fg-default: oklch(92% 0.01 250);
      --color-fg-muted: oklch(64% 0.02 250);
      --color-border-subtle: oklch(32% 0.02 250);
    }
  }
}
```

## Step 5: Density and Shape Overrides

Brand themes can also override density and shape via the theme mode tokens:

```css
[data-brand="acme"] {
  --radius-sm: 0;
  --radius-md: 0.125rem;  /* Sharp corners for enterprise brand */
}
```

Or use the pre-built mode files:
```html
<html data-brand="acme" data-shape="sharp" data-density="compact">
```

## Step 6: Validate with Theme Regression Checklist

Run through `docs/testing/theme-regression-checklist.md` for each brand theme before release.

## Token Override Reference

| Token | Default | Common Brand Target |
|-------|---------|-------------------|
| `--color-accent` | Primary blue | Brand primary color |
| `--color-danger` | Red | Brand error/destructive |
| `--radius-md` | `0.375rem` | Rounded (0.875rem) or Sharp (0) |
| `--font-size-sm` | `0.875rem` | Brand body size |
| `--shadow-sm` | subtle | Heavier for material-feel |
