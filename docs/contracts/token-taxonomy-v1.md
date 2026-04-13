# Fikir CSS — Token Taxonomy v1 (Frozen)

> Created: 2026-04-12
> Status: **FROZEN** — v1.0 Track canonical reference
> Supersedes: `docs/contracts/token-dictionary-spec.md` (v0.2 foundation)

## Purpose

This document freezes the token taxonomy for the v1.0 track. No new token families or naming grammar changes may be introduced without updating this document and following the lifecycle policy in `docs/contracts/token-lifecycle-policy.md`.

---

## Token Categories

### 1. Core Tokens

Raw design scale values. Never reference semantic intent.

**Families:**

| Family | Prefix | Source File | Examples |
|--------|--------|-------------|---------|
| Spacing | `--space-` | `packages/tokens/core.css` | `--space-1`, `--space-2`, `--space-4` |
| Font size | `--font-size-` | `packages/tokens/core.css` | `--font-size-xs`, `--font-size-sm`, `--font-size-md`, `--font-size-lg` |
| Border radius | `--radius-` | `packages/tokens/core.css` | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Shadow | `--shadow-` | `packages/tokens/core.css` | `--shadow-sm`, `--shadow-md` |
| Color (palette) | `--color-{hue}-{step}` | `packages/tokens/core.css` | `--color-primary-500`, `--color-gray-100`, `--color-danger-500` |
| Container | `--container-` | `packages/tokens/core.css` | `--container-md` |

**Rules:**
- Core tokens map to a single raw CSS value.
- Core tokens must not reference other CSS custom properties.
- Core tokens are available in `:root` scope.
- Addition of a new core token family requires a lifecycle entry.

---

### 2. Semantic Tokens

UI-intent tokens. Reference core tokens; never hard-code raw values.

**Families:**

| Family | Prefix | Source File | Examples |
|--------|--------|-------------|---------|
| Background | `--color-bg-` | `packages/tokens/semantic.css` | `--color-bg-default`, `--color-bg-surface` |
| Foreground | `--color-fg-` | `packages/tokens/semantic.css` | `--color-fg-default`, `--color-fg-muted` |
| Border | `--color-border-` | `packages/tokens/semantic.css` | `--color-border-subtle`, `--color-border-strong` |
| Accent | `--color-accent` | `packages/tokens/semantic.css` | `--color-accent` |
| Status | `--color-{status}` | `packages/tokens/semantic.css` | `--color-danger` |

**Rules:**
- Semantic tokens must reference a core token via `var(--core-token)`.
- Semantic tokens are the only tokens components and utilities should directly consume.
- Semantic tokens define the public theming contract; changing a semantic token's value is a theming operation, not a breaking change.

---

### 3. Mode Tokens (Theme Overrides)

Context-specific overrides of semantic tokens. Applied via `[data-theme]` or `@media` selectors.

**Supported modes (v1.0 frozen set):**

| Mode | Selector / Media | Source File |
|------|-----------------|-------------|
| Light (default) | `:root, [data-theme="light"]` | `packages/tokens/semantic.css` |
| Dark | `[data-theme="dark"]` | `packages/tokens/themes/dark.css` |
| High contrast | `[data-theme="high-contrast"]` | `packages/tokens/themes/high-contrast.css` *(M2)* |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` | inline in component CSS *(M2)* |
| Compact density | `[data-density="compact"]` | `packages/tokens/themes/compact.css` *(M2)* |
| Comfortable density | `[data-density="comfortable"]` | `packages/tokens/themes/comfortable.css` *(M2)* |
| Rounded shape | `[data-shape="rounded"]` | `packages/tokens/themes/shape.css` *(M2)* |
| Sharp shape | `[data-shape="sharp"]` | `packages/tokens/themes/shape.css` *(M2)* |

**Rules:**
- Mode tokens only override semantic tokens; they never introduce new token names.
- Light is the canonical default; all other modes are additive overrides.
- Adding a new mode requires a lifecycle entry and a theme regression checklist pass.

---

## Token Naming Grammar

```
--{category}-{family}-{scale}
```

Examples:
- `--space-4` → category: (implicit spacing), family: space, scale: 4
- `--color-primary-500` → category: color, family: primary, scale: 500
- `--color-bg-default` → category: color, family: bg (background semantic), scale: default
- `--radius-md` → category: radius, family: radius, scale: md
- `--font-size-sm` → category: font-size, family: font-size, scale: sm

**Naming rules:**
- All lowercase, hyphen-separated.
- No camelCase or underscores in token names.
- Scale steps use numeric or t-shirt size conventions consistently within a family.
- No abbreviations except well-established ones (`bg`, `fg`, `sm`, `md`, `lg`, `xs`).

---

## Token Consumption Rules

| Consumer | May use | Must not use |
|----------|---------|-------------|
| Component CSS (`packages/components/`) | Semantic tokens | Core tokens directly |
| Utility CSS (`packages/utilities/`) | Core tokens, semantic tokens | Hard-coded raw values |
| Layout CSS (`packages/layouts/`) | Core tokens for spacing/sizing | Hard-coded raw values |
| Theme files (`packages/tokens/themes/`) | Semantic token names (to override) | Core token names (to override) |
| Recipe TS (`packages/recipes/`) | Selector map only | Token names directly |

---

## Freeze Scope

The following are frozen as of v1.0 track start:

- Token naming grammar (above)
- Core token families: spacing, font-size, radius, shadow, color palette, container
- Semantic token families: bg, fg, border, accent, danger
- Mode token selectors: light, dark

**Not yet frozen (M2 additions):**
- high-contrast, compact, comfortable, rounded, sharp modes
- Additional semantic token families (e.g., `--color-success`, `--color-warning`, `--color-info`)

---

## Related Documents

- `docs/contracts/token-lifecycle-policy.md` — add/change/deprecate rules
- `docs/contracts/token-dictionary-spec.md` — v0.2 predecessor reference
- `docs/contracts/naming-convention-spec.md` — selector naming convention
- `packages/tokens/core.css` — core token source
- `packages/tokens/semantic.css` — semantic token source
