# Figma Token Handoff Guidance

> Created: 2026-04-12
> Scope: M3 — workflow for synchronizing Fikir CSS tokens with Figma

## Recommended Workflow

### 1. Install Figma Tokens Plugin

Use the **Tokens Studio for Figma** plugin (formerly Figma Tokens) to sync tokens.

### 2. Import JSON Token File

Use the DTCG-format token file from `docs/guides/design-token-export.md` as the source.

Configure Tokens Studio with the GitHub sync to pull from `dist/tokens.json` after each release.

### 3. Token Collection Structure

Create two variable collections in Figma:

- **Fikir Core** — raw values (`--space-*`, `--radius-*`, `--font-size-*`)
- **Fikir Semantic** — semantic aliases (`--color-fg-default`, etc.)

### 4. Variable Binding Convention

| Figma variable | Maps to CSS token |
|---------------|-------------------|
| `color/surface/default` | `--color-bg-default` |
| `color/surface/raised` | `--color-bg-surface` |
| `color/text/primary` | `--color-fg-default` |
| `color/text/secondary` | `--color-fg-muted` |
| `color/interactive/primary` | `--color-accent` |
| `color/status/danger` | `--color-danger` |
| `border/subtle` | `--color-border-subtle` |
| `spacing/xs` | `--space-1` |
| `spacing/sm` | `--space-2` |
| `spacing/md` | `--space-4` |
| `spacing/lg` | `--space-6` |
| `spacing/xl` | `--space-8` |
| `radius/sm` | `--radius-sm` |
| `radius/md` | `--radius-md` |
| `radius/lg` | `--radius-lg` |
| `fontSize/xs` | `--font-size-xs` |
| `fontSize/sm` | `--font-size-sm` |
| `fontSize/md` | `--font-size-md` |

### 5. Dark Mode in Figma

Use Figma Modes on the **Fikir Semantic** collection:
- Mode: **Light** — maps semantic tokens to light values
- Mode: **Dark** — maps semantic tokens to dark values

Toggle the mode on any frame to preview dark mode.

### 6. Checking Drift

Before each Fikir CSS release, check that the CSS token values match the Figma variable values. Drift occurs when:
- A new token is added to CSS but not Figma
- A token value changes in the next release

Use the DTCG `dist/tokens.json` as ground truth — Figma values should always match it.

## Component Handoff

For each Fikir CSS component, the Figma equivalent should:
1. Use Figma variables (not hardcoded colors) for all values
2. Have component states as Figma component variants (default, hover, active, disabled, error)
3. Follow the same naming convention as the CSS selector contract
